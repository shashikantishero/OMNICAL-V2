import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { GraphPlotter } from '@/components/graph-plotter';

function GraphingPageSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6 h-full flex flex-col">
       <h1 className="text-3xl font-bold mb-6 text-primary">Graph Plotter</h1>
      <div className="space-y-4">
        <Skeleton className="w-full h-24" />
        <Skeleton className="flex-1 min-h-[400px]" />
      </div>
    </div>
  );
}

export default function GraphingPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-primary">Graph Plotter</h1>
       <Suspense fallback={<GraphingPageSkeleton />}>
        <GraphPlotter />
      </Suspense>
    </div>
  );
}
