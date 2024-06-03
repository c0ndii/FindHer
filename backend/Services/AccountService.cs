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
using Azure.Core.Pipeline;
using Microsoft.AspNetCore.Authentication.Google;
using AutoMapper;

namespace Find_H_er.Services
{
    public interface IAccountService
    {
        string CreateRandomToken();
        Task EditProfile(EditProfileDto dto);
        Task<string> GenerateJwt(LoginDto dto);
        Task<UserDto> GetOwnProfile();
        int GetUserId();
        Task RegisterUser(RegisterUserDto dto);
        Task SentInterest(List<InterestDto> interests);
        Task<bool> VerifyEmail(string token);
        Task<string> GoogleAuth(GoogleAuthDto dto);
    }

    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        private readonly IImageService _imageService;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IUserContextService _userContextService;
        private readonly IAuthorizationService _authorizationService;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IMapper _mapper;
        public AccountService(AppDbContext context, IImageService imageService, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings, IUserContextService userContextService, IAuthorizationService authorizationService, IEmailSenderService emailSenderService, IMapper mapper)
        {
            _context = context;
            _imageService = imageService;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
            _userContextService = userContextService;
            _authorizationService = authorizationService;
            _emailSenderService = emailSenderService;
            _mapper = mapper;
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
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            var matchform = new MatchForm()
            {
                Questions = await _context.Questions.ToListAsync(),
                UserId = newUser.UserId,
                User = newUser,
            };
            await _context.MatchForms.AddAsync(matchform);
            newUser.MatchForm = matchform;
            await _context.SaveChangesAsync();
            await _emailSenderService.SendEmailAsync(dto.Email, "Confirm your email", "https://localhost:44360/api/account/verifyemail/" + $"{newUser.VerificationToken}");
        }
        public async Task<string> GenerateJwt(LoginDto dto)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == dto.Email);
            if (user is null)
            {
                throw new NotFoundException("Account not found");
            }
            if (string.Compare(user.Role.Name, "Unconfirmed") == 0)
            {
                throw new BadRequestException("Account has not been confirmed yet");
            }
            if (string.Compare(user.Role.Name, "Banned") == 0)
            {
                throw new BadRequestException("Account has been banned");
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid username or password");
                //throw new Exception();
            }

            var claims = new List<Claim>()
            {
                new(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new(ClaimTypes.Name, $"{user.Email}"),
                new(ClaimTypes.Role, $"{user.Role.Name}"),
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

            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            if (dto.Image is not null)
            {
                _imageService.Delete(user.Image);
                var fileName = await _imageService.SaveAsync(dto.Image);
                user.Image = fileName;
            }

            user.Name = dto.Name;
            user.Description = dto.Description;
            user.Age = dto.Age;
            user.Sex = dto.Sex;

            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<UserDto> GetOwnProfile()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var userInfo = new UserDto();
            userInfo.Name = user.Name;
            userInfo.Description = user.Description;
            userInfo.Age = user.Age;
            userInfo.Sex = user.Sex;
            userInfo.Image = user.Image;
            return userInfo;
        }
        public async Task SentInterest(List<InterestDto> interests)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            foreach (var interest in interests)
            {
                var item = new Interest();
                item.Name = interest.Name;
                user.Interests.Add(item);
            }
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        public int GetUserId()
        {
            var id = _userContextService.GetUserId;
            return (int)id;
        }
        private async Task AddUserToMatches(int userId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var userScore = user.MatchFormScore;
            List<int> userIds = await _context.Users
                .Include(x => x.Role)
                .Where(x => x.UserId != userId && x.Role.Name != "Banned" && x.Role.Name != "Unconfirmed" && (Math.Sqrt(Math.Pow((double)x.MatchFormScore - (double)userScore, 2)) < 30))
                .Select(x => x.UserId)
                .ToListAsync();
            List<Match> matches = new List<Match>();
            foreach (int elem in userIds)
            {
                matches.Add(new Match()
                {
                    ViewerId = elem,
                    ViewedId = userId
                });
            }
            await _context.Matches.AddRangeAsync(matches);
            _context.SaveChanges();
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
            await AddUserToMatches(user.UserId);
            return await Task.FromResult(true);
        }
        public async Task<string> GoogleAuth(GoogleAuthDto dto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == dto.Email);
            if (user is null)
            {
                var role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "User");
                var newUser = new User()
                {
                    Email = dto.Email,
                    Name = dto.Name,
                    PasswordHash = "s",
                    Role = role,
                    Image = dto.Image,
                };
                await _context.Users.AddAsync(newUser);
                await _context.SaveChangesAsync();
                var matchform = new MatchForm()
                {
                    Questions = await _context.Questions.ToListAsync(),
                    UserId = newUser.UserId,
                    User = newUser,
                };
                await _context.MatchForms.AddAsync(matchform);
                newUser.MatchForm = matchform;
                await AddUserToMatches(newUser.UserId);
                await _context.SaveChangesAsync();
            }
            user = await _context.Users.Include(x => x.Role).SingleOrDefaultAsync(x => x.Email == dto.Email);
            if (string.Compare(user.Role.Name, "Banned") == 0)
            {
                throw new BadRequestException("Account has been banned");
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
    }
}
