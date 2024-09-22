import { useNavigate } from "react-router-dom";
import "./ProductCard.css"

const rating = 5;

export function ProductCard (props: {rating: number, price: string, name: string, image: string, id: string}) {
    const navigate = useNavigate();

    function handleClick (){
        navigate(`/product/${props.id}`)
    }

    return (
        <div className="product-card" onClick={handleClick}>
            <img src={props.image} alt={props.name} className="product-image" />
            <div className="image-mask"></div>
            <p className="product-name">{props.name}</p>
            <p className="product-price">₦{parseFloat(props.price).toLocaleString()}</p>
            <div className="product-rating">
                {
                    Array.from({ length: props.rating }).map((_, index) => (
                        <img key={`${index}`} src="icon-star.svg" alt="star icon" className="star"/>
                    ))
                }
            </div>
        </div>
    )
}
