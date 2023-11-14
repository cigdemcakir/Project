using Domain.Common;
using MediatR;

namespace Application.Features.Orders.Commands.CreateOrder
{
    public class OrderAddCommand : IRequest<Response<Guid>>
    {
        public Guid UserId { get; set; } 
        public DateTimeOffset OrderDate { get; set; }
        public List<Guid> ProductIds { get; set; } 

    }
}