/*import { Box } from '@chakra-ui/react';
import React from 'react'
import { RiShoppingCartLine } from "react-icons/ri";

const CartWidget = () => {
  return (
    <Box margin={4}>
      <RiShoppingCartLine />
    </Box>
  )
}

export default <CartWidget>*/


import { Box, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { IoCartOutline } from "react-icons/io5";
import Context from '../../context/CartContex';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { getQuantity } = useContext(Context)

  return (
    <Flex m={2} justify={'center'} align={'center'}>
      <Link to='/cart'><IoCartOutline /></Link>
      <span>{ getQuantity() > 0 && getQuantity() }</span>
    </Flex>
  )
}

export default CartWidget
