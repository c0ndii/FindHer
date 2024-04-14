using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Reflection;
using TableDependency.SqlClient.Base.Messages;

namespace Find_H_er.Hubs
{
    public class VideoHub : Hub
    {
        private readonly AppDbContext _context;

        public VideoHub(AppDbContext context)
        {
            _context = context;
        }
        public async Task TurnOnCamera(int targetId)
        {
            var userEmail = Context.User.Identity.Name;
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email == userEmail);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var targetUser = await _context.Users.SingleOrDefaultAsync(x => x.UserId == targetId);
            if(targetUser is null)
            {
                throw new NotFoundException("User not found");
            }
            await Clients.Client(targetUser.VideoChatConnectionId).SendAsync("camera-on", user.VideoChatConnectionId);
        }
        public override Task OnConnectedAsync()
        {
            var email = Context.GetHttpContext().User.Identity.Name;
            var user =  _context.Users.SingleOrDefault(x => x.Email == email);
            user.VideoChatConnectionId = Context.ConnectionId;
            _context.Update(user);
            _context.SaveChanges();
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

    }
}
