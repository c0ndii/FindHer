using AutoMapper;
using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services
{
    public interface IMatchService
    {
        Task CancelUser(int userId);
        Task<List<UserDto>> GetMatches();
    }

    public class MatchService : IMatchService
    {
        private readonly AppDbContext _context;
        private readonly IUserContextService _userContextService;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IMapper _mapper;
        public MatchService(AppDbContext context, IUserContextService userContextService, IEmailSenderService emailSenderService, IMapper mapper)
        {
            _context = context;
            _userContextService = userContextService;
            _emailSenderService = emailSenderService;
            _mapper = mapper;
        }
        public async Task CancelUser(int userId)
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
            match.Cancelled = true;
            _context.Matches.Update(match);
            await _context.SaveChangesAsync();
        }
        public async Task<List<UserDto>> GetMatches()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            List<int> userIds = await _context.Matches.Where(x => (x.ViewerId == userId && x.Cancelled == false && x.Matched == false && x.MatchedViewer == false) || (x.ViewedId == userId && x.Cancelled == false && x.Matched == false && x.MatchedViewed == false)).Select(x => x.ViewerId == userId ? x.ViewedId : x.ViewerId).ToListAsync();
            var usersToShow = _mapper.Map<List<UserDto>>(await _context.Users.Include(x => x.Role).Include(x => x.Interests).Where(x => userIds.Contains(x.UserId) && x.Role.Name != "Banned").ToListAsync());
            return await Task.FromResult(usersToShow);
        }
    }
}
