"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Calculation, Conversion } from '@/types';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};

export const useHistory = () => {
  const [calculations, setCalculations] = useLocalStorage<Calculation[]>('calculationHistory', []);
  const [conversions, setConversions] = useLocalStorage<Conversion[]>('conversionHistory', []);

  const addCalculation = useCallback((item: Omit<Calculation, 'id' | 'timestamp'>) => {
    const newCalculation: Calculation = {
      ...item,
      id: new Date().toISOString() + Math.random(),
      timestamp: Date.now(),
    };
    setCalculations(prev => [newCalculation, ...prev].slice(0, 100)); // Limit history size
  }, [setCalculations]);

  const addConversion = useCallback((item: Omit<Conversion, 'id' | 'timestamp'>) => {
    const newConversion: Conversion = {
        ...item,
        id: new Date().toISOString() + Math.random(),
        timestamp: Date.now(),
      };
    setConversions(prev => [newConversion, ...prev].slice(0, 100));
  }, [setConversions]);


  const clearCalculations = useCallback(() => {
    setCalculations([]);
  }, [setCalculations]);

  const clearConversions = useCallback(() => {
    setConversions([]);
  }, [setConversions]);

  return {
    calculations,
    conversions,
    addCalculation,
    addConversion,
    clearCalculations,
    clearConversions,
  };
};
