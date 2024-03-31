namespace Find_H_er.Entities
{
    public class Pair
    {
        public int PairId { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public bool isBlocked { get; set; } = false;
        public virtual List<Meeting> Meetings { get; set; } = new List<Meeting>();
    }
}
