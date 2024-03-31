using Find_H_er.Entities;
using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [Route("api/matchform")]
    [ApiController]
    [Authorize]
    public class MatchFormController : ControllerBase
    {
        private readonly IMatchFormService _matchFormService;
        public MatchFormController(IMatchFormService matchFormService)
        {
            _matchFormService = matchFormService;
        }
        [HttpGet]
        public async Task<MatchFormDto> GetMatchForm()
        {
            var result = await _matchFormService.GetMatchForm();
            return result;
        }
        [HttpPost("sendscore/{score}")]
        public async Task<IActionResult> SendScore([FromRoute]int score)
        {
            await _matchFormService.SendScore(score);
            return Ok();
        }
    }
}
