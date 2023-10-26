namespace Find_H_er.Entities
{
    public class Preference
    {
        public int PreferenceId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public List<User> Users { get; set; }
    }
}
