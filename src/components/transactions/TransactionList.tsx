"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Skeleton } from "../ui/skeleton";
import { getUser } from "@/lib/appwrite/auth";
import {
  databases,
  DB_ID,
  TRANSACTION_COLLECTION,
} from "@/lib/appwrite/client";
import { Query } from "appwrite";

type Transaction = {
  id: string;
  type: string;
  amount: number;
  status: string;
  method: string;
  created_at: string;
};

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = await getUser();
        if (!user) {
          console.error("Failed to get user.");
          setLoading(false);
          return;
        }

        const response = await databases.listDocuments(
          DB_ID,
          TRANSACTION_COLLECTION,
          [Query.equal("userId", user.$id), Query.orderDesc("$createdAt")]
        );

        setTransactions(
          (response.documents || []).map((doc) => ({
            id: doc.$id,
            type: doc.type,
            amount: Number(doc.amount),
            status: doc.status,
            method: doc.method,
            created_at: doc.$createdAt,
          }))
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching transactions:", error.message);
        } else {
          console.error("Error fetching transactions:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "approved") return "success";
    if (status === "pending") return "warning";
    return "error";
  };

  const formatType = (type: string) =>
    type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      className="
        overflow-hidden rounded-2xl 
        border border-border/60 
        bg-card/70 backdrop-blur-xl
        shadow-[0_10px_35px_rgba(15,23,42,0.18)]
        dark:shadow-[0_0_30px_rgba(15,23,42,0.8)]
      "
    >
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[780px]">
          <Table>
            {/* Header */}
            <TableHeader
              className="
                border-b border-border/60
                bg-background/60 backdrop-blur-sm
              "
            >
              <TableRow>
                {["Type", "Amount", "Method", "Status", "Date"].map((label) => (
                  <TableCell
                    key={label}
                    isHeader
                    className="
                      px-5 py-3 text-start 
                      font-medium text-[11px] tracking-wide uppercase
                      text-gray-500 dark:text-gray-400
                    "
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody className="divide-y divide-border/40">
              {loading ? (
                [...Array(4)].map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(5)].map((_, j) => (
                      <TableCell key={j} className="px-5 py-4">
                        <Skeleton className="h-4 w-full max-w-[120px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="px-5 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                  >
                    No transactions found yet. Your activity will show up here
                    once you start depositing, withdrawing or investing.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="
                      transition-colors 
                      hover:bg-gray-50/70 
                      dark:hover:bg-white/[0.04]
                    "
                  >
                    <TableCell className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90">
                      {formatType(tx.type)}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300">
                      ${tx.amount.toFixed(2)}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-sm uppercase text-gray-600 dark:text-gray-300">
                      {tx.method}
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <Badge size="sm" color={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(tx.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
