namespace Application.Common.Interfaces
{
    public interface IOrderHubService
    {
        Task AddedAsync(Guid id, CancellationToken cancellationToken);
    }
}
