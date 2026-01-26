export default ({
	minLength = 5,
	maxLength = 10,
} = {}) => {

	const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

	return Math.random().toString(36).substring(2, 2 + length);

};
