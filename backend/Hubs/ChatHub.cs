using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Find_H_er.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using TableDependency.SqlClient.Base.Messages;

namespace Find_H_er.Hubs
{
    public class ChatHub : Hub
    {
        private readonly AppDbContext _context;
        //private List<MessageDto> MessagesToAdd;

        public ChatHub(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendMessage(int senderId, int receiverId, string message)
        {
            //MessagesToAdd = new List<MessageDto>();
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
            if (message.IsNullOrEmpty())
            {
                throw new Exception("Empty message");
            }
            var messageToSendToReceiver = "0#" + message;
            var messageToSendToSender = "1#" + message;
            _context.Messages.Add(new Entities.Message()
            {
                SenderUserId = senderId,
                ReceiverUserId = receiverId,
                Content = message
            });
            _context.SaveChanges();
            //MessagesToAdd.Add(new MessageDto()
            //{
            //    Content = messageToSendToSender,
            //    SenderId = sender.UserId,
            //    ReceiverId = receiver.UserId
            //});
            Clients.Client(sender.ConnectionId).SendAsync("ReceiveMessage", messageToSendToReceiver);
            Clients.Client(receiver.ConnectionId).SendAsync("ReceiveMessage", messageToSendToSender);
            
        }
        public async Task<List<MessageDto>> GetChatHistory(int senderId, int receiverId)
        {
            var sender = await _context.Users.SingleOrDefaultAsync(x => x.UserId == senderId);
            if (sender is null)
            {
                throw new NotFoundException("User not found");
            }
            var receiver = await _context.Users.SingleOrDefaultAsync(x => x.UserId == receiverId);
            if (receiver is null)
            {
                throw new NotFoundException("User not found");
            }
            var messagesHistory = await _context.Messages.Where(x => x.SenderUserId == senderId && x.ReceiverUserId == receiverId).ToListAsync();
            var result = messagesHistory.Select(x => new MessageDto()
            {
                SenderId = x.SenderUserId,
                ReceiverId = x.ReceiverUserId,
                Content = x.Content
            }).ToList();
            return result;
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
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            //List<Message> toAdd = MessagesToAdd.Select(x => new Message()
            //{
            //    SenderUserId = x.SenderId,
            //    ReceiverUserId = x.ReceiverId,
            //    Content = x.Content
            //}).ToList();
            //_context.Messages.AddRange(toAdd);
            //_context.SaveChanges();
            //MessagesToAdd = new List<MessageDto>();
            return base.OnDisconnectedAsync(exception);
        }
    }
}
