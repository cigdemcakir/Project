using Domain.Common;
using Domain.Enums;
using MediatR;

namespace Application.Features.Products.Commands.CreateProduct
{
    public class ProductAddCommand : IRequest<Response<Guid>>
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        
        public ProductCategories Categories { get; set; } 

    }
}