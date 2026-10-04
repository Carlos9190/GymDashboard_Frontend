import { ArrowPathIcon } from "@heroicons/react/24/outline";

type SubmitButtonProps = {
    value: string;
    isLoading?: boolean;
};

export default function SubmitButton({
    value,
    isLoading = false,
}: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-600 p-3 text-xl font-black text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-brand-600"
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <ArrowPathIcon
                        className="h-5 w-5 animate-spin motion-reduce:animate-none"
                        aria-hidden="true"
                    />
                    Loading...
                </span>
            ) : (
                value
            )}
        </button>
    );
}
