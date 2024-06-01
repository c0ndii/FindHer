using Find_H_er.Entities;

namespace Find_H_er.Models
{
    public class EditProfileDto
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Description { get; set; }
        public string Sex { get; set; }
        public IFormFile? Image { get; set; }
    }
}
