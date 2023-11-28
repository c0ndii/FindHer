namespace Find_H_er.Entities
{
    public class Answer
    {
        public int AnswerId { get; set; }
        public string AnswerContent { get; set; }
        public string AnswerLetter { get; set; }
        public List<Question> Questions { get; set; }
    }
}
