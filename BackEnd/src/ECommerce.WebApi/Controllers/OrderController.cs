using Application.Features.Orders.Commands.Add;
using Application.Features.Orders.Queries.GetAll;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class OrderController : ApiControllerBase
    {
        [HttpPost("Add")]
        public async Task<IActionResult> CreateOrderAsync(OrderAddCommand command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllAsync(Guid userId)
        {
            var query = new OrderGetAllQuery(userId);
            return Ok(await Mediator.Send(query));
        }
    }
}
