using ProductData.Interfaces;
using ProductData.Models;
using System.Net.Http.Json;

namespace ProductData.Consumer
{
    public class ProductConsumer: IProductConsumer
    {
        private readonly HttpClient _httpClient;
        public ProductConsumer(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<Product> GetProductAsyncById(int productId) 
        {
            try
            {
                Product? product = await _httpClient.GetFromJsonAsync<Product>("https://api.escuelajs.co/api/v1/products/" + productId);

                return product ?? new Product();
            }
            catch (HttpRequestException ex) 
            {
                throw new HttpRequestException(ex.Message);
            }
        }
        public async Task<List<Product>> GetProductListAsync() 
        {
            try
            {
                List<Product>? products = await _httpClient.GetFromJsonAsync<List<Product>>("https://api.escuelajs.co/api/v1/products");

                return products ?? new List<Product>();
            }
            catch (HttpRequestException ex) 
            {
                throw new HttpRequestException(ex.Message);
            }
        }
    }
}
