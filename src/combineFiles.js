// main-module/index.js
import { readdirSync, statSync, readFileSync } from 'fs';

function combineFiles(dir, fileType, {
	minify = false,
	processContent = ({ content, path  }) => { return content; },
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
					processContent,
				});  

			} else {

				// is file

				// get file and extension from stuff
				let file = stuff.split('.');
				let ext = file[file.length - 1];


				if(ext === fileType){
					
					let thisData = readFileSync(`${dir}/${stuff}`, 'utf8');

					if(typeof processContent === 'function'){

						thisData = processContent({
							path: `${dir}/${stuff}`,
							content: thisData,
						});

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