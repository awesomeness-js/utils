export default ({
	maxDays = 365,
	minDays = 1,
	future = false
} = {}) => {

	const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;

	const randomTimestamp = future
		? Date.now() + randomDays * 24 * 60 * 60 * 1000
		: Date.now() - randomDays * 24 * 60 * 60 * 1000;

	return new Date(randomTimestamp).toISOString();

};
