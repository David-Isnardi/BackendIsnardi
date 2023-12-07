import {promises as fs, readFile} from "fs"

class ProductManager{
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
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
        console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productfilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productfilter))
        console.log("Producto eliminado")
    }

    updateProducts = async ({id, ...producto}) => {

        await this.deleteProductsById(id);

        let productOld = await this.readProducts()

        let productsModified = [{id, ...producto}, ...productOld]

        await fs.writeFile(this.patch, JSON.stringify(productsModified))

    }
}

const productos = new ProductManager


//PRODUCTOS
productos.addProduct("Pan" , "Bimbo", 1000 , "Sinimagen", "abc123", 10)
productos.addProduct("Leche" , "Conaprole", 500, "Sinimagen", "abc456", 5)
productos.addProduct("Queso" , "Dambo", 1000, "Sinimagen", "abc789", 15)
//-------------------------------------------------------------------------

//VER TODOS LOS PRODUCTOS
//productos.getProducts()
//-----------------------

//TRAER PRODUCTO POR SU ID
//productos.getProductsById(3)
//------------------------

//ELIMINAR PRODUCTO POR SU ID
//productos.deleteProductsById(2)
//---------------------------


//ACTUALIZAR PRODUCTO
/*productos.updateProducts({
  id: 1,
  title: 'Pan',
  description: 'Bimbo',
  price: 2,
  thumbnail: 'Sinimagen',
  code: 'abc123',
  stock: 10
}
)*/
//-------------------------------------

