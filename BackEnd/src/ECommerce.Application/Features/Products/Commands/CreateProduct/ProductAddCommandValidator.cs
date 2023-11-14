using Application.Common.Interfaces;
using Application.Features.Orders.Commands.CreateOrder;
using FluentValidation;

namespace Application.Features.Products.Commands.CreateProduct;

public class ProductAddCommandValidator : AbstractValidator<ProductAddCommand>
{
    private readonly IApplicationDbContext _applicationDbContext;
    
    public ProductAddCommandValidator(IApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
        
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name cannot be empty.")
            .Length(2, 100).WithMessage("Product name must be between 2 and 100 characters.");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Price must be greater than 0.");

        // Additional rules for ImageUrl, for example:
        RuleFor(x => x.ImageUrl)
            .NotEmpty().WithMessage("Image URL cannot be empty.")
            .Must(BeAValidUrl).WithMessage("Must be a valid URL.");

    }
    private bool BeAValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out var uriResult) 
               && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
    }
}