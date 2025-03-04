using ProductBussiness.Interfaces;
using ProductData.Models;

namespace ProductBussiness.Services
{
    public class ProductService : IProductService
    {
        public void GetTaxByProduct(Product product) 
        {
            product.Tax = product.Price * 0.19m;
        }

        public void GetTaxByListProducts(List<Product> products) 
        {
            foreach (Product product in products) 
            {
                product.Tax = product.Price * 0.19m;
            }
        }
    }
}
