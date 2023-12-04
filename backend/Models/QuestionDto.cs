using Find_H_er.Entities;

namespace Find_H_er.Models
{
    public class QuestionDto
    {
        public int QuestionId { get; set; }
        public string QuestionContent { get; set; }
        public List<AnswerDto> Answers { get; set; }
    }
}
