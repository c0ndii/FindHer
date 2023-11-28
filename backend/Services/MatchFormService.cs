using Find_H_er.Entities;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services
{
    public interface IMatchFormService
    {
        Task<List<MatchForm>> GetMatchForm();
    }
    public class MatchFormService : IMatchFormService
    {
        private readonly AppDbContext _context;
        private readonly IUserContextService _userContextService;
        public async Task<List<MatchForm>> GetMatchForm()
        {
            var result = await _context.MatchForms.ToListAsync();
            return await Task.FromResult(result);
        }
    }
}
