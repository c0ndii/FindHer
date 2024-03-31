namespace Find_H_er.Entities
{
    public class Meeting
    {
        public int MeetingId { get; set; }
        public string MeetingName { get; set; }
        public string? MeetingPlace {  get; set; }
        public DateTime MeetingDate { get; set; }
        public int CreatorId {  get; set; }
        public bool isAccepted { get; set; } = false;
        public bool isDeclined { get; set; } = false;
        public int PairId { get; set; }
        public virtual Pair Pair { get; set; }
    }
}
