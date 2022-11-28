import { useState } from "react"
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorKey } from "./CalculatorKey"

const CalculatorOperations = {
    '/': (prevValue: number, nextValue: number) => prevValue / nextValue,
    '*': (prevValue: number, nextValue: number) => prevValue * nextValue,
    '+': (prevValue: number, nextValue: number) => prevValue + nextValue,
    '-': (prevValue: number, nextValue: number) => prevValue - nextValue,
    '=': (prevValue: number, nextValue: number) => nextValue,
}

export const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState<null | '/' | '*' | '+' | '-' | '='>(null);
    const [value, setValue] = useState<null | number>(null);
    const [isBeforeOperand, setIsBeforeOperand] = useState(false);

    const clearDisplay = () => {
        setDisplayValue(('0'))
        setIsBeforeOperand(false)
    }

    const toggleSign = () => {
        const newValue = parseFloat(displayValue) * -1;
        setDisplayValue(String(newValue));
    }

    const inputPercent = () => {
        const currentValue = parseFloat(displayValue);
        if (currentValue === 0) return;

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
        const newValue = currentValue / 100;
        setDisplayValue(newValue.toFixed(fixedDigits.length + 2))

    }

    const inputDigit = (digit: number) => {
        if (isBeforeOperand) {
            setDisplayValue(String(digit))
            setIsBeforeOperand(false)
        } else {
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit)
        }
    }

    const inputDot = () => {
        if (!/\./.test(displayValue)) {
            setDisplayValue(displayValue + '.')
        }
    }

    const performOperation = (nextOperator: '/' | '*' | '+' | '-' | '=') => {
        const inputValue = parseFloat(displayValue)

        if (value == null) {
            setValue(inputValue);
        } else if (operator) {
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](currentValue, inputValue);
            setValue(newValue);
            setDisplayValue(String(newValue))
        }
        setIsBeforeOperand(true)
        setOperator(nextOperator)
    }


    return (
        <div className="flex flex-col items-center w-full relative max-w-[200px] rounded-lg shadow-light-gray-blue-100 shadow-lg">
            <CalculatorDisplay value={displayValue} />
            <div id="key" className="grid grid-cols-4 min-w-[50%] mb-0">
                <CalculatorKey color="darkGrey" onPress={() => clearDisplay()} label='C' />
                <CalculatorKey color="darkGrey" onPress={() => toggleSign()} label='+/-' />
                <CalculatorKey color="darkGrey" onPress={() => inputPercent()} label='%' />
                <CalculatorKey color="orange" onPress={() => performOperation('/')} label='/' />

                <CalculatorKey color="grey" onPress={() => inputDigit(7)} label='7' />
                <CalculatorKey color="grey" onPress={() => inputDigit(8)} label='8' />
                <CalculatorKey color="grey" onPress={() => inputDigit(9)} label='9' />
                <CalculatorKey color="orange" onPress={() => performOperation('*')} label='x' />

                <CalculatorKey color="grey" onPress={() => inputDigit(4)} label='4' />
                <CalculatorKey color="grey" onPress={() => inputDigit(5)} label='5' />
                <CalculatorKey color="grey" onPress={() => inputDigit(6)} label='6' />
                <CalculatorKey color="orange" onPress={() => performOperation('-')} label='-' />

                <CalculatorKey color="grey" onPress={() => inputDigit(1)} label='1' />
                <CalculatorKey color="grey" onPress={() => inputDigit(2)} label='2' />
                <CalculatorKey color="grey" onPress={() => inputDigit(3)} label='3' />
                <CalculatorKey color="orange" onPress={() => performOperation('+')} label='+' />
            </div>
            <div className="m-0">
                <CalculatorKey color="grey" onPress={() => inputDigit(0)} label='0' />
                <CalculatorKey color="grey" onPress={() => inputDot()} label='.' />
                <CalculatorKey color="orange" onPress={() => performOperation('=')} label='=' />

            </div>
        </div>
    )
}