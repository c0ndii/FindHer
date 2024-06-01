using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Controllers;

[Authorize(Roles = "User, Admin")]
[ApiController]
[Route("api/interests")]
public class InterestController : ControllerBase

{
    private readonly IInterestService _interestService;
    public InterestController(IInterestService interestService) => _interestService = interestService;

    [HttpGet]
    public async Task<List<InterestDto>> GetInterests() 
        => await _interestService.GetAll();
    
    [HttpGet("user")]
    public async Task<List<InterestDto>> GetUserInterests() 
        => await _interestService.GetUserInterests();

    [HttpPut("user")]
    public async Task UpdateUserInterestIds(List<int> interestIds) 
        => await _interestService.UpdateUserInterests(interestIds);

}