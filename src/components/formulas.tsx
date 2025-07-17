"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { physicsFormulas, chemistryFormulas } from "@/lib/formulas";

type Formula = {
    name: string;
    inputs: { name: string, unit: string }[];
    output: { name: string, unit: string };
    calculate: (inputs: number[]) => number;
};

function FormulaCard({ formula }: { formula: Formula }) {
    const [inputValues, setInputValues] = useState<string[]>(Array(formula.inputs.length).fill(''));
    const [result, setResult] = useState<string | null>(null);

    const handleInputChange = (index: number, value: string) => {
        const newValues = [...inputValues];
        newValues[index] = value;
        setInputValues(newValues);
    };

    const calculateResult = () => {
        const numbers = inputValues.map(v => parseFloat(v));
        if (numbers.some(isNaN)) {
            setResult("Invalid input");
            return;
        }
        const res = formula.calculate(numbers);
        setResult(parseFloat(res.toPrecision(10)).toString());
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{formula.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formula.inputs.map((input, index) => (
                    <div key={input.name} className="space-y-1">
                        <Label htmlFor={`${formula.name}-${index}`}>{input.name}</Label>
                        <Input
                            id={`${formula.name}-${index}`}
                            type="number"
                            value={inputValues[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            placeholder={input.unit}
                        />
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
                 <Button onClick={calculateResult}>Calculate</Button>
                {result !== null && (
                    <div className="p-4 bg-muted rounded-lg w-full">
                        <p className="font-semibold">{formula.output.name}:</p>
                        <p className="text-2xl font-bold text-primary">{result} <span className="text-lg text-muted-foreground">{formula.output.unit}</span></p>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

function FormulaCategory({ formulas }: { formulas: Record<string, Formula[]> }) {
    return (
        <div className="space-y-8">
            {Object.entries(formulas).map(([category, formulaList]) => (
                <div key={category}>
                    <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {formulaList.map(f => <FormulaCard key={f.name} formula={f} />)}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function Formulas() {
    return (
        <Tabs defaultValue="physics" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="physics">Physics</TabsTrigger>
                <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            </TabsList>
            <TabsContent value="physics" className="mt-6">
                <FormulaCategory formulas={physicsFormulas} />
            </TabsContent>
            <TabsContent value="chemistry" className="mt-6">
                <FormulaCategory formulas={chemistryFormulas} />
            </TabsContent>
        </Tabs>
    );
}
