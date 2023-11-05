using Application.Common.Interfaces;
using Application.Features.OrderItems.Commands.Add;
using FluentValidation;

namespace Application.Features.Orders.Commands.Add;

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
    }
}