using Find_H_er.Services;
using Microsoft.AspNetCore.Mvc;
namespace Find_H_er.Controllers;

[Route("api/images")]
public class ImageController : ControllerBase
{
    private readonly IImageService _imageService;
    public ImageController(IImageService imageService)
    {
        _imageService = imageService;
    }

    [HttpGet("{id}")]
    public IActionResult GetImage(string id)
    {
        var image = _imageService.Get(id);
        return File(image, "application/octet-stream", id);
    }
}