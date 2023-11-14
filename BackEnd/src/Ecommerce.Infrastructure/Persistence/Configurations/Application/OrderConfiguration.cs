using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class OrderConfiguration:IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        // ID
        builder.HasKey(x => x.Id);

        // UserId
        builder.Property(x => x.UserId).IsRequired();
        
        // OrderDate
        builder.Property(x => x.OrderDate).IsRequired();
        
        // Common Fields

        // CreatedOn
        builder.Property(x => x.CreatedOn).IsRequired();

        // Relationships 
        builder.HasMany(x => x.Products)
            .WithMany(x => x.Orders);
        
        builder.ToTable("Orders");
    }
}