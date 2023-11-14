using Domain.Common;
using Domain.Enums;

namespace Domain.Entities;

public class Product : EntityBase<Guid>
{ 
    public string Name { get; set; }
    
    public decimal Price { get; set; } 
    
    public string ImageUrl { get; set; }
    
    public ProductCategories Categories { get; set; }
    
    public ICollection<Order> Orders { get; set; }
}