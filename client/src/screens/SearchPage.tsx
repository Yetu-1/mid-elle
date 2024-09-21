import { useEffect, useState } from "react"
import axios from "axios"
import { ProductCard } from "../components/ProductCard"
import "./SearchPage.css"

// const products = [
//     {
//         name: "Stainless Steel Geometric Rings",
//         price: 3500,
//         image: "Stainless-Steel-Geometric-Rings.jpg",
//         rating: 4,
//         id: 5234
//     },
//     {
//         name: "Heartbeat Necklace",
//         price: 5500,
//         image: "Heartbeat-Necklace.jpg",
//         rating: 3,
//         id: 6435
//     },
//     {
//         name: "Acrylic Rings",
//         price: 3500,
//         image: "Acrylic-Rings.jpg",
//         rating: 5,
//         id: 2046
//     },
//     {
//         name: "Opal Oval Necklace Stainless Steel Gold Color ",
//         price: 3250,
//         image: "Opal-Oval-Necklace.jpg",
//         rating: 4,
//         id: 7893
//     },
//     {
//         name: "Stainless Steel Geometric Rings",
//         price: 3500,
//         image: "Stainless-Steel-Geometric-Rings.jpg",
//         rating: 4,
//         id: 5233
//     },
//     {
//         name: "Heartbeat Necklace",
//         price: 5500,
//         image: "Heartbeat-Necklace.jpg",
//         rating: 3,
//         id: 6433
//     },
//     {
//         name: "Acrylic Rings",
//         price: 3500,
//         image: "Acrylic-Rings.jpg",
//         rating: 5,
//         id: 2043
//     },
//     {
//         name: "Opal Oval Necklace Stainless Steel Gold Color ",
//         price: 3250,
//         image: "Opal-Oval-Necklace.jpg",
//         rating: 4,
//         id: 7895
//     }
// ]
type Product = {
    id: number,
    product_id: string
    name: string
    type: string
    brand: string
    description: string
    price: string
    discount: string
    images: string[]
}

export function SearchPage(props: {page: string}) {

    const [products, setProducts] = useState<Product[]>([{
        id: 0,
        product_id: "XX",
        name: "XX",
        type: "XX",
        brand: "XX",
        description: "XX",
        price: "XX",
        discount: "XX",
        images: []
    }]);

    useEffect(() => {
        async function getProducts() {
            try {
                // send a get request to the server with a payload contains the type of product
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/products`, { type: props.page });

                console.log(response.data);
                setProducts(response.data)
            }catch (err) {
                console.log(err);
            }
        }

        getProducts();
    }, [props.page]);

    return (
        <div className="search-page-container">
            <div id="filter">
                <p>FILTERS +</p>
                <p>SORT BY +</p>
            </div>

            <div id="products-container">
                <div className="search-products">
                    {products.map((product, index) => {
                        return (
                            <ProductCard image={product.images[0]} name={product.name} price={product.price} rating={3} key={`${product.id}`}  id={product.product_id}/>
                        )
                    })}
                </div>
            </div>


        </div>
    )
}