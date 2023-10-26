using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Find_H_er.Entities
{
    public class UserSetting
    {
        [Key]
        public int UserId { get; set; }
        public int Theme { get; set; }
        public int FontSize { get; set; }
        public string Language { get; set; }
    }
}
