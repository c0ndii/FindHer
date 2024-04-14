using Find_H_er.Entities;
namespace Find_H_er.Models.VideoChat
{
    public class CallOffer
    {
        public int CallOfferId { get; set; }
        public User Caller { get; set; }
        public User Target { get; set; }
    }
}
