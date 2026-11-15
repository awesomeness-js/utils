import { readdirSync, statSync, readFileSync } from 'fs';
import combineNamespacedDir from './utils/combineNamespacedDir.js';
import namespaceInits from './utils/namespaceInits.js';

/**
 * Combines every file of one type in a folder (recursively, sorted) into one string.
 * With namespace, each file's `export default` is assigned to a name from its path:
 * combineFiles(dir, 'js', { namespace: 'app' }) turns state/create.js into app.state.create = function…
 * Namespace defaults: indexIsParent, parentInits, and stripImports are all true.
 * processContent({ content, path, name }) runs after the namespace rewrite.
 */
function combineFiles(dir, fileType, {
	minify = false,
	processContent = ({
		content, path  
	}) => {

		return content; 

	},
	namespace = null,
	indexIsParent = true,
	parentInits = true,
	stripImports = true,
} = {}) {

	if(namespace){

		const options = {
			fileType,
			indexIsParent,
			parentInits,
			stripImports,
			processContent,
		};

		return (parentInits ? namespaceInits({ name: namespace }) : '') + combineNamespacedDir(dir, namespace, options);

	}

	var returnString = "";

	let stuff = readdirSync(dir);

	// sort it
	stuff = stuff.sort();

	stuff.forEach((stuff) => {

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

}


export default combineFiles;
