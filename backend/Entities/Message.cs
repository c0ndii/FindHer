namespace Find_H_er.Entities
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Content { get; set; }
        public int SenderUserId {  get; set; }
        public virtual User Sender {  get; set; }
        public int ReceiverUserId {  get; set; }
        public virtual User Receiver {  get; set; }
        public DateTime SendTime { get; set; } = DateTime.Now;
    }
}
