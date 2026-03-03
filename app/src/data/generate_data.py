import os
import json

base_path = "d:/Interview_Preperation/Interview_Preperation/app/src/data/"

def generate_react_data():
    content = {
        "virtualDOM": {
            "title": "Virtual DOM & Reconciliation",
            "tree": """
┌─ Virtual DOM Architecture
├─ Core Concepts
│  ├─ React Elements (Plain JS Objects)
│  ├─ Current Tree vs Work-In-Progress Tree
│  └─ Batching Updates
├─ Reconciliation Engine (Diffing)
│  ├─ O(n) Heuristic Algorithm
│  ├─ Component Type Comparison
│  └─ Keyed Elements Matching
└─ DOM Mutation Phase
   ├─ Minimal Browser Layout Thrashing
   └─ Synchronous DOM Patches""",
            "flow": """
State Change (setState) -> Render Phase Triggered
   │
   ├─> 1. React calls component render functions
   ├─> 2. Generates new Virtual DOM Tree (WIP Tree)
   │
   ├─> 3. Reconciliation (The Diffing Phase)
   │     ├─> Compares WIP Tree against Current Tree
   │     ├─> Identifies changed nodes, changed attributes, deleted nodes
   │     └─> Generates a list of Effects (Patches)
   │
   └─> 4. Commit Phase (DOM Mutation)
         ├─> Applies Effects to the actual Browser DOM natively
         └─> Triggers layout/paint in the browser""",
            "mentalModel": "The Virtual DOM is like a lightweight architectural blueprint. When a client requests changes to a building (State Update), you don't immediately tear down walls. You draw a new blueprint (WIP Tree), compare it by holding it over the old blueprint (Reconciliation), circle exactly what changed (Diffing), and then send the construction crew to only knock down and rebuild those specific circled spots (Commit Phase).",
            "questions": [
                "[Basic] What is the Virtual DOM and why is it faster than manipulating the Real DOM directly?",
                "[Intermediate] How does React's rendering batching work, and how did it change in React 18?",
                "[Intermediate] Why is using an array `index` as a `key` considered an anti-pattern in dynamic lists?",
                "[Advanced] Explain the $O(n)$ heuristic algorithm used in React's reconciliation process. What are its two core assumptions?",
                "[Advanced] What is 'Layout Thrashing', and how does the Virtual DOM's Commit Phase specifically prevent it?"
            ],
            "traps": [
                "The Speed Myth: Stating 'The Virtual DOM is faster than the Real DOM'. True answer: The Virtual DOM is inherently slower because it adds an extra calculation step in JS. However, it is faster than *inefficient, unoptimized* Real DOM manipulation because it batches DOM read/writes to prevent Layout Thrashing.",
                "The Index Key Trap: Using `key={index}` on a list where items can be deleted or reordered. This breaks the diffing algorithm, causing React to mutate existing DOM nodes incorrectly instead of destroying/creating them, leading to severe component state bugs.",
                "Shadow DOM Confusion: Confusing the Virtual DOM (a React JS concept) with the Shadow DOM (a Browser Web Component specification for style encapsulation)."
            ],
            "debugScenario": "Scenario: An application renders a complex data grid. When a user types in a separate 'Search' input at the top of the page, the entire data grid freezes for 500ms on every keystroke.\nAction: Use React DevTools Profiler to record the keystroke.\nDiscovery: The 'Search' input state is held at the very top `App` component level. Every keystroke triggers a render of `App`, which completely rebuilds the Virtual DOM for the massive data grid, taking 500ms to diff 10,000 rows.\nFix: Isolated the Search state by moving it down into a dedicated `<SearchBar>` component, or wrapped the `<DataGrid>` in `React.memo()` with stable props so it completely bypasses the diffing phase during typing.",
            "productionInsight": "In high-frequency data applications (like trading dashboards), the Virtual DOM diffing overhead can become a bottleneck. Production apps handle this by structurally isolating rapidly changing state to the absolute lowest leaf components possible, preventing massive Virtual DOM subtrees from even entering the Reconciliation phase.",
            "comparison": {
                "Virtual DOM": "A plain JavaScript object representing the UI. Fast to create and garbage collect.",
                "Real DOM": "A heavy Browser API object (C++ backed). Changing it triggers CSS recalculation and layout repaints.",
                "Reconciliation": "The JS-side phase of comparing Virtual DOMs (Interruptible in Concurrent Mode).",
                "Commit": "The Browser-side phase of applying patches (Synchronous, impossible to interrupt)."
            },
            "resources": [
                {"title": "React Docs: Preserving and Resetting State", "url": "https://react.dev/learn/preserving-and-resetting-state", "type": "official"},
                {"title": "Overreacted: UI as an Afterthought (Dan Abramov)", "url": "https://overreacted.io/ui-as-an-afterthought/", "type": "blog"},
                {"title": "Algomaster: Virtual DOM Internals", "url": "https://algomaster.io/react/virtual-dom", "type": "course"}
            ]
        },
        "fiber": {
            "title": "React Fiber Architecture",
            "tree": """
┌─ React Fiber Architecture
├─ What is a Fiber?
│  ├─ A JavaScript Object representing a Unit of Work
│  ├─ 1:1 mapping to a React Element / DOM Node
│  └─ Linked List structure (child, sibling, return)
├─ Double Buffering Model
│  ├─ Current Tree (Active on screen)
│  └─ WorkInProgress Tree (Drafting the next frame)
├─ Rendering Phases
│  ├─ Render Phase (Asynchronous, Interruptible)
│  └─ Commit Phase (Synchronous, Uninterruptible)
└─ Priority & Scheduling (Lanes)
   ├─ SyncLane (Urgent: Typing, Clicks)
   └─ TransitionLane (Non-urgent: Data fetching, heavy filtering)""",
            "flow": """
SetState() Called -> Update Scheduled via Scheduler (Lane Priority Assigned)
   │
   ├─> 1. Render Phase (beginWork / completeWork)
   │     ├─> React builds the WorkInProgress (WIP) Fiber tree
   │     ├─> Periodically checks `shouldYieldToHost()`
   │     │      ├─> If > 5ms elapsed: PAUSE work, yield back to browser (paint)
   │     │      └─> Browser idle: RESUME work exactly where it left off
   │     └─> Tags Fibers with effect flags (Update, Placement, Deletion)
   │
   ├─> 2. Pre-Commit Phase
   │     └─> `getSnapshotBeforeUpdate` is called
   │
   └─> 3. Commit Phase
         ├─> Flushes all effect flags synchronously to the DOM
         ├─> Swaps Current Tree pointer to the WIP Tree
         └─> Fires `useEffect` / `useLayoutEffect`""",
            "mentalModel": "Pre-Fiber (React 15) was like a chef who, once they started cooking a 10-course meal, could not stop until every dish was done, ignoring burning food or customers calling. React Fiber (React 16+) is a chef that cooks one ingredient (a Fiber), pauses, looks up to see if a VIP customer needs something urgently (Yielding/Priority), serves them quickly, and then resumes the 10-course meal exactly where they left off without losing progress.",
            "questions": [
                "[Basic] What is the primary problem that React Fiber was built to solve?",
                "[Intermediate] How does the Linked List structure of Fiber nodes (child, sibling, return) enable interruptible rendering?",
                "[Intermediate] What is the essential difference between the Render phase and the Commit phase in Fiber?",
                "[Advanced] Explain the Double Buffering technique in Fiber. Why doesn't React just mutate the current Fiber tree?",
                "[Advanced] How do `useTransition` and the Fiber 'Lanes' bitmask model work together to prevent UI blocking?"
            ],
            "traps": [
                "The Async Mutation Trap: Believing that because the Render phase is 'asynchronous/interruptible', the DOM updates asynchronously. The DOM mutation (Commit Phase) is strictly synchronous; only the JS calculations leading up to it are interruptible.",
                "Lifecycle Abuse: Relying on side-effects inside the render body of a component. Because Fiber can pause, throw away, and restart the Render phase multiple times before a commit, side-effects here will fire unpredictably (double-firing in Strict Mode is a hint).",
                "Tree Recreation Myth: Thinking React builds the Fiber tree from scratch. React rigorously recycles the existing Fiber objects from the alternate tree to save memory and GC pressure."
            ],
            "debugScenario": "Scenario: A user scrolls down a long list of heavy image components. The scroll FPS drops to 10 frames per second (massive jank).\nAction: Run Chrome Performance profiler.\nDiscovery: The scroll triggers state updates that force synchronous rendering of heavy components. React 18 is blocking the main thread because the updates are treated as `SyncLane` priority.\nFix: Wrapped the state update driving the heavy list rendering inside `startTransition(() => { ... })`. Fiber assigned this a `TransitionLane` priority, allowing React to yield to the browser's scroll events every 5ms, restoring smooth 60fps scrolling.",
            "productionInsight": "Fiber's architecture is what enables modern complex SPAs to feel native. In production at massive scale (like Facebook.com), there might be 50,000 Fiber nodes. Without Fiber's time-slicing and Lane priority, navigating between complex views would lock the browser tab for whole seconds. By correctly utilizing `Suspense` and `useTransition`, you instruct the Fiber Scheduler on exactly what to prioritize.",
            "comparison": {
                "Stack Reconciler (React 15)": "Call-stack based, recursive, synchronous, impossible to pause.",
                "Fiber Reconciler (React 16+)": "Heap based (Linked List), iterative, interruptible, prioritizable.",
                "beginWork": "Traversing DOWN the tree to create/clone child fibers.",
                "completeWork": "Traversing UP the tree, bubbling up effect tags and properties."
            },
            "resources": [
                {"title": "React Fiber Architecture (Lin Clark)", "url": "https://www.youtube.com/watch?v=ZCuYPiUIONs", "type": "video"},
                {"title": "Inside Fiber: in-depth overview", "url": "https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react", "type": "article"},
                {"title": "React Source Code: ReactFiber.new.js", "url": "https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.new.js", "type": "source"}
            ]
        }
    }
    
    with open(f"{base_path}react.js", "w", encoding='utf-8') as f:
        f.write(f'''export const react = {{
    title: "React Complete Architecture",
    icon: "⚛️",
    description: "Deep dive into React internals, Fiber, Concurrent Mode and advanced patterns",
    topics: {json.dumps(content, indent=4)}
}};''')

