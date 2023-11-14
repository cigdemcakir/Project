
using Application.Features.Products.Commands.CreateProduct;
using Application.Features.Products.Queries.GetAll;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebApi.Hubs;

namespace WebApi.Controllers
{
    public class ProductController : ApiControllerBase
    {
        private readonly IHubContext<OrderHub> _orderHubContext;

        public ProductController(IHubContext<OrderHub> orderHubContext)
        {
            _orderHubContext = orderHubContext;
        }
        
        
        [HttpGet("Pull")]
        public async Task<IActionResult> GetAllAsync()
        {
            var query = new ProductGetAllQuery();
            return Ok(await Mediator.Send(query));
        }
        
        [HttpPost("Add")]
        public async Task<IActionResult> CreateProductAsync(ProductAddCommand command)
        {
            return Ok(await Mediator.Send(command));
            
        }
        
        [HttpPut("Add")]
        public async Task<IActionResult> AddToCartProductAsync()
        {
            await _orderHubContext.Clients.All.SendAsync("ProductAdded");
            
            return Ok();

        }
        
        
        
    }
}
