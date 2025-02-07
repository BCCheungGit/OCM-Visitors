"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { completeTask, deleteTask } from "@/lib/actions/task.actions"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
//   const selectedRows = table.getFilteredSelectedRowModel().rows;
//   const [isCompleteOpen, setIsCompleteOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
  const {data: session} = useSession();

  const {toast} = useToast();
//  const completeAction = async () => {
//     try {
//       for (const row of selectedRows) {
//         const res = await completeTask(row.getValue("_id"))
      
//         if (res.error) {
//             toast({
//                 title: "Error",
//                 description: res.error,
//                 duration: 5000,
//             })
//             return
//         } 
//         }
//       setIsCompleteOpen(false)
//       table.resetRowSelection();
//       table.resetColumnFilters();
//       location.reload();

//     } catch (error: any) {
//       console.log(error);
//     }
//   };
//   const deleteAction = async () => {
//     try {
//       for (const row of selectedRows) {
//         const res = await deleteTask(row.getValue("_id"));
//         if (res.error) {
//           toast({
//             title: "Error",
//             description: res.error,
//             duration: 5000,
//           });
//           return;
//         }
//       }
//       setDeleteOpen(false);
//       table.resetRowSelection();
//       table.resetColumnFilters();
//       location.reload();
//     } catch (error: any) {
//       console.log(error);
//     }
//   }
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search for a first name..."
          value={(table.getColumn("firstname")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("firstname")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        
        {/* {table.getColumn("roles") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={roles}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
        {/* {
            selectedRows.length > 0 && completeRows.length === 0 && (
            <Button
                variant="ghost"
                onClick={() => {setIsCompleteOpen(true)}}
                className="h-8 px-2 lg:px-3"
            >
                Mark as Complete
            </Button>
        )}
        {
          selectedRows.length > 0 && unownedRows.length === 0 && (
            <Button
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
              className="h-8 px-2 lg:px-3"
            >
              Delete Selected
              <X />
            </Button>
          )
        }      
        */}

      </div>
      <DataTableViewOptions table={table} />
     {/* <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the selected tasks. This action cannot be undone. 
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <form action={deleteAction}>
              <Button variant="destructive" type="submit">Confirm</Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog> 
       */}
      
      {/* <Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will mark the task as complete, and it will no longer be
              viewable to you if you are not the owner. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsCompleteOpen(false)}>Cancel</Button> 
            <form action={completeAction}>
              <Button type="submit">Confirm</Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  )
}