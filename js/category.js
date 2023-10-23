
// let productsData;
fetch(productApi)
    .then(response => response.json()) 
    .then((products) => {
        productData = products;
        var container = document.getElementById('body');
        var htmls = '';
        products.forEach((element) => {
            htmls += `
            <div class="col-sm-3" id="item-${element.id}" onclick="transferPage(${element.id})" >
            <img class="mb-3" src="${element.img.url}" alt="">
            <p class="mb-1">${element.name}</p>
            <span class="star">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <p>${element.price}</p>
          </div>
        `;
        });
        container.innerHTML = htmls;
    });
// Show size
// window.localStorage.setItem('category','T-shirts');

checkFilter();
function checkFilter(){
  let category = window.localStorage.getItem('category');
  if (category) {
    filterByCategory(category)
  }
}
checkBrand();
function checkBrand(){
  let category = window.localStorage.getItem('category');
  if (category) {
    filterByBrand(category)
  }
}

// Lọc sản phẩm
 function filterByCategory(categoryName){
    fetch(productApi)
    .then(response => response.json()) 
    .then((products) => {
        var container = document.getElementById('body');
        var htmls = '';
        products.filter((element)=>element.category===categoryName).forEach((element) => {
            htmls += `
            <div class="col-sm-3" id="item-${element.id}" onclick="transferPage(${element.id})">
                <img class="mb-3" src="${element.img.url}" alt="">
                <p class="mb-1">${element.name}</p>
                <span class="star">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <p>${element.price}</p>
            </div>
        `;
        });
        container.innerHTML = htmls;
    });
    localStorage.removeItem('category');
 }



 // Lọc Brand
function filterByBrand(categoryBrand){
  fetch(productApi)
  .then(response => response.json()) 
  .then((products) => {
    
      var container = document.getElementById('body');
      var htmls = '';
      products.filter((element)=>element.brand===categoryBrand).forEach((element) => {
          htmls += `
          <div class="col-sm-3" id="item-${element.id}" onclick="transferPage(${element.id})">
              <img class="mb-3" src="${element.img.url}" alt="">
              <p class="mb-1">${element.name}</p>
              <span class="star">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <p>${element.price}</p>
          </div>
      `;
      });
      container.innerHTML = htmls;
  });
}



 // Lọc màu
var colorRadios = document.querySelectorAll('input[name="color"]');
colorRadios.forEach((radio) => {
  radio.addEventListener('change', function() {
    var selectedColor = this.value;
    fetch(productApi)
      .then(response => response.json())
      .then((products) => {
        var container = document.getElementById('body');
        var htmls = '';
        products.filter((element) => element.img.color === selectedColor).forEach((element) => {
          htmls += `
            <div class="col-sm-3" id="item-${element.id}" onclick="transferPage(${element.id})">
              <img class="mb-3" src="${element.img.url}" alt="">
              <p class="mb-1">${element.name}</p>
              <span class="star">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <p>${element.price}</p>
            </div>
          `;
        });
        container.innerHTML = htmls;
      });
  });
});



// Lọc Size
function filterBySize() {
  var checkboxes = document.getElementsByName("size");
  var selectedSizes = [];

  // Nhận kích thước đã chọn
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedSizes.push(checkbox.value);
    }
  });

  fetch(productApi)
    .then(response => response.json())
    .then((products) => {
      var container = document.getElementById('body');
      var htmls = '';

      // Lọc sản phẩm dựa trên kích thước đã chọn hoặc hiển thị tất cả sản phẩm nếu không chọn kích thước
      var filteredProducts = selectedSizes.length > 0 ? products.filter((element) =>
        element.size.join('').includes(selectedSizes.join(''))) : products;
      console.log(products[0].size.includes(["S"]));
      // console.log(products[0].size,[""]);
      // Tạo HTML cho các sản phẩm được lọc
      filteredProducts.forEach((element) => {
        htmls += `
          <div class="col-sm-3" id="item-${element.id}" onclick="transferPage(${element.id})">
            <img class="mb-3 img" src="${element.img.url}" alt="">
            <p class="mb-1">${element.name}</p>
            <span class="star">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <p>${element.price}</p>
          </div>
        `;
      });

      container.innerHTML = htmls;
    });
}


// Show product_detail
function transferPage(id) {
    window.location.href = 'product_detail.html'
    window.localStorage.setItem('itemID', id);
}


// function animateImage(event) {
//   event.currentTarget.querySelector('img').classList.add('image-animation');
// }

// function resetImage(event) {
//   event.currentTarget.querySelector('img').classList.remove('image-animation');
// }





 

 

