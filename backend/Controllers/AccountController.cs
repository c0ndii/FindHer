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
        [HttpPatch("matchscore")]
        [Authorize]
        public async Task<ActionResult> MatchScore([FromBody] int Score)
        {
            await _accountService.MatchScore(Score);
            return await Task.FromResult(Ok());
        }
        [HttpGet("getownprofile")]
        [Authorize]
        public async Task<UserDto> GetOwnProfile()
        {
            var profile = await _accountService.GetOwnProfile();
            return profile;
        }
        [HttpPatch("sendinterest")]
        [Authorize]
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
    }
}
