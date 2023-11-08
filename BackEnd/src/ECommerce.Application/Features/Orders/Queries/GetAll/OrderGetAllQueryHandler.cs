using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Orders.Queries.GetAll
{
    public class OrderGetAllQueryHandler : IRequestHandler<OrderGetAllQuery, List<OrderGetAllDto>>
{
    private readonly IApplicationDbContext _applicationDbContext;

    public OrderGetAllQueryHandler(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    public async Task<List<OrderGetAllDto>> Handle(OrderGetAllQuery request, CancellationToken cancellationToken)
    {
        var orders = await _applicationDbContext.Orders
            .Where(o => o.UserId == request.UserId) 
            .Include(o => o.UserId)
            .Select(order => new OrderGetAllDto
            {
                OrderId = order.Id,
                OrderDate = order.OrderDate,
            })
            .ToListAsync(cancellationToken);

        return orders;
    }


}


}
