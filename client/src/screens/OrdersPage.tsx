import "./OrdersPage.css"
import { Orders, columns } from "../orders/columns"
import { DataTable } from "../orders/data-table"
import { useEffect, useState } from "react"
import axios from "axios"

export function OrdersPage() {
    const [orders, setOrders] = useState<Orders[]>([])

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
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/orders`, config);
        
                    console.log(response.data);
                    // loop through all the orders and add to the data array
                    let data:Orders[] = [];
                    response.data.forEach((order: any) => {
                        data.push({user_id: order.user_id, amount: (order.amount).toLocaleString(), order_id: order.trans_ref, status: order.status});
                    })
                    setOrders(data);
                }catch (err) {
                    console.log(err);
                }
            }
        }
        getProducts();
    }, []);

    return (
        <div className="orders-container">

            <div className="container mx-auto py-10">
            <h1 className="orders-heading-text" >Orders</h1>
            <DataTable columns={columns} data={orders} />
            </div>
        </div>
    )
}