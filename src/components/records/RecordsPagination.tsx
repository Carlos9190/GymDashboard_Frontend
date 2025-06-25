import { Exercise, RecordList } from "@/types/index"
import { Link } from "react-router-dom"

type RecordsPaginationProps = {
    exerciseId: Exercise['_id']
    page: RecordList['page']
    totalPages: RecordList['totalPages']
}

export default function RecordsPagination({ exerciseId, page, totalPages }: RecordsPaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    return (
        <nav className="flex justify-center flex-wrap gap-2 py-4">
            {page > 1 && (
                <Link
                    to={`/exercises/${exerciseId}?page=${page - 1}`}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm rounded-md ring-1 ring-gray-500 transition-colors focus:outline-none"
                >&laquo;</Link>
            )}

            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    to={`/exercises/${exerciseId}?page=${currentPage}`}
                    className={`${page === currentPage ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"} text-white px-4 py-2 text-sm rounded-md ring-1 ring-gray-500 transition-colors focus:outline-none`}
                >{currentPage}</Link>
            ))}

            {page < totalPages && (
                <Link
                    to={`/exercises/${exerciseId}?page=${page + 1}`}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm rounded-md ring-1 ring-gray-500 transition-colors focus:outline-none"
                >&raquo;</Link>
            )}
        </nav>
    )
}