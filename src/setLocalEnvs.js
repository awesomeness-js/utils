import { readFile } from 'fs/promises';

export default async (localSecretsPath = './secrets/local.env') => {

	// get the file
	let localSecrets = await readFile(localSecretsPath, 'utf8');

	// parse the file
	let lines = localSecrets.split('\n');


	for(let line of lines){

		// skip #
		if(line[0] === '#'){

			continue; 

		}

		let parts = line.split('=');

		if(parts.length === 2){

			// remove \r
			if(parts[1][parts[1].length - 1] === '\r'){

				parts[1] = parts[1].substring(0, parts[1].length - 1);
			
			}
			
			// remove outside single quotes
			if(
				parts[1][0] === "'"
				&& parts[1][parts[1].length - 1] === "'"
			){

				parts[1] = parts[1].substring(1, parts[1].length - 1);
			
			}


			
			process.env[parts[0]] = parts[1];
		
		}
	
	}


};