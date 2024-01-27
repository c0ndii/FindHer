namespace Find_H_er.Models
{
    public class MessageDto
    {
        public MessageDto(int senderId, int receiverId, string content)
        {
            SenderId = senderId;
            ReceiverId = receiverId;
            Content = content;
        }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string Content { get; set; }
    }
}