def generate_nodejs_data():
    content = {
        "eventLoop": {
            "title": "The Node.js Event Loop & libuv",
            "tree": """
┌─ Node.js Architecture
├─ V8 Engine (Executes JS)
├─ Node.js Bindings (Node API)
└─ libuv (C++ Async I/O Library)
   ├─ Thread Pool (Default 4 threads)
   └─ Event Loop (The 6 Phases)
      ├─ 1. Timers (setTimeout, setInterval)
      ├─ 2. Pending Callbacks (I/O errors)
      ├─ 3. Idle, Prepare (Internal)
      ├─ 4. Poll (Incoming connections, data, fs)
      ├─ 5. Check (setImmediate)
      └─ 6. Close Callbacks (socket.on('close'))""",
            "flow": """
Node Process Starts -> Executes synchronous JS -> Enters Event Loop
   │
   ├─> Microtask Check (NextTick Queue -> Promise Queue)
   │     └─> Executed immediately between EVERY phase
   │
   ├─> Phase 1: Timers
   │     └─> Executes expired `setTimeout` and `setInterval`
   │
   ├─> Microtask Check
   │
   ├─> Phase 4: Poll Phase (The Heavy Lifter)
   │     ├─> Retrieves new I/O events (Network requests, File reads)
   │     ├─> Executes I/O callbacks
   │     └─> If incoming tasks exist, process them. If none, block and wait (if no Timers/Checks pending).
   │
   ├─> Microtask Check
   │
   ├─> Phase 5: Check Phase
   │     └─> Executes `setImmediate` callbacks
   │
   └─> Loop completes cycle -> Process exits if no async ops pending""",
            "mentalModel": "The Node.js Event Loop is a Security Guard doing rounds in a circular building with 6 specific rooms (Phases). The guard MUST enter the rooms in exact order. If they walk into the 'Timers' room, they handle all expired timers. Before walking to the next room, the guard checks their walkie-talkie (process.nextTick / Promises) and MUST handle every walkie-talkie request immediately. They spend majority of their shift sitting in the 'Poll' room waiting for trucks (I/O) to arrive.",
            "questions": [
                "[Basic] Explain the difference between Node.js being 'Single Threaded' and the libuv Thread Pool.",
                "[Intermediate] What is the exact execution order between `process.nextTick()`, `Promise.resolve()`, `setTimeout(..., 0)`, and `setImmediate()`?",
                "[Intermediate] Why was `setImmediate` created when we already have `setTimeout(..., 0)`?",
                "[Advanced] If you block the main thread with a `while(true)` loop, will an incoming HTTP request via Express be handled? Why or why not?",
                "[Advanced] What happens in the 'Poll' phase if the queue is empty but a `setImmediate` has been scheduled?"
            ],
            "traps": [
                "The Timers Trap: Assuming `setTimeout(..., 0)` executes exactly at 0ms. It executes in the Timers phase. Depending on when it was scheduled, a `setImmediate` might actually execute *before* an 0ms timer if both are scheduled inside an I/O cycle.",
                "Promise vs NextTick: Thinking Promises have the highest priority. `process.nextTick` queue is processed completely BEFORE the Promise Microtask queue.",
                "Blocking the Loop: Thinking async/await prevents blocking. `await` yields to the loop, but a 5-second `for` loop *between* awaits completely freezes the Event Loop, dropping concurrent network requests."
            ],
            "debugScenario": "Scenario: Express server handles 500 req/sec fine, but drops to 10 req/sec when users upload profile pictures. CPU is 100%.\nAction: Profile CPU using Chrome DevTools via `--inspect`.\nDiscovery: The application is resizing images synchronously using a JS library inside the route handler. This blocks the Call Stack and the Event Loop for 200ms per image. During those 200ms, the Poll Phase cannot accept incoming TCP connections.\nFix: Shifted the image resizing to a Node.js `Worker Thread` or used a library that offloads the math to the libuv thread pool (like sharp), freeing the main thread to instantly accept more requests.",
            "productionInsight": "In enterprise Node.js, the golden rule is 'Don't Block the Event Loop'. Any CPU-intensive operation (crypto hashing, JSON.parse on 50MB payloads, regex on massive strings, image processing) must be offloaded. Use `UV_THREADPOOL_SIZE` for I/O heavy (dns, fs) loads, but use Worker Threads or external microservices (Go/Rust) for heavy CPU math.",
            "comparison": {
                "process.nextTick": "Highest priority. Fires immediately after current operation, before the Event Loop continues.",
                "Promise.then": "Second highest. Microtask queue. Fires after nextTick queue empties.",
                "setTimeout": "Phase 1. Macrotask. Dependent on system timer granularity.",
                "setImmediate": "Phase 5. Guaranteed to fire instantly after the current Poll phase completes."
            },
            "resources": [
                {"title": "Node.js Docs: The Event Loop", "url": "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick", "type": "official"},
                {"title": "Morning Keynote- Everything You Need to Know About Node.js Event Loop - Bert Belder", "url": "https://www.youtube.com/watch?v=PNa9OMajw9w", "type": "video"}
            ]
        },
        "streams": {
            "title": "Streams & Buffers",
            "tree": """
┌─ Node.js Streams API
├─ Buffer (Memory Management)
│  ├─ Fixed-size chunk of memory outside V8 Heap
│  └─ Handles raw binary data (Uint8Array)
├─ Stream Types
│  ├─ Readable (fs.createReadStream, req)
│  ├─ Writable (fs.createWriteStream, res)
│  ├─ Duplex (TCP Sockets, both read & write)
│  └─ Transform (zlib, crypto, can modify data)
└─ Backpressure Handling
   ├─ highWaterMark (Buffer size limit)
   └─ pause() / resume() / .pipe()""",
            "flow": """
Large File (10GB) -> [Readable Stream] -> Server -> [Writable Stream] -> Client
   │
   ├─> 1. Readable pulls a 64KB `Buffer` chunk from Disk.
   ├─> 2. Pushes chunk to internal buffer queue.
   ├─> 3. Emits 'data' event.
   │
   ├─> 4. `pipe()` forwards the 64KB chunk to the Writable stream (res).
   │     ├─> Writable sends chunk via TCP to client.
   │     ├─> Wait, Client is on bad 3G network!
   │     └─> Writable internal buffer fills up (reaches highWaterMark).
   │
   ├─> 5. BACKPRESSURE TRIGGERED:
   │     ├─> Writable returns `false` inside pipe().
   │     ├─> Readable `.pause()` is called natively. (Disk stops reading).
   │     └─> Memory is saved. Server doesn't crash.
   │
   └─> 6. Client catches up -> Writable buffer drains -> Emits 'drain'.
         └─> Readable `.resume()` is called natively. Disk starts reading again.""",
            "mentalModel": "A Stream is like an assembly line with a conveyor belt and workers. Instead of waiting for 10 million car parts (10GB file) to be dumped into a massive warehouse (RAM) before building the car, parts come down the belt in small boxes (Buffers). If the shipping guy putting cars on the truck (Writable Stream/Client) is too slow, the boxes pile up. To stop the warehouse from exploding (Out of Memory), the shipping guy hits a red button indicating Backpressure, pausing the conveyor belt until he catches up.",
            "questions": [
                "[Basic] What is the difference between reading a file with `fs.readFile()` vs `fs.createReadStream()`?",
                "[Intermediate] What is a Node.js `Buffer`, and why does it exist outside the V8 JavaScript engine heap?",
                "[Intermediate] Explain the concept of 'Backpressure' in network streams. What happens if it's ignored?",
                "[Advanced] How do `Transform` streams differ from `Duplex` streams?",
                "[Advanced] In modern Node.js, `pipeline()` or `stream/promises` is preferred over `.pipe()`. Why?"
            ],
            "traps": [
                "Memory Bombing: Using `Express.raw()` or `fs.readFile` to process video uploads. The entire video is loaded into V8 RAM. 5 users uploading 1GB videos simultaneously will crash the Node process (max 1.4GB default RAM limit).",
                "The `.pipe()` Error Trap: Using `readable.pipe(writable)`. If `readable` throws an error, it does NOT automatically close the `writable` stream. This leaves zombie streams leaking memory. Fix: Always use `stream.pipeline()` which auto-destroys all streams on error.",
                "Encoding Confusion: Logging a Buffer directly prints `<Buffer 48 65 6c 6c 6f>`. You must call `.toString('utf8')` or pass an encoding to the stream to see text."
            ],
            "debugScenario": "Scenario: Production server restarts every 3 hours with `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory`.\nAction: Take a heap dump and analyze Streams.\nDiscovery: The application is proxying download files using `request(url).on('data', chunk => res.write(chunk))`. They did not handle the `res.write` returning `false`. Because the end-users had slow internet, the Node server kept pulling data from S3 faster than it could send it out, buffering gigabytes of data into RAM until crash.\nFix: Replaced event listeners with `stream.pipeline(requestStream, responseStream, err => ...)`, which perfectly manages backpressure and memory.",
            "productionInsight": "Streams are the secret weapon of high-performance Node servers. Any payload expected to be larger than 5MB should be streamed. Modern Node natively supports asynchronous iteration over streams (`for await (const chunk of stream) {}`), which makes reading streams as easy and readable as standard synchronous arrays, while keeping memory profiles completely flat.",
            "comparison": {
                "Buffer": "Raw binary memory. Fast, immutable size. Allocated in C++.",
                "String": "V8 managed memory. Slower for massive binary transfer, takes 2x space (UTF-16 encoding).",
                ".pipe()": "Legacy routing, fails to handle errors safely across chains.",
                "pipeline()": "Modern utility, destroys the whole pipeline if one stream crashes."
            },
            "resources": [
                {"title": "Node.js Stream Module", "url": "https://nodejs.org/api/stream.html", "type": "official"},
                {"title": "Node.js Streams: Everything you need to know (Samer Buna)", "url": "https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/", "type": "article"}
            ]
        }
    }
    
    with open(f"{base_path}nodeExpress.js", "w", encoding='utf-8') as f:
        f.write(f'''export const nodeExpress = {{
    title: "Node.js / Express Core Base",
    icon: "🟢",
    description: "Event loop internals, streams, and backend architecture.",
    topics: {json.dumps(content, indent=4)}
}};''')

def main():
    generate_react_data()
    generate_nodejs_data()
    print("Successfully built script and executed data generation for React and Node.js.")

if __name__ == "__main__":
    main()
