using Find_H_er.Entities;
using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [Route("api/foryou")]
    [ApiController]
    public class ForYouController : ControllerBase
    {
        private readonly IForYouService _foryouService;
        public ForYouController(IForYouService foryouService)
        {
            _foryouService = foryouService;
        }
        [HttpGet]
        public async Task<List<UserDto>> GetForYous()
        {
            var result = await _foryouService.GetForYous();
            return await Task.FromResult(result);
        }
    }
}
