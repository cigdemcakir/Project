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
        public Guid UserId { get; set; } 
        public DateTimeOffset OrderDate { get; set; }
        
        public List<Product> Products { get; set; } 
        
    }
}
