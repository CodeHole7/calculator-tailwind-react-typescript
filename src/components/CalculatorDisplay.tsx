interface Props {
    value: string;
}
export const CalculatorDisplay = ({ value }: Props) => {
    return (
        <div className="w-full text-right p-3 bg-display">
            <h1 className="text-[#fff] text-2xl">
                {value}
            </h1>
        </div>
    )
}