using Domain.Common;
using Domain.Identity;

namespace Domain.Entities;

public class Order : EntityBase<Guid>
{
    public Guid UserId { get; set; } 
    public DateTimeOffset OrderDate { get; set; }
    public ICollection<Product> Products { get; set; }
}