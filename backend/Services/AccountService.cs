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
using AutoMapper;

namespace Find_H_er.Services
{
    public interface IAccountService
    {
        Task<string> GenerateJwt(LoginDto dto);
        Task RegisterUser(RegisterUserDto dto);
        Task EditProfile(EditProfileDto dto);
        Task<bool> VerifyEmail(string token);
        Task<UserDto> GetOwnProfile();
        Task SentInterest(List<InterestDto> interestDtos);
        Task MatchScore(int score);
        public int GetUserId();
        Task BanUser(int userId);
        Task<List<UserDto>> GetMatchedUsers();
        Task BlockUser(int userId);
        Task AddToMatched(int userId);
        Task<List<UserDto>> GetUsers();
    }

    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IUserContextService _userContextService;
        private readonly IAuthorizationService _authorizationService;
        private readonly IEmailSenderService _emailSenderService;
        private readonly IMapper _mapper;
        public AccountService(AppDbContext context, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings, IUserContextService userContextService, IAuthorizationService authorizationService, IEmailSenderService emailSenderService, IMapper mapper)
        {
            _context = context;
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
                MatchedUsers = new List<Match>()
            };
            var hashedPassword = _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = hashedPassword;
            newUser.Role = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "Unconfirmed");
            //var matchForm = new MatchForm()
            //{
            //    Questions = await _context.Questions.ToListAsync(),
            //    //User = newUser,
            //    //UserId = newUser.UserId,
            //};
            //newUser.MatchForm = matchForm;
            //await _context.MatchForms.AddAsync(matchForm);
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            //await _emailSenderService.SendEmailAsync(dto.Email, "Confirm your email", "https://localhost:44360/api/account/verifyemail/"+$"{newUser.VerificationToken}");
        }
        public async Task<string> GenerateJwt(LoginDto dto)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Email == dto.Email);
            if(user is null)
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
        public async Task<UserDto> GetOwnProfile()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            Console.Write(user.UserId + "   " + userId);
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
        public async Task MatchScore(int score)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            Console.Write(user.UserId + "   " + userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            user.MatchFormScore = score;
        }
        public async Task SentInterest(List<InterestDto> interests)
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            Console.Write(user.UserId + "   " + userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            foreach (var interest in interests) {
                var item = new Interest();
                item.Name = interest.Name;
                user.Interests.Add(item);
            }
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
        public async Task BanUser(int userId)
        {
            var user = await _context.Users.Include(x => x.Role).SingleOrDefaultAsync(x => x.UserId == userId);
            if(user is null)
            {
                throw new NotFoundException("User not found");
            }
            user.Role = await _context.Roles.SingleOrDefaultAsync(x => x.Name == "Banned");
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<List<UserDto>> GetMatchedUsers()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            List<int> userIds = await _context.Matches.Where(x => x.UserId == userId && x.isBlocked == false).Select(x => x.MatchedId).ToListAsync();
            var usersToShow = _mapper.Map<List<UserDto>>(await _context.Users.Where(x => userIds.Contains(x.UserId)).ToListAsync());
            return await Task.FromResult(usersToShow);
        }
        public async Task BlockUser(int userId)
        {
            var currentUserId = _userContextService.GetUserId;
            if (currentUserId is null)
            {
                throw new NotFoundException("Invalid user id");
            }
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == currentUserId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var userToBeBlocked = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (userToBeBlocked is null)
            {
                throw new NotFoundException("User to block not found");
            }
            var firstUserMatch = await _context.Matches.SingleOrDefaultAsync(x => x.UserId == currentUserId && x.MatchedId == userId);
            firstUserMatch.isBlocked = true;
            var secondUserMatch = await _context.Matches.SingleOrDefaultAsync(x => x.UserId == userId && x.MatchedId == currentUserId);
            firstUserMatch.isBlocked = true;
            secondUserMatch.isBlocked = true;
            _context.UpdateRange(firstUserMatch, secondUserMatch);
            await _context.SaveChangesAsync();
        }
        public async Task AddToMatched(int userId)
        {
            var currentUserId = _userContextService.GetUserId;
            if (currentUserId is null)
            {
                throw new NotFoundException("Invalid user id");
            }
            var user = await _context.Users.Include(x => x.MatchedUsers).SingleOrDefaultAsync(x => x.UserId == currentUserId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var userToBeAdded = await _context.Users.Include(x => x.MatchedUsers).SingleOrDefaultAsync(x => x.UserId == userId && x.Role.Name != "Banned" && x.Role.Name != "Unconfirmed");
            if (userToBeAdded is null)
            {
                throw new NotFoundException("User to add not found");
            }
            user.MatchedUsers.Add(new Match()
            {
                MatchedId = userToBeAdded.UserId,
            });
            userToBeAdded.MatchedUsers.Add(new Match()
            {
                MatchedId = user.UserId,
            });
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserDto>> GetUsers()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            List<User> users = await _context.Users.Where(x => x.UserId != userId && x.Role.Name != "Banned").ToListAsync();
            var usersToShow = _mapper.Map<List<UserDto>>(users);
            return await Task.FromResult(usersToShow);
        }
    }
}
