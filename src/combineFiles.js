// main-module/index.js
import { readdirSync, statSync, readFileSync } from 'fs';

function combineFiles(dir, fileType, {
	minify = false,
	moduleToBrowser = false,
} = {}) {

		var returnString = "";

		let stuff = readdirSync(dir);

		// sort it
		stuff = stuff.sort();
		

		stuff.forEach(stuff => {

			const isDir = statSync(`${dir}/${stuff}`).isDirectory();
			
			if(isDir){

				returnString += combineFiles(`${dir}/${stuff}`, fileType, {
					minify,
					moduleToBrowser,
				});  

			} else {

				// is file

				// get file and extenstion from stuff
				let file = stuff.split('.');
				let ext = file[file.length - 1];


				if(ext === fileType){
					
					let thisData = readFileSync(`${dir}/${stuff}`, 'utf8');

					if(moduleToBrowser){

						// can this file be converted to browser?
						let browserFriendly = thisData.startsWith('export default ');

						if(browserFriendly){
							browserFriendly = thisData.includes('import') === false; // no imports allowed
						}


						if(browserFriendly){

							// strip properly formatted file
							thisData = thisData.replace('export default ', '');	

						} else {
							thisData = "";
						}

					}

					if(minify){
						// todo
					}

					returnString += thisData + " \n ";

				}

			}

		});

		return returnString;

	};

	export default combineFiles;