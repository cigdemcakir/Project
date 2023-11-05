
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace WebApi.Hubs
{
    public class OrderHub:Hub
    {
        private ISender? _mediator;
        private readonly IHttpContextAccessor _contextAccessor;

        public OrderHub(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

    }
}
