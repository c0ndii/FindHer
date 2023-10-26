namespace Find_H_er.Entities
{
    public class Interest
    {
        public int InterestId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public List<User> Users { get; set; }
    }
}
