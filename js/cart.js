renderCart();
function renderCart() {
  const cartApi = 'http://localhost:3000/carts';
  let cartsData;
  var tbody = document.getElementById('product-body');
  const userId = JSON.parse(localStorage.getItem("userId"));
  let subtotal = 0;
  let discount = 0;
  let totalPrice = 0;

  
  fetch(cartApi)
    .then(response => response.json())
    .then(carts => {
      cartsData = carts;
      let productsData;
      let cart = carts.find(cart => cart.id === userId);
     
      fetch(productApi)
        .then(res => res.json())
        .then(products => {
          productsData = products;
          
          const htmls = cart.productsCart.map(element => {
            let product = productsData.find(item => item.id === element.productId);
            subtotal += parseInt(product.price) * parseInt(element.quantity);
            console.log(subtotal)

            
            return `
              <div class="row mt-4"> 
                <div class="col-5">
                  <img src="${product.img.url}" alt="T-shirt">
                </div>
                <div class="col-4">
                  <h3>${product.name}</h3>
                  <p>${element.size}</p>
                  <p>${element.color}</p>
                  <p>${product.price}</p>
                </div>
                <div class="col-3 flex-column">
                  <div class="icon-cart">
                    <i class="fas fa-trash trash-icon" style="color:red"></i>
                  </div>
                  <div class="nut">
                    <input class="plus is-form" type="button" value="+">
                    <input aria-label="quantity" class="input-qty" max="Số tối đa" min="Số tối thiểu" name="" type="number" value="${element.quantity}">
                    <input class="minus is-form" type="button" value="-">
                  </div>
                </div>
              </div>
              <hr>`;
          });
          discount = subtotal * 0.2;
          totalPrice = subtotal - discount;
          document.getElementById('subtotal').innerHTML = `$${subtotal}`;
          document.getElementById('discount').innerHTML = `$${discount}`;
          document.getElementById('totalPrice').innerHTML = `$${totalPrice}`;
          tbody.innerHTML = htmls.join(''); 
        });
    });
}