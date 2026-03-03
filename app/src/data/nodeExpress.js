export const nodeExpress = {
    title: "Node.js / Express Core Base",
    icon: "🟢",
    description: "Event loop internals, streams, and backend architecture.",
    topics: {
    "eventLoop": {
        "title": "The Node.js Event Loop & libuv",
        "tree": "\n\u250c\u2500 Node.js Architecture\n\u251c\u2500 V8 Engine (Executes JS)\n\u251c\u2500 Node.js Bindings (Node API)\n\u2514\u2500 libuv (C++ Async I/O Library)\n   \u251c\u2500 Thread Pool (Default 4 threads)\n   \u2514\u2500 Event Loop (The 6 Phases)\n      \u251c\u2500 1. Timers (setTimeout, setInterval)\n      \u251c\u2500 2. Pending Callbacks (I/O errors)\n      \u251c\u2500 3. Idle, Prepare (Internal)\n      \u251c\u2500 4. Poll (Incoming connections, data, fs)\n      \u251c\u2500 5. Check (setImmediate)\n      \u2514\u2500 6. Close Callbacks (socket.on('close'))",
        "flow": "\nNode Process Starts -> Executes synchronous JS -> Enters Event Loop\n   \u2502\n   \u251c\u2500> Microtask Check (NextTick Queue -> Promise Queue)\n   \u2502     \u2514\u2500> Executed immediately between EVERY phase\n   \u2502\n   \u251c\u2500> Phase 1: Timers\n   \u2502     \u2514\u2500> Executes expired `setTimeout` and `setInterval`\n   \u2502\n   \u251c\u2500> Microtask Check\n   \u2502\n   \u251c\u2500> Phase 4: Poll Phase (The Heavy Lifter)\n   \u2502     \u251c\u2500> Retrieves new I/O events (Network requests, File reads)\n   \u2502     \u251c\u2500> Executes I/O callbacks\n   \u2502     \u2514\u2500> If incoming tasks exist, process them. If none, block and wait (if no Timers/Checks pending).\n   \u2502\n   \u251c\u2500> Microtask Check\n   \u2502\n   \u251c\u2500> Phase 5: Check Phase\n   \u2502     \u2514\u2500> Executes `setImmediate` callbacks\n   \u2502\n   \u2514\u2500> Loop completes cycle -> Process exits if no async ops pending",
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
            {
                "title": "Node.js Docs: The Event Loop",
                "url": "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick",
                "type": "official"
            },
            {
                "title": "Morning Keynote- Everything You Need to Know About Node.js Event Loop - Bert Belder",
                "url": "https://www.youtube.com/watch?v=PNa9OMajw9w",
                "type": "video"
            }
        ]
    },
    "streams": {
        "title": "Streams & Buffers",
        "tree": "\n\u250c\u2500 Node.js Streams API\n\u251c\u2500 Buffer (Memory Management)\n\u2502  \u251c\u2500 Fixed-size chunk of memory outside V8 Heap\n\u2502  \u2514\u2500 Handles raw binary data (Uint8Array)\n\u251c\u2500 Stream Types\n\u2502  \u251c\u2500 Readable (fs.createReadStream, req)\n\u2502  \u251c\u2500 Writable (fs.createWriteStream, res)\n\u2502  \u251c\u2500 Duplex (TCP Sockets, both read & write)\n\u2502  \u2514\u2500 Transform (zlib, crypto, can modify data)\n\u2514\u2500 Backpressure Handling\n   \u251c\u2500 highWaterMark (Buffer size limit)\n   \u2514\u2500 pause() / resume() / .pipe()",
        "flow": "\nLarge File (10GB) -> [Readable Stream] -> Server -> [Writable Stream] -> Client\n   \u2502\n   \u251c\u2500> 1. Readable pulls a 64KB `Buffer` chunk from Disk.\n   \u251c\u2500> 2. Pushes chunk to internal buffer queue.\n   \u251c\u2500> 3. Emits 'data' event.\n   \u2502\n   \u251c\u2500> 4. `pipe()` forwards the 64KB chunk to the Writable stream (res).\n   \u2502     \u251c\u2500> Writable sends chunk via TCP to client.\n   \u2502     \u251c\u2500> Wait, Client is on bad 3G network!\n   \u2502     \u2514\u2500> Writable internal buffer fills up (reaches highWaterMark).\n   \u2502\n   \u251c\u2500> 5. BACKPRESSURE TRIGGERED:\n   \u2502     \u251c\u2500> Writable returns `false` inside pipe().\n   \u2502     \u251c\u2500> Readable `.pause()` is called natively. (Disk stops reading).\n   \u2502     \u2514\u2500> Memory is saved. Server doesn't crash.\n   \u2502\n   \u2514\u2500> 6. Client catches up -> Writable buffer drains -> Emits 'drain'.\n         \u2514\u2500> Readable `.resume()` is called natively. Disk starts reading again.",
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
            {
                "title": "Node.js Stream Module",
                "url": "https://nodejs.org/api/stream.html",
                "type": "official"
            },
            {
                "title": "Node.js Streams: Everything you need to know (Samer Buna)",
                "url": "https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/",
                "type": "article"
            }
        ]
    }
}
};