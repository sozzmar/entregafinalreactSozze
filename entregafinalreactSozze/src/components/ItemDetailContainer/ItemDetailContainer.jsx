import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById } from '../../data/asyncBenita'
import ItemDetail from '../ItemDetail/ItemDetail'
import { Flex } from '@chakra-ui/react'
import { FadeLoader } from 'react-spinners'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

const ItemDetailContainer = () => {
    const [ producto, setProducto ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const { productId } = useParams()
    const navigate = useNavigate() 

    useEffect(() => {

        const getData = async () => {
            
            const queryRef = doc(db, 'productos', productId)
            
            const response = await getDoc(queryRef)
            
            const newItem = {
                ...response.data(),
                id: response.id
            }
            setProducto(newItem)
            setLoading(false)
        }
        getData()


        /*getProductById(productId)
        .then ((data) => {
            if (!data) {
                navigate('/*')
            }else{
               setProducto(data)
            }
        })

        .catch ((error) => console.log(error))
        .finally(()=> setLoading(false))
*/
    },[])

    return (
        <>
              {
                loading ? 
                <Flex justify={'center'} align={'center'} h={'90vh'}>

                    <FadeLoader color="#36d7b7" />            
                </Flex>
                : 
                <>
                <Flex justify={'center'} align={'center'} h={'70vh'}>
                <ItemDetail {...producto} />
                </Flex>
                </>
            }
        </>
    )
}

export default ItemDetailContainer