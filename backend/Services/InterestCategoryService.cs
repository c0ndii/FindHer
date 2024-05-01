using Find_H_er.Entities;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services;

public interface IInterestCategoryService
{
    Task<List<InterestCategoryDto>> GetAll();
}

public class InterestCategoryService : IInterestCategoryService
{
    private AppDbContext _context;

    public InterestCategoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<InterestCategoryDto>> GetAll()
        => await _context.InterestCategories.Select(c 
            => new InterestCategoryDto
            {
                Id = c.Id,
                Name = c.Name,
            }).ToListAsync();
}