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

        // [HttpGet("Pull")]
        // public async Task<IActionResult> GetAllAsync()
        // {
        //     var query = new OrderGetAllQuery();
        //     return Ok(await Mediator.Send(query));
        // }
    }
}
