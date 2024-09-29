"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Orders = {
  user_id: string
  amount: string
  status: "pending" | "processing" | "success" | "failed"
  order_id: string
}

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "user_id",
    header: "User ID",
  },
  {
    accessorKey: "order_id",
    header: "Order ID",
  },
  {
    accessorKey: "amount",
    header: "Amount(₦)",
  },
  {
    accessorKey: "status",
    header: "Status",
  }
]
