import "./CartProductCard.css"

export function CartProductCard(props : {name: string, price: number, qty: number, image: string, id: string}) {

    return (
        <div className="cart-card">
            <div>
                <img src={props.image} alt={props.name} className="thumbnail-cart-image" />
            </div>
            <div className="cart-producdt-info-card">
                <p style={{fontWeight: "bold", color: "black"}}>{props.name}</p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>₦ {(props.price).toLocaleString()}</p>
                    <p>Qty: {props.qty}</p>
                </div>
            </div>
        </div>
    )
}
