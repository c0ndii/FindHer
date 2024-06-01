using Microsoft.AspNetCore.Mvc;
using Find_H_er.Entities;
using Find_H_er.Services;
using Find_H_er.Models;
using Microsoft.AspNetCore.Authorization;
using System.Runtime.InteropServices;

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
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult> EditProfile([FromForm] EditProfileDto profileToUpdate)
        {
            await _accountService.EditProfile(profileToUpdate);
            return await Task.FromResult(Ok());
        }
        [HttpGet("getownprofile")]
        [Authorize(Roles = "User, Admin")]
        public async Task<UserDto> GetOwnProfile()
        {
            var profile = await _accountService.GetOwnProfile();
            return profile;
        }
        [HttpPatch("sendinterest")]
        [Authorize(Roles = "User, Admin")]
        public async Task<ActionResult> SentInterest([FromBody] List<InterestDto> interest)
        {
            await _accountService.SentInterest(interest);
            return await Task.FromResult(Ok());
        }
        [HttpGet("verifyemail/{token}")]
        public async Task<IActionResult> VerifyEmail([FromRoute] string token)
        {
            var result = await _accountService.VerifyEmail(token);
            if (result)
            {
                return await Task.FromResult(Ok("Email verification completed"));
            }
            return await Task.FromResult(NotFound("Couldn't verify email"));
        }
        [HttpGet("getownid")]
        public int GetOwnId()
        {
            var result = _accountService.GetUserId();
            return result;
        }
        [HttpPost("googleauth")]
        public async Task<IActionResult> GoogleAuth([FromBody] GoogleAuthDto dto)
        {
            var token = await _accountService.GoogleAuth(dto);
            return Ok(token);
        }
    }
}
