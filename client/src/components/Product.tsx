import { useState } from "react";
import "./Product.css"

const product_images = ["product-1.jpg", "product-2.jpg", "product-3.jpg", "product-4.jpg"]

export function Product() {
    const [currImage, setCurrImage] = useState(product_images[0]);
    const [itemCount, setItemCount] = useState(0);

    function increaseItems() {
        setItemCount(itemCount+1)
    }

    function decreaseItems() {
        setItemCount(itemCount-1)
    }

    return (
        <div className="product-container">  
            <div className="img-card">
                <img className="product-main-img" src={currImage} alt="product image"/>

                <div className="thumbnail-card">
                    {product_images.map((img, index) => {
                        function handleClick(path: string) {
                            setCurrImage(path);
                        }
                        return (
                            <Thumbnail path={img} key={`${index}`} onclick={handleClick} currentImage={currImage}/>
                        )
                    })}
                </div>
            </div>
            <div className="content-card">
                <p id="company-name">MID - ELLE</p>
                <h1 id="product-name" style={{fontWeight: "bold"}}>Stainless Steel Smooth Double Ball Beads Rings</h1>
                <p>Stainless Steel Smooth Double Ball Beads Rings For Woman Open Gold Color Geometric Wedding Couple Rings Aesthetic Jewelry Gift.</p>
                <div className="price-discount">
                    <h2>₦10,500.00</h2>
                    <div className="discount">
                        <p>50%</p>
                    </div>
                </div>
                <p id="old-price">₦5,250</p>

                <div className="buy">
                    <div id="add-more">
                        <div id="minus-button" onClick={decreaseItems}>
                            <img src="icon-minus.svg"  alt="plus icon" />
                        </div>

                        <p style={{color: "black", fontWeight: "bold"}}>{itemCount}</p>

                        <div id="add-button" onClick={increaseItems}>
                            <img src="icon-plus.svg" alt="minus icon" />
                        </div>
                    </div>

                    <div id="add-to-cart">
                        <img src="icon-cart-white.svg"  alt="cart icon"/>
                        <p style={{color: "white", fontWeight: "bold"}}>Add to cart</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Thumbnail (props: {path: string, onclick: Function, currentImage: string}) {
    function handleClick () {
        props.onclick(props.path);
    }

    return (
        <div className="thumbnail">
            <img className="thumbnail-image" src={props.path} alt="product image"></img>
            <div className="thumbnail-mask" style={{opacity: (props.currentImage == props.path)? 0.7 : 0}} onClick={handleClick}/>
        </div>
    )

}