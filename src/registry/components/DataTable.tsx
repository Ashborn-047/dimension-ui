import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./Table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

export function DataTable({ data }: { data: any[] }) {
    const columns = Object.keys(data[0] || {});

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <input
                    placeholder="Filter..."
                    className="max-w-sm h-10 px-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-bold outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors shadow-sm"
                />
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-sm font-bold shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800">
                    Columns <ChevronDown size={14} />
                </button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map(col => (
                            <TableHead key={col} className="capitalize">{col}</TableHead>
                        ))}
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, i) => (
                        <TableRow key={i}>
                            {columns.map(col => (
                                <TableCell key={col} className="font-medium text-neutral-600 dark:text-neutral-400">{row[col]}</TableCell>
                            ))}
                            <TableCell className="text-right">
                                <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                                    <MoreHorizontal size={14} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-end space-x-2 py-4">
                <button className="px-4 py-2 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold shadow-sm disabled:opacity-50">Previous</button>
                <button className="px-4 py-2 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs font-bold shadow-sm">Next</button>
            </div>
        </div>
    );
}
