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
        Task AddToPairs(int userId);
        Task BanUser(int userId);
        Task BlockUser(int userId);
        Task CancelUser(int userId);
        string CreateRandomToken();
        Task EditProfile(EditProfileDto dto);
        Task<string> GenerateJwt(LoginDto dto);
        Task<List<UserDto>> GetMatches();
        Task<UserDto> GetOwnProfile();
        Task<List<UserDto>> GetPairs();
        int GetUserId();
        Task<List<UserDto>> GetUsers();
        Task MatchScore(int score);
        Task RegisterUser(RegisterUserDto dto);
        Task SentInterest(List<InterestDto> interests);
        Task<bool> VerifyEmail(string token);
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
            if (user is null)
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
            List<int> userIds = await _context.Users
                .Include(x => x.Role)
                .Where(x => x.UserId != userId && x.Role.Name != "Banned" && x.Role.Name != "Unconfirmed")
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
        public async Task BanUser(int userId)
        {
            var user = await _context.Users.Include(x => x.Role).SingleOrDefaultAsync(x => x.UserId == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            user.Role = await _context.Roles.SingleOrDefaultAsync(x => x.Name == "Banned");
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task<List<UserDto>> GetMatches()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            List<int> userIds = await _context.Matches.Where(x => (x.ViewerId == userId && x.Cancelled == false && x.Matched == false) || (x.ViewedId == userId && x.Cancelled == false && x.Matched == false)).Select(x => x.ViewerId == userId ? x.ViewedId : x.ViewerId).ToListAsync();
            var usersToShow = _mapper.Map<List<UserDto>>(await _context.Users.Include(x => x.Role).Where(x => userIds.Contains(x.UserId) && x.Role.Name != "Banned").ToListAsync());
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
            var pair = await _context.Pairs
                .FirstOrDefaultAsync(x => (x.SenderId == currentUserId && x.ReceiverId == userId) || (x.ReceiverId == currentUserId && x.SenderId == userId));
            if (pair is null)
            {
                throw new NotFoundException("Pair not found");
            }
            pair.isBlocked = true;
            _context.Pairs.Update(pair);
            await _context.SaveChangesAsync();
        }
        public async Task AddToPairs(int userId)
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
            var userToBeAdded = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId && x.Role.Name != "Banned" && x.Role.Name != "Unconfirmed");
            if (userToBeAdded is null)
            {
                throw new NotFoundException("User to add not found");
            }
            var match = await _context.Matches.FirstOrDefaultAsync(x => (x.ViewerId == currentUserId && x.ViewedId == userId && x.Cancelled == false) || (x.ViewedId == currentUserId && x.ViewerId == userId && x.Cancelled == false));
            if (match is null)
            {
                throw new NotFoundException("Match not found");
            }
            if (match.ViewerId == currentUserId)
            {
                match.MatchedViewer = true;
            }
            else
            {
                match.MatchedViewed = true;
            }
            if (match.MatchedViewer && match.MatchedViewed)
            {
                match.Matched = true;
                var pair = new Pair()
                {
                    SenderId = (int)currentUserId,
                    ReceiverId = userId,
                };
                await _context.AddAsync(pair);
            }
            _context.Matches.Update(match);
            await _context.SaveChangesAsync();
        }
        public async Task<List<UserDto>> GetPairs()
        {
            var userId = _userContextService.GetUserId;
            var user = await _context.Users.Include(x => x.Role).FirstOrDefaultAsync(x => x.UserId == userId);
            if (user == null)
            {
                throw new NotFoundException("Couldn't find that user");
            }
            List<int> userIds = await _context.Pairs.Where(x => (x.SenderId == userId && x.isBlocked == false) || (x.ReceiverId == userId && x.isBlocked == false)).Select(x => x.SenderId == userId ? x.ReceiverId : x.SenderId).ToListAsync();
            var usersToShow = _mapper.Map<List<UserDto>>(await _context.Users.Include(x => x.Role).Where(x => userIds.Contains(x.UserId) && x.Role.Name != "Banned").ToListAsync());
            return await Task.FromResult(usersToShow);
        }
        public async Task CancelUser(int userId)
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
            var userToBeAdded = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId && x.Role.Name != "Banned" && x.Role.Name != "Unconfirmed");
            if (userToBeAdded is null)
            {
                throw new NotFoundException("User to add not found");
            }
            var match = await _context.Matches.FirstOrDefaultAsync(x => (x.ViewerId == currentUserId && x.ViewedId == userId && x.Cancelled == false) || (x.ViewedId == currentUserId && x.ViewerId == userId && x.Cancelled == false));
            if (match is null)
            {
                throw new NotFoundException("Match not found");
            }
            match.Cancelled = true;
            _context.Matches.Update(match);
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
