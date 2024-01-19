using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Find_H_er.Entities;

namespace Find_H_er.Authorization
{
    public class ResourceOperationRequirementHandler : AuthorizationHandler<ResourceOperationRequirement, Message>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, ResourceOperationRequirement requirement, Message message)
    {
        if (requirement.ResourceOperation == ResourceOperation.Create || requirement.ResourceOperation == ResourceOperation.Read)
        {
            context.Succeed(requirement);
        }
        var userId = context.User.FindFirst(x => x.Type == ClaimTypes.NameIdentifier).Value;

        if (message.SenderUserId == int.Parse(userId))
        {
            context.Succeed(requirement);
        }
        //return Task.CompletedTask;
    }
}
}

