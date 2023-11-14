namespace Application.Common.Interfaces
{
    public interface IOrderHubService
    {
        Task AddProduct(Guid id, CancellationToken cancellationToken);
    }
}
