"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { Skeleton } from "../ui/skeleton";
import { getUser } from "@/lib/appwrite/auth";
import { databases, DB_ID, INVESTMENT_COLLECTION } from "@/lib/appwrite/client";
import { Query } from "appwrite";
import { plan } from "@/lib/data/info";

type Investment = {
  id: string;
  amount: number;
  status: string;
  start_date: string;
  end_date: string | null;
  investment_plans: {
    name: string;
    interest_rate: number;
    duration_days: number;
  };
};

export default function UserInvestments() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const user = await getUser();

        const { documents } = await databases.listDocuments(
          DB_ID,
          INVESTMENT_COLLECTION,
          [
            Query.equal("userId", user.$id),
            Query.orderDesc("startDate"),
          ]
        );

        // 🔥 Auto-update completed investments in Appwrite
        // interface AppwriteInvestmentDoc {
        //   $id: string;
        //   amount: number | string;
        //   status: string;
        //   startDate: string;
        //   endDate?: string | null;
        //   planId?: string;
        // }

        const updates: Promise<unknown>[] = [];

        documents.forEach((inv) => {
          const today = new Date();
          const endDate = inv.endDate ? new Date(inv.endDate) : null;

          if (endDate && endDate <= today && inv.status !== "completed") {
            updates.push(
              databases.updateDocument(DB_ID, INVESTMENT_COLLECTION, inv.$id, {
                status: "completed",
              })
            );
          }
        });

        if (updates.length > 0) {
          await Promise.all(updates);
        }

        // Now compute local state
        setInvestments(
          documents.map((inv) => {
            const today = new Date();
            const endDate = inv.endDate ? new Date(inv.endDate) : null;

            let computedStatus = inv.status;
            if (endDate && endDate <= today) computedStatus = "completed";

            const matchedPlan = plan.find((p) => p.id === inv.planId) || plan[0];

            return {
              id: inv.$id,
              amount: Number(inv.amount),
              status: computedStatus,
              start_date: inv.startDate,
              end_date: inv.endDate ?? null,
              investment_plans: matchedPlan,
            };
          })
        );

      } catch (err) {
        console.error("Error fetching investments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);


  const getStatusBadge = (status: string) => {
    if (status === "active")
      return <Badge color="info" size="sm">Active</Badge>;
    if (status === "completed")
      return <Badge color="success" size="sm">Completed</Badge>;
    return <Badge color="error" size="sm">{status}</Badge>;
  };

  return (
    <div className="
      overflow-hidden rounded-2xl border border-border/60 
      bg-background/40 backdrop-blur-xl shadow-lg
    ">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[950px]">

          <Table className="text-sm">

            {/* HEADER */}
            <TableHeader className="border-b border-border/40 bg-background/30 backdrop-blur">
              <TableRow>
                {[
                  "Plan",
                  "Amount",
                  "Interest",
                  "Duration",
                  "Status",
                  "Start Date",
                  "End Date",
                ].map((h) => (
                  <TableCell
                    key={h}
                    isHeader
                    className="px-5 py-4 font-medium text-muted-foreground tracking-wide text-xs uppercase"
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* BODY */}
            <TableBody className="divide-y divide-border/20">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(7)].map((__, j) => (
                      <TableCell key={j} className="px-5 py-4">
                        <Skeleton className="h-4 w-full max-w-[100px] rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : investments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-5 py-8 text-center text-muted-foreground"
                  >
                    You have no investments yet.
                  </TableCell>
                </TableRow>
              ) : (
                investments.map((inv) => (
                  <TableRow
                    key={inv.id}
                    className="
                      hover:bg-primary/5 dark:hover:bg-primary/5 
                      transition-colors text-center
                    "
                  >
                    <TableCell className="px-5 py-4 font-medium text-foreground">
                      {inv.investment_plans.name}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-muted-foreground">
                      ${inv.amount.toFixed(2)}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-muted-foreground">
                      {(inv.investment_plans.interest_rate * 100).toFixed(2)}%
                    </TableCell>

                    <TableCell className="px-5 py-4 text-muted-foreground">
                      {inv.investment_plans.duration_days} days
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      {inv.start_date === inv.end_date
                        ? getStatusBadge("completed")
                        : getStatusBadge(inv.status)}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-muted-foreground">
                      {new Date(inv.start_date).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-muted-foreground">
                      {inv.end_date
                        ? new Date(inv.end_date).toLocaleDateString()
                        : "—"}
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
