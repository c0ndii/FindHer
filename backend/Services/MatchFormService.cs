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
            var questions = _mapper.Map<List<QuestionDto>>(await _context.Questions.ToListAsync());
            foreach(QuestionDto elem in questions)
            {
                elem.Answers = _mapper.Map<List<AnswerDto>>(await _context.Answers.Where(x => x.QuestionId == elem.QuestionId).ToListAsync());
            }
            var matchForm = new MatchFormDto()
            {
                Questions = questions,
            };
            return await Task.FromResult(matchForm);
        }
    }
}
