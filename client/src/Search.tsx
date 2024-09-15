import { ProductCard } from "./components/ProductCard"
import "./Search.css"

const products = [
    {
        name: "Stainless Steel Geometric Rings",
        price: 3500,
        image: "Stainless-Steel-Geometric-Rings.jpg",
        rating: 4
    },
    {
        name: "Heartbeat Necklace",
        price: 5500,
        image: "Heartbeat-Necklace.jpg",
        rating: 3
    },
    {
        name: "Acrylic Rings",
        price: 3500,
        image: "Acrylic-Rings.jpg",
        rating: 5
    },
    {
        name: "Opal Oval Necklace Stainless Steel Gold Color ",
        price: 3250,
        image: "Opal-Oval-Necklace.jpg",
        rating: 4
    },
    {
        name: "Heartbeat Necklace",
        price: 5500,
        image: "Heartbeat-Necklace.jpg",
        rating: 3
    },
    {
        name: "Acrylic Rings",
        price: 3500,
        image: "Acrylic-Rings.jpg",
        rating: 5
    },
    {
        name: "Stainless Steel Geometric Rings",
        price: 3500,
        image: "Stainless-Steel-Geometric-Rings.jpg",
        rating: 4
    },
    {
        name: "Heartbeat Necklace",
        price: 5500,
        image: "Heartbeat-Necklace.jpg",
        rating: 3
    }
]

export function Search() {
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
                            <ProductCard image={product.image} name={product.name} price={product.price} rating={product.rating} />
                        )
                    })}
                </div>
            </div>


        </div>
    )
}