"use client";
import { DataTable } from "@/components/ui/data-table/index";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Product, productTableColumns } from "./product-columns";
import React from "react";
import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { ProductTableToolbar } from "./ProductTableToolbar";

export default function StoreProductTable({ data }: { data: Product[] }) {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    state: {
      rowSelection,
    },
    columns: productTableColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="border border-gray-500 mt-3 rounded-lg">
      <ProductTableToolbar
        rowSelection={{}}
        onClearRowSelection={() => {
          console.log("clear");
        }}
        handleBulkDelete={() => {
          return Promise.resolve(true);
        }}
      />
      <DataTable table={table} />
    </div>
  );
}
