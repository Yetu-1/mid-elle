import { useEffect, useState } from "react"
import axios from "axios"
import { ProductCard } from "../components/ProductCard"
import "./SearchPage.css"

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
            {/* <div id="filter">
                <p>FILTERS +</p>
                <p>SORT BY +</p>
            </div> */}

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