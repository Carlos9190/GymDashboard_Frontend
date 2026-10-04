import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRecord, getRecords } from "@/services/RecordService";
import { formatDate } from "@/utils/datesUtils";
import RecordsPagination from "./RecordsPagination";
import Spinner from "@/components/LoadingSpinner";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import { Exercise } from "@/types/index";

type RecordListProps = {
    exerciseId: Exercise["_id"];
};

const cell = "border border-edge px-3 md:px-4 py-2";

export default function RecordList({ exerciseId }: RecordListProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || "1";

    const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["records", `${exerciseId}-${page}`],
        queryFn: () => getRecords({ exerciseId, page }),
        retry: false,
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteRecord,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["records"],
                exact: false,
            });
            toast.success(data?.message);
        },
    });

    if (isLoading) return <Spinner label="Loading records" />;
    if (
        +page <= 0 ||
        (data && data.totalPages > 0 && data.page > data.totalPages)
    )
        return <Navigate to={`/exercises/${exerciseId}`} />;
    if (data)
        return (
            <div className="w-full">
                {data.records.length ? (
                    <div className="overflow-x-auto w-full mt-4">
                        <table className="min-w-full table-auto border-collapse border border-edge text-content text-sm md:text-base">
                            <caption className="sr-only">
                                Logged sets, reps and weight for this exercise
                            </caption>
                            <thead className="bg-surface-raised">
                                <tr>
                                    <th scope="col" className={cell}>
                                        Sets
                                    </th>
                                    <th scope="col" className={cell}>
                                        Reps
                                    </th>
                                    <th scope="col" className={cell}>
                                        Weight
                                    </th>
                                    <th scope="col" className={cell}>
                                        Date
                                    </th>
                                    <th scope="col" className={cell}>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.records.map((record) => (
                                    <tr
                                        key={record._id}
                                        className="text-center odd:bg-surface-card/40"
                                    >
                                        <td className={cell}>{record.sets}</td>
                                        <td className={cell}>{record.reps}</td>
                                        <td className={cell}>
                                            {record.weight} kg
                                        </td>
                                        <td className={cell}>
                                            {formatDate(record.createdAt)}
                                        </td>
                                        <td className={cell}>
                                            <div className="flex justify-center gap-2">
                                                {/* Icon-only controls previously shipped
                                                    with no accessible name at all. */}
                                                <button
                                                    type="button"
                                                    aria-label={`Edit record of ${record.sets}x${record.reps} at ${record.weight} kg`}
                                                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-info transition-colors hover:bg-surface-hover"
                                                    onClick={() =>
                                                        navigate(
                                                            location.pathname +
                                                                `?editRecord=${record._id}`
                                                        )
                                                    }
                                                >
                                                    <PencilSquareIcon
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                                <button
                                                    type="button"
                                                    aria-label={`Delete record of ${record.sets}x${record.reps} at ${record.weight} kg`}
                                                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-danger transition-colors hover:bg-surface-hover"
                                                    onClick={() =>
                                                        setRecordToDelete(
                                                            record._id
                                                        )
                                                    }
                                                >
                                                    <TrashIcon
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <RecordsPagination
                            exerciseId={exerciseId}
                            page={data.page}
                            totalPages={data.totalPages}
                        />
                    </div>
                ) : (
                    <p className="text-center text-content-muted italic py-20">
                        No records yet for this exercise.
                    </p>
                )}

                {/* Deleting a record was the only destructive action in the app
                    that fired straight from the click, with no confirmation. */}
                <ConfirmDeleteModal
                    isOpen={!!recordToDelete}
                    onClose={() => setRecordToDelete(null)}
                    onConfirm={() => {
                        if (recordToDelete) {
                            mutate({ exerciseId, recordId: recordToDelete });
                            setRecordToDelete(null);
                        }
                    }}
                    title="Delete record"
                    description="Are you sure you want to delete this record? This action cannot be undone."
                />
            </div>
        );
}
