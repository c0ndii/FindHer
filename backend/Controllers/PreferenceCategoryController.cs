using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers;


[ApiController]
[Route("api/categories/preferences")]
public class PreferenceCategoryController : Controller
{
    private readonly IPreferenceCategoryService _preferenceCategoryService;
    public PreferenceCategoryController(IPreferenceCategoryService preferenceCategoryService) => _preferenceCategoryService = preferenceCategoryService;

    [HttpGet]
    public async Task<List<PreferenceCategoryDto>> GetCategories() 
        => await _preferenceCategoryService.GetAll();
}