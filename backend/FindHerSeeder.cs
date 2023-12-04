using Azure;
using Find_H_er.Entities;
using System.Net;

namespace Find_H_er
{
#pragma warning disable IDE1006 // Style nazewnictwa
    public class FindHerSeeder
#pragma warning restore IDE1006 // Style nazewnictwa
    {
        private readonly AppDbContext _context;
        public void Seed()
        {
            if (_context.Database.CanConnect())
            {
                if (!_context.Roles.Any())
                {
                    var roles = GetRoles();
                    _context.Roles.AddRange(roles);
                    _context.SaveChanges();
                }
            }
            
        }
        public FindHerSeeder(AppDbContext context)
        {
            _context = context;
        }
        private static IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>()
            {
                new Role()
                {
                    Name = "User"
                },
                new Role()
                {
                    Name = "Admin"
                },
            };
            return roles;
        }
        
    }
}
