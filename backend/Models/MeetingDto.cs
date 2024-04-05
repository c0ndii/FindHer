namespace Find_H_er.Models
{
    public class MeetingDto
    {
        public int MeetingId { get; set; }
        public string MeetingName { get; set; }
        public string? MeetingPlace { get; set; }
        public DateTime MeetingDate { get; set; }
        public int CreatorId { get; set; }
        public bool canAccept { get; set; } = false;
    }
}
