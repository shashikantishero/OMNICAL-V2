import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { UnitConverter } from '@/components/unit-converter';

function ConvertersPageSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Unit Converter</h1>
      <Skeleton className="w-full h-[200px] rounded-lg" />
    </div>
  );
}

export default function ConvertersPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Unit Converter</h1>
      <Suspense fallback={<ConvertersPageSkeleton />}>
        <UnitConverter />
      </Suspense>
    </div>
  );
}
