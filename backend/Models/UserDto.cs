﻿using Find_H_er.Entities;

namespace Find_H_er.Models
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public int? Age { get; set; }
        public string? Description { get; set; }
        public string? Sex { get; set; }
        public string? Image { get; set; }
        public List<InterestDto>? Interests { get; set; }
    }
}
