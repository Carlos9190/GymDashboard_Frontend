import { Link } from "react-router-dom";
import { Exercise, RecordList } from "@/types/index";

type RecordsPaginationProps = {
    exerciseId: Exercise["_id"];
    page: RecordList["page"];
    totalPages: RecordList["totalPages"];
};

export default function RecordsPagination({
    exerciseId,
    page,
    totalPages,
}: RecordsPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <nav className="flex justify-center flex-wrap gap-2 pt-4 mb-4">
            {page > 1 && (
                <Link
                    to={`/exercises/${exerciseId}?page=${page - 1}`}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md ring-1 ring-gray-500 transition-colors"
                >
                    &laquo;
                </Link>
            )}

            {pages.map((currentPage) => (
                <Link
                    key={currentPage}
                    to={`/exercises/${exerciseId}?page=${currentPage}`}
                    className={`${
                        page === currentPage
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-700 hover:bg-gray-600"
                    } text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md ring-1 ring-gray-500 transition-colors`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    to={`/exercises/${exerciseId}?page=${page + 1}`}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md ring-1 ring-gray-500 transition-colors"
                >
                    &raquo;
                </Link>
            )}
        </nav>
    );
}
