import "./Home.css"
import { ProductCard } from "./ProductCard"

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
    }
]

export function Home() {
    return (
        <div className='container'>
            <div className="banner">
                <div className="banner-text">
                    <h1>Classic & Elegant</h1>
                    <p>Adorn yourself with timeless beauty - simple, sophisticated, and effortlessly stunning. More than just jewelry, it's a reflection of your elegance</p>
                    <div id="shop-button">
                        <p>SHOP NOW</p>
                    </div>
                </div>
                <img src="ring.png" alt="picture of a ring"/>
            </div>

            <div className="popular-products">
                <h1>Most-Loved Products</h1>
                <div className="products">
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

