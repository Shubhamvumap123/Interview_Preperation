export const nodeExpress = {
    // Node.js Deep Internals
    nodejs: {
        title: "Node.js Deep Internals",
        icon: "🟢",
        description: "Complete Node.js architecture and performance optimization",
        topics: {
            "v8Engine": {
                title: "V8 & Node.js Internals (Isolates)",
                tree: `
┌─ V8 Isolate (Instance)
├─ Heap Partitioning
│  ├─ New Space (Scavenger GC)
│  ├─ Old Space (Mark-Sweep-Compact)
│  └─ Large Object Space / Code Space
├─ V8 Contexts (Sandboxing)
├─ Ignition (Bytecode Interpreter)
└─ TurboFan (Speculative Optimizer)`,
                flow: `
JS Code → [Isolate] → [Parser] → [Ignition] → [Profiler] → [TurboFan]
│
├─ 1. Isolates vs Contexts:
│  ├─ Isolate: A complete V8 instance (Heap + Stack). No shared memory.
│  └─ Context: A global scope within an Isolate.
│
├─ 2. Hidden Classes (Shapes):
│  └─ V8 maps objects to 'Shapes' for fast property lookup (O(1)).
│
├─ 3. Speculative Optimization:
│  └─ TurboFan assumes types based on profiling. 
│     If types change, 'Deoptimization' occurs (Expensive).
│
└─ 4. Orinoco GC:
   └─ Parallel, incremental, and concurrent collection to reduce pause times.`,
                mentalModel: "Think of a V8 Isolate as a 'Standalone Computer'. It has its own RAM (Heap) and CPU cycles. Multiple Isolate instances can run in one Node.js process (Worker Threads), but they NEVER share memory directly. They communicate via serialization, keeping the system 'Shared-Nothing' and memory-safe.",
                questions: [
                    "[Basic] What is a V8 Isolate and how does it relate to Worker Threads?",
                    "[Intermediate] Explain the difference between 'Hidden Classes' and 'Inline Caching'.",
                    "[Intermediate] Why is 'Deoptimization' a performance killer in Node.js?",
                    "[Advanced] How does V8 manage the 'Old Space' differently from the 'New Space'?",
                    "[Advanced] What is Pointer Tagging in V8's memory management?"
                ],
                traps: [
                    "Worker Thread Shared Memory Myth: Thinking all Worker Threads share the same heap. Each thread gets its OWN complete V8 Isolate. Use `SharedArrayBuffer` for true shared memory if absolutely required.",
                    "Shape Destruction: Changing object shapes by adding properties dynamically in random order. V8 relies on predictable property access. `obj.a = 1; obj.b = 2` creates a different 'Shape' than `obj.b = 2; obj.a = 1`. This ruins Inline Caching and bails out to slow dictionary lookups.",
                    "The Delete Keyword: Using `delete obj.property`. This instantly turns the highly optimized object 'Shape' into a slow 'dictionary mode', drastically killing property lookup performance. Substitute by setting the value to `null` or `undefined`."
                ],
                debugScenario: "Scenario: An image processing API function runs 10x slower after 1 hour of uptime.\nAction: Checked `--trace-opt` and `--trace-deopt` flags in V8.\nDiscovery: The function was initially 'Optimized' by TurboFan because it always received integers. An hour later, a client sent a float (`10.5`), causing a severe 'Deoptimization' bailout loop, discarding all machine code back to bytecode.\nFix: Ensure rigid type stability in hot 'megamorphic' functions using TypeScript schemas or explicit type casting before arithmetic operations.",
                productionInsight: "In CPU-bound Node.js microservices, monitoring `V8.OptimizedCode` vs `V8.DeoptimizedCode` metrics is essential. Enterprise services often use the `--max-old-space-size` flag to strictly define heap limits (preventing swap thrashing on Kubernetes pods) and carefully size worker pools to keep garbage collection pauses (Stop-The-World) under 50ms.",
                comparison: {
                    "Isolate": "Heavyweight. Full JS engine instance (Heap + Execution stack).",
                    "Context": "Lightweight. Just a sandboxed global scope object.",
                    "Ignition": "Fast startup, low memory footprint interpreter.",
                    "TurboFan": "Peak performance JIT compiler, high memory and CPU cost during compilation."
                },
                resources: [
                    { "title": "V8 Engine Blog: Background", "url": "https://v8.dev/blog", "type": "official" },
                    { "title": "Node.js Architecture: V8 Isolates", "url": "https://nodejs.org/en/docs/guides/dont-block-the-event-loop", "type": "official" }
                ]
            },
            "eventLoop": {
                title: "Event Loop & Libuv Internals",
                tree: `
┌─ The 6 Main Phases
├─ 1. Timers (setTimeout, setInterval)
├─ 2. Pending Callbacks (I/O errors)
├─ 3. Idle / Prepare (Internal)
├─ 4. Poll (Incoming I/O, Connections)
├─ 5. Check (setImmediate)
├─ 6. Close Callbacks (socket.on('close'))
└─ Libuv Worker Pool (Files, DNS, Crypto)`,
                flow: `
Loop Start → [Timers] → [I/O] → [Poll] → [Check] → [Close] → [Repeat]
│
├─ 1. The Microtask Gap:
│  └─ process.nextTick and Promises are processed BETWEEN EVERY PHASE.
│
├─ 2. The Poll Phase:
│  ├─ If loop is empty, it BLOCKS and waits for I/O.
│  └─ If setImmediate exists, it moves to 'Check' phase immediately.
│
├─ 3. Libuv Thread Pool:
│  └─ Default 4 threads. Handles 'Blocking' OS calls (fs, crypto, zlib).
│
└─ 4. UV_THREADPOOL_SIZE:
   └─ Increasing this is crucial for high-throughput file/crypto servers.`,
                mentalModel: "The Event Loop is like a 'Security Guard' walking a specific path (the 6 phases). If he sees a task on his path (e.g. at the 'Timer' station), he does it. If he is at the 'Poll' station and has nothing to do, he waits there for the phone to ring (Incoming I/O). The Microtask queue is like a 'Walkie-Talkie' - if it goes off, he STOPS everything he's doing to answer it immediately, no matter where he is on his path.",
                questions: [
                    "[Basic] Explain the order of execution between `process.nextTick`, `Promise`, and `setImmediate`.",
                    "[Intermediate] What happens in the 'Poll' phase of the Event Loop?",
                    "[Intermediate] How does `UV_THREADPOOL_SIZE` affect `fs` module performance?",
                    "[Advanced] Why is Node.js I/O considered 'single-threaded' but 'asynchronous'?",
                    "[Advanced] Explain 'I/O Starvation' in the context of the Event Loop."
                ],
                traps: [
                    "Trap: Thinking `setImmediate` and `setTimeout(0)` are the same. Inside I/O callbacks, `setImmediate` ALWAYS runs first because the I/O callback executes in the Poll phase, and the Check phase is immediately next.",
                    "Trap: Heavy computation in a `Promise/nextTick`. This completely blocks the Event Loop from moving to the next phase, causing network connections to timeout.",
                    "Trap: Thinking all async functions use the thread pool. Network I/O (epoll/kqueue) is native OS async and DOES NOT use threads. Only fs, crypto, dns.lookup, and zlib use the thread pool."
                ],
                debugScenario: "Scenario: An Express API becomes completely unresponsive, but server CPU is perfectly fine (1%).\nDebug: An I/O callback was accidentally pushed into an infinite `process.nextTick` recursive loop. The Event loop processed Microtasks endlessly between phases, meaning it never advanced to the 'Poll' phase to accept new TCP socket connections. Fix: Swap `nextTick` with `setImmediate` to allow breaking the execution loop.",
                productionInsight: "At massive scale, Libuv uses 'epoll' (Linux) or 'kqueue' (macOS) for network sockets. This provides O(1) event notification rather than O(n) polling, allowing a single Node.js thread to manage 100k+ concurrent websockets with negligible overhead. Ensure you aren't blocking it with regex validations.",
                comparison: {
                    "process.nextTick": "Highest Priority. Fires immediately after current operation.",
                    "Promise.resolve": "Microtask Queue. Fires after nextTick queue empties.",
                    "setImmediate": "Executes in the Check phase (End of loop).",
                    "setTimeout": "Executes in the Timers phase (Start of loop)."
                },
                resources: [
                    { "title": "Morning Keynote- Event Loop - Bert Belder", "url": "https://www.youtube.com/watch?v=PNa9OMajw9w", "type": "video" },
                    { "title": "Node.js Guide: Event Loop", "url": "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick", "type": "official" }
                ]
            },
            "streams": {
                title: "Streams & Backpressure",
                tree: `
┌─ Stream Types (Buffer Management)
├─ Readable Streams (req, fs.createReadStream)
│  ├─ events: 'data', 'end', 'error'
│  └─ flowing vs paused state
├─ Writable Streams (res, fs.createWriteStream)
│  ├─ write() returns boolean
│  └─ events: 'drain', 'finish'
├─ Duplex Streams
│  └─ TCP Sockets (Read and write independently)
└─ Transform Streams
   └─ zlib, crypto (Modifies data in transit)`,
                flow: `
Source (Disk) → Readable Stream → Buffer [Water Limit] → Writable Stream (Network)
│
├─ 1. Buffer Fills:
│  └─ Readable stream pushes data chunks into the Writable's internal Buffer.
│
├─ 2. highWaterMark Hit:
│  └─ Buffer hits 64KB limit. Writable.write() returns FALSE. 
│
├─ 3. BACKPRESSURE:
│  ├─ Source MUST be paused mechanically (Readable.pause()).
│  └─ If ignored, memory balloons until process crashes (OOM).
│
└─ 4. Drain Event:
   └─ Writable flushes to network. 'drain' emitted. Resume source.`,
                mentalModel: "Streams are like an assembly line conveyor belt. Instead of dumping 10 million car parts (10GB file) onto the floor (RAM) at once, parts come down the belt in boxes (Buffers). If the shipping guy putting cars on trucks (Writable Client) is too slow, boxes pile up. To stop an explosion (Out of Memory), the shipping guy hits a red button (Backpressure), pausing the belt.",
                questions: [
                    "[Basic] What is the difference between `fs.readFile` and `fs.createReadStream`?",
                    "[Intermediate] How does `.pipe()` handle backpressure automatically?",
                    "[Intermediate] Explain a `Transform` stream and when you would custom write one.",
                    "[Advanced] Why is `.pipeline()` or async iterators preferred over `.pipe()` in modern Node.js?",
                    "[Advanced] How do `objectMode` streams behave differently regarding the `highWaterMark`?"
                ],
                traps: [
                    "Memory Bombing: Using `Express.raw()` or `fs.readFile` to process video uploads. 5 users uploading 1GB videos simultaneously will crash the Node process instantly hitting the 1.4GB V8 RAM limit.",
                    "The `.pipe()` Error Leak Trap: Using `readable.pipe(writable)`. If the `readable` throws an error, it DOES NOT automatically close the `writable` stream. The zombie writable hangs forever. Always use `stream.pipeline` module.",
                    "Buffer Encoding: Logging a Buffer prints `<Buffer 48 65 6c... >`. You must provide an encoding (e.g. `.setEncoding('utf8')`) or the chunks split mid-character."
                ],
                debugScenario: "Scenario: Production server restarts every 3 hours with `FATAL ERROR: JavaScript heap out of memory`.\nAction: Take a heap dump and analyze Streams.\nDiscovery: Proxied downloads used `req.on('data', chunk => res.write(chunk))`. They failed to check the `res.write` boolean return. Because end-users had slow 3G internet, Node buffered S3 data into RAM gigabytes faster than it could send it.\nFix: Switched to `stream.pipeline(req, res)` which automatically manages backpressure pauses.",
                productionInsight: "Streaming is mandatory for production Node applications handling payloads > 10MB. Use async generators (`for await (const chunk of stream)`) rather than raw event listeners for massively improved readable code with perfect try/catch error semantics.",
                comparison: {
                    "Buffer": "Static, fixed-size chunk of raw binary data outside V8 heap.",
                    "Stream": "Flowing interface that emits Buffers over time.",
                    "pipe()": "Legacy routing, fails to handle errors safely across chains.",
                    "pipeline()": "Modern utility traversing stream errors correctly."
                },
                resources: [
                    { "title": "Node.js Streams: Node Docs", "url": "https://nodejs.org/api/stream.html", "type": "official" },
                    { "title": "Understanding Node.js Streams", "url": "https://nodesource.com/blog/understanding-streams-in-nodejs/", "type": "blog" }
                ]
            },
            "cluster": {
                title: "Cluster Mode & Scaling",
                tree: `
┌─ Node Cluster Architecture
├─ Master Process (IPC Manager)
│  ├─ Forks worker processes
│  ├─ Binds to OS ports
│  └─ Load balances via Round-Robin
├─ Worker Processes
│  ├─ Independent V8 instances
│  ├─ Application logic execution
│  └─ Die/Restart independently
└─ Scaling Limits
   ├─ Core count limits (Horizontal scale)
   └─ Socket handoffs (IPC overhead)`,
                flow: `
Incoming HTTP Req → OS Port → Master Process → IPC Handoff → Worker Process
│
├─ 1. Initialization:
│  └─ Master inspects OS. If 8 CPUs, it calls cluster.fork() 8 times.
│
├─ 2. Shared Port:
│  ├─ Master binds to port 8080. 
│  └─ Workers listen to a fake internal handle provided by Master.
│
├─ 3. Request Distribution:
│  └─ Master uses OS-level Round-Robin algorithm to spread TCP connections.
│
└─ 4. Health Checks:
   └─ Master maps 'exit' events. Automatically reforks dead workers.`,
                mentalModel: "Cluster mode is like opening multiple checkout counters at a supermarket. Node is usually 1 cashier. If you have an 8-core CPU, running standard Node leaves 7 cashiers asleep. Cluster mode makes the Store Manager (Master) wake up 8 cashiers (Workers). The Manager stands at the front door handing each new customer to a different cashier efficiently.",
                questions: [
                    "[Basic] Why do we need the 'cluster' module in Node.js?",
                    "[Intermediate] How does the Master process share a single port (like 80) across 8 distinct worker processes?",
                    "[Intermediate] What is Zero-Downtime deployment and how can Clusters achieve it?",
                    "[Advanced] What is the difference between 'Cluster' processes and 'Worker Threads'?",
                    "[Advanced] Why might Round-Robin load balancing fail if you are serving very long-lived WebSockets?"
                ],
                traps: [
                    "State Sharing Trap: Creating a simple `let activeUsers = 0` counter inside your app. With a cluster of 4, each worker has its own independent memory. The counter will only read 1/4th of the true value. Use Redis for shared state.",
                    "PM2 vs Native: Trying to manually write `cluster.fork()` files in modern production. It's extremely error-prone. Standard practice is to use PM2 (`pm2 start app.js -i max`) or Docker/Kubernetes replica sets to manage the clustering.",
                    "Sticky Sessions: If your backend relies on memory-bound Session Cookies, Cluster mode will randomly route requests to workers that don't have the session in memory. Fix: Use a Redis session store."
                ],
                debugScenario: "Scenario: Sudden traffic spike crashes Node server taking 60 seconds to reboot, dropping thousands of requests.\nDebug: Using a single-core process. Node processes crash entirely on Unhandled Rejections.\nFix: Implemented Cluster mode with PM2. When one worker crashes due to a bad payload, the Master instantly restarts it in the background while the other 7 workers seamlessly continue serving traffic. Uptime -> 99.99%.",
                productionInsight: "In containerized architectures (Kubernetes/ECS), using native Node.js Clusters is often an ANTI-PATTERN. Containers should be strictly 1 CPU, 1 Process. The container orchestrator (K8s ingress) handles the load balancing across multiple identical containers. Only use Node Clusters on bare metal or massive VM instances.",
                comparison: {
                    "Cluster": "Forks entirely new Processes (OS level). Heavy memory, full isolation.",
                    "Worker Thread": "Shares memory within the exact SAME process. Cheap, but shared state bugs.",
                    "PM2": "Process Manager doing the tedious Cluster boilerplate automatically.",
                    "Kubernetes": "The gold standard replacement for local Node.js clusters."
                },
                resources: [
                    { "title": "Node.js Cluster Docs", "url": "https://nodejs.org/api/cluster.html", "type": "official" }
                ]
            }
        }
    },
    // Express Architecture
    express: {
        title: "Express Architecture",
        icon: "🚂",
        description: "Complete Express.js patterns and security",
        topics: {
            "middleware": {
                title: "Middleware Chain Flow",
                tree: `
┌─ Express Middleware Pipeline
├─ Application-Level
│  ├─ app.use() (Global parsers)
│  └─ CORS, Helmet Security Headers
├─ Router-Level
│  ├─ Modularized routes (express.Router())
│  └─ Scoped authentication checks
├─ Route-Level
│  ├─ Specific controllers
│  └─ Input validation validators
└─ Finalizers
   ├─ 404 Handlers (No routes matched)
   └─ Global Error Handlers (4 arguments)`,
                flow: `
HTTP Request → [Security] → [Parser] → [Auth] → [Controller] → HTTP Response
│
├─ 1. Request Received:
│  └─ Node creates req/res objects and passes them to Express.
│
├─ 2. Pipeline Execution:
│  ├─ express.json() parses body. Creates req.body. Calls next().
│  ├─ authMiddleware validates token. Attaches req.user. Calls next().
│  └─ Each step MUST call next() or send res.send(). Or the request HANGS forever.
│
├─ 3. Controller Logic:
│  └─ Executes DB query. Calls res.json(data).
│
└─ 4. Out of Band:
   └─ Any database error triggers next(err), skipping controllers straight to Error Handler.`,
                mentalModel: "Middleware is a Water Filtration Pipe. The dirty water (HTTP Request) enters the pipe. It passes through a sand filter (Body Parser), charcoal filter (Authentication), and a UV light (Validation). Each filter modifies or cleans the water and passes it to the `next()` filter. If a filter finds poison (Token is invalid), it immediately caps the pipe and sends a rejection (403 Response) without wasting time on further filters.",
                questions: [
                    "[Basic] What are the three parameters passed to a standard Express middleware function?",
                    "[Intermediate] Why does the order of `app.use()` and route definitions drastically change application behavior?",
                    "[Intermediate] Explain the difference between `app.use(logger)` and `app.get('/', logger, handler)`.",
                    "[Advanced] What happens mathematically inside Express if you call `next()` twice?",
                    "[Advanced] How do you strictly define an Error Handling Middleware function so Express recognizes it?"
                ],
                traps: [
                    "The Hanging Request: Forgetting to call `res.send()` or `next()`. The client browser will literally sit spinning until the TCP connection times out 2 minutes later.",
                    "The Double Send: Calling `next()` AFTER a `res.json()`. The next middleware tries to set headers on a response that has already been dispatched over the socket. Yields the famous `Cannot set headers after they are sent to the client` crash.",
                    "Error Middleware Signature: If your error middleware uses `(err, req, res)` instead of `(err, req, res, next)`, Express will treat it as a standard middleware and the error will completely bypass it!"
                ],
                debugScenario: "Scenario: Uploading a JSON payload works, but uploading multipart/form-data crashes.\nDebug: The application only had `app.use(express.json())` at the top. This middleware ignores non-JSON payloads. The resulting controller tried accessing `req.body.username` which was `undefined`.\nFix: Inserted `multer` middleware specifically on the upload routes to parse FormData into `req.body` and `req.file`.",
                productionInsight: "In heavy production apps, middleware chains are kept extremely thin. Placing complex database verifications in global `app.use` drastically slows down simple health-check endpoints. Always scope expensive operations to specific Route-Level middleware chains. Furthermore, wrap the entire Express app in `helmet()` immediately to secure HTTP headers.",
                comparison: {
                    "Global Middleware": "app.use() - Runs on literally every single request.",
                    "Router Middleware": "Runs only on paths mounted to that specific express.Router().",
                    "Controller": "The final destination middleware that actually returns the data.",
                    "Error Handler": "A 4-argument middleware specifically listening for next(err)."
                },
                resources: [
                    { "title": "Express Docs: Using Middleware", "url": "https://expressjs.com/en/guide/using-middleware.html", "type": "official" }
                ]
            },
            "errorHandling": {
                title: "Error Handling Architecture",
                tree: `
┌─ Express Error Processing
├─ Synchronous Errors
│  └─ Automatically caught by Express routing mechanism
├─ Asynchronous Errors (Promises)
│  ├─ Before Express 5: Causes Unhandled Promise Rejection (Crash)
│  └─ Express 5+: Native support / requires next(err) in v4
├─ Centralized Error Handler
│  ├─ 4-Parameter signature: (err, req, res, next)
│  ├─ AppLevel / Global placement (Bottom of file)
│  └─ Sanitizing stack traces for production
└─ Custom Error Classes
   └─ Extending 'Error' with statusCode/isOperational flags`,
                flow: `
DB Connection Fails in Controller -> throw Error -> Caught -> Error Handler
│
├─ 1. Asynchronous Catch:
│  ├─ Wrapper catches DB error -> calls next(new AppError('No DB', 500)).
│  └─ Skips all remaining route controllers.
│
├─ 2. Global Error Middleware:
│  ├─ Express recognizes signature (err, req, res, next).
│  ├─ Intercepts the error object.
│  └─ Logs error payload strictly to Pino/Winston/Datadog.
│
├─ 3. Response Sanitization:
│  ├─ Development mode: Returns Err Message + full Stack Trace.
│  └─ Production mode: Strips stack trace, returns 'Internal Server Error'.
│
└─ 4. Process Status:
   └─ If error was 'Programming Error' (e.g. TypeError), trigger graceful shutdown.`,
                mentalModel: "Error handling in Express is a giant funnel. A massive factory has hundreds of rooms (Controllers) where things can explode. Instead of fixing explosions inside every room, you install vacuum tubes (next(err)). When an explosion happens, you shove the debris into the tube. All tubes lead to one single incinerator room (Global Error Handler) where experts decide if it's safe to throw away (Operational) or if the factory must be evacuated (Programming Error).",
                questions: [
                    "[Basic] Why MUST an Express error handler have exactly four arguments?",
                    "[Intermediate] Why does throwing an error inside a `.then()` block or `async/await` crash Express 4.x applications silently?",
                    "[Intermediate] What is the difference between an 'Operational Error' and a 'Programmer Error' in Node.js?",
                    "[Advanced] How do you safely shut down an Express server when encountering an Uncaught Exception?",
                    "[Advanced] Explain how the `express-async-errors` package modifies the V8 Express router."
                ],
                traps: [
                    "The Silent Crash Trap: In Express v4, `app.get('/', async (req, res) => { throw new Error() })` will NEVER hit your global error handler. Express cannot catch async rejections natively in v4. You must use `try-catch` pushing to `next(err)` or use a wrapper.",
                    "The Stack Trace Leak: Sending `res.status(500).json({ error: err })`. In Node, Error objects serialize poorly, but if they serialize the `.stack` property in production, you just leaked your entire server file hierarchy and DB schema to hackers.",
                    "Catch-all Masking: Using `.catch(e => res.status(500).send('Error'))` inside every controller. This duplicates code thousands of times and prevents APM tools like Datadog from receiving central formatted error logs."
                ],
                debugScenario: "Scenario: Production server completely shuts off returning 502 Bad Gateway to everything.\nAction: Checked Docker PM2 process logs.\nDiscovery: `UnhandledPromiseRejectionWarning: Unhandled promise rejection`. An external API request timed out inside an async controller without a try/catch. Unhandled rejections terminate the Node process to prevent memory corruption.\nFix: Wrapped all async controllers in an `AsyncHandler(fn)` wrapper that automatically binds `.catch(next)`. Server stabilized.",
                productionInsight: "Enterprise backends build a custom `AppError extends Error` class. This class attaches `this.statusCode` and `this.isOperational`. If an error is operational (e.g., 'Invalid password'), the Global handler returns 400. If it lacks that flag (e.g. `TypeError: undefined is not a function`), it's a Programming error: the App logs it as FATAL, alerts PagerDuty, and gracefully reboots the pod because the V8 state is compromised.",
                comparison: {
                    "Operational Error": "Expected failures: DB timeout, Invalid JWT, File not found.",
                    "Programming Error": "Bugs: Undefined properties, Syntax errors, out of memory.",
                    "try/catch": "Local block error handling.",
                    "express-async-handler": "Library to auto-forward async errors to Express `next`."
                },
                resources: [
                    { "title": "Node Best Practices: Error Handling", "url": "https://github.com/goldbergyoni/nodebestpractices", "type": "official" },
                    { "title": "Express Docs: Error Handling", "url": "https://expressjs.com/en/guide/error-handling.html", "type": "official" }
                ]
            },
            "security": {
                title: "Security & Validation",
                tree: `
┌─ Backend Security Vectors
├─ HTTP Header Protection (Helmet)
│  ├─ XSS Filter overrides
│  ├─ Content-Security-Policy
│  └─ Disabling X-Powered-By
├─ Abuse Prevention
│  ├─ Rate Limiting (express-rate-limit)
│  ├─ Payload size restrictions (express.json({limit}))
│  └─ CORS constraints
├─ Injection Defenses
│  ├─ SQL Injection (ORM prepared statements)
│  └─ NoSQL Injection (express-mongo-sanitize)
└─ Session & Authentication
   ├─ JWT Signature handling
   ├─ bcrypt/argon2 hashing (Never store plains)
   └─ Hash brute-force timing attacks defenses`,
                flow: `
Hacker Request → [Firewall] → [Rate Limit] → [Sanitize] → [Validate] → Process
│
├─ 1. Surface Area Limit:
│  ├─ Express rejects if body > 10KB (Stops RAM exhaustion).
│  └─ Rate Limiter rejects if > 100 req / minute from same IP.
│
├─ 2. Header Verification:
│  ├─ CORS rejects if Origin is not whitelisted domain.
│  └─ Helmet enforces HSTS (Strict-Transport-Security).
│
├─ 3. Input Sanitization:
│  ├─ Joi / Zod validates schema (It must be an Email).
│  └─ Sanitizer removes trailing '$' symbols (mongo injection).
│
└─ 4. Database execution:
   └─ Parametrized query executes safely and cleanly.`,
                mentalModel: "Backend Security is the 'Castle Doctrine'. Helmet is the tall stone wall blocking weird protocols. Rate Limiting is the narrow drawbridge controlling crowd size. Input Validation (Zod) is the guard checking IDs. Sanitization is confiscating hidden weapons. You assume literally every piece of data from the outside is actively malicious until it passes every single checkpoint.",
                questions: [
                    "[Basic] Why should you unconditionally remove the 'X-Powered-By: Express' HTTP header?",
                    "[Intermediate] Explain what a NoSQL injection looks like in MongoDB/Express.",
                    "[Intermediate] How does Cross-Origin Resource Sharing (CORS) protect users, and does it protect the SERVER?",
                    "[Advanced] What is a Timing Attack during password validation, and how do libraries like `bcrypt` prevent it?",
                    "[Advanced] Why is storing Session IDs in `localStorage` vulnerable, and what is the `HttpOnly` cookie alternative?"
                ],
                traps: [
                    "CORS Misunderstanding: Thinking CORS prevents bots or curl from hitting your API. CORS purely instructs BROWSERS not to let website A read data from website B. Scripts/Bots ignore CORS completely. Use API Keys and Rate Limits for server protection.",
                    "The Implicit Trust Filter: Using `user.find(req.body)`. If the body is `{\"password\": {\"$gt\": \"\"}}`, you just permitted a NoSQL injection that bypassed the password check.",
                    "Regex DoS (ReDoS): Using custom complex Regular Expressions to validate emails. Hackers send a crafted string requiring exponential backtracking, crashing the single V8 thread in seconds."
                ],
                debugScenario: "Scenario: Server crashes randomly with out-of-memory exceptions.\nAction: Checked payload sizes in network logs.\nDiscovery: Users were passing 50MB JSON files to an endpoint meant for a 200 character comment. `express.json()` buffered the 50MB entirely into V8 memory, triggering Garbage Collection freezes and OOM kills.\nFix: Bounded the parser: `app.use(express.json({ limit: '10kb' }))`. Massive payloads instantly rejected with 413 Payload Too Large.",
                productionInsight: "Zod or Joi are mandatory in production for Schema Validation natively rejecting payloads. Furthermore, enterprise apps use `helmet` for headers, `express-mongo-sanitize` for NoSQL protection, and utilize Cloudflare/AWS WAF (Web Application Firewall) at the DNS level to absorb DDoS/Rate-Limiting before it even touches the Node Event Loop.",
                comparison: {
                    "Helmet": "Secures outgoing HTTP Response headers.",
                    "CORS": "Controls which Domain Origins are allowed to securely request data.",
                    "Bcrypt": "Performs mathematically slow, salt-based hashing to protect passwords.",
                    "Zod/Joi": "Validates exact variable structures and types before controller logic."
                },
                resources: [
                    { "title": "OWASP: Node.js Security Cheat Sheet", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html", "type": "official" }
                ]
            }
        }
    }
};
