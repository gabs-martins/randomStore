import { CategoriesList, CategoriesListFilter} from "./Categories.js"
import {showProducts} from "./Card.js"
import { showSortFilters, sortProducts } from "./Sort.js"
import { Cart ,showCart, cartAdd} from "./Cart/Cart.js"


const getAllProducts = pieces =>{
  const productsList = []
  pieces.forEach(item=> {
    productsList.push(item)
  })
  return productsList
}

const getData =()=>{
  const url = fetch('https://fakestoreapi.com/products')
  
  url.then(response=>{
    if(!response.ok)
    throw new Error('get Data')
    return response.json()
  } )
  
  .then(items=>{
  const productsList = getAllProducts(items)
  showProducts(productsList)
  return productsList
})

.then(productsList => {
  const header = document.querySelector('header')
  header.addEventListener('change', () => {
    const filteredList = CategoriesListFilter(productsList)

    if ( filteredList.length > 0) {
       sortProducts(filteredList)
      }else{
        sortProducts(productsList)
      } 
    })
    return cartAdd(productsList)
  })
  
  .then(cartList =>{
    
    Cart(cartList)

  })
}

getData()
CategoriesList()
showSortFilters()
showCart()


