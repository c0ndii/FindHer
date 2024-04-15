using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [ApiController]
    [Route("api/pair")]
    [Authorize(Roles = "Admin, User")]
    public class PairController : ControllerBase
    {
        private readonly IPairService _pairService;
        public PairController(IPairService pairService)
        {
            _pairService = pairService;
        }
        [HttpGet("getpairs")]
        public async Task<List<UserDto>> GetPairs()
        {
            var result = await _pairService.GetPairs();
            return await Task.FromResult(result);
        }
        [HttpPost("addusertopair/{id}")]
        public async Task<IActionResult> AddUserToPair([FromRoute] int id)
        {
            await _pairService.AddToPairs(id);
            return Ok();
        }
        [HttpPost("blockuser/{id}")]
        public async Task<IActionResult> BlockUser([FromRoute] int id)
        {
            await _pairService.BlockUser(id);
            return Ok();
        }
        [HttpGet("getroomid/{id}")]
        public async Task<IActionResult> GetRoomId([FromRoute] int id)
        {
            var result = await _pairService.GetRoomId(id);
            return Ok(result);
        }
    }
}
