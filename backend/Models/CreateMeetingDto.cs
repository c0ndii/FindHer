﻿namespace Find_H_er.Models
{
    public class CreateMeetingDto
    {
        public string MeetingName { get; set; }
        public string MeetingPlace {  get; set; }
        public DateTime MeetingDate { get; set; }
        public int UserId { get; set; }
    }
}
