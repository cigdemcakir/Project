using Domain.Common;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Features.Orders.Commands.Add
{
    public class OrderAddCommand : IRequest<Response<Guid>>
    {
        public Guid UserId { get; set; } 
        public DateTime OrderDate { get; set; }

    }
}