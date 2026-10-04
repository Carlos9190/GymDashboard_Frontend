import type { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";

type FloatingFieldProps = {
    id: string;
    label: string;
    type?: string;
    autoComplete?: string;
    error?: string;
    registration: UseFormRegisterReturn;
};

/**
 * Floating-label input shared by the auth views.
 *
 * The label position is driven by `peer-placeholder-shown` rather than a
 * react-hook-form `watch()` call, so typing no longer re-renders the whole
 * form on every keystroke. Errors are wired to the input with `aria-invalid`
 * and `aria-describedby` so assistive tech reads the message with the field.
 */
export default function FloatingField({
    id,
    label,
    type = "text",
    autoComplete,
    error,
    registration,
}: FloatingFieldProps) {
    const errorId = `${id}-error`;

    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                placeholder=" "
                autoComplete={autoComplete}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? errorId : undefined}
                className={`peer w-full rounded-lg border bg-transparent px-3 pt-6 pb-2 text-content transition-colors placeholder:text-transparent ${
                    error ? "border-danger" : "border-edge-strong"
                } focus:border-brand-500`}
                {...registration}
            />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-3 top-1 text-sm text-brand-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-content-subtle peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-400"
            >
                {label}
            </label>
            {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
        </div>
    );
}
