namespace Find_H_er.Entities
{
    public class MatchForm
    {
        public int MatchFormId { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual List<Question> Questions { get; set; }
    }
}
