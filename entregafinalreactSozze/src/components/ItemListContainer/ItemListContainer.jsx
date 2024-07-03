import { Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getProducts, getProductsByCategory } from '../../data/asyncBenita'
import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'
import { useParams } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'


const ItemListContainer = ({title}) => {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState (true)

  const {categoryId}=useParams()

 

  useEffect (() => {
    setLoading(true)
    const dataProductos = categoryId ? getProductsByCategory(categoryId):getProducts()
    dataProductos
    .then((data) => setProducts(data))
    .catch((error) => console.log(error))
    .finally (()=>setLoading(false))

    /*getProducts()
    .then((res) => setProducts(res))
    .catch((error) => console.log(error))*/
  },[categoryId])
  
  console.log(products)

    return (
      <Flex direction={'column'} justify={'center'} align={'center'}> 
      <Heading color={'#FCD7B6'} mt={10}>{title}</Heading>
     {
      loading ? 
      <Flex justify={'center'} align={'center'} height={'50vh'}>
      <FadeLoader />
      </Flex>
      : 
      <ItemList products={products}/>
     }
    </Flex>
  )
}

export default ItemListContainer



/*
import { Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import './ItemListContainer.css'
import { getProducts, getProductsByCategory } from '../../data/asyncBenita'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { PacmanLoader } from 'react-spinners'

const ItemListContainer = ({title}) => {
  const [ products, setProducts ] = useState([])
  const [ loading, setLoading ] = useState(true)


  useEffect(() => {
    setLoading(true)
    
    // ¿Cómo hacemos para traer todos los productos o por categorías?


    // ¿Qué dato necesitamos pasarle al array de dependencias?
  },[])

  return (
    <Flex direction={'column'} justify={'center'} align={'center'}> 
      <Heading color={'#FCD7B6'} mt={10}>{title}</Heading>
      {
        loading ? 
        <Flex justify={'center'} align={'center'} h={'50vh'}>
          <PacmanLoader color="#36d7b7" />
        </Flex>
        : 
        <ItemList products={products} />
      }
    </Flex>
  )
}

export default ItemListContainer
*/



