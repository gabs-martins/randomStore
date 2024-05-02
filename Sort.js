import { showProducts } from "./Card.js"

  const showSortFilters = ()=>{
  const sortFilters = [
  'Price: Low to high',
  'Price: High to low',
  'A-Z',
  'Z-A'
]

 const sort= sortFilters.map(filter=>`<option>${filter}</option>`)

  const sortSelect = document.querySelector('#sortBy')
  sortSelect.innerHTML = sort
}



const sortProducts = productsList => {
  const sortFunctions ={
    'Price: Low to high':(a, b)=> a.price - b.price,
    'Price: High to low': (a,b)=> b.price - a.price,
    'A-Z': (a, b) => a.title.localeCompare(b.title),
    'Z-A': (a, b) => b.title.localeCompare(a.title)
  }

  const select = document.querySelector('#sortBy')
  

  const sorteredList = productsList.sort(sortFunctions[select.value])
  const list = document.querySelector('#list')
  list.innerHTML = ''
  showProducts(sorteredList)
}

export{showSortFilters, sortProducts}
