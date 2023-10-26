namespace Find_H_er.Entities
{
    public class Chat
    {
        public int ChatId { get; set; }
        public List<User> Users { get; set; }
        public List<Message> Messages { get; set; }
    }
}
