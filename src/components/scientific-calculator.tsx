"use client";

import { useCalculatorEngine } from "@/hooks/use-calculator-engine";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const buttonConfig = [
    { label: "DEG/RAD", type: "mode", grid: "col-span-1" },
    { label: "x²", type: "function", grid: "col-span-1" },
    { label: "x³", type: "function", grid: "col-span-1" },
    { label: "√", symbol: "sqrt", type: "function", grid: "col-span-1" },
    { label: "sin", type: "function", grid: "col-span-1" },
    { label: "cos", type: "function", grid: "col-span-1" },
    { label: "tan", type: "function", grid: "col-span-1" },
    { label: "1/x", type: "function", grid: "col-span-1" },
    { label: "log", type: "function", grid: "col-span-1" },
    { label: "ln", type: "function", grid: "col-span-1" },
    { label: "π", type: "function", grid: "col-span-1" },
    { label: "e", type: "function", grid: "col-span-1" },
    { label: "C", type: "clear", grid: "col-span-1" },
    { label: "⌫", symbol: "backspace", type: "clear", grid: "col-span-1" },
    { label: "%", type: "operator", grid: "col-span-1" },
    { label: "÷", type: "operator", grid: "col-span-1" },
    { label: "7", type: "digit", grid: "col-span-1" },
    { label: "8", type: "digit", grid: "col-span-1" },
    { label: "9", type: "digit", grid: "col-span-1" },
    { label: "×", type: "operator", grid: "col-span-1" },
    { label: "4", type: "digit", grid: "col-span-1" },
    { label: "5", type: "digit", grid: "col-span-1" },
    { label: "6", type: "digit", grid: "col-span-1" },
    { label: "-", type: "operator", grid: "col-span-1" },
    { label: "1", type: "digit", grid: "col-span-1" },
    { label: "2", type: "digit", grid: "col-span-1" },
    { label: "3", type: "digit", grid: "col-span-1" },
    { label: "+", type: "operator", grid: "col-span-1" },
    { label: "±", type: "function", grid: "col-span-1" },
    { label: "0", type: "digit", grid: "col-span-1" },
    { label: ".", type: "decimal", grid: "col-span-1" },
    { label: "=", type: "equals", grid: "col-span-1" },
];

const memoryButtons = [
    { label: "MC", op: "MC" },
    { label: "MR", op: "MR" },
    { label: "M+", op: "M+" },
    { label: "M-", op: "M-" },
];

const getButtonVariant = (type: string) => {
    switch (type) {
        case "digit": return "secondary";
        case "operator": return "outline";
        case "equals": return "default";
        case "clear": return "destructive";
        case "mode": return "ghost";
        default: return "outline";
    }
}

export function ScientificCalculator() {
  const {
    display,
    expression,
    memory,
    angleMode,
    handleDigit,
    handleDecimal,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
    handleScientificFunction,
    handleMemory,
    toggleAngleMode
  } = useCalculatorEngine();

  const handleButtonClick = (btn: typeof buttonConfig[0]) => {
      switch (btn.type) {
        case "digit": handleDigit(btn.label); break;
        case "decimal": handleDecimal(); break;
        case "operator": handleOperator(btn.label); break;
        case "equals": handleEquals(); break;
        case "clear": btn.label === "C" ? handleClear() : handleBackspace(); break;
        case "function": handleScientificFunction(btn.symbol || btn.label); break;
        case "mode": toggleAngleMode(); break;
      }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl h-full flex flex-col border-0 md:border">
      <CardContent className="p-2 md:p-4 flex-1 flex flex-col">
        <div className="bg-muted rounded-lg p-4 mb-2 text-right flex-shrink-0 flex flex-col justify-end min-h-[120px]">
          <div className="text-muted-foreground text-xl h-8 truncate">{expression || ' '}</div>
          <div className="text-foreground text-5xl font-bold truncate" style={{ lineHeight: '1.2' }}>{display}</div>
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2">
            {memory !== 0 && <Badge variant="secondary">M</Badge>}
            <Badge variant="outline" className="uppercase">{angleMode}</Badge>
          </div>
        </div>

        <div className="flex-grow grid grid-cols-4 grid-rows-9 gap-2">
           {memoryButtons.map(btn => (
                <Button key={btn.label} variant="ghost" className="flex-1 text-sm md:text-base h-full" onClick={() => handleMemory(btn.op as any)}>
                    {btn.label}
                </Button>
            ))}
          {buttonConfig.map((btn) => (
            <Button
              key={btn.label}
              className={`text-lg md:text-xl ${btn.grid} h-full`}
              variant={getButtonVariant(btn.type)}
              onClick={() => handleButtonClick(btn)}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
