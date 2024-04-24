using Find_H_er.Entities;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services;

public interface IPreferenceService
{
    Task<List<PreferenceDto>> GetAll();
}

public class PreferenceService : IPreferenceService
{
    private AppDbContext _context;

    public PreferenceService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<PreferenceDto>> GetAll()
        => await _context.Preferences.Select(p 
            => new PreferenceDto
            {
                Id = p.PreferenceId,
                Name = p.Name,
                CategoryId = p.CategoryId,
            }).ToListAsync();
}