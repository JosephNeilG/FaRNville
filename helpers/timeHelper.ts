export const formatSecondsToMinutesSeconds = (
	total_seconds: number
): string => {
	const minutes = Math.floor(total_seconds / 60);
	const seconds = total_seconds % 60;

	return `${minutes}m ${seconds}s`;
};
