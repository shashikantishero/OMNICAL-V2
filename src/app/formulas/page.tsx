import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Formulas } from '@/components/formulas';

function FormulasPageSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Formulas</h1>
      <div className="space-y-4">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-48" />
        <Skeleton className="w-full h-48" />
      </div>
    </div>
  );
}

export default function FormulasPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-6 text-primary">Formulas</h1>
       <Suspense fallback={<FormulasPageSkeleton />}>
        <Formulas />
      </Suspense>
    </div>
  );
}
