export const productos = [
    {
      id: 1,
      nombre: "Mate Argentina",
      precio: 8500,
      categoria: "Mates",
      stock: 5,
      descripcion:
        "Las remeras son pintados a mano.",
      img: "https://i.postimg.cc/dtmhGgg6/mateargentina.jpg",
    },
    {
      id: 2,
      nombre: "Cuenco",
      precio: 13000,
      categoria: "Cuencos",
      stock: 5,
      descripcion:
        "Cuenco de madera pintado a mano",
      img: "https://i.postimg.cc/rwZFJTj1/IMG-20240629-WA0019.jpg",
    },
    {
      id: 3,
      nombre: "Stikers Fútbol",
      precio: 8900,
      categoria: "Stikers",
      stock: 5,
      descripcion:
        "Stikers Messi Maradona.",
      img: "https://i.postimg.cc/bvGYV5VK/IMG-20240629-WA0025.jpg",
    },
    {
      id: 4,
      nombre: "Mate Maradona",
      precio: 9900,
      categoria: "Mates",
      stock: 5,
      descripcion:
        "Mate de madera pintado a mano",
      img: "https://i.postimg.cc/wM9pz4Fx/Screenshot-20240629-182449.png",
    },
    {
      id: 5,
      nombre: "Llaveros",
      precio: 14900,
      categoria: "Llaveros",
      stock: 5,
      descripcion:
        "Llaveros pintados a mano",
      img: "https://i.postimg.cc/MpHzX4wv/IMG-20240629-WA0022.jpg",
    },
  ];
  
  export const getProducts = () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(productos);
      }, 2000);
    });
  };
  
  export const getProductsByCategory = (category) => {
    return new Promise((res) => {
      const productosFiltrados = productos.filter(
        (prod) => prod.categoria === category
      );
      setTimeout(() => {
        res(productosFiltrados);
      }, 2000);
    });
  };
  
  export const getProductById = (id) => {
    return new Promise((res) => {
      const productoFiltrado = productos.find((prod) => prod.id === parseInt(id));
      setTimeout(() => {
        res(productoFiltrado);
      }, 2000);
    });
  };