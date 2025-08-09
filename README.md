# Nothing Special

Just some <u>cleanly generated API exports</u> for your Node.js utils...

---

# 🚀 Auto-Generate API Exports for Your Node.js Project  

## 📌 Why "build" Exists  

When working on a Node.js project, you often need to import multiple functions from a directory and structure them in a clean, accessible way. Webpack is overkill for this—it’s designed for browser bundling, not for generating structured API exports in a Node.js environment. 

This script **automates** the process of maintaining your `index.js` file. It scans your source directory (`./src`), imports functions, and generates an output that:  

✅ **Consolidates all exports** into a structured API object  
✅ **Preserves function names and namespaces** based on folder structure.  
✅ **Extracts JSDoc comments** for better documentation.  
✅ **Works in plain Node.js**—no need for Webpack or extra dependencies.   

---

## 💡 Why Use This Over Webpack or Manual Indexing?  

Webpack is a great bundler, but it’s not suited for building a structured export layer for backend code. This script offers a focused, ergonomic solution:  

✔ **Automatic export generation** — no more maintaining `index.js` by hand  
✔ **JSDoc extraction**—Includes comments directly in the generated file.  
✔ **Simple and predictable**—You control how exports are structured.  
✔ **Namespace support**—Uses folder structure to organize functions logically.  
✔ **Minimal setup** — one line to generate your exports  
✔ **Dev-friendly hot rebuild** — optional file watching with HMR-style rebuilds  

> Uses `chokidar` under the hood for reliable cross-platform file watching.

---

## ⚙️ How It Works  

1. **Scans** the `./src` directory for `.js` files  
2. **Generates** import statements  
3. **Creates** an API object that mirrors your folder structure.  
4. **Extracts JSDoc comments** from each file and attaches them to the exports.  
5. **Outputs** a clean, structured `index.js` file, ready to use.  

---

## 🔧 Usage  

To run it:

```js
import build from '@awesomeness-js/utils/build.js';

await build();
```

This will:
- Scan the `./src` directory
- Create or overwrite `./index.js`
- Structure exports based on your file and folder layout

Customize it:

```js
await build({
  src: './my-functions',
  dest: './api.js',
  includeComments: true,
  useTabs: true,
  hotModuleReload: true // Enable hot reload for dev  
});
```

---

## 📦 Example Output  

Given this folder structure:

```
src/
├── roxbury/
│   ├── didYouGrabMyAss.js
│   ├── areYouGuysBrothers.js
├── bros/
│   ├── didWeJustBecomeBestFriends.js
│   ├── prestigeWorldwide.js
├── rickyBobby/
│   ├── iWakeUpAndPissExcellence.js
│   ├── iRaiseWinners.js
│   ├── shakeAndBake.js
├── oldSchool/
│   ├── youMyBoyBlue.js
├── news/
│   ├── thatEscalatedQuickly.js
│   ├── stayClassy.js
│   ├── milkWasABadChoice.js
├── tommy/
│   ├── roomService.js
│   ├── fatGuyInALittleCoat.js

```


Use it like:

```js

// Default import: full API
import api from './index.js';

// Use the full API
api.roxbury.didYouGrabMyAss();
api.bros.didWeJustBecomeBestFriends();
api.rickyBobby.shakeAndBake();
api.news.stayClassy();
api.tommy.fatGuyInALittleCoat();
```

```js

// Named import also work
import { youMyBoy, roxbury } from './api.js';

// Use the named group
youMyBoy.blue();
roxbury.didYouGrabMyAss();

```

---

## 👤 Who’s This For?  

- **Node.js developers** managing a growing set of internal functions  
- **Teams** who want clean and consistent APIs  
- **Anyone tired of rewriting or syncing `index.js` manually**  

If you want a smarter way to manage and structure exports in a Node.js project — without extra tooling bloat — this script was built for you.

---

### 🛠️ Requirements

- Node.js v18+
- One runtime dependency: [`chokidar`](https://github.com/paulmillr/chokidar) (for `hotModuleReload` mode)

---

👉 **Try it out — your exports will never be out of sync again.**