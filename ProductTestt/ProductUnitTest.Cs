using ProductBussiness.Services;
using ProductData.Models;

namespace ProductTestt
{
    [TestFixture]
    public class ProductTest
    {
        private Product _product;
        private ProductService _productService;

        [SetUp]
        public void Setup()
        {
            _product = new Product();
            _productService = new ProductService();
        }

        [Test]
        public void GetTaxByProduct_ShouldCalculateTax()
        {
            decimal expected = 5000 * 0.19m;
            _product.Price = 5000;
            _productService.GetTaxByProduct(_product);
            Assert.That(_product.Tax, Is.EqualTo(expected));
        }

        [Test]
        public void GetTaxByListProducts_ShouldCalculateAllTaxesForAllProducts() 
        {
            List<Product> products = new List<Product>
            {
                new Product{ Price = 6000},
                new Product{ Price = 7000},
                new Product{ Price = 8000}
            };
            decimal expected1 = products[0].Price * 0.19m;
            decimal expected2 = products[1].Price * 0.19m;
            decimal expected3 = products[2].Price * 0.19m;

            _productService.GetTaxByListProducts(products);

            Assert.That(products[0].Tax, Is.EqualTo(expected1));
            Assert.That(products[1].Tax, Is.EqualTo(expected2));
            Assert.That(products[2].Tax, Is.EqualTo(expected3));
        }
    }
}