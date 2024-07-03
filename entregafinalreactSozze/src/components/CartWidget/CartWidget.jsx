import { Box } from '@chakra-ui/react';
import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri";

const CartWidget = () => {
  return (
    <Box margin={4}>
      <RiShoppingCartLine />
    </Box>
  )
}

export default CartWidget
