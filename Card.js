

const showProducts= productsList => {
  const list = document.querySelector('#list')
  list.classList.add('productsList')
  
  productsList.forEach(product=> {
    const li = document.createElement('li')
    li.classList.add('productsList__item')
    li.dataset.id = product.id
    
    const img = document.createElement('img')
    img.classList.add('productsList__img')
    
    img.src = product.image
    li.appendChild(img)

    const title = document.createElement('h3')
    title.classList.add('productsList__item__title')
    title.textContent = product.title
    li.appendChild(title)

    const price = document.createElement('p')
    price.classList.add('productsList__item__price')
    price.textContent = `$${(product.price).toFixed(2)}`
    li.appendChild(price)
    
    const cartButton = document.createElement('button')
    cartButton.setAttribute('id',"addCartBtn")
    cartButton.innerHTML =`Add to cart <i class="fa-solid fa-cart-shopping"></i>`
    li.appendChild(cartButton)
    

    
    
    list.appendChild(li)
  
  })
} 
export {showProducts}

