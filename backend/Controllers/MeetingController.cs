using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers
{
    [ApiController]
    [Authorize(Roles = "User, Admin")]
    [Route("api/meeting")]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingService _meetingService;
        public MeetingController(IMeetingService meetingService)
        {
            _meetingService = meetingService;
        }
        [HttpGet("getallpendingmeetings/{id}")]
        public async Task<List<MeetingDto>> GetAllPendingMeetings([FromRoute]int id)
        {
            var result = await _meetingService.GetAllPendingPairMeetings(id);
            return result;
        }
        [HttpGet("getallacceptedmeetings/{id}")]
        public async Task<List<MeetingDto>> GetAllConfirmedMeetings([FromRoute] int id)
        {
            var result = await _meetingService.GetAllConfirmedPairMeetings(id);
            return result;
        }
        [HttpPost("accept/{id}")]
        public async Task<IActionResult> AcceptMeeting(int id)
        {
            await _meetingService.AcceptMeeting(id);
            return Ok();
        }
        [HttpPost("decline/{id}")]
        public async Task<IActionResult> DeclineMeeting(int id)
        {
            await _meetingService.DeclineMeeting(id);
            return Ok();
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateMeeting([FromBody] CreateMeetingDto dto)
        {
            await _meetingService.CreateMeeting(dto);
            return Ok();
        }
    }
}
