import {
	randomBytes, pbkdf2Sync 
} from 'crypto';

// Hash a password using Node.js built-in crypto (no external deps).
export default function hashPassword(password) {

	// Generate a random 16-byte salt
	const salt = randomBytes(16).toString('hex');
	// Derive a 64-byte key using PBKDF2 with 100k iterations (adjust as needed)
	const derivedKey = pbkdf2Sync(password, salt, 100000, 64, 'sha512');
	// Return salt and hash combined as a single string

	return `${salt}::${derivedKey.toString('hex')}`;

}