namespace Find_H_er.Entities
{
    public class Question
    {
        public int QuestionId { get; set; }
        public string QuestionContent { get; set; }
        public virtual List<Answer> Answers { get; set; }
        public virtual List<MatchForm> MatchForms { get; set; }
    }
}
