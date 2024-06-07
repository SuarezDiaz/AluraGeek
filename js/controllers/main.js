import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");



function createCard (name, price, image, id){
    const card = document.createElement("div");
    

    card.classList.add("card");

    card.innerHTML = `
                <div class="image-container">
                    <img src="${image}" alt="${name}">
                </div>

                        <div class="card-info">
                            <p>${name}</p>
                            <div class="card-value">
                                <p>$ ${price}</p>
                                <button data-erase class="delete-button" data-id= "${id}">
                                    <img src="/imgs/Vector.png" alt="Eliminar">
                                </button>
                            </div>
                        </div>
    `
    
    //se agrega la función de borrar seleccionando el botton de borrar con querySelector pasando el data del botton
    const eraseProduct = card.querySelector("[data-erase]");

    //crea el event listener esperando el click al botton de borrar utilizando una arror fuction asincronica
    eraseProduct.addEventListener("click", async () => {
    // la función asincronica importa a la función para borrar el producto tomando el id de la base de datos
    // se llama al metodo remove() para la constante card que crea el producto, de esta manera se borra el producto de pantalla y de la base de datos.    
        try {
            await servicesProducts.deleteProduct(id);
            card.remove();
        } catch (error) {
            console.error(error);
        }
    });
    
    
    productContainer.appendChild(card);

    return card;

    
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        
        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard( 
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });

    } catch (error) {
        console.log (error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
})



render();








