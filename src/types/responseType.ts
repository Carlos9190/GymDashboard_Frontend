export type ApiResponse<T = null> = {
    message: string;
    success: boolean;
    data: T;
};
