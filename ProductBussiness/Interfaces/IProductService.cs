using ProductData.Models;

namespace ProductBussiness.Interfaces
{
    public interface IProductService
    {
        void GetTaxByProduct(Product product);

        void GetTaxByListProducts(List<Product> products);
    }
}
