using Microsoft.AspNetCore.Mvc;
using Find_H_er.Entities;
using Find_H_er.Services;
using Find_H_er.Models;
using Microsoft.AspNetCore.Authorization;

namespace Find_H_er.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterUserDto dto)
        {
            await _accountService.RegisterUser(dto);
            return await Task.FromResult(Ok());
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto dto)
        {
            string token = await _accountService.GenerateJwt(dto);
            return await Task.FromResult(Ok(token));
        }
        [HttpPut("editprofile")]
        [Authorize]
        public async Task<ActionResult> EditProfile([FromBody] EditProfileDto profileToUpdate)
        {
            await _accountService.EditProfile(profileToUpdate);
            return await Task.FromResult(Ok());
        }
    }
}
