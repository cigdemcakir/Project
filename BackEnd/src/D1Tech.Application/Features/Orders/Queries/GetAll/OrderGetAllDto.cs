using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Features.Orders.Queries.GetAll
{
    public class OrderGetAllDto
    {
        public Guid OrderId { get; set; } 
        public DateTime OrderDate { get; set; }
        
        public List<OrderItem> OrderItems { get; set; } 
        
    }
}
