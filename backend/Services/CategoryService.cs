using Find_H_er.Entities;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetAll();
}

public class CategoryService : ICategoryService
{
    private AppDbContext _context;

    public CategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryDto>> GetAll()
        => await _context.PreferenceCategories.Select(c 
            => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();
}