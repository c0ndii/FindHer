using System.ComponentModel.DataAnnotations.Schema;

namespace Find_H_er.Entities
{
    public class Preference
    {
        public int PreferenceId { get; set; }
        public string Name { get; set; }
        [ForeignKey(nameof(Category))]
        public int CategoryId { get; set; }
        public PreferenceCategory Category { get; set; }
        
        public List<User> Users { get; set; }
    }
}
