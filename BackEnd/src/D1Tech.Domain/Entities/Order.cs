using Domain.Common;
using Domain.Identity;

namespace Domain.Entities;

public class Order : EntityBase<Guid>
{
    public Guid UserId { get; set; } 
    public DateTime OrderDate { get; set; }
    public List<OrderItem> OrderItems { get; set; }
}