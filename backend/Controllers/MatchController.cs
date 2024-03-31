using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [ApiController]
    [Route("api/match")]
    public class MatchController : ControllerBase
    {
        private readonly IMatchService _matchService;
        public MatchController(IMatchService matchService)
        {
            _matchService = matchService;
        }
        [Authorize(Roles = "Admin, User")]
        [HttpGet("getmatchedusers")]
        public async Task<List<UserDto>> GetMatchedUsers()
        {
            var result = await _matchService.GetMatches();
            return await Task.FromResult(result);
        }
        [Authorize(Roles = "Admin, User")]
        [HttpPost("canceluser/{id}")]
        public async Task<ActionResult> CancelUser([FromRoute] int id)
        {
            await _matchService.CancelUser(id);
            return Ok();
        }
    }
}
