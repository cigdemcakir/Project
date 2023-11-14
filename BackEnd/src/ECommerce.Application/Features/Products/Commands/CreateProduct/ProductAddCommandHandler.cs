using Application.Common.Interfaces;
using Application.Features.Orders.Commands.CreateOrder;
using Domain.Common;
using Domain.Entities;
using MediatR;

namespace Application.Features.Products.Commands.CreateProduct
{
    public class ProductAddCommandHandler : IRequestHandler<ProductAddCommand, Response<Guid>>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public ProductAddCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<Response<Guid>> Handle(ProductAddCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Price = request.Price,
                ImageUrl = request.ImageUrl,
                Categories = request.Categories
            };

            await _applicationDbContext.Products.AddAsync(product, cancellationToken);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);

            return new Response<Guid>($"Product {product.Id} has been created successfully.", product.Id);
        }
    }

    
}
