using Application.Common.Interfaces;
using FluentValidation;

namespace Application.Features.Orders.Commands.CreateOrder;

public class OrderAddCommandValidator : AbstractValidator<OrderAddCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    public OrderAddCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        
        RuleFor(v => v.UserId)
            .NotEmpty().WithMessage("User ID is required.");

        RuleFor(v => v.OrderDate)
            .NotEmpty().WithMessage("Order date is required.")
            .LessThanOrEqualTo(DateTime.UtcNow).WithMessage("Order date cannot be in the future."); 
        
        RuleFor(x => x.ProductIds).NotEmpty().WithMessage("Product ID is required.");
    }
}