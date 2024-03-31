using AutoMapper;
using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services
{
    public interface IAdminService
    {
        Task BanUser(int userId);
        Task<List<UserDto>> GetUsers();
    }

    public class AdminService : IAdminService
    {
        private readonly AppDbContext _context;
        private readonly IUserContextService _userContextService;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IMapper _mapper;
        public AdminService(AppDbContext context, IUserContextService userContextService, IEmailSenderService emailSenderService, IMapper mapper)
        {
            _context = context;
            _userContextService = userContextService;
            _emailSenderService = emailSenderService;
            _mapper = mapper;
        }
        public async Task<List<UserDto>> GetUsers()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            List<User> users = await _context.Users.Where(x => x.UserId != userId && x.Role.Name != "Banned").ToListAsync();
            var usersToShow = _mapper.Map<List<UserDto>>(users);
            return await Task.FromResult(usersToShow);
        }
        public async Task BanUser(int userId)
        {
            var user = await _context.Users.Include(x => x.Role).SingleOrDefaultAsync(x => x.UserId == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            user.Role = await _context.Roles.SingleOrDefaultAsync(x => x.Name == "Banned");
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
