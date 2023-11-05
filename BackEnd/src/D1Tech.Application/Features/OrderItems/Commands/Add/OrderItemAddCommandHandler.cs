using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Features.OrderItems.Commands.Add;

namespace Application.Features.OrderItems.Commands.Add
{
    public class OrderItemAddCommandHandler : IRequestHandler<OrderItemAddCommand, Response<Guid>>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public OrderItemAddCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Response<Guid>> Handle(OrderItemAddCommand request, CancellationToken cancellationToken)
        {
            var orderItem = new OrderItem()
            {
                OrderId = request.OrderId, 
                ProductId = request.ProductId, 
                Quantity = request.Quantity,
                UnitPrice = request.UnitPrice
            };

            await _applicationDbContext.OrderItems.AddAsync(orderItem, cancellationToken);
            
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return new Response<Guid>("The new order item was successfully added to the order.", orderItem.Id);
        }
    }
}
