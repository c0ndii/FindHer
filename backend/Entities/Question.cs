namespace Find_H_er.Entities
{
    public class Question
    {
        public int QuestionId { get; set; }
        public string QuestionContent { get; set; }
        public int AnswerId { get; set; }
        public virtual Answer Answer { get; set; }
    }
}
