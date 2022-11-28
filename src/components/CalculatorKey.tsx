interface Props {
    onPress: () => void;
    color: string;
    label: string;
}
export const CalculatorKey = ({ onPress, color, label }: Props) => {

    return (
        <button onClick={onPress} className={`bg-${color} ${label === '0' ? 'w-[100px]' : 'w-[50px]'} h-[50px] border`}>
            {label}
        </button>
    )
}