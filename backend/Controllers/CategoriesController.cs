using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers;


[ApiController]
[Route("api/categories")]
public class CategoriesController : Controller
{
    private readonly ICategoryService _categoryService;
    public CategoriesController(ICategoryService categoryService) => _categoryService = categoryService;

    [HttpGet]
    public async Task<List<CategoryDto>> GetCategories() 
        => await _categoryService.GetAll();
}