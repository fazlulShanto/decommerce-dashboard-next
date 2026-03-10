"use client";

import { DataTable } from "@/components/ui/data-table/index";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { knowledgeTableColumns } from "./knowledge-columns";
import React from "react";
import { KnowledgeTableToolbar } from "./KnowledgeTableToolbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { KnowledgeData } from "@/models/knowledge.dal";

export default function StoreKnowledgeTable({
  data,
  guildId,
}: {
  data: KnowledgeData[];
  guildId: string;
}) {
  const [filterText, setFilterText] = useQueryState("kq", {
    defaultValue: "",
    clearOnDefault: false,
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    {
      id: "name",
      value: filterText,
    },
  ]);

  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    state: {
      columnFilters: columnFilters,
      rowSelection,
    },
    columns: knowledgeTableColumns,
    data: data,
    enableRowSelection: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const renderSearchInput = () => {
    return (
      <div className="flex items-center gap-2 relative">
        <Search className="w-4 h-4 absolute transform -translate-y-1/2 ltr:left-2 rtl:right-2 top-1/2 text-textPrimary-disable" />
        <Input
          placeholder={"Search Knowledge"}
          className="ltr:pl-7 rtl:pr-7 m-0 w-[290px] focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-cyan-400/70"
          value={table.getColumn("name")?.getFilterValue() as string}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
            setFilterText(event.target.value);
          }}
        />
      </div>
    );
  };

  return (
    <div className="mt-3 flex flex-col gap-3 rounded-lg">
      <div className="flex items-center justify-between">
        {renderSearchInput()}
        <KnowledgeTableToolbar table={table} guildId={guildId} />
      </div>
      <DataTable table={table} />
    </div>
  );
}
