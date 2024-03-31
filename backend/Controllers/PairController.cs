using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [ApiController]
    [Route("api/pair")]
    public class PairController : ControllerBase
    {
        private readonly IPairService _pairService;
        public PairController(IPairService pairService)
        {
            _pairService = pairService;
        }
        [Authorize(Roles = "Admin, User")]
        [HttpGet("getpairs")]
        public async Task<List<UserDto>> GetPairs()
        {
            var result = await _pairService.GetPairs();
            return await Task.FromResult(result);
        }
        [Authorize(Roles = "Admin, User")]
        [HttpPost("addusertopair/{id}")]
        public async Task<IActionResult> AddUserToPair([FromRoute] int id)
        {
            await _pairService.AddToPairs(id);
            return Ok();
        }
        [Authorize(Roles = "Admin, User")]
        [HttpPost("blockuser/{id}")]
        public async Task<IActionResult> BlockUser([FromRoute] int id)
        {
            await _pairService.BlockUser(id);
            return Ok();
        }
    }
}
