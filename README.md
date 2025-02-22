# Nothing Special

Just some <u>zero dependency</u> utils ...


---

# 🚀 Auto-Generate API Exports for Your Node.js Project  


## 📌 Why "build" Exists  

When working on a Node.js project, you often need to import multiple functions from a directory and structure them in a clean, accessible way. Webpack is overkill for this—it’s designed for browser bundling, not for generating structured API exports in a Node.js environment.  

This script **automates** that process. It dynamically scans your source directory (`./src`), imports functions, and generates an `index.js` file that:  

✅ **Consolidates all exports** into a structured API object.  
✅ **Preserves function names and namespaces** based on folder structure.  
✅ **Extracts JSDoc comments** for better documentation.  
✅ **Works in plain Node.js**—no need for Webpack or extra dependencies.  

---

## 🚀 Why Use "build" Instead of Webpack?  

**Webpack is great for frontend bundling, but it’s not ideal for this use case.** Here’s why this script is a better choice:  

✔ **Zero dependencies**—Runs in plain Node.js, no Webpack or config files required.  
✔ **Automatic function export generation**—No need to manually update an `index.js`.  
✔ **JSDoc extraction**—Includes comments directly in the generated file.  
✔ **Simple and predictable**—You control how exports are structured.  
✔ **Namespace support**—Uses folder structure to organize functions logically.  

With this script, you can stop wasting time managing exports and focus on writing code.  

---

## ⚡ How It Works  

1. **Scans** the `./src` directory for `.js` files.  
2. **Generates** import statements dynamically.  
3. **Creates** an API object that mirrors your folder structure.  
4. **Extracts JSDoc comments** from each file and attaches them to the exports.  
5. **Outputs** a clean, structured `index.js` file, ready to use.  

---

## 🔧 Usage  

Simply run:  

By default, this will:  
- Scan `./src` for JavaScript files  
- Generate an `index.js` file  
- Structure exports based on your folder hierarchy  

```javascript

import { build } from '@awesomeness-js/utils';

build();

```

If you need custom paths, modify the `src` and `dest` options in the script:  

```javascript

import { build } from '@awesomeness-js/utils';

build({
    src: './my-functions',
    dest: './api.js'
});
```

---

## 📜 Example Output  

If your folder structure looks like this:  

```
src/
│── utils/
│   ├── formatDate.js
│   ├── generateId.js
│── services/
│   ├── fetchData.js
│── calculate.js
```

Your generated `index.js` will look like this:  

```javascript
/**
 * This file is auto-generated by the build script.
 * It consolidates API functions for use in the application.
 * Do not edit manually.
 */

import utils_formatDate from './src/utils/formatDate.js';
import utils_generateId from './src/utils/generateId.js';
import services_fetchData from './src/services/fetchData.js';
import calculate from './src/calculate.js';

export { calculate };
export default {
    utils: {
        formatDate: utils_formatDate,
        generateId: utils_generateId
    },
    services: {
        fetchData: services_fetchData
    },
    calculate
};
```

Your api is now neatly organized and ready to use!
and will look like this
```javascript
import { calculate } from './api.js';
const result = calculate(5, 10);
console.log(result);
```

or 

```javascript
import { utils } from './api.js';
const id = utils.generateId();
console.log(id);
```



---

## 🚀 Who Should Use This?  

- **Node.js developers** who want automatic API exports.  
- **Backend teams** managing large function directories.  
- **Anyone tired of manually updating `index.js` files.**  

If you don’t need Webpack’s **complexity** but want **automatic structured exports**, this script is for you.  

👉 **Try it out and let automation handle your exports!** 🚀  

