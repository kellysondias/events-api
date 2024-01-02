export const errorMessage = (
	statusCode: number,
	error: string,
	message: string,
) => ({
	statusCode,
	error,
	message,
});
