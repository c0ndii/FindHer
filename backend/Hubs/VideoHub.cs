using Find_H_er.Entities;
using Find_H_er.Exceptions;
using Find_H_er.Models;
using Find_H_er.Models.VideoChat;
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
    public interface IConnectionHub
    {
        Task UpdateUserList(List<User> userList);
        Task CallAccepted(User acceptingUser);
        Task CallDeclined(User decliningUser, string reason);
        Task IncomingCall(User callingUser);
        Task ReceiveSignal(User signalingUser, string signal);
        Task CallEnded(User signalingUser, string signal);
    }
    public class VideoHub : Hub<IConnectionHub>
    {
        private readonly AppDbContext _context;
        private readonly List<UserCall> _userCalls;
        private readonly List<CallOffer> _callOfferList;

        public VideoHub(AppDbContext context, List<UserCall> userCalls, List<CallOffer> callOffersList)
        {
            _context = context;
            _userCalls = userCalls;
            _callOfferList = callOffersList;
        }
        public async Task CallUser(User targetConnectionId)
        {
            var caller = await _context.Users.SingleOrDefaultAsync(x => x.VideoChatConnectionId == Context.ConnectionId);
            var target = await _context.Users.SingleOrDefaultAsync(x => x.VideoChatConnectionId == targetConnectionId.VideoChatConnectionId);

            // Make sure the person we are trying to call is still here
            if (target == null)
            {
                // If not, let the caller know
                await Clients.Caller.CallDeclined(targetConnectionId, "The user you called has left.");
                return;
            }

            // And that they aren't already in a call
            if (GetUserCall(target.VideoChatConnectionId) != null)
            {
                await Clients.Caller.CallDeclined(targetConnectionId, string.Format("{0} is already in a call.", target.Name));
                return;
            }

            // They are here, so tell them someone wants to talk
            await Clients.Client(targetConnectionId.VideoChatConnectionId).IncomingCall(caller);

            // Create an offer
            _callOfferList.Add(new CallOffer
            {
                Caller = caller,
                Target = target
            });
        }
        public async Task AnswerCall(bool acceptCall, User targetConnectionId)
        {
            var caller = await _context.Users.SingleOrDefaultAsync(x => x.VideoChatConnectionId == Context.ConnectionId);
            var target = await _context.Users.SingleOrDefaultAsync(x => x.VideoChatConnectionId == targetConnectionId.VideoChatConnectionId);
            if (caller == null)
            {
                return;
            }
            if (target == null)
            {
                await Clients.Caller.CallEnded(targetConnectionId, "The other user in your call has left.");
                return;
            }
            if (acceptCall == false)
            {
                await Clients.Client(targetConnectionId.VideoChatConnectionId).CallDeclined(caller, string.Format("{0} did not accept your call.", caller.Name));
                return;
            }
            var offerCount = _callOfferList.RemoveAll(c => c.Target.VideoChatConnectionId == caller.VideoChatConnectionId && c.Caller.VideoChatConnectionId == target.VideoChatConnectionId);
            if (offerCount < 1)
            {
                await Clients.Caller.CallEnded(targetConnectionId, string.Format("{0} has already hung up.", target.Name));
                return;
            }
            if (GetUserCall(target.VideoChatConnectionId) != null)
            {
                await Clients.Caller.CallDeclined(targetConnectionId, string.Format("{0} chose to accept someone elses call instead of yours :(", target.Name));
                return;
            }
            _callOfferList.RemoveAll(c => c.Caller.VideoChatConnectionId == target.VideoChatConnectionId);
            _userCalls.Add(new UserCall
            {
                Users = new List<User> { caller, target }
            });
            await Clients.Client(targetConnectionId.VideoChatConnectionId).CallAccepted(caller);
        }
        public async Task HangUp()
        {
            var caller = await _context.Users.SingleOrDefaultAsync(x => x.VideoChatConnectionId == Context.ConnectionId);

            if (caller == null)
            {
                return;
            }

            var currentCall = GetUserCall(caller.VideoChatConnectionId);

            if (currentCall != null)
            {
                foreach (var user in currentCall.Users.Where(u => u.VideoChatConnectionId != caller.VideoChatConnectionId))
                {
                    await Clients.Client(user.VideoChatConnectionId).CallEnded(caller, string.Format("{0} has hung up.", caller.Name));
                }
                currentCall.Users.RemoveAll(u => u.VideoChatConnectionId == caller.VideoChatConnectionId);
                if (currentCall.Users.Count < 2)
                {
                    _userCalls.Remove(currentCall);
                }
            }

            // Remove all offers initiating from the caller
            _callOfferList.RemoveAll(c => c.Caller.VideoChatConnectionId == caller.VideoChatConnectionId);
        }
        private UserCall GetUserCall(string connectionId)
        {
            var matchingCall = _userCalls.SingleOrDefault(x => x.Users.SingleOrDefault(y => y.VideoChatConnectionId == connectionId) != null);
            return matchingCall;
        }
        public async Task SaveUserConnection(int senderId)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserId == senderId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var videoChatConnectionId = Context.ConnectionId;
            user.VideoChatConnectionId = videoChatConnectionId;
            _context.Update(user);
            await _context.SaveChangesAsync();
        }
        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await HangUp();
            await base.OnDisconnectedAsync(exception);
        }
    }
}
