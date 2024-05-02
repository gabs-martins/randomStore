let cartList = []

const cartAdd = productsList=>{
  const list = document.querySelector('#list')
  list.addEventListener('click', e=>{

    if(e.target.id === 'addCartBtn'){
      const id = e.target.parentElement.dataset.id
      const product = productsList.find(item => item.id == id)
      const isProductOnList = cartList.some(item=>item.id == id)
      const idexOfProduct = cartList.findIndex(item=>item.id == id)

      if(!isProductOnList){
        cartList.push({
          ...product,
          qnt: 1
        })
      }else{
        cartList[idexOfProduct].qnt++
      }
      Cart(cartList)      
      saveCartToStorage(cartList)
    }
  })

  return cartList
}


const Cart = productsList=>{
  getTotalItens(productsList)
  getCartTotal(productsList)

  const cartList = document.querySelector('#cart__list')
  
  cartList.innerHTML = ''
  
  productsList.forEach(product=> {
    const li = document.createElement('li')
    li.classList.add('cart__listItem')
    li.dataset.id = product.id
    
    const img = document.createElement('img')
    img.src = product.image
    img.width =100
    img.height = 100
    
    li.appendChild(img)
    
    const cartDescriptionDiv = document.createElement('div')
    cartDescriptionDiv.classList.add('cart__description')
    
    const title = document.createElement('h3')
    title.textContent = product.title
    cartDescriptionDiv.appendChild(title)
    
    const p = document.createElement('p')
    p.textContent = product.category
    cartDescriptionDiv.appendChild(p)

    const price = document.createElement('p')
    price.textContent = `$ ${(product.price).toFixed(2)}` 
    cartDescriptionDiv.appendChild(price)
    
    li.appendChild(cartDescriptionDiv)
    

    const counterContainer = document.createElement('div')
    counterContainer.classList.add('cart__listItem__counter__container')    
    
    const plusBtn = document.createElement('button')
    plusBtn.classList.add('btnCount', 'btnPlus')
    plusBtn.addEventListener('click',()=>{product.qnt++; Cart(productsList)})
    plusBtn.innerHTML =`<i class="fa-solid fa-plus" ></i>`
    counterContainer.appendChild(plusBtn)
    
    const counterP = document.createElement('span')

    counterP.innerHTML = `${product.qnt}`
    counterContainer.appendChild(counterP)
    
    const minusBtn = document.createElement('button')
    minusBtn.classList.add('btnCount', 'btnMinus')
    
    minusBtn.addEventListener('click', () => {
      if (product.qnt > 1) {
          product.qnt--
          Cart(productsList)
          saveCartToStorage(productsList)
      } else {
          const idArray = minusBtn.parentElement.parentElement.dataset.id;
          const index = productsList.findIndex(item=>item.id == idArray)
          productsList.splice(index, 1)
          Cart(productsList)
          saveCartToStorage(productsList)
      }
      cartToggle()
  });
  

    minusBtn.innerHTML =`<i class="fa-solid fa-minus"></i>`
    counterContainer.appendChild(minusBtn)
    
    li.appendChild(counterContainer)

    cartList.appendChild(li)
    
  })}    
  
  const showCart = ()=>{
  const cart = document.querySelector('aside')
  
  const cartBtn = document.querySelector('#cartBtn')
  
  cartBtn.addEventListener('click',()=>{
  if(cartList.length>0){
      cart.classList.add('cart-active')
      cartToggle()
    }else{
      alert('Cart is empty!')
    }
  })
  
  const closeCartBtn = cart.querySelector('button')
  closeCartBtn.addEventListener('click',()=>{
    cart.classList.remove('cart-active')
    cartToggle()
  })
}

const getTotalItens = list =>{
  
  const cart = document.querySelector('aside')
  let totalItens = 0
  list.forEach(item =>totalItens += item.qnt)
  const cartInnnerQnt = document.querySelector('#cart__quantity')
  const cartOuterQnt = document.querySelector('.item-count')
  cartInnnerQnt.innerHTML = `you have ${totalItens} itens in your cart list`
  cartOuterQnt.innerHTML = totalItens

  if (totalItens === 0){
    cart.classList.remove('cart-active')
  }
}

const getCartTotal = list => {
  const priceP = document.querySelector('#cart__total')
  let total = 0
  list.forEach(item=>total += item.qnt * item.price)
  priceP.innerHTML = total.toFixed(2)
}

const cartToggle = ()=>{
  const list = document.querySelector('#list')
  const cart = document.querySelector('.cart')
  if(cart.classList.contains('cart-active')){
    list.style.display = 'none'
  }else{
    list.style.display = 'grid'
  }
}

const saveCartToStorage = cartArr=>localStorage.setItem('cart', JSON.stringify(cartArr))

const getCartFromStorage = ()=>{
 if (localStorage.getItem('cart')){
  cartList = JSON.parse(localStorage.getItem('cart'))
  Cart(cartList)
 } 
}

window.addEventListener('load',()=>getCartFromStorage())


export {cartAdd, Cart, showCart}



