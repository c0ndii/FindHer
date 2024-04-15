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
        public async Task<string> JoinRoom(int userId, int targetId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == userId);
            var target = await _context.Users.SingleOrDefaultAsync(x => x.UserId == targetId);
            if(user is null || target is null)
            {
                throw new NotFoundException("User not found");
            }
            var pair = await _context.Pairs.SingleOrDefaultAsync(x => ((x.SenderId == userId && x.ReceiverId == targetId) || (x.SenderId == targetId && x.ReceiverId == userId)) && x.isBlocked == false);
            if (pair is null)
            {
                throw new NotFoundException("User not found");
            }
            var roomId = pair.RoomConnectionId;
            await Groups.AddToGroupAsync(user.VideoChatConnectionId, roomId);
            await Clients.Group(roomId).SendAsync("user-connected", target.VideoChatConnectionId);
            return roomId;
        }
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            Clients.All.SendAsync("user-disconnected");
            return base.OnDisconnectedAsync(exception);
        }
    }
}
