namespace Find_H_er.Entities;

public class InterestCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Interest> Interests { get; set; }
}