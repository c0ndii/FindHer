namespace Find_H_er.Entities
{
    public class Match
    {
        public int MatchId { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public bool isBlocked { get; set; } = false;
        public int MatchedId { get; set; }
    }
}
