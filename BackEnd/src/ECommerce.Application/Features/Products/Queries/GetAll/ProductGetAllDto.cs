using Domain.Enums;

namespace Application.Features.Products.Queries.GetAll
{
    public class ProductGetAllDto
    {
        public string Name { get; set; }
    
        public decimal Price { get; set; } 
    
        public string ImageUrl { get; set; }
    
        public ProductCategories Categories { get; set; }
    }
}
