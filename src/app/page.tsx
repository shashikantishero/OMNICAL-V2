"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ScientificCalculator = dynamic(() => import('@/components/scientific-calculator').then(mod => mod.ScientificCalculator), {
  ssr: false,
});

function CalculatorSkeleton() {
    return (
        <div className="w-full max-w-md mx-auto h-full flex flex-col">
             <div className="bg-muted rounded-lg p-4 mb-4 flex flex-col justify-end flex-shrink-0 min-h-[120px]">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-12 w-1/2 self-end" />
             </div>
             <div className="flex-grow grid grid-cols-4 gap-2">
                {Array.from({ length: 36 }).map((_, i) => (
                    <Skeleton key={i} className="h-full" />
                ))}
             </div>
        </div>
    )
}


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-2 md:p-6 h-full overflow-hidden">
       <Suspense fallback={<CalculatorSkeleton />}>
        <ScientificCalculator />
      </Suspense>
    </div>
  );
}
