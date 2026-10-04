import { Link } from "react-router-dom";
import { Exercise, RecordList } from "@/types/index";

type RecordsPaginationProps = {
    exerciseId: Exercise["_id"];
    page: RecordList["page"];
    totalPages: RecordList["totalPages"];
};

const WINDOW = 2;

const base =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-3 text-sm sm:text-base font-semibold ring-1 ring-edge-strong transition-colors";

/**
 * Renders a window around the current page instead of every page. The previous
 * version built one link per page, so an exercise with 60 pages of records
 * produced 60 tap targets in the footer.
 */
export default function RecordsPagination({
    exerciseId,
    page,
    totalPages,
}: RecordsPaginationProps) {
    if (totalPages <= 1) return null;

    const from = Math.max(1, page - WINDOW);
    const to = Math.min(totalPages, page + WINDOW);
    const pages = Array.from({ length: to - from + 1 }, (_, i) => from + i);

    const href = (p: number) => `/exercises/${exerciseId}?page=${p}`;

    return (
        <nav
            aria-label="Records pagination"
            className="flex justify-center flex-wrap items-center gap-2 pt-4 mb-4"
        >
            {page > 1 && (
                <Link
                    to={href(page - 1)}
                    aria-label="Previous page"
                    className={`${base} bg-surface-card text-content hover:bg-surface-hover`}
                >
                    <span aria-hidden="true">&laquo;</span>
                </Link>
            )}

            {from > 1 && (
                <span className="px-1 text-content-subtle" aria-hidden="true">
                    …
                </span>
            )}

            {pages.map((currentPage) => {
                const isCurrent = page === currentPage;
                return (
                    <Link
                        key={currentPage}
                        to={href(currentPage)}
                        aria-label={`Page ${currentPage}`}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`${base} ${
                            isCurrent
                                ? "bg-brand-600 text-white hover:bg-brand-700"
                                : "bg-surface-card text-content hover:bg-surface-hover"
                        }`}
                    >
                        {currentPage}
                    </Link>
                );
            })}

            {to < totalPages && (
                <span className="px-1 text-content-subtle" aria-hidden="true">
                    …
                </span>
            )}

            {page < totalPages && (
                <Link
                    to={href(page + 1)}
                    aria-label="Next page"
                    className={`${base} bg-surface-card text-content hover:bg-surface-hover`}
                >
                    <span aria-hidden="true">&raquo;</span>
                </Link>
            )}
        </nav>
    );
}
