using System.ComponentModel.DataAnnotations.Schema;

namespace Find_H_er.Entities
{
    public class Interest
    {
        public int InterestId { get; set; }
        public string Name { get; set; } = null!;
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; } 
        public InterestCategory Category { get; set; } = null!;
        public List<User> Users { get; set; } = null!;
    }
}
