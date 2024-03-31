using AutoMapper;
using Find_H_er.Entities;
using Find_H_er.Models;

namespace Find_H_er
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Answer, AnswerDto>();
            CreateMap<Question, QuestionDto>();
            CreateMap<MatchForm, MatchFormDto>()
                .IncludeMembers();
            CreateMap<Interest, InterestDto>();
            CreateMap<User, UserDto>();
            CreateMap<Meeting, MeetingDto>();
            CreateMap<CreateMeetingDto, Meeting>();
        }
    }
}
