import React, { useContext, useState } from 'react'
import Context from '../../context/CartContex'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Center,
    Heading,
    Button,

  } from '@chakra-ui/react'
import { Timestamp, addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        repeatedEmail: '',
        phone: ''
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const { cart, getTotal, clearCart } = useContext(Context);
    const navigate = useNavigate();

    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!user.name) {
            errors.name = 'Tenés que agregar un nombre';
        } else if (user.name.length < 4) {
            errors.name = 'El nombre debe tener al menos 4 caracteres';
        }

        if (!user.email) {
            errors.email = 'Tenés que agregar un email';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'El email no es válido';
        }

        if (!user.repeatedEmail) {
            errors.repeatedEmail = 'Tenés que repetir el email';
        } else if (user.email !== user.repeatedEmail) {
            errors.repeatedEmail = 'Los emails no coinciden';
        }

        if (!user.phone) {
            errors.phone = 'Tenés que agregar un numero de telefono';
        } else if (user.phone.length < 8) {
            errors.phone = 'El numero de telefono debe contener al menos 8 caracteres';
        }

        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const getOrder = async () => {
        if (!validateForm()) {
            console.log("Error en validación de formulario:", error);
            return;
        }

        if (cart.length === 0) {
            Swal.fire({
                title: "Carrito vacío",
                text: `No podes generar la orden con el carrito vacío`,
                icon: "error",
                confirmButtonText: "Aceptar",
            }).then(() => {
                navigate('/');
            });
            return;
        }

        const coleccion = collection(db, 'orders');
        try {
            for (const item of cart) {
                const docRef = doc(db, 'productos', item.id);
                const productDoc = await getDoc(docRef);

                if (productDoc.exists()) {
                    const currentStock = productDoc.data().stock;
                    console.log("Stock actual del producto:", currentStock);

                    if (currentStock >= item.quantity) {
                        await updateDoc(docRef, {
                            stock: currentStock - item.quantity
                        });
                    } else {
                        Swal.fire({
                            title: "Producto sin stock suficiente",
                            text: `No hay suficiente stock del producto ${item.nombre}`,
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                        return;
                    }
                } else {
                    Swal.fire({
                        title: "Error",
                        text: `El producto ${item.nombre} no existe en la base de datos`,
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                    return;
                }
            }

            const order = {
                buyer: user,
                cart: cart,
                total: getTotal(),
                fecha: Timestamp.now()
            };

            const orderRef = await addDoc(coleccion, order);

            Swal.fire({
                title: "Gracias por tu compra",
                text: `El número de orden es: ${orderRef.id}`,
                icon: "success",
                confirmButtonText: "Ir al inicio",
            }).then(() => {
                clearCart();
                navigate('/');
            });
        } catch (error) {
            console.log("Error inesperado:", error);
            Swal.fire({
                title: "Error",
                text: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }
    };

    return (
        <Center mt={10}>
            <Flex direction={'column'} align={'center'} justify={'center'}>
                <Heading>Datos de facturación</Heading>
                <Flex w={'100%'} justify={'center'} align={'center'}>
                    <FormControl isInvalid={Object.keys(error).length > 0}>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                            type='text'
                            name='name'
                            placeholder='Germán Piccoli'
                            onChange={updateUser}
                        />
                        {error.name && <FormErrorMessage>{error.name}</FormErrorMessage>}
                        
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            name='email'
                            placeholder='Germánpiccoli@coderhouse.com'
                            onChange={updateUser}
                        />
                        {error.email && <FormErrorMessage>{error.email}</FormErrorMessage>}

                        <FormLabel>Repetir email</FormLabel>
                        <Input
                            type='email'
                            name='repeatedEmail'
                            placeholder='Germánpiccoli@coderhouse.com'
                            onChange={updateUser}
                        />
                        {error.repeatedEmail && <FormErrorMessage>{error.repeatedEmail}</FormErrorMessage>}

                        <FormLabel>Teléfono</FormLabel>
                        <Input
                            type='text'
                            name='phone'
                            placeholder='11223344'
                            onChange={updateUser}
                        />
                        {error.phone && <FormErrorMessage>{error.phone}</FormErrorMessage>}
                    </FormControl>
                </Flex>
                <Button mt={5} onClick={getOrder} isLoading={loading}>
                    Finalizar compra
                </Button>
            </Flex>
        </Center>
    );
};

export default Checkout;


























/*const Checkout = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        repeatedEmail: '',
        phone: ''
    });
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const { cart, getTotal, clearCart } = useContext(Context);
    const navigate = useNavigate();

    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!user.name) {
            errors.name = 'Tenés que agregar un nombre';
        } else if (user.name.length < 4) {
            errors.name = 'El nombre debe tener al menos 4 caracteres';
        }

        if (!user.email) {
            errors.email = 'Tenés que agregar un email';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'El email no es válido';
        }

        if (!user.repeatedEmail) {
            errors.repeatedEmail = 'Tenés que repetir el email';
        } else if (user.email !== user.repeatedEmail) {
            errors.repeatedEmail = 'Los emails no coinciden';
        }

        if (!user.phone) {
            errors.phone = 'Tenés que agregar un numero de telefono';
        } else if (user.phone.length < 8) {
            errors.phone = 'El numero de telefono debe contener al menos 8 caracteres';
        }

        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const getOrder = async () => {
        if (!validateForm()) {
            console.log("Error en validación de formulario:", error);
            return;
        }

        if (cart.length === 0) {
            Swal.fire({
                title: "Carrito vacío",
                text: `No podes generar la orden con el carrito vacío`,
                icon: "error",
                confirmButtonText: "Aceptar",
            }).then(() => {
                navigate('/');
            });
            return;
        }

        const coleccion = collection(db, 'orders');
        try {
            for (const item of cart) {
                const docRef = doc(db, 'productos', item.id);
                const productDoc = await getDoc(docRef);

                const currentStock = productDoc.data().stock;
                console.log("Stock actual del producto:", currentStock);

                if (currentStock >= item.quantity) {
                    await updateDoc(docRef, {
                        stock: currentStock - item.quantity
                    });
                } else {
                    Swal.fire({
                        title: "Producto sin stock suficiente",
                        text: `No hay suficiente stock del producto ${item.nombre}`,
                        icon: "error",
                        confirmButtonText: "Aceptar",
                    });
                    return;
                }
            }

            const order = {
                buyer: user,
                cart: cart,
                total: getTotal(),
                fecha: Timestamp.now()
            };

            const orderRef = await addDoc(coleccion, order);

            Swal.fire({
                title: "Gracias por tu compra",
                text: `El número de orden es: ${orderRef.id}`,
                icon: "success",
                confirmButtonText: "Ir al inicio",
            }).then(() => {
                clearCart();
                navigate('/');
            });
        } catch (error) {
            console.log("Error inesperado:", error);
            Swal.fire({
                title: "Error",
                text: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }
    };

    return (
        <Center mt={10}>
            <Flex direction={'column'} align={'center'} justify={'center'}>
                <Heading>Datos de facturación</Heading>
                <Flex w={'100%'} justify={'center'} align={'center'}>
                    <FormControl isInvalid={Object.keys(error).length > 0}>
                        <FormLabel>Nombre</FormLabel>
                        <Input
                            type='text'
                            name='name'
                            placeholder='Germán Piccoli'
                            onChange={updateUser}
                        />
                        {error.name && <FormErrorMessage>{error.name}</FormErrorMessage>}
                        
                        <FormLabel>Email</FormLabel>
                        <Input
                            type='email'
                            name='email'
                            placeholder='Germánpiccoli@coderhouse.com'
                            onChange={updateUser}
                        />
                        {error.email && <FormErrorMessage>{error.email}</FormErrorMessage>}

                        <FormLabel>Repetir email</FormLabel>
                        <Input
                            type='email'
                            name='repeatedEmail'
                            placeholder='Germánpiccoli@coderhouse.com'
                            onChange={updateUser}
                        />
                        {error.repeatedEmail && <FormErrorMessage>{error.repeatedEmail}</FormErrorMessage>}

                        <FormLabel>Teléfono</FormLabel>
                        <Input
                            type='text'
                            name='phone'
                            placeholder='11223344'
                            onChange={updateUser}
                        />
                        {error.phone && <FormErrorMessage>{error.phone}</FormErrorMessage>}
                    </FormControl>
                </Flex>
                <Button mt={5} onClick={getOrder} isLoading={loading}>
                    Finalizar compra
                </Button>
            </Flex>
        </Center>
    );
};

export default Checkout;








/*
const Checkout = () => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        repeatedEmail: '',
        phone: ''
    });
    const [ error, setError ] = useState({});
    const [ loading, setLoading ] = useState(false);

    const { cart, getTotal, clearCart } = useContext(Context);
    const navigate = useNavigate();

    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }));
    }

    const validateForm = () => {
        const errors = {};
        if(!user.name) {
            errors.name = 'Tenés que agregar un nombre'; 
        } else if(user.name.length < 4) {
            errors.name = 'El nombre debe tener al menos 4 caracteres';
        }
        
        if(!user.email){
            errors.email = 'Tenés que agregar un email';
        } else if(!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'El email no es válido';
        }

        if(!user.repeatedEmail){
            errors.repeatedEmail = 'Tenés que repetir el email';
        } else if(user.email !== user.repeatedEmail) {
            errors.repeatedEmail = 'Los emails no coinciden';
        }

        if(!user.phone){
            errors.phone = 'Tenés que agregar un numero de telefono';
        } else if(user.phone.length < 8) {
            errors.phone = 'El numero de telefono debe contener al menos 8 caracteres';
        }

        setError(errors);
        return Object.keys(errors).length === 0;
    }

    const getOrder = async () => {
        if(!validateForm()){
            return;
        }

        if(cart.length ===0){
            Swal.fire({
                title: "Carrito vacio",
                text: `no podes generar la orden con el carrito vacio`,
                icon:"error",
                confirmButtonText: "Aceptar",
            }).then(() => {
                navigate('/');
            });
            return;
        }

        const coleccion = collection(db, 'orders');
        try {
            for(const item of cart) {
                const docRef = doc(db, 'productos', item.id);
                const productDoc = await getDoc(docRef);

                const currentStock = productDoc.data().stock;
                console.log(currentStock);

                if (currentStock >= item.quantity) {
                    await updateDoc(docRef, {
                        stock: currentStock - item.quantity
                    });
                } else {
                    Swal.fire({
                        title: "Producto sin stock suficiente",
                        text: `No hay suficiente stock del producto ${item.nombre}`,
                        icon:"error",
                        confirmButtonText: "Aceptar",
                    });
                    return;
                }
            }

            const order = {
                buyer: user,
                cart: cart,
                total: getTotal(),
                fecha: Timestamp.now()
            };

            const orderRef = await addDoc(coleccion, order);

            Swal.fire({
                title: "Gracias por tu compra",
                text: `El número de orden es: ${orderRef.id}`,
                icon: "success",
                confirmButtonText: "Ir al inicio",
            }).then(() => {
                clearCart();
                navigate('/');
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Error",
                text: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }
    }

    console.log(error);

    return (
        <Center mt={10}>
            <Flex direction={'column'} align={'center'} justify={'center'}>
                <Heading>Datos de facturación</Heading>
                <Flex w={'100%'} justify={'center'} align={'center'}>
                    <FormControl>
                        <FormLabel>Nombre</FormLabel>
                        <Input 
                            type='text' 
                            name='name'
                            placeholder='Germán Piccoli'
                            onChange={updateUser}
                        />
                        {error.name && <FormErrorMessage>{error.name}</FormErrorMessage>}
                        
                        <FormLabel>Email</FormLabel>
                        <Input 
                            type='email' 
                            name='email'
                            placeholder='Germánpiccoli@coderhouse.com'
                            onChange={updateUser}
                        />
                        {error.email && <FormErrorMessage>{error.email}</FormErrorMessage>}

                        <FormLabel>Repetir email</FormLabel>
                        <Input 
                            type='email' 
                            name='repeatedEmail'
                            placeholder='Germánpiccoli@coderhouse.com'
                            onChange={updateUser}
                        />
                        {error.repeatedEmail && <FormErrorMessage>{error.repeatedEmail}</FormErrorMessage>}

                        <FormLabel>Teléfono</FormLabel>
                        <Input 
                            type='text' 
                            name='phone'
                            placeholder='11223344'
                            onChange={updateUser}
                        />
                        {error.phone && <FormErrorMessage>{error.phone}</FormErrorMessage>}
                    </FormControl>
                </Flex>
                <Button mt={5} onClick={getOrder}>
                    Finalizar compra
                </Button>
            </Flex>
        </Center>
    );
}

export default Checkout;







/*import React, { useContext, useState } from 'react'
import Context from '../../context/CartContex'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Flex,
    Center,
    Heading,
    Button,

  } from '@chakra-ui/react'
import { Timestamp, addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


const Checkout = () => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        repeatedEmail: '',
        phone: ''
    })
    const [ error, setError ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const { cart, getTotal, clearCart } = useContext(Context)
    const navigate = useNavigate()
    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))
    }

    const validateForm = () => {
        const errors = {}
        if(!user.name) {
            errors.name = 'Tenés que agregar un nombre' 
        }else if(user.name.length < 4) {
            errors.name = 'El nombre debe tener al menos 4 caracteres'
        }
        
        if(!user.email){
            errors.email = 'Tenés que agregar un email'
        }else if(!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'El email no es válido'
        }

        if(!user.repeatedEmail){
            errors.repeatedEmail = 'Tenés que repetir el email'
        }else if(user.email !== user.repeatedEmail) {
            errors.repeatedEmail = 'Los emails no coinciden'
        }

        if(!user.phone){
            errors.phone = 'Tenés que agregar un numero de telefono'
        }else if(user.phone.length < 8) {
            errors.phone = 'El numero de telefono debe contener al menos 8 caracteres'
        }

        setError(errors)
        return Object.keys(errors).length === 0

    }

    const getOrder = async () => {
        if(!validateForm()){
            return
        }

        if(cart.length ===0){
            Swal.fire ({
                title: "Carrito vacio",
                text: `no podes generar la orden con el carrito vacio`,
                icon:"error",
                confirmButtonText: "Aceptar",
            }).then(()=> {
                navigate('/')
            });
            return
        }





        const coleccion = collection(db, 'orders')
        try {
            for(const item of cart) {
                const docRef = doc(db, 'productos', item.id)
                const productDoc = await getDoc(docRef)

                const currentStock = productDoc.data().stock
                console.log(currentStock)

                if (currentStock >= item.quantity) {
                    await updateDoc(docRef,{
                        stock: currentStock - item.quantity
                    });
                }else{
                    Swal.fire ({
                        title: "Producto sin stock suficiente",
                        text: `No hay suficiente sock del producto ${item.nombre}`,
                        icon:"error",
                        confirmButtonText: "Aceptar",
                                   });


                                   
                                   return;
            }
            
        }
        


        catch (error) {
            console.error('Error inesperado:', error);
            Swal.fire({
                title: "Error",
                text: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.',
                icon: "error",
                confirmButtonText: "Aceptar",
            });
            return;
        }






            const order = {
                buyer: user,
                cart: cart,
                total: getTotal(),
                fecha: Timestamp.now()
            }
        

            const orderRef = await addDoc(coleccion, order)

            Swal.fire({
                title: "Gracias por tu compra",
                text: `El número de orden es: ${orderRef.id}`,
                icon: "success",
                confirmButtonText: "Ir al inicio",
              }).then(() => {
                 clearCart()
                 navigate('/')
              });
        } catch (error) {
            console.log(error)
        }

    }

    console.log(error)
  return (
    <Center mt={10}>
        <Flex direction={'column'} align={'center'} justify={'center'}>

            <Heading>Datos de facturación</Heading>
            <Flex w={'100%'} justify={'center'} align={'center'}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input 
                        type='text' 
                        name='name'
                        placeholder='Germán Piccoli'
                        onChange={updateUser}
                        />
                    {error.name}
                    <FormErrorMessage>{error.name}</FormErrorMessage>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        type='email' 
                        name='email'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                        {error.email}
                    <FormLabel>Repetir email</FormLabel>
                    <Input 
                        type='email' 
                        name='repeatedEmail'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                    <FormLabel>Teléfono</FormLabel>
                    <Input 
                        type='text' 
                        name='phone'
                        placeholder='11223344'
                        onChange={updateUser}
                        />
                </FormControl>
            </Flex>
            <Button mt={5} onClick={getOrder}>
                Finalizar compra
            </Button>
        </Flex>
    </Center>
  )
}

export default Checkout







/*
            const orderRef = await addDoc(coleccion, order)

            Swal.fire({
                title: "Gracias por tu compra",
                text: `El número de orden es: ${orderRef.id}`,
                icon: "success",
                confirmButtonText: "Ir al inicio",
              }).then(() => {
                 clearCart()
                 navigate('/')
              });
        } catch (error) {
            console.log(error)
        }

    }

    console.log(error)
  return (
    <Center mt={10}>
        <Flex direction={'column'} align={'center'} justify={'center'}>

            <Heading>Datos de facturación</Heading>
            <Flex w={'100%'} justify={'center'} align={'center'}>
                <FormControl isInvalid={Object.keys(error).length > 0}>
                    <FormLabel>Nombre</FormLabel>
                    <Input 
                        type='text' 
                        name='name'
                        placeholder='Germán Piccoli'
                        onChange={updateUser}
                        />
                    {error.name}
                    <FormErrorMessage>{error.name}</FormErrorMessage>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        type='email' 
                        name='email'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                        {error.email}
                    <FormLabel>Repetir email</FormLabel>
                    <Input 
                        type='email' 
                        name='repeatedEmail'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                    <FormLabel>Teléfono</FormLabel>
                    <Input 
                        type='text' 
                        name='phone'
                        placeholder='11223344'
                        onChange={updateUser}
                        />
                </FormControl>
            </Flex>
            <Button mt={5} onClick={getOrder}>
                Finalizar compra
            </Button>
        </Flex>
    </Center>
  )
}

export default Checkout





/*const Checkout = () => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        repeatedEmail: '',
        phone: ''
    })
    const [ error, setError ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const { cart, getTotal, clearCart } = useContext(Context)
    const navigate = useNavigate()
    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))
    }

    const validateForm = () => {
        const errors = {}
        if(!user.name) {
            errors.name = 'Tenés que agregar un nombre' 
        }else if(user.name.length < 4) {
            errors.name = 'El nombre debe tener al menos 4 caracteres'
        }
        
        if(!user.email){
            errors.email = 'Tenés que agregar un email'
        }else if(!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'El email no es válido'
        }


        setError(errors)
        return Object.keys(errors).length === 0

    }

    const getOrder = async () => {
        if(!validateForm()){
            return
        }

        const coleccion = collection(db, 'orders')
        try {
           
        
        
        
        const order = {
                buyer: user,
                cart: cart,
                total: getTotal(),
                fecha: Timestamp.now()
            }

            const orderRef = await addDoc(coleccion, order)

            Swal.fire({
                title: "Gracias por tu compra",
                text: `El número de orden es: ${orderRef.id}`,
                icon: "success",
                confirmButtonText: "Ir al inicio",
              }).then(() => {
                 clearCart()
                 navigate('/')
              });
        } catch (error) {
            console.log(error)
        }

    }

    console.log(error)
  return (
    <Center mt={10}>
        <Flex direction={'column'} align={'center'} justify={'center'}>

            <Heading>Datos de facturación</Heading>
            <Flex w={'100%'} justify={'center'} align={'center'}>
                <FormControl>
                    <FormLabel>Nombre</FormLabel>
                    <Input 
                        type='text' 
                        name='name'
                        placeholder='Germán Piccoli'
                        onChange={updateUser}
                        />
                    {error.name}
                    <FormErrorMessage>{error.name}</FormErrorMessage>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        type='email' 
                        name='email'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                        {error.email}
                    <FormLabel>Repetir email</FormLabel>
                    <Input 
                        type='email' 
                        name='repeatedEmail'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                    <FormLabel>Teléfono</FormLabel>
                    <Input 
                        type='text' 
                        name='phone'
                        placeholder='11223344'
                        onChange={updateUser}
                        />
                </FormControl>
            </Flex>
            <Button mt={5} onClick={getOrder}>
                Finalizar compra
            </Button>
        </Flex>
    </Center>
  )
}

export default Checkout*/

















/*const Checkout = () => {
    const [ user, setUser ] = useState({
        name: '',
        email: '',
        repeatedEmail: '',
        phone: ''
    })
    const [ error, setError ] = useState({})
    const [ loading, setLoading ] = useState(false)

    const { cart, getTotal, clearCart } = useContext(Context)
    const navigate = useNavigate()
    const updateUser = (event) => {
        setUser((user) => ({
            ...user,
            [event.target.name]: event.target.value
        }))
    }

    const validateForm = () => {
        const errors = {}
        if(!user.name) {
            errors.name = 'Tenés que agregar un nombre' 
        }else if(user.name.length < 4) {
            errors.name = 'El nombre debe tener al menos 4 caracteres'
        }
        
        if(!user.email){
            errors.email = 'Tenés que agregar un email'
        }else if(!/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = 'El email no es válido'
        }


        setError(errors)
        return Object.keys(errors).length === 0

    }

    const getOrder = async () => {
        if(!validateForm()){
            return
        }

        if (cart.length === 0) {
            Swal.fire ({
                title: "Carrito vacio",
                text: "No podes generar la orden con el carrito vacio",
                icon: "error",
                confirmButtonText: "Aceptar",
            
            })
                .then (() => {
                    navigate('/')
                }); {
            return}
        }


        const coleccion = collection(db, 'orders')
        try {
                for (const item of cart) {
                    const docRef =doc(db, 'productos',item.id )
                    const productDoc = getDoc(docRef)
                  
                    const currentStock = productDoc.data().stock
                    
                    if(currentStock >= item.quantity) {
                        await updateDoc(docRef, {
                            stock: currentStock - item.quantity
                        })
                    }else{
                        Swal.fire({
                            title: "Producto sin stock suficiente>",
                            text: `No hay suficiente stock del producto ${item.nombre}`,
                            icon: "error",
                            confirmButtonText: "Aceptar",
                    })
                }



            const order = {
                buyer: user,
                cart: cart,
                total: getTotal(),
                fecha: Timestamp.now()
            }

            const orderRef = await addDoc(coleccion, order)

            Swal.fire({
                title: "Gracias por tu compra",
                text: `El número de orden es: ${orderRef.id}`,
                icon: "success",
                confirmButtonText: "Ir al inicio",
              }).then(() => {
                 clearCart()
                 navigate ('/')
              });
        } catch (error) {
            console.log(error)
        }

    }

    console.log(error)
  return (
    <Center mt={10}>
        <Flex direction={'column'} align={'center'} justify={'center'}>

            <Heading>Datos de facturación</Heading>
            <Flex w={'100%'} justify={'center'} align={'center'}>
                <FormControl w={'100%'} isInvalid={Object.keys(error).length>0}>
                    <FormLabel>Nombre</FormLabel>
                    <Input 
                        type='text' 
                        name='name'
                        placeholder='Germán Piccoli'
                        onChange={updateUser}
                        />
                    {error.name}
                    <FormErrorMessage>{error.name}</FormErrorMessage>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        type='email' 
                        name='email'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                        {error.email}
                    <FormLabel>Repetir email</FormLabel>
                    <Input 
                        type='email' 
                        name='repeatedEmail'
                        placeholder='Germánpiccoli@coderhouse.com'
                        onChange={updateUser}
                        />
                    <FormLabel>Teléfono</FormLabel>
                    <Input 
                        type='text' 
                        name='phone'
                        placeholder='11223344'
                        onChange={updateUser}
                        />
                </FormControl>
            </Flex>
            <Button mt={5} onClick={getOrder}>
                Finalizar compra
            </Button>
        </Flex>
    </Center>
  )
}

export default Checkout*/