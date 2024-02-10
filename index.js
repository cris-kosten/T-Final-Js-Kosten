// header con bootstrap
const modal = new bootstrap.Modal('#modalCarrito', {});

//button carrito en el header
const btnModalCarrito = document.querySelector('#btnModalCarrito');

//le indicamos un Number de elementos q contiene el carro ( 0 )
const cartCount = document.querySelector('#cartCount');

// suma total de los productos !
const cartSum = document.querySelector('#cartSum');

// barra de busqueda
const inputSearch = document.querySelector('#inputSearch');

//contenedor div de productos
const listProducts = document.querySelector('#listProducts');

//
const selectCategory = document.querySelector('#selectCategory');

// contenido del elemento producto
const modalListProducts = document.querySelector('#modalListProducts');

// finalizar o cerrar el carro
const btnClose = document.querySelector('#btnClose');

//comprar o seleccionar los productos
const btnSave = document.querySelector('#btnSave');

//
const btnOrder = document.querySelector('#btnOrder');

//de este modo al actualizar la pag los elementos seleccionados quedan guardado en el carrito
const listCart = JSON.parse(localStorage.getItem('cart') ) || [];

// carrito de compras
const cart = new Cart(listCart);

//muestra l cantidad de productos q poseemos en el carrito
cartCount.innerText = cart.getCount();

// button carrito ! seleccion u agregar
btnModalCarrito.addEventListener('click', function(){
    const list = cart.getProducts();
    redenCart(list );

    cartSum.innerText = cart.getSum();
    modal.show();// con show lo abris 
});

btnSave.addEventListener('click', () => {

    modal.hide();
    Swal.fire({
        imageUrl: "./img/logo.jpg",
        imageWidth: 125,
        imageHeight: 125,
        imageAlt: "Logo",
        title: "Tienda Coder",
        text: "Compra Realizada con Exito",
        icon: "success",
        confirmButtonText: 'Gracias por Elegirnos'
    });

    localStorage.removeItem('cart');
} )


btnClose.addEventListener('click', () => {
    modal.hide();// con Hide lo cerras 
});

// ------------------ trabajamos con la barra de BUSCAR/BUSCADOR -------------//
inputSearch.addEventListener('input', (event) =>{

    const search = event.target.value; // inputSearch.value
    //busca las palabras relacionadas con nuestro producto!
    const newList= products.filter(  (product) => product.name.toLowerCase().includes(search.toLowerCase () ));

    renderProducts(newList);
    
});

// -------------------Trabajamos con el btnOrder / ordenas la lista -----------------//
// ------ ordenando de menor a mayor precio
btnOrder.addEventListener('click', () =>{
    console.log('Ordenando los cursos de menor a mayor precio');
    
    products.sort(  ( a, b) =>{
        // ordenamos los precios de menor a mayor !! 
        if( a.price < b.price ){
            return -1            
        }
        if( a.price > b.price){
            return 1
        }

        return 0;
    })
    //Ordenamos de menor a mayor precio los productos de la pagina!!!
    renderProducts(products); 
    btnOrder.setAttribute('disabled' ,true);
})


//recibe la lista de productos y la recorre y las renderizas------//
const renderProducts =(list)=> {

    listProducts.innerHTML= '';

    list.forEach(product =>{
        listProducts.innerHTML += //html
        `<div class="col-sm-4 col-md-3   ">
            <div class="card p-2">
                <h4>${product.name}</h4>
                <img class="img-fluid" src="${product.img}" alt="${products.name}">
                <h3 class="text-center">$${product.price}</h3>
                <button id="${product.id}" type="button" class="btn btn-primary btnAddCart">
                    <i class="fa-solid fa-cart-plus"></i> Agregar Curso
            </button>
        </div>
    </div>`
    })

//agrego el escuchador de eventos a los botones
    const btns = document.querySelectorAll('.btnAddCart');
    
    btns.forEach(btn =>{
        //cada vez que el usuario hace click
        btn.addEventListener('click', addToCart);
    });

}

//carrito
const addToCart = (e )=> {
    //la funcion target especifica desde donde le estamos dando click
    
    const id = e.target.id;
    
    // buscamos el producto y al dar click nos brinda toda la informacion del elemento
    const product = products.find(  item => item.id == id);
    console.table(product); // muestra el producto con su contenido

    // mostramos la cantidad d elementos del carro
    cart.addToCart(product);
    cartCount.innerText = cart.getCount();

    // ejemplos de librerias toastify
    /*Toastify({
        text: "Hi",
        duration: 4500,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        gravity: "top",
        position: 'left',
    }).showToast();*/

    //libreria toastify
    Toastify({
        text: "Producto Agregado al Carrito",
        
        duration: 3500,
        gravity: 'bottom',
        position: 'right',
        close: true,
        style: {
            background: "linear-gradient(to right, #560e86, #0a0011)",
        },
        
        }).showToast();
    
}   
const redenCart = ( list ) => {
    modalListProducts.innerHTML = '';
    list.forEach( product =>{
        modalListProducts.innerHTML += //html
        `<tr>
                <th>${product.name}</th>
                <th>${product.duracion}</th>
                <th>${product.modalidad}</th>
                <th>${product.stock}</th>
                <th>$${product.price * product.stock}</th>
        </tr>`
    });
}
renderProducts( products);

// ------------------ trabajamos con la barra de BUSCAR/BUSCADOR -------------//
