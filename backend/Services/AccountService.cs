using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Find_H_er.Entities;
using Find_H_er.Models;
using Microsoft.AspNetCore.Mvc;
using Find_H_er.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Find_H_er.Authorization;
using System.Security.Cryptography;

namespace Find_H_er.Services
{
    public interface IAccountService
    {
        Task<string> GenerateJwt(LoginDto dto);
        Task RegisterUser(RegisterUserDto dto);
        Task EditProfile(EditProfileDto dto);
        Task<bool> VerifyEmail(string token);
        public int GetUserId();
    }

    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IUserContextService _userContextService;
        private readonly IAuthorizationService _authorizationService;
        private readonly IEmailSenderService _emailSenderService;
        public AccountService(AppDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings, IUserContextService userContextService, IAuthorizationService authorizationService, IEmailSenderService emailSenderService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
            _userContextService = userContextService;
            _authorizationService = authorizationService;
            _emailSenderService = emailSenderService;
        }
        public async Task RegisterUser(RegisterUserDto dto)
        {
            var newUser = new User()
            {
                Email = dto.Email,
                VerificationToken = CreateRandomToken(),
            };
            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = hashedPassword;
            newUser.Role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "Unconfirmed");
            var matchForm = new MatchForm()
            {
                Questions = await _context.Questions.ToListAsync(),
                //User = newUser,
                //UserId = newUser.UserId,
            };
            var forYous = new ForYou()
            {
                Distance = 20,
                UsersForYou = new List<User>()
                {
                    await _context.Users.FirstOrDefaultAsync(),
                },
            };
            newUser.ForYou = forYous;
            //newUser.MatchForm = matchForm;
            await _context.MatchForms.AddAsync(matchForm);
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            await _emailSenderService.SendEmailAsync(dto.Email, "Confirm your email", "https://localhost:44360/api/account/verifyemail/"+$"{newUser.VerificationToken}");
        }
        public async Task<string> GenerateJwt(LoginDto dto)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == dto.Email);
            if (user is null)
            {
                //throw new BadRequestException("Invalid username or password");
                throw new Exception();
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                //throw new BadRequestException("Invalid username or password");
                throw new Exception();
            }

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Email}"),
                new Claim(ClaimTypes.Role, $"{user.Role.Name}"),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return await Task.FromResult(tokenHandler.WriteToken(token));
        }
        public async Task EditProfile(EditProfileDto dto)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            Console.Write(user.UserId + "   " + userId);
            if(user is null)
            {
                throw new NotFoundException("User not found");
            }
            user.Name = dto.Name;
            user.Description = dto.Description;
            user.Age = dto.Age;
            user.Sex = dto.Sex;
            user.Image = dto.Image;
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        public int GetUserId()
        {
            var id = _userContextService.GetUserId;
            return (int)id;
        }
        public async Task<bool> VerifyEmail(string token)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => token == x.VerificationToken && x.Role.Name == "Unconfirmed");
            if (user is null)
            {
                return await Task.FromResult(false);
            }
            user.Role = await _context.Roles.SingleOrDefaultAsync(x => x.Name == "User");
            _context.Update(user);
            await _context.SaveChangesAsync();
            return await Task.FromResult(true);
        }
    }
}
