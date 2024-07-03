import React from 'react'
import Item from '../Item/Item'
import { Box, Flex } from '@chakra-ui/react'

const ItemList = ({products}) => {
  return (
    <Flex wrap={'wrap'} justify={'center'} align={'center'} mt={5} mb={5}>
      {products.map((el) => (
        <Box key={el.id} m={2}>
            <Item {...el} />
        </Box>
      ))}
    </Flex>
  )
}

export default ItemList




/*import React from 'react'
/*import { Box } from '@chakra-ui/react';

const ItemList = ({products}) => {
  
  
    return (
    <div>
        {
            products.map((prod) => (
                < Box key = {prod.id}>
                    < Item {...prod}/>
                </Box>
            ))
        }
    </div>
  )
}

export default ItemList*/
