import { useEffect, useState } from "react";
import "./ProductPage.css"
import { useParams } from "react-router-dom";
import axios from "axios";

type ProductInfo = {
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

const rating = 3;

export function ProductPage() {
    const {id} = useParams();
    const [currImage, setCurrImage] = useState("");
    const [itemCount, setItemCount] = useState(0);
    const [product, setProduct] = useState<ProductInfo>(
        {
            id: 0,
            product_id: "XX",
            name: "XX",
            type: "XX",
            brand: "XX",
            description: "XX",
            price: "XX",
            discount: "XX",
            images: []
        }
    );

    useEffect(() => {
        async function getProduct() {
            try {
                // send a get request to the server with a payload contains the type of product
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/product`, { id: id });
                // console.log(response.data);
                setProduct(response.data)
                setCurrImage(response.data.images[0])
            }catch (err) {
                console.log(err);
            }
        }

        getProduct();
    }, []);

    async function handleAddToCart() {
        const config = {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        try{
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/add`, { product_id: id, qty: itemCount }, config);
            console.log(response.data);
        }catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="product-container">  
            <div className="img-card">
                <img className="product-main-img" src={currImage} alt="product image"/>

                <div className="thumbnail-card">
                    {product.images.map((img, index) => {
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
                <h1 id="product-name" style={{fontWeight: "bold"}}>{product.name}</h1>
                <p>{product.description}</p>
                <div className="price-discount">
                    <h2 id="price">₦{parseFloat(product.price).toLocaleString()}</h2>
                    <div className="discount">
                        <p>50%</p>
                    </div>
                </div>
                <p id="old-price">₦5,250</p>

                <div className="product-rating">
                    {
                        Array.from({ length: rating }).map((_, index) => (
                            <img key={`${index}`} src="/icon-star.svg" alt="butterfly necklace" className="star"/>
                        ))
                    }
                <p style={{paddingLeft: "10px", color: "black", fontWeight: "bold", marginBottom: "25px"}}>{rating}</p>
                </div>

                <div className="buy">
                    <div id="add-more">
                        <div id="minus-button" onClick={() => {
                            if((itemCount - 1) < 0)
                                setItemCount(0)
                            else
                                setItemCount(itemCount - 1)
                        }}>
                            <img src="/icon-minus.svg"  alt="plus icon" />
                        </div>

                        <p style={{color: "black", fontWeight: "bold"}}>{itemCount}</p>

                        <div id="add-button" onClick={() => setItemCount(itemCount + 1)}>
                            <img src="/icon-plus.svg" alt="minus icon" />
                        </div>
                    </div>

                    <div id="add-to-cart" onClick={handleAddToCart}>
                        <img src="/icon-cart-white.svg"  alt="cart icon"/>
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