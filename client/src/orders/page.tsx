// import { Payment, columns } from "./columns"
// import { DataTable } from "./data-table"

// // async function getData(): Promise<Payment[]> {
// //   // Fetch data from your API here.
// //   return [
// //     {
// //       id: "728ed52f",
// //       amount: 100,
// //       status: "pending",
// //       email: "m@example.com",
// //     },
// //     // ...
// //   ]
// // }

// export const data: Payment[] = [
//     { id: "1", amount: 150, status: "success", email: "user1@example.com" },
//     { id: "2", amount: 250, status: "pending", email: "user2@example.com" },
//     { id: "3", amount: 375, status: "failed", email: "user3@example.com" },
//     { id: "4", amount: 490, status: "processing", email: "user4@example.com" },
//     { id: "5", amount: 550, status: "success", email: "user5@example.com" },
//     { id: "6", amount: 675, status: "failed", email: "user6@example.com" },
//     { id: "7", amount: 800, status: "pending", email: "user7@example.com" },
//     { id: "8", amount: 925, status: "processing", email: "user8@example.com" },
//     { id: "9", amount: 115, status: "success", email: "user9@example.com" },
//     { id: "10", amount: 225, status: "pending", email: "user10@example.com" },
//     { id: "11", amount: 355, status: "failed", email: "user11@example.com" },
//     { id: "12", amount: 470, status: "processing", email: "user12@example.com" },
//     { id: "13", amount: 590, status: "success", email: "user13@example.com" },
//     { id: "14", amount: 605, status: "pending", email: "user14@example.com" },
//     { id: "15", amount: 715, status: "failed", email: "user15@example.com" },
//     { id: "16", amount: 825, status: "processing", email: "user16@example.com" },
//     { id: "17", amount: 150, status: "success", email: "user17@example.com" },
//     { id: "18", amount: 265, status: "pending", email: "user18@example.com" },
//     { id: "19", amount: 390, status: "failed", email: "user19@example.com" },
//     { id: "20", amount: 520, status: "processing", email: "user20@example.com" },
//     { id: "21", amount: 635, status: "success", email: "user21@example.com" },
//     { id: "22", amount: 750, status: "pending", email: "user22@example.com" },
//     { id: "23", amount: 865, status: "failed", email: "user23@example.com" },
//     { id: "24", amount: 980, status: "processing", email: "user24@example.com" },
//     { id: "25", amount: 195, status: "success", email: "user25@example.com" },
//     { id: "26", amount: 310, status: "pending", email: "user26@example.com" },
//     { id: "27", amount: 435, status: "failed", email: "user27@example.com" },
//     { id: "28", amount: 550, status: "processing", email: "user28@example.com" },
//     { id: "29", amount: 670, status: "success", email: "user29@example.com" },
//     { id: "30", amount: 785, status: "pending", email: "user30@example.com" },
//     { id: "31", amount: 900, status: "failed", email: "user31@example.com" },
//     { id: "32", amount: 110, status: "processing", email: "user32@example.com" },
//     { id: "33", amount: 240, status: "success", email: "user33@example.com" },
//     { id: "34", amount: 355, status: "pending", email: "user34@example.com" },
//     { id: "35", amount: 470, status: "failed", email: "user35@example.com" },
//     { id: "36", amount: 585, status: "processing", email: "user36@example.com" },
//     { id: "37", amount: 705, status: "success", email: "user37@example.com" },
//     { id: "38", amount: 820, status: "pending", email: "user38@example.com" },
//     { id: "39", amount: 940, status: "failed", email: "user39@example.com" },
//     { id: "40", amount: 160, status: "processing", email: "user40@example.com" },
//     { id: "41", amount: 275, status: "success", email: "user41@example.com" },
//     { id: "42", amount: 390, status: "pending", email: "user42@example.com" },
//     { id: "43", amount: 505, status: "failed", email: "user43@example.com" },
//     { id: "44", amount: 620, status: "processing", email: "user44@example.com" },
//     { id: "45", amount: 735, status: "success", email: "user45@example.com" },
//     { id: "46", amount: 850, status: "pending", email: "user46@example.com" },
//     { id: "47", amount: 965, status: "failed", email: "user47@example.com" },
//     { id: "48", amount: 180, status: "processing", email: "user48@example.com" },
//     { id: "49", amount: 295, status: "success", email: "user49@example.com" },
//     { id: "50", amount: 410, status: "pending", email: "user50@example.com" }
//   ];
  

// export default function DemoPage() {
//   //const data = await getData()

//   return (
//     <div className="my-container">
//         <div className="container mx-auto py-10">
//         <h1>Order Details</h1>
//         <DataTable columns={columns} data={data} />
//         </div>
//     </div>
//   )
// }
