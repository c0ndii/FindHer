using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        private readonly UserContextService _userContextService;
        private List<MessageDto> MessagesToAdd;
        private int userId;

        public ChatHub(AppDbContext context, UserContextService userContextService)
        {
            _context = context;
            _userContextService = userContextService;
        }

        public async Task SendMessage(int id, string message)
        {
            var receiver = _context.Users.SingleOrDefault(x => x.UserId == id);
            if(receiver is null)
            {
                throw new NotFoundException("User not found");
            }

        }
        public override Task OnConnectedAsync()
        {
            var id = _userContextService.GetUserId;
            var user = _context.Users.SingleOrDefaultAsync(x => x.UserId == id);
            if(user == null)
            {
                throw new NotFoundException("User not found");
            }
            userId = (int)id;
            MessagesToAdd = new List<MessageDto>();
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            List<Message> toAdd = MessagesToAdd.Select(x => new Message()
            {
                SenderUserId = x.SenderId,
                ReceiverUserId = x.ReceiverId,
                Content = x.Content
            }).ToList();
            _context.Messages.AddRange(toAdd);
            _context.SaveChanges();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
