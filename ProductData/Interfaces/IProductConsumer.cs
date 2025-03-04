using ProductData.Models;
namespace ProductData.Interfaces
{
    public interface IProductConsumer
    {
        Task<Product> GetProductAsyncById(int productId);
        Task<List<Product>> GetProductListAsync();
    }
}
