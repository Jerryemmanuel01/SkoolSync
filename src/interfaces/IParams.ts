export interface IParams<T = any, Q = any, U = any> {
	data: T; // Request body (generic)
	query: Q; // URL parameters/query (generic)
	user: U; // Authenticated user (generic)
	files?: any; // For file uploads
}
