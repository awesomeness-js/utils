export default ({
	min = 1,
	max = 1_000_000,
} = {}) => {

	return Math.floor(Math.random() * (max - min + 1)) + min;
	
};
