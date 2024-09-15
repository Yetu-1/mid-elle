import "./ProductCard.css"

const rating = 5;

export function ProductCard (props: {rating: number, price: number, name: string, image: string}) {
    return (
        <div className="product-card">
            <img src={props.image} alt="butterfly necklace" id="product-image" />
            <p className="product-name">{props.name}</p>
            <p className="product-price">₦{(props.price).toLocaleString()}</p>
            <div className="product-rating">
                {
                    Array.from({ length: props.rating }).map((_, index) => (
                        <img key={`${index}`} src="icon-star.svg" alt="butterfly necklace" className="star"/>
                    ))
                }
            </div>
            {/* <img src="Heartbeat-Necklace.jpg" alt="butterfly necklace" />
            <img src="Acrylic-Rings.jpg" alt="butterfly necklace" /> */}
        </div>
    )
}
