using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Features.OrderItems.Queries.GetAll;

namespace Application.Features.OrderItems.Queries.GetAll
{
    public class OrderItemGetAllQueryHandler : IRequestHandler<OrderItemGetAllQuery, List<OrderItemGetAllDto>>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public OrderItemGetAllQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<OrderItemGetAllDto>> Handle(OrderItemGetAllQuery request, CancellationToken cancellationToken)
        {
            var orderItems = await _applicationDbContext.OrderItems
                .Where(x => x.OrderId == request.OrderId)
                .Select(orderItem => new OrderItemGetAllDto
                {
                    OrderId = orderItem.OrderId,
                    ProductId = orderItem.ProductId,
                    Quantity = orderItem.Quantity,
                    UnitPrice = orderItem.UnitPrice,
                })
                .ToListAsync(cancellationToken);
        
            return orderItems;
        }
    }
}
