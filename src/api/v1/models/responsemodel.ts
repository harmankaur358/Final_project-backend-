/**
 * Interface representing a standard API response.
 * @template T - The type of the data property.
 */
export interface ApiResponse<T> {
    status: string;
    data?: T | null;
    message?: string;
    error?: string;
    code?: string;
}

// Creates a success response object
export const successResponse = <T>(
    data?: T ,
    message: string = "Success"
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

//Creates a error response object
export const errorResponse = <T>(
    message: string = "Error",
    error?: string
): ApiResponse<T> => ({
    status: "error",
    error,
    message,
});
