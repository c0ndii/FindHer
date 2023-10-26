namespace Find_H_er.Entities
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Content { get; set; }
        public DateTime SendTime { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public int ChatId { get; set; }
        public virtual Chat Chat { get; set; }
    }
}
