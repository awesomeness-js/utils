import { createDecipheriv } from 'crypto';

export default function decrypt(encryptedData, key = process.env.AWESOMENESS_ENCRYPTION_KEY) {

	if(!key){

		throw new Error('Encryption key is not set. Please set the AWESOMENESS_ENCRYPTION_KEY environment variable.');
	
	}

	const {
		iv, 
		authTag, 
		cipherText 
	} = encryptedData;
  
	const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'));

	decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
	let decrypted = decipher.update(cipherText, 'hex', 'utf8');

	decrypted += decipher.final('utf8');
  
	return decrypted;

}