
using Find_H_er.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace Find_H_er.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        public ErrorHandlingMiddleware(ILogger<ErrorHandlingMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, exception.Message);
               
                ProblemDetails problem = exception.ToProblemDetails();
                context.Response.StatusCode = problem.Status!.Value;
                context.Response.ContentType = "application/problem+json";
                await context.Response.WriteAsJsonAsync(problem);
            }
        }
    }
}

public static class ProblemDetailsFactory
{
    public static ProblemDetails ToProblemDetails(this Exception exception)
    {
        return new ProblemDetails()
        {
            Status = GetStatusCode(exception),
            Title = GetTitle(exception),
            Detail = GetDetail(exception)
        };
    }
    
    private static int GetStatusCode(Exception exception)
        => exception switch
    {
        BadRequestException => 400,
        NotFoundException => 404,
        ForbidException => 403,
        _ => 500,
    };
    private static string GetTitle(Exception exception)
        => exception switch
    {
        BadRequestException => "Bad Request",
        NotFoundException => "Not Found",
        ForbidException => "Forbidden",
        _ => "Internal Server Error",
    };
    private static string GetDetail(Exception exception)
        => exception.Message;
}
