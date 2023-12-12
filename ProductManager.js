import {promises as fs, readFile} from "fs"

class ProductManager{
    constructor(patch){
        this.patch = patch
        this.products = []
    }


    idGenerator() {
        let id = 0;
        if (this.products.length === 0) {
            id = 1;
        } else {
            id = this.products[this.products.length - 1].id + 1;
        };
        return id;
    };
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {

        let newProduct = {
            id: this.idGenerator(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct)

        console.log(newProduct)

       
       await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return(JSON.parse(respuesta))
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
       return console.log(respuesta2)
    }

    getProductsById = async (id) => {

        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            console.log("Not found")
        } else {
       return console.log((respuesta3.find(product => product.id === id)))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productfilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productfilter))
        console.log("Producto eliminado")
    }

    updateProducts = async ({id, ...producto}) => {

        let productOld = await this.readProducts()

        let productsModified = [{id, ...producto}, ...productOld]

        await fs.writeFile(this.patch, JSON.stringify(productsModified))

        console.log("Producto actualizado")

    }
}

const productos = new ProductManager("./productos.txt");



//PRODUCTOS
//productos.addProduct("Queso", "Dambo", 400, "SinImagen", "abc789", 5)
//productos.addProduct("Leche", "Conaprole", 500, "SinImagen", "abc456", 10)
//-------------------------------------------------------------------------

//VER TODOS LOS PRODUCTOS
productos.getProducts()
//-----------------------

//TRAER PRODUCTO POR SU ID
//productos.getProductsById(1)
//------------------------

//ELIMINAR PRODUCTO POR SU ID
//productos.deleteProductsById(2)
//---------------------------


//ACTUALIZAR PRODUCTO
/*productos.updateProducts({
    title: "Pan",
    description: "Bimbo",
    price: 100,
    thumbnail: "sinimagen",
    code: "abc123",
    stock: 10,
}
)*/
//-------------------------------------

