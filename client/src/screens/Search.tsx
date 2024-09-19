import { ProductCard } from "../components/ProductCard"
import "./Search.css"

const products = [
    {
        name: "Stainless Steel Geometric Rings",
        price: 3500,
        image: "Stainless-Steel-Geometric-Rings.jpg",
        rating: 4,
        id: 5234
    },
    {
        name: "Heartbeat Necklace",
        price: 5500,
        image: "Heartbeat-Necklace.jpg",
        rating: 3,
        id: 6435
    },
    {
        name: "Acrylic Rings",
        price: 3500,
        image: "Acrylic-Rings.jpg",
        rating: 5,
        id: 2046
    },
    {
        name: "Opal Oval Necklace Stainless Steel Gold Color ",
        price: 3250,
        image: "Opal-Oval-Necklace.jpg",
        rating: 4,
        id: 7893
    },
    {
        name: "Stainless Steel Geometric Rings",
        price: 3500,
        image: "Stainless-Steel-Geometric-Rings.jpg",
        rating: 4,
        id: 5233
    },
    {
        name: "Heartbeat Necklace",
        price: 5500,
        image: "Heartbeat-Necklace.jpg",
        rating: 3,
        id: 6433
    },
    {
        name: "Acrylic Rings",
        price: 3500,
        image: "Acrylic-Rings.jpg",
        rating: 5,
        id: 2043
    },
    {
        name: "Opal Oval Necklace Stainless Steel Gold Color ",
        price: 3250,
        image: "Opal-Oval-Necklace.jpg",
        rating: 4,
        id: 7895
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
                            <ProductCard image={product.image} name={product.name} price={product.price} rating={product.rating} key={`${product.id}`}  id={product.id}/>
                        )
                    })}
                </div>
            </div>


        </div>
    )
}