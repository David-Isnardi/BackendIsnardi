class ProductManager {
 constructor() {
  this.products = []
};

addProduct(title, description, price, thumbnail, code, stock){
 if (this.ValidarCampos(title, description, price, thumbnail, code, stock) && this.CodigoDuplicado(code)){
  const nuevoProducto = {
   id: this.GeneradorId(),
   title: title,
   description: description,
   price: price,
   thumbnail: thumbnail,
   code: code,
   stock: stock
   };

  this.products.push(nuevoProducto)
  console.log(this.products)
 };
};

getProducts() {
 return this.products
};

getProductsById(id){
 return this.products.find((product) => product.id === id);
};

GeneradorId() {
  let id = 0;
   if (this.products.length === 0) {
    id = 1; 

  } else {
    id = this.products[this.products.length - 1].id + 1;
  };

return id;
};

CodigoDuplicado(code){
  if (this.products.find((product) => product.code === code) !== undefined) {
  console.error("Este producto ya existe")
  return false;

} else {
  return true;
};
};

ValidarCampos(title, description, price, thumbnail, code, stock) {
if (!title || !description || !price || !thumbnail || !code || !stock) {
  console.error("Por favor, completa los campos");
  return false;

} else {
  return true;
};
};

};

const newProductManager = new ProductManager();

newProductManager.addProduct("Pan", "Bimbo", 300, "SinImagen", "123", 10);
newProductManager.addProduct("Queso", "Calcar", 100, "SinImagen", "124", 5);
//Codigo Duplicado
newProductManager.addProduct("Queso", "Calcar", 100, "SinImagen", "124", 5);
//Campo sin completar
newProductManager.addProduct("Pan", 300, "123", 10);



