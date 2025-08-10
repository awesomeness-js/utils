# Nothing Special

Just some <u>zero dependency</u>* utils that every [Awesomeness.js](https://github.com/awesomeness-js) project uses.

**Perfect?** Far from it.

Better than what you have now? For sure.

---

# 🚀 Auto-Generate API Exports for Your Node.js Project  

## 📌 Why "build" Exists  

When you’re building a Node.js project, pulling functions together into a clean, predictable API shouldn’t feel like busywork. But maintaining a manual `index.js` is a waste of time, and Webpack? That’s a browser bundler—great for shipping front-end bundles, useless for building a logical backend export layer.  

This script takes that grunt work off your plate and does it **right**:  

✅ **Consolidates all exports** into a single, perfectly structured API object  
✅ **Keeps function names and namespaces** exactly as your folder structure dictates—no mystery, no guessing  
✅ **Pulls in JSDoc comments** so your documentation is baked right into the build. Intellisense loves this.  
✅ **Runs in plain Node.js**—zero bundlers, zero fluff, zero excuses  


Hint: Use the [Awesomeness Intellitip](https://marketplace.visualstudio.com/items?itemName=awesomeness.awesomeness-intellitip) VS Code Extension for classy hover documentation.


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
│   ├── didYouJustGrabMyAss.js
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
├── menInTights/
│   ├── youGrewBoobs.js
│   ├── merryMen/
│   │   ├── snipTheTip.js
```


#### Use it like:

```js

// Default import: full API
import api from './index.js';

// Use the full API
api.roxbury.didYouJustGrabMyAss();

// perfect for CTRL+F
api.rickyBobby.shakeAndBake();

// deep
api.menInTights.youGrewBoobs();
api.menInTights.merryMen.snipTheTip();

```

```js

// Named import also work
import { youMyBoy, roxbury } from './api.js';

// Use the named group
youMyBoy.blue();
roxbury.didYouGrabMyAss();

```

---

## 💪 Who’s This For?  

- **Teams** who want **clean and consistent** APIs  
- **Expert** ~~developers~~ **architects** obsessed with 
  - organization
  - hierarchy
  - explicit namespacing
  - clean code
- **Champions** who know CTRL+F `app.roxbury.didYouJustGrabMyAss` will <u>always beat</u> any “magic” refactor tool when it comes to finding **every. single. usage.**  
- Developers who refuse to hide functions behind lazy aliases, and instead demand predictable, grep-able APIs that tell you **exactly where the code lives.**

If you want a smarter way to manage and structure exports in a Node.js project — without extra tooling bloat — this script was built for you.

If that makes you hard, you’re in the right place. 

> If it makes you mad… you’ve probably never built a scalable codebase.

---

**Ready to make development great again?**
👉 [awesomenessjs.com](https://awesomenessjs.com)

--- 
✱ disclaimer... *Kinda zero dependencies.*
Zero **prod** dependencies.
> dev dependencies:
> `chokidar` for hot module reloading (HMR) 
> `vitest` for testing