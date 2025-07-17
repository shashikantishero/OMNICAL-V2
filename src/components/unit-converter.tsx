"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories, convert } from "@/lib/converters";
import { useHistory } from "@/hooks/use-history";
import { ArrowRightLeft } from "lucide-react";

type CategoryKey = keyof typeof categories;

function ConverterTab({ categoryName }: { categoryName: CategoryKey }) {
  const units = Object.keys(categories[categoryName]);
  const [fromUnit, setFromUnit] = useState(units[0]);
  const [toUnit, setToUnit] = useState(units[1] || units[0]);
  const [value, setValue] = useState("1");
  const { addConversion } = useHistory();

  const result = useMemo(() => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "";
    const convertedValue = convert(numValue, fromUnit, toUnit, categoryName);
    
    if (isNaN(convertedValue)) return "Invalid conversion";
    
    // add to history
    if(numValue > 0) {
        addConversion({
            category: categoryName,
            fromUnit,
            toUnit,
            fromValue: numValue,
            toValue: convertedValue,
        });
    }

    return parseFloat(convertedValue.toPrecision(10)).toString();
  }, [value, fromUnit, toUnit, categoryName, addConversion]);

  return (
    <Card className="border-none shadow-none">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2 space-y-2">
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue placeholder="From unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="text-center">
            <ArrowRightLeft className="mx-auto text-muted-foreground" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue placeholder="To unit" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              readOnly
              value={result}
              className="text-lg font-bold bg-muted"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UnitConverter() {
  const categoryKeys = Object.keys(categories) as CategoryKey[];

  return (
    <Tabs defaultValue={categoryKeys[0]} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {categoryKeys.map((cat) => (
          <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
        ))}
      </TabsList>
      {categoryKeys.map((cat) => (
        <TabsContent key={cat} value={cat}>
          <ConverterTab categoryName={cat} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
