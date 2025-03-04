$("#productId").on("input", function () {
    let value = $(this).val();

    $(this).val(value.replace(/\D/g, ""));
});

$("#searchBtn").click(() => {
    $("#productResults").empty();
    let textValue = Number($("#productId").val());
    if (!isNaN(textValue) && textValue > 0) {
        $.ajax({
            url: `http://localhost:5117/ProductApi/GetProductById/${textValue}`,
            success: function (response) {
                let id = response.id;
                let title = response.title;
                let price = response.price;
                let tax = response.tax;
                let description = response.description;
                let category = response.category.name;
                let carouselItems = response.images.map((image, index) => `
                    <div class="carousel-item ${index === 0 ? "active" : ""}">
                        <img src="${image}" class="d-block w-100" alt="Product Image">
                    </div>`
                ).join("");
                if (typeof response === "object") {
                    var rowHtml = `
                    <div class="container mt-5">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card shadow-lg p-3">
                                    <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                            ${carouselItems}
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div>
                    
                                    <div class="card-body">
                                        <h4 class="card-title">${title}</h4>
                                        <h4 class="text-primary">Price: ${price}$</h4>
                                        <h4 class="text-primary">Tax: ${tax}$</h4>
                                        <p class="card-text">${description}</p>
                                        <span class="badge bg-secondary">Category: ${category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;




                    $("#productResults").append(rowHtml);
                }
                else {
                    $("#productResults").html(`<div class="text-center text-danger">${response}</div>`);
                }
            },
            error: function (error) {
                $("#productResults").html(`<div class="text-center text-danger">Error retrieving product.</div>`);
                console.log(error);
            }
        });
    }
    else {
        $.ajax({
            url: "http://localhost:5117/ProductApi/GetAllProducts",
            success: function (response) {
                if (Array.isArray(response) && response.length > 0) {
                    var rowHtml = "";
                    response.forEach((product, index) => {
                        let id = product.id;
                        let title = product.title;
                        let price = product.price;
                        let tax = product.tax;
                        let description = product.description;
                        let category = product.category.name;
                        let carouselId = `productCarousel-${index}`;

                        let carouselItems = "";
                        product.images.forEach((image, imgIndex) => {
                            carouselItems += `
                        <div class="carousel-item ${imgIndex === 0 ? "active" : ""}">
                            <img src="${image}" class="d-block w-100" alt="Product Image">
                        </div>`;
                        });

                        rowHtml += `
                    <div class="container mt-5">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card shadow-lg p-3">
                                    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                            ${carouselItems}
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div>
                    
                                    <div class="card-body">
                                        <h4 class="card-title">${title}</h4>
                                        <h4 class="text-primary">Price: ${price}$</h4>
                                        <h4 class="text-primary">Tax: ${tax}$</h4>
                                        <p class="card-text">${description}</p>
                                        <span class="badge bg-secondary">Category: ${category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    });

                    $("#productResults").html(rowHtml); // Se coloca en el div correcto
                } else {
                    $("#productResults").html(`<div class="text-center text-danger">No products found.</div>`);
                }
            },
            error: function (error) {
                $("#productResults").html(`<div class="text-center text-danger">Error retrieving products.</div>`);
                console.log(error);
            }
        });
    }
    console.log(textValue);
});
