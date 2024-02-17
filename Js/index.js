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





//----------------------------------------------------------------------//

let carrito = {};

let products_list = [];

//de este modo al actualizar la pag los elementos seleccionados quedan guardado en el carrito
const listCart = JSON.parse(localStorage.getItem('cart') ) || [];

// carrito de compras
const cart = new Cart(listCart);


//muestra l cantidad de productos q poseemos en el carrito
cartCount.innerText = cart.getCount();

// button carrito ! seleccion u agregar
btnModalCarrito.addEventListener('click', function(){
    const list = cart.getProducts();

    cartSum.innerText = cart.getSum();
    redenCart(list );
    modal.show();// con show lo abris 
});
// Trabajamos en el carrito cuando Damos Aceptar la compra!
btnSave.addEventListener('click', () => {

    modal.hide();
    Swal.fire({
        
        width: '400px',
        background: '-webkit-radial-gradient(#560e86, #0a0011)',
        color: 'orange',
        imageUrl: "./img/logo.jpg",
        imageWidth: 125,
        imageHeight: 125,
        imageAlt: "Logo",
        title: "Tienda Coder",
        text: "Compra Realizada con Exito",
        icon: "success",
        confirmButtonText: 'Gracias por Elegirnos',
        iconColor: '#fff',
        confirmButtonColor: 'dodgerblue'
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
    const newList= products_list.filter(  (products) => products.name.toLowerCase().includes(search.toLowerCase () ));

    renderProducts(newList);
    
});

//----- categorias de la barra de busqueda --- //
selectCategory.addEventListener('change', (e) =>{
    const id_category = selectCategory.value;
    console.log('categoria', id_category);

    filtroCategoria ( id_category);
})

// -------------------Trabajamos con el btnOrder / ordenas la lista -----------------//
// ------ ordenando de menor a mayor precio


btnOrder.addEventListener('click', () =>{
    console.log('Ordenando los cursos de menor a mayor precio');
    
    products_list.sort(  ( a, b) =>{
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
    renderProducts(products_list); 
    btnOrder.setAttribute('disabled' ,true);
    
})
 //--------------------Filtramos la categoria de los cursos seleccionado ----------//
const filtroCategoria= ( id_category) => {
    const newList = products_list.filter ( (product) => product.id_category == id_category);
    renderProducts(newList);
    console.table(newList);
}

const renderProducts =(list)=> {
    listProducts.innerHTML= '';

    list.forEach(product =>{
        listProducts.innerHTML += //html
        `<div class="col-sm-4 col-md-3   ">
            <div class="card p-2">
                <h4>${product.name}</h4>
                <img class="img-fluid" src="${product.img}" alt="${product.name}">
                <h3 class="text-center">$${product.price}</h3>
                <button id="${product.id}" type="button" class="btn btn-primary btnAddCart">
                    <i class="fa-solid fa-cart-plus"></i> Agregar Curso
            </button>
            
        </div>
    </div>`
    })
    
    const btns = document.querySelectorAll('.btnAddCart');
    
    btns.forEach(btn =>{
        //cada vez que el usuario hace click
        btn.addEventListener('click', addToCart);
    });
}

//---------------------agrego el escuchador de eventos a los botones------------//

    const btns = document.querySelectorAll('.btnAddCart');
    
    btns.forEach(btn =>{
        //cada vez que el usuario hace click
        btn.addEventListener('click', addToCart);
    });

//carrito
const addToCart = (e )=> {
    //la funcion target especifica desde donde le estamos dando click
    console.log(e.target);
    const id = e.target.id;

    
    // buscamos el producto y al dar click nos brinda toda la informacion del elemento
    const product = products_list.find(  item => item.id == id);
    console.table(product); // muestra el producto con su contenido

    // mostramos la cantidad d elementos del carro
    cart.addToCart(product);
    cartCount.innerText = cart.getCount();

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

// ------ solicitamos informacion del contenido de las categorias
const renderCategory = (list) =>{
    selectCategory.innerHTML= '';
    list.forEach (category =>{
        selectCategory.innerHTML += //html
        `<option value="${category.id_category}">${category.name}</option>`
    });
}

// hacemos una solicitud AJAX-> Fetch
const getProducts = async () =>{

    try {
        const endPoint = 'data.json';
        const resp = await fetch(endPoint);
    
        const json = await resp.json();
        console.log(json);

        const { products, category } = json;
        products_list = products;
        console.table(category);
        renderProducts( products);
        renderCategory(category);

    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Ocurrio un error al mostrar los productor, intente mas tarde",
            icon: "error",
            confirmButtonText: 'Aceptar'
        });
        console.log(error);
    }

}
getProducts();
