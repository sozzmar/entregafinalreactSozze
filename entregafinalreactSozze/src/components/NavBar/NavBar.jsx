import React from 'react'
import CartWidget from '../CartWidget/CartWidget'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Link as ChakraLink
  } from '@chakra-ui/react'
  import logo from '../../assets/logo.png'
  import { FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Flex 
        h={'22vh'} 
        w={'100%'} 
        justify={'space-between'} 
        align={'center'} 
        backgroundColor={'#55868C'}
        >
        <ChakraLink as={Link} width={'30%'} to='/'>
          <Image w={'60%'} src={logo}/>
        </ChakraLink>
        <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                Categorías
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to='/categorias/Mates'>Mates</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/categorias/Cuencos'>Cuencos</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/categorias/Stikers'>Stikers</Link>
              </MenuItem>
              <MenuItem>
                <Link to='/categorias/Llaveros'>Llaveros</Link>
              </MenuItem>
            </MenuList>
        </Menu>
        <CartWidget />
    </Flex>
  )
}

export default NavBar





/*import React from 'react'
import CartWidget from '../CartWidget/CartWidget'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Box,
    Button,
    Flex,
    Heading,
    Center,
  } from '@chakra-ui/react'
import { FaChevronDown } from "react-icons/fa";


const NavBar = () => {
  return (
    <Flex height={'10vh'} width={'100%'} justify={'space-between'} align={'Center'} backgroundColor={'#006d77'}>
        <Heading fontSize={'xl'} margin={4}>Logo</Heading>
        <Menu>
  <MenuButton as={Button} rightIcon={<FaChevronDown />}>
    Actions
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>
      <CartWidget/>
    </Flex>
  )
}

export default NavBar
*/