using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class OrderItemConfiguration:IEntityTypeConfiguration<OrderItem> 
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        // ID
        builder.HasKey(x => x.Id);
        
        //Price
        builder.Property(oi => oi.UnitPrice).IsRequired();

        // Common Fields

        // CreatedOn
        builder.Property(x => x.CreatedOn).IsRequired();
        
        // Relationships
        builder.HasOne(x => x.Order)
            .WithMany(x => x.OrderItems)
            .HasForeignKey(x => x.OrderId)
            .OnDelete(DeleteBehavior.Cascade);


        builder.ToTable("OrderItems");
    }
}