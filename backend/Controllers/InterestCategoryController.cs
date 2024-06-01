using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers;

[ApiController]
[Route("api/categories/interests")]
public class InterestCategoryController : ControllerBase
{
    private readonly IInterestCategoryService _interestCategoryService;
    public InterestCategoryController(IInterestCategoryService interestCategoryService) =>
        _interestCategoryService = interestCategoryService;

    [HttpGet]
    public async Task<List<InterestCategoryDto>> GetCategories() 
        => await _interestCategoryService.GetAll();
}