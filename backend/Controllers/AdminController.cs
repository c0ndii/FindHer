using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpGet("getUsers")]
        public async Task<List<UserDto>> getUsers()
        {
            var result = await _adminService.GetUsers();
            return await Task.FromResult(result);
        }
        [HttpPost("banuser/{userId}")]
        public async Task<IActionResult> BanUser([FromRoute] int userId)
        {
            await _adminService.BanUser(userId);
            return Ok();
        }
    }
}
