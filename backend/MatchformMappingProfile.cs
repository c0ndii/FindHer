using AutoMapper;
using Find_H_er.Entities;
using Find_H_er.Models;

namespace Find_H_er
{
    public class MatchformMappingProfile : Profile
    {
        public MatchformMappingProfile()
        {
            CreateMap<Answer, AnswerDto>();
            CreateMap<Question, QuestionDto>();
            CreateMap<MatchForm, MatchFormDto>();
        }
    }
}
