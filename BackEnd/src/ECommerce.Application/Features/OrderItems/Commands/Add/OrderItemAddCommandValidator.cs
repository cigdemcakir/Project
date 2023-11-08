using Application.Common.Interfaces;
using FluentValidation;

namespace Application.Features.OrderItems.Commands.Add;

public class OrderItemAddCommandValidator : AbstractValidator<OrderItemAddCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    public OrderItemAddCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        
        RuleFor(v => v.OrderId)
            .NotEmpty().WithMessage("Order ID is required.");

        RuleFor(v => v.ProductId)
            .NotEmpty().WithMessage("Product ID is required.");

        RuleFor(v => v.Quantity)
            .GreaterThan(0).WithMessage("Quantity must be greater than 0.");

        RuleFor(v => v.UnitPrice)
            .GreaterThan(0).WithMessage("Unit price must be greater than 0.");
    }
}