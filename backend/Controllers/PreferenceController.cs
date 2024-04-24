using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers;

[ApiController]
[Route("api/preferences")]
public class PreferenceController : Controller
{
    private readonly IPreferenceService _preferenceService;
    public PreferenceController(IPreferenceService preferenceService) => _preferenceService = preferenceService;

    [HttpGet]
    public async Task<List<PreferenceDto>> GetPreferences() 
        => await _preferenceService.GetAll();
}