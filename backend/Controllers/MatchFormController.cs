using Find_H_er.Entities;
using Find_H_er.Services;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [Route("api/matchform")]
    [ApiController]
    public class MatchFormController : ControllerBase
    {
        private readonly IMatchFormService _matchFormService;
        public MatchFormController(IMatchFormService matchFormService)
        {
            _matchFormService = matchFormService;
        }
        [HttpGet]
        public async Task<List<MatchForm>> GetMatchForm()
        {
            var result = await _matchFormService.GetMatchForm();
            return await Task.FromResult(result);
        }
    }
}
