using AutoMapper;
using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

namespace Find_H_er.Services
{
    public interface IMeetingService
    {
        Task AcceptMeeting(int meetingId);
        Task CreateMeeting(CreateMeetingDto dto);
        Task DeclineMeeting(int meetingId);
        Task<List<MeetingDto>> GetAllConfirmedPairMeetings(int pairId);
        Task<List<MeetingDto>> GetAllPendingPairMeetings(int pairId);
    }

    public class MeetingService : IMeetingService
    {
        private readonly AppDbContext _context;
        private readonly IUserContextService _userContextService;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IMapper _mapper;
        public MeetingService(AppDbContext context, IUserContextService userContextService, IEmailSenderService emailSenderService, IMapper mapper)
        {
            _context = context;
            _userContextService = userContextService;
            _emailSenderService = emailSenderService;
            _mapper = mapper;
        }
        public async Task CreateMeeting(CreateMeetingDto dto)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            var secondUser = await _context.Users.SingleOrDefaultAsync(x => x.UserId == dto.UserId);
            if (user is null || secondUser is null)
            {
                throw new NotFoundException("User not found");
            }

            var pair = await _context.Pairs.FirstOrDefaultAsync(x => (x.SenderId == userId && x.ReceiverId == dto.UserId) || (x.SenderId == dto.UserId && x.ReceiverId == userId));
            if (pair is null)
            {
                throw new NotFoundException("Pair not found");
            }

            if (!DateTime.TryParse(dto.MeetingDate, out DateTime meetingDateTime))
            {
                throw new ArgumentException("Invalid MeetingDate format");
            }

            var meeting = _mapper.Map<Meeting>(dto);
            meeting.MeetingDate = meetingDateTime;
            meeting.Pair = pair;
            meeting.PairId = pair.PairId;
            meeting.CreatorId = (int)userId;
            await _context.Meetings.AddAsync(meeting);
            await _context.SaveChangesAsync();
        }
        public async Task<List<MeetingDto>> GetAllConfirmedPairMeetings(int pairId)
        {
            var pair = await _context.Pairs.SingleOrDefaultAsync(x => x.PairId == pairId);
            if (pair is null)
            {
                throw new NotFoundException("Pair not found");
            }
            var meetings = await _context.Meetings.Where(x => x.PairId == pairId && x.isAccepted == true && x.isDeclined == false).ToListAsync();
            if (meetings.IsNullOrEmpty())
            {
                throw new NotFoundException("Pair does not have any meetings scheduled");
            }
            var result = _mapper.Map<List<MeetingDto>>(meetings);
            return result;
        }
        public async Task<List<MeetingDto>> GetAllPendingPairMeetings(int pairId)
        {
            var pair = await _context.Pairs.SingleOrDefaultAsync(x => x.PairId == pairId);
            if (pair is null)
            {
                throw new NotFoundException("Pair not found");
            }
            var meetings = await _context.Meetings.Where(x => x.PairId == pairId && x.isAccepted == false && x.isDeclined == false).ToListAsync();
            if (meetings.IsNullOrEmpty())
            {
                throw new NotFoundException("Pair does not have any unconfirmed meetings");
            }
            var result = _mapper.Map<List<MeetingDto>>(meetings);
            return result;
        }
        public async Task AcceptMeeting(int meetingId)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var meeting = await _context.Meetings.Include(x => x.Pair).SingleOrDefaultAsync(x => x.MeetingId == meetingId && x.isDeclined == false && x.isAccepted == false);
            if (meeting is null)
            {
                throw new NotFoundException("Meeting not found");
            }
            if (meeting.CreatorId == userId)
            {
                throw new BadRequestException("You cannot accept your own meeting");
            }
            if (meeting.Pair.SenderId != userId && meeting.Pair.ReceiverId != userId)
            {
                throw new BadRequestException("You cannot accept this meeting");
            }
            meeting.isAccepted = true;
            _context.Meetings.Update(meeting);
            await _context.SaveChangesAsync();
        }
        public async Task DeclineMeeting(int meetingId)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var meeting = await _context.Meetings.Include(x => x.Pair).SingleOrDefaultAsync(x => x.MeetingId == meetingId && x.isDeclined == false && x.isAccepted == false);
            if (meeting is null)
            {
                throw new NotFoundException("Meeting not found");
            }
            if (meeting.CreatorId == userId)
            {
                throw new BadRequestException("You cannot decline your own meeting");
            }
            if (meeting.Pair.SenderId != userId && meeting.Pair.ReceiverId != userId)
            {
                throw new BadRequestException("You cannot decline this meeting");
            }
            meeting.isDeclined = true;
            _context.Meetings.Update(meeting);
            await _context.SaveChangesAsync();
        }
    }
}
