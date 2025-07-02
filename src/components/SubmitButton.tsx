import { ArrowPathIcon } from "@heroicons/react/24/outline"

type SubmitButtonProps = {
    value: string
    isLoading?: boolean
}

export default function SubmitButton({ value, isLoading = false }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className={`bg-red-600 hover:bg-red-700 transition-colors w-full p-3 text-white font-black text-xl rounded-4xl mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} `}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    Loading...
                </span>
            ) : (
                value
            )}
        </button>
    )
}