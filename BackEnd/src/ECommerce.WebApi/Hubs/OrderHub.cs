using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs
{
    public class OrderHub:Hub
    {
        public Task NotifyClientsAboutProduct()
        {
            return Clients.All.SendAsync("ProductAdded");
        }

    }
}
