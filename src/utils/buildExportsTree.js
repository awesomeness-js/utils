export default function buildExportsTree(fileDataList) {

	const flatExports = [];
	const nestedExports = {};

	fileDataList.forEach(({
		parts, functionName, importVarName, jsDocComment 
	}) => {

		if (parts.length === 0) {

			flatExports.push({
				functionName,
				importVarName,
				jsDocComment 
			});
		
		} else {

			let current = nestedExports;

			parts.forEach((part) => {

				if (!current[part]) {

					current[part] = {};
				
				}

				current = current[part];
			
			});
			current[functionName] = {
				importVarName,
				jsDocComment 
			};
		
		}
	
	});
	
	return {
		flatExports,
		nestedExports 
	};

}