import { showProducts } from "./Card.js"

 const CategoriesList = ()=>{
  const select = document.querySelector('#categories')
fetch('https://fakestoreapi.com/products/categories')
  .then(res=>res.json())
  .then(categoriesList=>{
    categoriesList.unshift('All')
    const category = categoriesList.map(category=>`<option>${category}</option>`)
    select.innerHTML= category.join('')
  })
  .catch(e=>console.error(e.message))}

const CategoriesListFilter = productsList =>{
  const select = document.querySelector('#categories')
  const filteredList = productsList.filter(
    product=>product.category === select.value
  )
  const list = document.querySelector('#list')
  list.innerHTML = ''

  if(select.value ==='All'){
    showProducts(productsList)
  }
  showProducts(filteredList)

  return filteredList
}


export { CategoriesList, CategoriesListFilter}