using Find_H_er.Authorization;
using Find_H_er.Entities;
using Microsoft.AspNetCore.Authorization;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Find_H_er.Middleware;
using Find_H_er;
using Find_H_er.Services;
using Microsoft.AspNetCore.Identity;
using FluentValidation;
using Find_H_er.Models;
using Find_H_er.Models.Validators;
using NLog.Web;
using System.Reflection;
using System.Text.Json.Serialization;
using Find_H_er.Hubs;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

builder.Logging.ClearProviders();
builder.Logging.SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace);
builder.Host.UseNLog();

var authenticationSetting = new AuthenticationSettings();
var emailSenderSetting = new EmailSenderSettings();
builder.Configuration.GetSection("Authentication").Bind(authenticationSetting);
builder.Configuration.GetSection("EmailSender").Bind(emailSenderSetting);
builder.Services.AddAuthentication().AddGoogle(googleoptions =>
{
    googleoptions.ClientId = builder.Configuration.GetSection("GoogleAuth").GetSection("ClientId").Value;
    googleoptions.ClientSecret = builder.Configuration.GetSection("GoogleAuth").GetSection("Secret").Value;
});
builder.Services.AddSingleton(emailSenderSetting);
builder.Services.AddSingleton(authenticationSetting);
builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = "Bearer";
    option.DefaultScheme = "Bearer";
    option.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(cfg =>
{
    cfg.RequireHttpsMetadata = false;
    cfg.SaveToken = true;
    cfg.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authenticationSetting.JwtIssuer,
        ValidAudience = authenticationSetting.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSetting.JwtKey)),
    };
});
builder.Services.AddScoped<IAuthorizationHandler, ResourceOperationRequirementHandler>();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());
// Add services to the container.

builder.Services.AddProblemDetails();
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.NumberHandling = JsonNumberHandling.AllowReadingFromString);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers().AddFluentValidation();
builder.Services.AddDbContext<AppDbContext>(options => 
    options.UseSqlServer(builder.Configuration.GetConnectionString("appDb"))
    );
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<FindHerSeeder>();
builder.Services.AddScoped<IValidator<RegisterUserDto>, RegisterUserDtoValidator>();
builder.Services.AddScoped<IValidator<LoginDto>, LoginDtoValidator>();
builder.Services.AddScoped<IValidator<EditProfileDto>, EditProfileDtoValidator>();
builder.Services.AddScoped<IValidator<CreateMeetingDto>, CreateMeetingDtoValidator>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IMatchService, MatchService>();
builder.Services.AddScoped<IPairService, PairService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IMeetingService, MeetingService>();
builder.Services.AddTransient<IEmailSenderService, EmailSenderService>();
builder.Services.AddScoped<IMatchFormService, MatchFormService>();
builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddScoped<IPreferenceService, PreferenceService>();
builder.Services.AddScoped<IInterestService, InterestService>();
builder.Services.AddScoped<IPreferenceCategoryService, PreferenceCategoryService>();
builder.Services.AddScoped<IInterestCategoryService, InterestCategoryService>();
var app = builder.Build();
app.UseStatusCodePages();
// Configure the HTTP request pipeline.
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseAuthentication();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chatHub");
app.MapHub<VideoHub>("/videoHub");
app.Run();
