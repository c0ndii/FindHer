﻿

namespace Find_H_er.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? Name { get; set; }
        public int? Age { get; set; }
        public string? Description { get; set; }
        public string? Sex { get; set; }
        public string? Image { get; set; }
        public string? VerificationToken {  get; set; }
        //public int? MatchFormId { get; set; }
        public int? MatchFormScore { get; set; } = 50;
        //public virtual MatchForm? MatchForm { get; set; }
        public List<Pinch>? Pinches { get; set; }
        public List<Match> MatchedUsers {  get; set; }
        public List<Message> SentMessages { get; set; }
        public List<Message> ReceivedMessages {  get; set; }
        //public  zaczepka
        public List<Preference>? Preferences { get; set; }
        public List<Interest>? Interests { get; set; }
        public int? RoleId { get; set; }
        public virtual Role? Role { get; set; }
        public string? ConnectionId {  get; set; }
    }
}
