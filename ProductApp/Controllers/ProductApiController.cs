using Microsoft.AspNetCore.Mvc;
using ProductBussiness.Interfaces;
using ProductData.Interfaces;
using ProductData.Models;

namespace ProductApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductApiController : ControllerBase
    {
        private readonly IProductConsumer _productConsumer;
        private readonly IProductService _productService;

        public ProductApiController(IProductConsumer productConsumer, IProductService productService) 
        {
            _productConsumer = productConsumer;
            _productService = productService;
        }

        [Route("GetProductById/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            Product product = await _productConsumer.GetProductAsyncById(id);
            _productService.GetTaxByProduct(product);
            return Ok(product);
        }

        [Route("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts() 
        {
            List<Product> products = await _productConsumer.GetProductListAsync();
            _productService.GetTaxByListProducts(products);
            return Ok(products);
        }
    }
}
