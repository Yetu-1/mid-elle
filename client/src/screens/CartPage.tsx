import { FormEvent, useEffect, useState } from "react"
import { CartProductCard } from "../components/CartProductCard"
import "./CartPage.css"

const products = [
    {
        name: "Stainless Steel Geometric Rings",
        price: 3500,
        image: "Stainless-Steel-Geometric-Rings.jpg",
        qty: 2,
        id: '5234'
    },
    {
        name: "Heartbeat Necklace",
        price: 5500,
        image: "Heartbeat-Necklace.jpg",
        qty: 2,
        id: '6435'
    },
    {
        name: "Acrylic Rings",
        price: 3500,
        image: "Acrylic-Rings.jpg",
        qty: 2,
        id: '2046'
    },
    {
        name: "Opal Oval Necklace Stainless Steel Gold Color ",
        price: 3250,
        image: "Opal-Oval-Necklace.jpg",
        qty: 2,
        id: '7893'
    },
    {
        name: "Stainless Steel Geometric Rings",
        price: 3500,
        image: "Stainless-Steel-Geometric-Rings.jpg",
        qty: 2,
        id: '5233'
    }
    ,
    {
        name: "Opal Oval Necklace Stainless Steel Gold Color ",
        price: 3250,
        image: "Opal-Oval-Necklace.jpg",
        qty: 2,
        id: '78943'
    },
    {
        name: "Stainless Steel Geometric Rings",
        price: 3500,
        image: "Stainless-Steel-Geometric-Rings.jpg",
        qty: 2,
        id: '52334'
    }
]
type ItemChecked = {
    id: string 
    checked: boolean
    price: number
}
export function CartPage() {
    const [itemStatus, setItemStatus] = useState<ItemChecked[]>([])
    const [totalBill, setTotalBill] = useState(0);

    useEffect(()=> {
        let states:ItemChecked[] = [];
        products.forEach(item => {
            states.push({id: item.id, checked: false, price: item.price});
        })
        setItemStatus(states);
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
                console.log("here")
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
                                <div className="cart-item" key={`${product.id}`}>
                                    <input type="checkbox" className="check-box" name="vehicle2" onChange={ (e) => handleChange(product.id, e.target.checked)}></input>
                                    <label htmlFor="vehicle2"> 
                                        <CartProductCard image={product.image} name={product.name} price={product.price} qty={3} id={product.id}/>
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
                    <p>₦ {totalBill}</p>
                </div>
                <div className="summary-item">
                    <p>Shipping fee</p>
                    <p>₦ 1500</p>
                </div>
                <div className="summary-item">
                    <p style={{fontWeight: "bold", lineHeight: "20px"}}>Total</p>
                    <p style={{fontSize: "20px", fontWeight: "bold", color: "black"}}>₦ {totalBill + 1500}</p>
                </div>
                <button form="add-product-form" className="checkout-button" type="submit" style={{width: "100%"}}>Checkout</button>
            </div>
        </div>

    )
}