import { HistoryView } from "@/components/history-view";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function HistoryPageSkeleton() {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-96" />
      </div>
    );
}

export default function HistoryPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-6 text-primary">History</h1>
        <Suspense fallback={<HistoryPageSkeleton />}>
            <HistoryView />
        </Suspense>
    </div>
  );
}
