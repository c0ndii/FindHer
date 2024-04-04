using Microsoft.AspNetCore.Mvc;
using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Services;
using Find_H_er.Models;
using Microsoft.AspNetCore.Authorization;

namespace Find_H_er.Controllers;

[Route("api/exception")]
[ApiController]
public class ExceptionController : ControllerBase
{
    public ExceptionController()
    {
        
    }
    [HttpGet("404")]
    public IActionResult HandleException()
    {
        throw new NotFoundException("Detail of not found error");
    }
    [HttpGet("500")]
    public IActionResult HandleException(string message)
    {
        throw new Exception("Detail of internal server error");
    }
}
