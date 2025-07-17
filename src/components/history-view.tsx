"use client";

import { useHistory } from "@/hooks/use-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from 'date-fns';

export function HistoryView() {
    const { calculations, conversions, clearCalculations, clearConversions } = useHistory();

    return (
        <Tabs defaultValue="calculations" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calculations">Calculations</TabsTrigger>
                <TabsTrigger value="conversions">Conversions</TabsTrigger>
            </TabsList>
            <TabsContent value="calculations">
                <Card>
                    <CardHeader>
                        <CardTitle>Calculation History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-96">
                            {calculations.length > 0 ? (
                                <ul className="space-y-4">
                                    {calculations.map(calc => (
                                        <li key={calc.id} className="p-3 bg-muted rounded-md text-sm">
                                            <div className="text-muted-foreground">{calc.expression}</div>
                                            <div className="text-lg font-bold text-primary">= {calc.result}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {formatDistanceToNow(new Date(calc.timestamp), { addSuffix: true })}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground text-center py-10">No calculation history.</p>
                            )}
                        </ScrollArea>
                    </CardContent>
                    {calculations.length > 0 && (
                        <CardFooter>
                            <Button variant="destructive" onClick={clearCalculations}>Clear Calculation History</Button>
                        </CardFooter>
                    )}
                </Card>
            </TabsContent>
            <TabsContent value="conversions">
                <Card>
                    <CardHeader>
                        <CardTitle>Conversion History</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ScrollArea className="h-96">
                            {conversions.length > 0 ? (
                                <ul className="space-y-4">
                                    {conversions.map(conv => (
                                        <li key={conv.id} className="p-3 bg-muted rounded-md text-sm">
                                            <div className="font-semibold">{conv.category}</div>
                                            <div className="text-lg">{conv.fromValue} {conv.fromUnit} <span className="text-primary font-bold">→</span> {conv.toValue} {conv.toUnit}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                {formatDistanceToNow(new Date(conv.timestamp), { addSuffix: true })}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground text-center py-10">No conversion history.</p>
                            )}
                        </ScrollArea>
                    </CardContent>
                    {conversions.length > 0 && (
                        <CardFooter>
                            <Button variant="destructive" onClick={clearConversions}>Clear Conversion History</Button>
                        </CardFooter>
                    )}
                </Card>
            </TabsContent>
        </Tabs>
    );
}
