export const useGetError = (error) => {
	const errorMessage = "API Error, please try again.";

	if (!error.response) {
		console.error(`API ${error.config.url} not found`);
		return errorMessage;
	}
	if (process.env.NODE_ENV === "development") {
		console.error(error.response.data);
		console.error(error.response.status);
		console.error(error.response.headers);
		return error.response.data.errors;
	}
	if (error.response.data && error.response.data.errors) {
		return error.response.data.errors;
	}

	return errorMessage;
};
