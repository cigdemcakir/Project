using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Products.Queries.GetAll
{
    public class ProductGetAllQueryHandler : IRequestHandler<ProductGetAllQuery, List<ProductGetAllDto>>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public ProductGetAllQueryHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<ProductGetAllDto>> Handle(ProductGetAllQuery request, CancellationToken cancellationToken)
        {
            var products = await _applicationDbContext.Products
                .Select(product => new ProductGetAllDto
                {
                    Name = product.Name,
                    Price = product.Price,
                    ImageUrl = product.ImageUrl,
                    Categories = product.Categories,
                })
                .OrderBy(product => product.Name)
                .ToListAsync(cancellationToken);
        
            return products;
        }
    }
}
