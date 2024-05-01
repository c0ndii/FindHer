using Find_H_er.Entities;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Services;

public interface IInterestService
{
    Task<List<InterestDto>> GetAll();
    Task<List<InterestDto>> GetUserInterests();
    Task UpdateUserInterests(List<int> interestIds);
}

public class InterestService : IInterestService
{
    private readonly AppDbContext _context;
    private readonly IUserContextService _userContextService;

    public InterestService(AppDbContext context, IUserContextService userContextService)
    {
        _context = context;
        _userContextService = userContextService;
    }

    public async Task<List<InterestDto>> GetAll()
        => await _context.Interests.Select(p 
            => new InterestDto
            {
                Id = p.InterestId,
                Name = p.Name,
                CategoryId = p.CategoryId,
            }).ToListAsync();

    public async Task<List<InterestDto>> GetUserInterests()
    {
        var userId = _userContextService.GetUserId;
        var user = await _context.Users.Include(u => u.Interests)
            .SingleAsync(x => x.UserId == userId);

        return user.Interests.Select(p  => new InterestDto
        {
            Id = p.InterestId,
            Name = p.Name,
            CategoryId = p.CategoryId,
        }).ToList();
    }

    public async Task UpdateUserInterests(List<int> interestIds)
    {
        var userId = _userContextService.GetUserId;
        var user = await _context.Users
            .Include(u => u.Interests)
            .SingleAsync(x => x.UserId == userId);
        var interests = await _context.Interests
            .Where(p => interestIds.Contains(p.InterestId))
            .ToListAsync();
        
        user.Interests = interests;
        _context.Update(user);
        await _context.SaveChangesAsync();
    }
}