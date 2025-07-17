"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

// A safer evaluation function
const evaluateFunction = (fn: string, x: number): number => {
    try {
        const sanitizedFn = fn
            .replace(/x/g, `(${x})`)
            .replace(/\^/g, '**')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log');

        // eslint-disable-next-line no-new-func
        const result = new Function('return ' + sanitizedFn)();
        return typeof result === 'number' && isFinite(result) ? result : NaN;
    } catch (e) {
        return NaN;
    }
}

const generateDataPoints = (fn: string, min: number, max: number, steps: number) => {
    const data = [];
    const stepSize = (max - min) / steps;
    for (let i = 0; i <= steps; i++) {
        const x = min + i * stepSize;
        const y = evaluateFunction(fn, x);
        if (!isNaN(y)) {
            data.push({ x: parseFloat(x.toPrecision(4)), y: parseFloat(y.toPrecision(4)) });
        }
    }
    return data;
}

export function GraphPlotter() {
    const [func, setFunc] = useState('sin(x)');
    const [xMin, setXMin] = useState('-10');
    const [xMax, setXMax] = useState('10');
    
    const data = useMemo(() => {
        const min = parseFloat(xMin);
        const max = parseFloat(xMax);
        if (isNaN(min) || isNaN(max) || min >= max) return [];
        return generateDataPoints(func, min, max, 200);
    }, [func, xMin, xMax]);

    return (
        <Card className="flex-1 flex flex-col">
            <CardHeader>
                <CardTitle>Function Graph</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-1">
                        <Label htmlFor="function-input">y = f(x)</Label>
                        <Input id="function-input" value={func} onChange={(e) => setFunc(e.target.value)} placeholder="e.g., x^2 or sin(x)" />
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <Label htmlFor="x-min">X Min</Label>
                            <Input id="x-min" type="number" value={xMin} onChange={e => setXMin(e.target.value)} />
                        </div>
                         <div className="space-y-1">
                            <Label htmlFor="x-max">X Max</Label>
                            <Input id="x-max" type="number" value={xMax} onChange={e => setXMax(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="flex-1 min-h-[400px]">
                    <ChartContainer config={{ y: { label: "y", color: "hsl(var(--primary))" } }}>
                        <LineChart
                            data={data}
                            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} />
                            <YAxis />
                            <Tooltip
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Line type="monotone" dataKey="y" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
