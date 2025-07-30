import { createHash } from 'crypto';

function md5(data) {

	return createHash('md5').update(data).digest('hex');

}

export default md5;