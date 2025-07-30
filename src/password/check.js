import { pbkdf2Sync } from 'crypto';

// Compare a plain-text password to a stored salt+hash
export default function validatePassword(password, storedHash) {

	const [ salt, originalHash ] = storedHash.split('::');
	const derivedKey = pbkdf2Sync(password, salt, 100000, 64, 'sha512');

  
	return derivedKey.toString('hex') === originalHash;

}

