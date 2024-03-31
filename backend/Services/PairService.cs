using AutoMapper;
using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services
{
    public interface IPairService
    {
        Task AddToPairs(int userId);
        Task BlockUser(int userId);
        Task<List<UserDto>> GetPairs();
    }

    public class PairService : IPairService
    {
        private readonly AppDbContext _context;
        private readonly IUserContextService _userContextService;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IMapper _mapper;
        public PairService(AppDbContext context, IUserContextService userContextService, IEmailSenderService emailSenderService, IMapper mapper)
        {
            _context = context;
            _userContextService = userContextService;
            _emailSenderService = emailSenderService;
            _mapper = mapper;
        }
        public async Task<List<UserDto>> GetPairs()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            List<int> userIds = await _context.Pairs.Where(x => (x.SenderId == userId && x.isBlocked == false) || (x.ReceiverId == userId && x.isBlocked == false)).Select(x => x.SenderId == userId ? x.ReceiverId : x.SenderId).ToListAsync();
            var usersToShow = _mapper.Map<List<UserDto>>(await _context.Users.Include(x => x.Role).Where(x => userIds.Contains(x.UserId) && x.Role.Name != "Banned").ToListAsync());
            return await Task.FromResult(usersToShow);
        }
        public async Task AddToPairs(int userId)
        {
            var currentUserId = _userContextService.GetUserId;
            if (currentUserId is null)
            {
                throw new NotFoundException("Invalid user id");
            }
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == currentUserId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var userToBeAdded = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId && x.Role.Name != "Banned" && x.Role.Name != "Unconfirmed");
            if (userToBeAdded is null)
            {
                throw new NotFoundException("User to add not found");
            }
            var match = await _context.Matches.FirstOrDefaultAsync(x => (x.ViewerId == currentUserId && x.ViewedId == userId && x.Cancelled == false) || (x.ViewedId == currentUserId && x.ViewerId == userId && x.Cancelled == false));
            if (match is null)
            {
                throw new NotFoundException("Match not found");
            }
            if (match.ViewerId == currentUserId)
            {
                match.MatchedViewer = true;
            }
            else
            {
                match.MatchedViewed = true;
            }
            if (match.MatchedViewer && match.MatchedViewed)
            {
                match.Matched = true;
                var pair = new Pair()
                {
                    SenderId = (int)currentUserId,
                    ReceiverId = userId,
                };
                await _context.AddAsync(pair);
            }
            _context.Matches.Update(match);
            await _context.SaveChangesAsync();
        }
        public async Task BlockUser(int userId)
        {
            var currentUserId = _userContextService.GetUserId;
            if (currentUserId is null)
            {
                throw new NotFoundException("Invalid user id");
            }
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == currentUserId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var userToBeBlocked = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (userToBeBlocked is null)
            {
                throw new NotFoundException("User to block not found");
            }
            var pair = await _context.Pairs
                .FirstOrDefaultAsync(x => (x.SenderId == currentUserId && x.ReceiverId == userId) || (x.ReceiverId == currentUserId && x.SenderId == userId));
            if (pair is null)
            {
                throw new NotFoundException("Pair not found");
            }
            pair.isBlocked = true;
            _context.Pairs.Update(pair);
            await _context.SaveChangesAsync();
        }
    }
}
