type ErrorMessageProps = {
    children: React.ReactNode;
    id?: string;
};

/**
 * `role="alert"` so validation failures reach screen readers, and `text-danger`
 * (red-300) instead of red-600 — red-600 only reaches 3.4:1 on the dark shell,
 * under the 4.5:1 required for body-size text.
 */
export default function ErrorMessage({ children, id }: ErrorMessageProps) {
    return (
        <div
            id={id}
            role="alert"
            className="mt-1 text-danger text-sm font-semibold text-left"
        >
            {children}
        </div>
    );
}
