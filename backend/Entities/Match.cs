namespace Find_H_er.Entities
{
    public class Match
    {
        public int MatchId { get; set; }
        public int ViewerId { get; set; }
        public int ViewedId { get; set; }
        public bool Cancelled { get; set; } = false;
        public bool MatchedViewer { get; set; } = false;
        public bool MatchedViewed { get; set; } = false;
        public bool Matched {  get; set; } = false;
    }
}
