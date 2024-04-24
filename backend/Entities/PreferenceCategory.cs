namespace Find_H_er.Entities;

public class PreferenceCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Preference> Preferences { get; set; }
}