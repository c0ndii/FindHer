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
        [HttpGet("getallpendingmeetings")]
        public async Task<List<MeetingDto>> GetAllPendingMeetings()
        {
            var result = await _meetingService.GetAllPendingPairMeetings();
            return result;
        }
        [HttpGet("getallacceptedmeetings")]
        public async Task<List<MeetingDto>> GetAllConfirmedMeetings()
        {
            var result = await _meetingService.GetAllConfirmedPairMeetings();
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
