using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using MediatR;

namespace Application.Features.Orders.Commands.CreateOrder
{
    public class OrderAddCommandHandler : IRequestHandler<OrderAddCommand, Response<Guid>>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public OrderAddCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Response<Guid>> Handle(OrderAddCommand request, CancellationToken cancellationToken)
        {
            var order = new Order
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                OrderDate = DateTimeOffset.Now,
                Products = new List<Product>()
            };
            
            foreach (var productId in request.ProductIds)
            {
                var product = await _applicationDbContext.Products.FindAsync(productId);
                if (product != null)
                {
                    order.Products.Add(product);
                }
            }

            await _applicationDbContext.Orders.AddAsync(order, cancellationToken);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return new Response<Guid>($"Order {order.Id} has been created successfully.", order.Id);
        }
    }

    
}
