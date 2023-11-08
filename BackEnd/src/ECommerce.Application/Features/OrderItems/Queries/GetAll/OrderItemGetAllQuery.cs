using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Features.OrderItems.Queries.GetAll;

namespace Application.Features.OrderItems.Queries.GetAll
{
    public class OrderItemGetAllQuery : IRequest<List<OrderItemGetAllDto>>
    { 
        public Guid OrderId { get; set; } 
    
        public OrderItemGetAllQuery(Guid orderId)
        {
            OrderId = orderId;
        }
        
    }
}
