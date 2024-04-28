using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Microsoft.EntityFrameworkCore;
using NLog.LayoutRenderers;

namespace Find_H_er.Services;

public interface IPreferenceService
{
    Task<List<PreferenceDto>> GetAll();
    Task<List<PreferenceDto>> GetUserPreferenceIds();
    Task UpdateUserPreferenceIds(List<int> preferenceIds);
}

public class PreferenceService : IPreferenceService
{
    private readonly AppDbContext _context;
    private readonly IUserContextService _userContextService;

    public PreferenceService(AppDbContext context, IUserContextService userContextService)
    {
        _context = context;
        _userContextService = userContextService;
    }

    public async Task<List<PreferenceDto>> GetAll()
        => await _context.Preferences.Select(p 
            => new PreferenceDto
            {
                Id = p.PreferenceId,
                Name = p.Name,
                CategoryId = p.CategoryId,
            }).ToListAsync();

    public async Task<List<PreferenceDto>> GetUserPreferenceIds()
    {
        var userId = _userContextService.GetUserId;
        var user = await _context.Users.Include(u => u.Preferences)
            .SingleAsync(x => x.UserId == userId);

        return user.Preferences.Select(p  => new PreferenceDto
        {
            Id = p.PreferenceId,
            Name = p.Name,
            CategoryId = p.CategoryId,
        }).ToList();
    }

    public async Task UpdateUserPreferenceIds(List<int> preferenceIds)
    {
        var userId = _userContextService.GetUserId;
        var user = await _context.Users.Include(u => u.Preferences).SingleAsync(x => x.UserId == userId);
        var preferences = await _context.Preferences
            .Where(p => preferenceIds.Contains(p.PreferenceId))
            .ToListAsync();
        
        user.Preferences = preferences;
        _context.Update(user);
        try
        {
            await _context.SaveChangesAsync();

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}