using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Find_H_er.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        private List<MessageDto> MessagesToAdd;

        public ChatHub(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(int senderId, int receiverId, string message)
        {
            MessagesToAdd = new List<MessageDto>();
            var sender = _context.Users.SingleOrDefault(x => x.UserId == senderId);
            if(sender is null)
            {
                throw new NotFoundException("User not found");
            }
            var receiver = _context.Users.SingleOrDefault(x => x.UserId == receiverId);
            if(receiver is null)
            {
                throw new NotFoundException("User not found");
            }
            var connectionId = receiver.ConnectionId;
            var messageToSend = sender.Name + ": " + message;
            MessagesToAdd.Add(new MessageDto()
            {
                Content = messageToSend,
                SenderId = sender.UserId,
                ReceiverId = receiver.UserId
            });
            Clients.Client(connectionId).SendAsync("ReceiveMessage", messageToSend);
            
        }
        public async Task SaveUserConnection(int senderId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == senderId);
            if(user is null)
            {
                throw new NotFoundException("User not found");
            }
            var connectionId = Context.ConnectionId;
            user.ConnectionId = connectionId;
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public override Task OnConnectedAsync()
        {
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
            MessagesToAdd = new List<MessageDto>();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
