type SpinnerProps = {
    label?: string;
};

export default function Spinner({ label = "Loading" }: SpinnerProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            className="flex justify-center items-center w-full py-10"
        >
            <div className="w-10 h-10 border-4 border-edge border-t-brand-500 rounded-full animate-spin motion-reduce:animate-none" />
            <span className="sr-only">{label}</span>
        </div>
    );
}
