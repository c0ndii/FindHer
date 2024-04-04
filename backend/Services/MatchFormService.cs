using Find_H_er.Entities;
using Microsoft.EntityFrameworkCore;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using AutoMapper;
using Microsoft.IdentityModel.Tokens;

namespace Find_H_er.Services
{
    public interface IMatchFormService
    {
        Task<MatchFormDto> GetMatchForm();
        Task SendScore(int score);
    }
    public class MatchFormService : IMatchFormService
    {
        private readonly AppDbContext _context;
        private readonly IUserContextService _userContextService;
        private readonly IMapper _mapper;
        public MatchFormService(AppDbContext context, IUserContextService userContextService, IMapper mapper)
        {
            _context = context;
            _userContextService = userContextService;
            _mapper = mapper;
        }
        public async Task<MatchFormDto> GetMatchForm()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.Include(x => x.MatchForm).ThenInclude(x => x.Questions).ThenInclude(x => x.Answers).SingleOrDefaultAsync(x => x.UserId == userId);
            if(user is null)
            {
                throw new NotFoundException("User not found");
            }
            var matchform = _mapper.Map<MatchFormDto>(await _context.MatchForms.SingleOrDefaultAsync(x => x.UserId == userId));
            if(matchform is null)
            {
                throw new NotFoundException("Matchform not found");
            }
            return matchform;
        }
        public async Task SendScore(int score)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if(user is null)
            {
                throw new NotFoundException("User not found");
            }
            user.MatchFormScore = 50 + score;
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
