"use client";

import { useState } from 'react';
import { useHistory } from './use-history';

// A safer evaluation function using the Function constructor
const safeEval = (expr: string) => {
  try {
    // eslint-disable-next-line no-new-func
    return new Function('return ' + expr)();
  } catch (error) {
    return 'Error';
  }
};

export const useCalculatorEngine = () => {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [isResult, setIsResult] = useState(false);
  const [awaitingOperand, setAwaitingOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const { addCalculation } = useHistory();

  const handleDigit = (digit: string) => {
    if (isResult || awaitingOperand) {
      setDisplay(digit);
      setExpression(prev => prev + digit);
      setIsResult(false);
      setAwaitingOperand(false);
    } else {
      setDisplay(prev => (prev === '0' ? digit : prev + digit));
      setExpression(prev => (prev === '0' ? digit : prev + digit));
    }
  };
  
  const handleDecimal = () => {
    if (isResult || awaitingOperand) {
        setDisplay('0.');
        setExpression(prev => prev + '0.');
        setIsResult(false);
        setAwaitingOperand(false);
    } else if (!display.includes('.')) {
        setDisplay(prev => prev + '.');
        setExpression(prev => prev + '.');
    }
  };

  const handleOperator = (op: string) => {
    if (expression.slice(-1) === ' ') {
      // Replace the last operator
      setExpression(prev => prev.slice(0, -3) + ` ${op} `);
      return;
    }
    setExpression(prev => `${prev} ${op} `);
    setIsResult(false);
    setAwaitingOperand(true);
  };
  
  const handleEquals = () => {
    if (!expression || expression.slice(-1) === ' ' || awaitingOperand) return;
    
    let sanitizedExpression = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '/100 *')
      .replace(/\^/g, '**');

    const result = safeEval(sanitizedExpression);
    
    if (result !== 'Error' && isFinite(result)) {
      const finalResult = parseFloat(result.toPrecision(15)).toString();
      addCalculation({ expression, result: finalResult });
      setDisplay(finalResult);
      setExpression(finalResult);
      setIsResult(true);
    } else {
      setDisplay('Error');
      setExpression('');
      setIsResult(true);
    }
    setAwaitingOperand(false);
  };

  const handleClear = () => {
    setExpression('');
    setDisplay('0');
    setIsResult(false);
    setAwaitingOperand(false);
  };
  
  const handleBackspace = () => {
    if (isResult || awaitingOperand) return;
    if (display.length === 1) {
        setDisplay('0');
    } else {
        setDisplay(prev => prev.slice(0, -1));
    }
    setExpression(prev => prev.slice(0, -1) || '');
  };

  const handleScientificFunction = (fn: string) => {
    let currentVal = parseFloat(display);
    if (isNaN(currentVal)) return;

    let result;
    let funcExpression = `${fn}(${display})`;

    const toRad = (deg: number) => deg * (Math.PI / 180);
    const value = angleMode === 'deg' && ['sin', 'cos', 'tan'].includes(fn) ? toRad(currentVal) : currentVal;

    switch (fn) {
        case 'sin': result = Math.sin(value); break;
        case 'cos': result = Math.cos(value); break;
        case 'tan': result = Math.tan(value); break;
        case 'log': result = Math.log10(currentVal); break;
        case 'ln': result = Math.log(currentVal); break;
        case 'sqrt': result = Math.sqrt(currentVal); funcExpression = `√(${display})`; break;
        case 'x²': result = Math.pow(currentVal, 2); funcExpression=`${display}^2`; break;
        case 'x³': result = Math.pow(currentVal, 3); funcExpression=`${display}^3`; break;
        case '1/x': result = 1 / currentVal; funcExpression=`1/(${display})`; break;
        case 'π': 
          result = Math.PI; 
          funcExpression=`π`; 
          setDisplay(result.toString()); 
          setExpression(result.toString()); 
          setIsResult(true); 
          setAwaitingOperand(false);
          return;
        case 'e': 
          result = Math.E; 
          funcExpression=`e`;
          setDisplay(result.toString());
          setExpression(result.toString());
          setIsResult(true);
          setAwaitingOperand(false);
          return;
        case '±': 
          result = -currentVal; 
          // Find the start of the current number in the expression and negate it
          const parts = expression.split(' ');
          const lastPart = parts.pop() || '';
          if (!isNaN(parseFloat(lastPart))) {
            const newLastPart = (parseFloat(lastPart) * -1).toString();
            setExpression([...parts, newLastPart].join(' '));
          }
          setDisplay(result.toString());
          setAwaitingOperand(false);
          return;
        default: result = currentVal;
    }

    if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
        setExpression('');
    } else {
        const finalResult = parseFloat(result.toPrecision(15)).toString();
        addCalculation({ expression: funcExpression, result: finalResult });
        setDisplay(finalResult);
        setExpression(finalResult);
    }
    setIsResult(true);
    setAwaitingOperand(false);
  };
  
  const handleMemory = (op: 'M+' | 'M-' | 'MR' | 'MC') => {
    const currentValue = parseFloat(display);
    if (isNaN(currentValue) && op !== 'MR' && op !== 'MC') return;

    switch (op) {
        case 'M+': setMemory(prev => prev + currentValue); break;
        case 'M-': setMemory(prev => prev - currentValue); break;
        case 'MR': 
            setDisplay(memory.toString());
            setExpression(prev => prev + memory.toString());
            setAwaitingOperand(false);
            break;
        case 'MC': setMemory(0); break;
    }
    setIsResult(true);
  };

  const toggleAngleMode = () => {
    setAngleMode(prev => (prev === 'deg' ? 'rad' : 'deg'));
  };

  return {
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
  };
};
