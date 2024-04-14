using Find_H_er.Entities;
namespace Find_H_er.Models.VideoChat
{
    public class UserCall
    {
        public int UserCallId { get; set; }
        public List<User> Users { get; set; }
    }
}
