using Find_H_er.Entities;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services;

public interface IPreferenceCategoryService
{
    Task<List<PreferenceCategoryDto>> GetAll();
}

public class PreferenceCategoryService : IPreferenceCategoryService
{
    private AppDbContext _context;

    public PreferenceCategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PreferenceCategoryDto>> GetAll()
        => await _context.PreferenceCategories.Select(c 
            => new PreferenceCategoryDto
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();
}