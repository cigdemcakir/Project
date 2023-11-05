using Application.Features.OrderItems.Commands.Add;
using Application.Features.OrderItems.Queries.GetAll;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class OrderItemController : ApiControllerBase
    {
        [HttpPost("Add")]
        public async Task<IActionResult> AddAsync(OrderItemAddCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        // [HttpGet("Pull")]
        // public async Task<IActionResult> GetAllAsync(bool? isDeleted)
        // {
        //     var query = new OrderItemGetAllQuery(isDeleted);
        //     return Ok(await Mediator.Send(query));
        // }
    }
}
