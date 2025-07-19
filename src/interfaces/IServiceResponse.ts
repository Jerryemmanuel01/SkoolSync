// Standard response interface with generic data type
export interface IServiceResponse<T = any> {
	success: boolean;
	message: string;
	data: T | null;
}
