import { FormEvent, useEffect, useState } from "react"
import { CartProductCard } from "../components/CartProductCard"
import axios from "axios"
import "./CartPage.css"
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { v4 as uuidv4 } from 'uuid';

type ItemChecked = {
    id: string 
    checked: boolean
    price: number
    qty: number
}

// {
//     "status": "completed",
//     "customer": {
//         "name": "Barry null",
//         "email": "davidsalihu19@gmail.com",
//         "phone_number": "09040293418"
//     },
//     "transaction_id": 6919452,
//     "tx_ref": "9784a92b-9f0b-49ee-aad9-c6ee812225fe",
//     "flw_ref": "MockFLWRef-1727206398707",
//     "currency": "NGN",
//     "amount": 5325,
//     "charged_amount": 5325,
//     "charge_response_code": "00",
//     "charge_response_message": "Approved Successful",
//     "created_at": "2024-09-24T19:33:18.000Z"
// }

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
    qty: number
}

export function CartPage() {
    const [itemStatus, setItemStatus] = useState<ItemChecked[]>([])
    const [products, setProducts] = useState<Product[]>([]);

    const token = sessionStorage.getItem("token");
    const user = {
        email: (token)? sessionStorage.getItem("email") : "null",
        name: (token)? `${sessionStorage.getItem("firstname")} ${sessionStorage.getItem("lastname")}` : "",
        phone_number: '090xxxxxxxx',
    }

    const [totalBill, setTotalBill] = useState(0);

    const fw_config = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: uuidv4(),
        amount: (totalBill + 1500),
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: (user.email)? user.email : "",
            phone_number: user.phone_number,
            name: user.name,
        },
        customizations: {
          title: 'MID-ELLE',
          description: 'Payment for items in cart',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(fw_config);
    
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
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/cart`, config);
        
                    console.log(response.data);
                    setProducts(response.data)
                    // loop through all the products in the cart and create a list of status objects type: ItemChecked
                    let states:ItemChecked[] = [];
                    response.data.forEach((item: Product) => {
                        states.push({id: item.product_id, checked: false, price: parseFloat(item.price), qty: item.qty});
                    })
                    setItemStatus(states);
                }catch (err) {
                    console.log(err);
                }
            }
        }
        getProducts();
    }, []);
    
    function getOrderedProducts() {
        let ordered_products: any = [];
        itemStatus.forEach(item => {
            if(item.checked == true) {
                // construct an object of the product id and quantity of product
                ordered_products.push({id: item.id, qty: item.qty})
            }
        })
        return ordered_products;
    }
    function handleCheckOut(e: FormEvent) {
        e.preventDefault();
        handleFlutterPayment({
              callback: async (response) => {
                //  console.log(response);
                 if(response.status == 'completed') {
                    const products_details = getOrderedProducts();
                    console.log("Transaction successful")
                    let payload = {
                        user_id: sessionStorage.getItem("user_id"),
                        trans_ref: response.tx_ref,
                        trans_id: response.transaction_id,
                        amount: response.amount,
                        products: products_details,
                    }
                    console.log(payload);
                    try {
                        // construct transaction object that incluede user id, trans id, trans ref, amount, product ids and quantity
                        const resp = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/orders/add`, payload, config)
                        window.location.reload();
                    }catch (err) {
                        console.log("Error sending transactions to the server");
                    }
                    // send an email or whatsapp message to admin that include invoice
                    // send an email to user that includes the invoice
                 }else {
                    console.log("Transaction failed");
                 }
                  closePaymentModal() // this will close the modal programmatically
              },
              onClose: () => {
                console.log("User close checkout")
              },
        });

        console.log("submitted")
        console.log(itemStatus)
    }

    function handleChange(id: string, state: boolean){
        setItemStatus(preValue => {
            return preValue.map(item => {
                if(item.id == id && item.checked == true && state == false) { // if item was checked before but is now unchecked, substract it's price from the total bill
                    setTotalBill((preVal) => {
                        return preVal - ((item.price) * item.qty) // subtract total for product (i.e product price multipled by it's quantity)
                    }); 
                }else if(item.id == id && item.checked == false && state == true) { // if item was not checked before but is now checked, add it's price from the total bill
                    setTotalBill((preVal) => {
                        return preVal + ((item.price) * item.qty) // add total for product (i.e product price multipled by it's quantity)
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
                                        <CartProductCard image={product.images[0]} name={product.name} price={parseFloat(product.price)} qty={product.qty} id={product.product_id}/>
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
                <button form="add-product-form" className="checkout-button" type="submit" style={{width: "100%"}} onClick={handleCheckOut}>Checkout</button>
            </div>
        </div>

    )
}