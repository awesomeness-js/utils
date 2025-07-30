import {
	randomBytes, createCipheriv 
} from 'crypto';


// Encrypt plaintext using AES-256-GCM
export default function encrypt(plainText, key = process.env.AWESOMENESS_ENCRYPTION_KEY) {

	if(!key){

		throw new Error('Encryption key is not set. Please set the AWESOMENESS_ENCRYPTION_KEY environment variable.');
	
	}

	// GCM typically uses a 12- or 16-byte IV/nonce
	const iv = randomBytes(12);

	const cipher = createCipheriv('aes-256-gcm', key, iv);
	let encrypted = cipher.update(plainText, 'utf8', 'hex');

	encrypted += cipher.final('hex');

	// GCM provides an auth tag, which is required for decryption
	const authTag = cipher.getAuthTag().toString('hex');

	// Return all parts needed for safe decryption
	return {
		iv: iv.toString('hex'),
		authTag,
		cipherText: encrypted
	};

}

