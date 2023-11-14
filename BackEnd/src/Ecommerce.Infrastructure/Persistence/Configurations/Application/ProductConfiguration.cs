using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Application;

public class ProductConfiguration:IEntityTypeConfiguration<Product> 
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        // ID
        builder.HasKey(x => x.Id);
        
        //Name
        builder.Property(x => x.Name)
            .IsRequired()
            .HasMaxLength(200);
        
        //Price
        builder.Property(x => x.Price)
            .IsRequired()
            .HasColumnType("decimal(18,2)");
        
        //ImageUrl
        builder.Property(x => x.ImageUrl)
            .IsRequired()
            .HasMaxLength(500);

        // Common Fields

        // CreatedOn
        builder.Property(x => x.CreatedOn).IsRequired();
        
        // Relationships
        builder.HasMany(x => x.Orders)
            .WithMany(x => x.Products);
        
        builder.ToTable("Products");
    }
}