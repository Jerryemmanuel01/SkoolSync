export const VERIFICATION_CODE_LENGTH = 6;
export const VERIFICATION_EXPIRY_MINUTES = 10;

export const generateVerificationCode = (length: number): string => {
	const min = Math.pow(10, length - 1);
	const max = Math.pow(10, length) - 1;
	return Math.floor(min + Math.random() * (max - min)).toString();
};

export const calculateExpiryTime = (minutes: number): Date => {
	return new Date(Date.now() + minutes * 60 * 1000);
};
