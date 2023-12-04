namespace Find_H_er.Entities
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public string AnswerLetter { get; set; }
        public string AnswerContent { get; set; }
        public virtual Question Question { get; set; }
        public int QuestionId { get; set; }
    }
}
