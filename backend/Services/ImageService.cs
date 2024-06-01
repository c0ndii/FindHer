namespace Find_H_er.Services;

public interface IImageService
{
    Task<string?> SaveAsync(IFormFile image);
    void Delete(string imageName);
    Stream Get(string imageName);
}


public class ImageService : IImageService
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public ImageService(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }

    public async Task<string?> SaveAsync(IFormFile image)
    {
        if (image.Length == 0)
        {
            return null;
        }

        var uploadsFolder = Path.Combine(_webHostEnvironment.ContentRootPath, "images");
        if (!Directory.Exists(uploadsFolder))
        {
            Directory.CreateDirectory(uploadsFolder);
        }

        var uniqueFileName = Guid.NewGuid() + "_" + image.FileName;
        var filePath = Path.Combine(uploadsFolder, uniqueFileName);

        await using var fileStream = new FileStream(filePath, FileMode.Create);
        await image.CopyToAsync(fileStream);

        return uniqueFileName;
    }
    public void Delete(string imageName)
    {
        if (string.IsNullOrEmpty(imageName))
        {
            return;
        }

        var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "images", imageName);
        if (File.Exists(filePath))
        {
            File.Delete(filePath);
        }
    }

    public Stream Get(string imageName)
    {
        if (string.IsNullOrEmpty(imageName))
        {
            throw new ArgumentNullException(nameof(imageName));
        }

        var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "images", imageName);
        if (File.Exists(filePath))
        {
            return File.OpenRead(filePath);
        }
        throw new FileNotFoundException();
    }
}
