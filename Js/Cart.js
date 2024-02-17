// ------------ Trabajamos el carrito de COMPRAS ---------------//

class Cart{
    constructor( list = []){
        this.cart = list;
        
    }

    addToCart( {id, name, duracion , modalidad,price} ) {
        //busco si existe el producto
        const index = this.cart.findIndex( product => product.id == id);

        if ( index == -1) {
            console.log('Este curso se agrego al  carrito');

            this.cart.push( {id, name, duracion, modalidad, stock: 1, price});

        } else {
            console.log('El curso seleccionado ya se encuentra en el carrito');
            //Ya esta en el carrito, entonces incremento la cantidad
            //this.cart[index].units += 1; // cantidad de productos q seleccionamos 
        }
        

        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    getProducts(){
        return this.cart;
    }

    getCursos(){
        return this.cart;
    }

    getCount(){
        const count = this.cart.reduce( (cant, product) =>{ return cant + product.stock },0 )
        return count;
    }

    getSum(){
        
        const sum = this.cart.reduce  ( (acum, product) => {
            return acum + (product.stock * product.price) }, 0 )

        return sum;
    }
}