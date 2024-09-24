import { FormEvent, useEffect, useState } from "react"
import { CartProductCard } from "../components/CartProductCard"
import axios from "axios"
import "./CartPage.css"

type ItemChecked = {
    id: string 
    checked: boolean
    price: number
}

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

export function CartPage() {
    const [itemStatus, setItemStatus] = useState<ItemChecked[]>([])
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

    const [totalBill, setTotalBill] = useState(0);
    
    const config = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    };
    useEffect(()=> {
        async function getProducts() {
            if(sessionStorage.getItem("token")) {
                try {
                    // send a get request to the server with a payload contains the type of product
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/cart/fetch`, config);
        
                    console.log(response.data);
                    setProducts(response.data)
                    // loop through all the products in the cart and create a list of status objects type: ItemChecked
                    let states:ItemChecked[] = [];
                    response.data.forEach((item: Product) => {
                        states.push({id: item.product_id, checked: false, price: parseFloat(item.price)});
                    })
                    setItemStatus(states);
                }catch (err) {
                    console.log(err);
                }
            }
        }
        getProducts();
    }, []);

    function handleCheckOut(e: FormEvent) {
        e.preventDefault();

        console.log("submitted")
        console.log(itemStatus)
    }

    function handleChange(id: string, state: boolean){
        setItemStatus(preValue => {
            return preValue.map(item => {
                if(item.id == id && item.checked == true && state == false) { // if item was checked before but is now unchecked, substract it's price from the total bill
                    setTotalBill((preVal) => {
                        return preVal - item.price
                    }); 
                }else if(item.id == id && item.checked == false && state == true) { // if item was not checked before but is now checked, add it's price from the total bill
                    setTotalBill((preVal) => {
                        return preVal + item.price
                    });
                }
               return (item.id == id)? { ...item, checked: state } : item
            })
        });
    }

    return (
        <div className="cart-container">
            <div id="cart-card">
                <h1>Shopping Cart ({sessionStorage.getItem("cartCount")})</h1>
                <form id="cart-add-form" onSubmit={handleCheckOut}>
                    <div id="cart-list">
                        {products.map((product) => {
                            return (
                                <div className="cart-item" key={`${product.product_id}`}>
                                    <input type="checkbox" className="check-box" name="vehicle2" onChange={ (e) => handleChange(product.product_id, e.target.checked)}></input>
                                    <label htmlFor="vehicle2"> 
                                        <CartProductCard image={product.images[0]} name={product.name} price={parseFloat(product.price)} qty={3} id={product.product_id}/>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </form>
            </div>
            <div id="summary-card">
                <h1>Summary</h1>
                <div className="summary-item">
                    <p>Subtotal</p>
                    <p>₦ {totalBill.toLocaleString()}</p>
                </div>
                <div className="summary-item">
                    <p>Shipping fee</p>
                    <p>₦ {(1500).toLocaleString()}</p>
                </div>
                <div className="summary-item">
                    <p style={{fontWeight: "bold", lineHeight: "20px"}}>Total</p>
                    <p style={{fontSize: "20px", fontWeight: "bold", color: "black"}}>₦ {(totalBill + 1500).toLocaleString()}</p>
                </div>
                <button form="add-product-form" className="checkout-button" type="submit" style={{width: "100%"}}>Checkout</button>
            </div>
        </div>

    )
}