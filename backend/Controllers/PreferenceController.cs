using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers;

[Authorize(Roles = "User, Admin")]
[ApiController]
[Route("api/preferences")]
public class PreferenceController : Controller
{
    private readonly IPreferenceService _preferenceService;
    public PreferenceController(IPreferenceService preferenceService) => _preferenceService = preferenceService;

    [HttpGet]
    public async Task<List<PreferenceDto>> GetPreferences() 
        => await _preferenceService.GetAll();
    
    [HttpGet("user")]
    public async Task<List<PreferenceDto>> GetUserPreferenceIds() 
        => await _preferenceService.GetUserPreferenceIds();

}