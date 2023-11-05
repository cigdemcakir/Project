using Domain.Common;

namespace Domain.Entities;

public class OrderItem : EntityBase<Guid>
{
    public Guid OrderId { get; set; } 
    
    public Guid ProductId { get; set; } 
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; } 
    
    public Order Order { get; set; }
}