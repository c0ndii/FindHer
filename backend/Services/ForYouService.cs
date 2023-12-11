using Find_H_er.Entities;
using Microsoft.EntityFrameworkCore;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;

namespace Find_H_er.Services
{
    public interface IForYouService
    {
        Task<List<UserDto>> GetForYous();
    }

    public class ForYouService : IForYouService
    {
        private readonly AppDbContext _context;
        private readonly IUserContextService _userContextService;
        private readonly IMapper _mapper;
        public ForYouService(AppDbContext context, IUserContextService userContextService, IMapper mapper)
        {
            _context = context;
            _userContextService = userContextService;
            _mapper = mapper;
        }
        public async Task<List<UserDto>> GetForYous()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            var usersToShow = _mapper.Map<List<UserDto>>(await _context.Users.Where(x => x == user).Select(x => x.ForYou.UsersForYou).FirstOrDefaultAsync());
            return await Task.FromResult(usersToShow);
        }
    }
}
