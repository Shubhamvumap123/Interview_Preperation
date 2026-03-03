export const javascript = {
    title: "JavaScript Deep Mastery",
    icon: "🟨",
    description: "Complete JavaScript internals and advanced concepts",
    topics: {
        executionContext: {
            title: "Execution Context (Deep Dive)",
            tree: `
┌─ Execution Context (The Runtime Environment Wrapper)
│  ├─ Creation Phase (Variable Object / Environment Record)
│  │  ├─ Lexical Environment (Block + Function)
│  │  ├─ Variable Environment (Legacy var)
│  │  └─ this Binding (Bytecode Dispatcher)
│  └─ Execution Phase (Code Component)
│     ├─ Thread of Execution
│     └─ Variable Assignment
├─ Types of Context
│  ├─ Global Execution Context (GEC)
│  │  ├─ Created on start
│  │  ├─ window/global object
│  │  └─ this === window
│  ├─ Function Execution Context (FEC)
│  │  ├─ Created on EACH call
│  │  └─ Local memory + arguments
│  └─ Eval Execution Context
└─ Execution Stack (Call Stack)
   ├─ LIFO (Last In, First Out)
   └─ Manages execution order
        `,
            flow: `
JS Code → [JS Engine]
│
├─ 1. Creation Phase (Memory Allocation)
│  ├─ Create Global Object (window/global)
│  ├─ Setup 'this' binding
│  ├─ Setup Memory Space for Variables/Functions
│  │  ├─ Hoisting:
│  │  │  ├─ function → stored as whole function
│  │  │  ├─ var → stored as undefined
│  │  │  └─ let/const → stored in Temporal Dead Zone (TDZ)
│  └─ Setup Outer Environment Reference (Scope Chain)
│
├─ 2. Execution Phase (Thread of Execution)
│  ├─ Run code line by line
│  ├─ Assign real values to variables
│  └─ Function Calls → Push new FEC to Call Stack
│
└─ 3. Completion Phase
   └─ Pop context from Call Stack → Garbage Collection
        `,
            mentalModel: "Think of Execution Context as a 'Session' or 'Container' for your code. Before any line runs, JS prepares a 'Workspace' (Creation Phase) where it fetches all tools (functions) and labels drawers (variables). Then it starts working (Execution Phase). The Call Stack is the pile of 'Workspaces' currently being processed.",
            questions: [
                "Is JavaScript a single-threaded language? How does Execution Context handle this?",
                "What is the difference between Execution Context and Scope?",
                "Explain the two phases of an Execution Context creation.",
                "What happens to the Call Stack in case of a recursive function without a base case?",
                "Does memory allocation happen in the Creation or Execution phase?"
            ],
            traps: [
                "Trap: Hoisting actually moves code lines. (Correction: No, it just allocates memory during the Creation Phase).",
                "Trap: Each function definition creates a New Execution Context. (Correction: Only function CALLS create a context).",
                "Trap: 'this' is always pointing to the function it's inside of. (Correction: 'this' depends on the call site/invocation).",
                "Trap: All variables are hoisted the same way. (Correction: let/const are hoisted but kept in TDZ, unlike var).",
                "Trap: Global variables take up no memory once the script is parsed. (Correction: GEC stays in memory until the session ends)."
            ],
            debugScenario: "Scenario: 'Cannot access X before initialization' error. This occurs because the JS Engine is in the 'Execution Phase' and hit a 'let/const' variable that exists in the memory (Creation Phase) but is marked as uninitialized. This region is called the Temporal Dead Zone (TDZ). To fix, move declaration above usage.",
            productionInsight: "Performance Tip: Deeply nested function calls create multiple Execution Contexts in the Call Stack, consuming memory. In production, watch out for 'Maximum call stack size exceeded' errors when dealing with large data structures or recursive logic. Use Iteration or Tail-Call Optimization if supported.",
            comparison: {
                "Global Context": "Persistent, one per script, defines 'window'.",
                "Function Context": "Ephemeral, one per call, defines 'arguments'.",
                "Scope Chain": "The roadmap of where to look for variables (Lexical).",
                "Call Stack": "The physical order of task completion (LIFO)."
            }
        },
        lexicalEnvironment: {
            title: "Lexical Environment (Scope Context)",
            tree: `
┌─ Lexical Environment
├─ 1. Environment Record
│  ├─ Declarative: let, const, class, module
│  └─ Object: Global/with context
├─ 2. Reference to Outer Environment
│  └─ Points to parent scope (Lexical Nesting)
└─ Properties
   ├─ Static (Set at Write-time)
   ├─ Created on code entry (Block/Func)
   └─ Basis for Scope Chain
        `,
            flow: `
Code Entry → Create Lexical Environment
│
├─ Step 1: Initialize Environment Record
│  └─ Map all identifiers to memory locations
│
├─ Step 2: Link 'Outer' Reference
│  └─ Connect to the scope where function was DEFINED
│
├─ Step 3: Scope Resolution
│  └─ Current Rec → Outer Rec → ... → Global Rec
│
└─ Step 4: Variable Access
   └─ Found? Return Value : ReferenceError
        `,
            mentalModel: "Think of a Lexical Environment as a 'Dictionary' page. Each page lists variables available in that block. At the bottom of the page, there's a 'See Page X' note (Outer Reference). If you don't find a word on your page, you go to the page it points to. This chain is the 'Scope Chain'.",
            questions: [
                "Is Lexical Environment determined at compile-time or runtime?",
                "What is the difference between Environment Record and Lexical Environment?",
                "How does a block scope create a new Lexical Environment?",
                "What happens to the Lexical Environment after a function returns?",
                "How do 'with' and 'catch' blocks modify the Lexical Environment?"
            ],
            traps: [
                "Trap: Lexical environment is the same as this. (Correction: No, 'this' is part of Execution Context, not Lexical Env).",
                "Trap: Outer reference points to where the function was CALLED. (Correction: No, it points to where it was WRITTEN).",
                "Trap: Variables in outer scopes are copied into the current environment. (Correction: No, they are referenced via the chain).",
                "Trap: Arrow functions have their own Lexical Environment for 'this'. (Correction: Arrows DON'T have a 'this', they look it up in the Lexical Env chain)."
            ],
            debugScenario: "Scenario: Unintended Global Variable. Debug: A variable was accessed but not found in any Lexical Environment Record up to the Global one. In non-strict mode, JS might create it on the global object. In strict mode, it throws a ReferenceError.",
            productionInsight: "Memory Leak: Closures keep a reference to a Lexical Environment. If that environment captures a large variable that isn't needed, it won't be garbage collected. Be careful what you close over in long-lived objects.",
            comparison: {
                "Lexical Environment": "The actual 'data structure' (The Map).",
                "Lexical Scope": "The 'concept' of visibility based on nesting.",
                "Variable Environment": "Specifically for 'var' declarations in legacy specs.",
                "Outer Reference": "The 'Link' that forms the Scope Chain."
            }
        },
        hoisting: {
            title: "Hoisting (Memory Mapping)",
            tree: `
┌─ Hoisting Behaviors
├─ Function Declarations
│  ├─ Type: Formal Hoisting
│  └─ Behavior: Entire function moved/available
├─ var Variables
│  ├─ Type: Partial Hoisting
│  └─ Behavior: Only name hoisted; value = undefined
├─ let / const
│  ├─ Type: Temporal Hoisting
│  └─ Behavior: Name hoisted; held in TDZ
└─ class Declarations
   └─ Behavior: Similar to let/const (TDZ)
        `,
            flow: `
Phase: Creation (Compilation)
│
├─ 1. Identify all declarations (var, let, const, func, class)
│
├─ 2. Functions: Create ref and store body.
│
├─ 3. var: Create ref and initialize to 'undefined'.
│
├─ 4. let/const/class: Create ref but mark 'UNINITIALIZED'.
│
Phase: Execution
│
├─ 5. Line reached? Assign value to variable.
│
└─ 6. Usage before declaration?
   ├─ var? → Returns undefined
   ├─ let/const? → ReferenceError (TDZ)
   └─ func? → Runs perfectly
        `,
            mentalModel: "Hoisting is like a 'Pre-read'. Imagine JS reading your script and making a 'Guest List' before the party starts. It notes everyone's name. For 'VIPs' (Functions), it lets them in early. For 'Guest List members' (var), it knows they are coming but hasn't given them a seat (undefined). For 'Surprise Guests' (let/const), it knows they exist but won't let you talk to them until they officially check in.",
            questions: [
                "Does hoisting move code physically?",
                "Explain the Temporal Dead Zone (TDZ).",
                "What happens when a variable and function share the same name in hoisting?",
                "How does hoisting work inside blocks vs functions?",
                "Are arrow functions hoisted?"
            ],
            traps: [
                "Trap: Arrow functions are hoisted like declarations. (Correction: No, they are variables/expressions - var gets undefined, let gets TDZ).",
                "Trap: Hoisting happens line by line. (Correction: No, it happens during the whole Creation Phase before any Execution).",
                "Trap: Functions inside 'if' blocks are hoisted to the top. (Correction: Behavior varies by browser/strict-mode; usually scoped to the block).",
                "Trap: Initializations are hoisted. (Correction: ONLY declarations are hoisted. 'var x = 5' hoists 'var x', not '= 5')."
            ],
            debugScenario: "Scenario: Calling a function expression before its definition. Debug: 'TypeError: myFunc is not a function'. This happens because 'var myFunc = ...' hoists 'myFunc' as 'undefined'. Calling 'undefined()' causes the TypeError. Use function declarations if you need hoisting.",
            productionInsight: "Best Practice: Avoid depending on hoisting. Use 'const' by default and declare variables at the top of their scope to make code readable and avoid 'undefined' bugs or TDZ crashes.",
            comparison: {
                "Function Declaration": "Fully available before declaration.",
                "var": "Available as undefined before declaration.",
                "let/const": "Unavailable (ReferenceError) before declaration.",
                "Hoisting": "The 'act' of setting up memory before execution."
            }
        },
        closures: {
            title: "Closures (Persistent Memory)",
            tree: `
┌─ Closure Components
├─ Inner Function
│  └─ The logic being returned/used
├─ Lexical Environment
│  └─ The 'Backpack' of captured variables
└─ Properties
   ├─ Data Encapsulation
   ├─ Memory Persistence
   └─ Access to Parent Scope
        `,
            flow: `
Outer Function Called → FEC Created
│
├─ 1. Outer logic runs; variables defined.
│
├─ 2. Inner Function defined.
│  └─ JS Engine notes the current Lexical Environment.
│
├─ 3. Inner Function returned/escapes.
│
├─ 4. Outer FEC Popped/Destroyed.
│  └─ BUT: Lexical Environment is KEPT (if referenced).
│
└─ 5. Inner Function Executed Later.
   └─ Uses 'Backpack' (Closure) to find old variables.
        `,
            mentalModel: "A closure is like a 'Backpack' that a function carries. When a function is born (defined), it packs all the variables it can see into its backpack. Even if it moves to a different neighborhood (executes in a different scope), it can still reach into its backpack and use those variables.",
            questions: [
                "How do closures help in data privacy?",
                "Do closures consume more memory? Why?",
                "Explain a practical use case of closures in React hooks.",
                "What is a 'Stateful Function' and how does it relate to closures?",
                "How can you 'destroy' a closure to free memory?"
            ],
            traps: [
                "Trap: Closures create a copy of the variable. (Correction: No, they hold a REFERENCE to the variable).",
                "Trap: All functions are closures. (Correction: Technically yes in JS, but we only call them closures when they 'escape' their birth scope).",
                "Trap: Closures only exist in nested functions. (Correction: Global functions close over the global scope too).",
                "Trap: Closures are same as objects. (Correction: Objects store state in properties; Closures store state in Lexical Contexts)."
            ],
            debugScenario: "Scenario: The Loop Trap. 'for (var i=0; i<3; i++) { setTimeout(() => console.log(i), 100) }' logs '3, 3, 3'. Debug: All closures reference the SAME 'i' variable from the outer scope. To fix: Use 'let' to create a new Lexical Environment for each iteration, or use an IIFE to 'capture' the value.",
            productionInsight: "Performance: Closures are powerful but can lead to memory leaks if not careful. In production, if you hold a closure that references a large DOM element, that element won't be GC'd until the closure is nullified. Clear event listeners/references when components unmount.",
            comparison: {
                "Closure": "Function + Lexical Environment (Backpack).",
                "Scope": "The rules of variable visibility.",
                "IIFE": "A common pattern to create a local scope/closure immediately.",
                "Encapsulation": "The practice of hiding data (using closures)."
            }
        },
        prototypes: {
            title: "Prototypes (Object DNA)",
            tree: `
┌─ Prototype System
├─ [[Prototype]] (__proto__)
│  └─ Hidden link to the parent object
├─ prototype property
│  └─ Only on functions; the DNA for new instances
├─ Prototype Chain
│  └─ obj → Array.proto → Object.proto → null
└─ Inheritance Methods
   ├─ Object.create()
   ├─ Constructor Functions
   └─ ES6 Classes (Sugar)
        `,
            flow: `
Property Look-up: obj.prop
│
├─ 1. Check Own Properties (obj.hasOwnProperty('prop'))
│  └─ Found? Return it.
│
├─ 2. Follow [[Prototype]] link.
│  └─ Is it null? Return undefined.
│
├─ 3. Repeat Step 1 on the Prototype Object.
│
└─ Result: The 'Chain' is traversed until match or end.
        `,
            mentalModel: "Prototypes are like 'Genetic Inheritance'. You have your own traits (Own Props). If you don't have a trait, you look at your Father (Prototype). If he doesn't have it, you look at your Grandfather. This continues until you hit the 'First Ancestor' (Object.prototype) or 'Nature' (null).",
            questions: [
                "What is the difference between __proto__ and .prototype?",
                "How does 'new' keyword work with prototypes?",
                "What is the performance cost of a long prototype chain?",
                "Why is shadowing a property important?",
                "Can you change an object's prototype after creation?"
            ],
            traps: [
                "Trap: .prototype is on all objects. (Correction: No, .prototype is only on functions. Instances use __proto__).",
                "Trap: Array inherits from Object. (Correction: Yes, but only after it inherits from Array.prototype).",
                "Trap: Arrow functions have a .prototype. (Correction: No, they cannot be used as constructors).",
                "Trap: Changing Prototype.prototype affects existing instances. (Correction: Yes, it updates live across all instances unless they shadowed it)."
            ],
            debugScenario: "Scenario: 'X is not a function' after adding to Prototype. Debug: Ensure you didn't overwrite the entire .prototype object: 'Func.prototype = {newObj}' destroys the 'constructor' link. instead, use 'Func.prototype.newMethod = ...' or fix the constructor reference manually.",
            productionInsight: "Performance: Deep prototype chains can slow down property lookups. For performance-critical code, use flat objects or avoid excessive inheritance. Also, be careful with 'for...in' as it iterates over the whole chain; use 'Object.keys()' for own properties.",
            comparison: {
                "Prototype": "The 'Template' object itself.",
                "__proto__": "The 'Link' from instance to template.",
                "Constructor": "The function that used the template.",
                "Shadowing": "When an instance prop 'hides' a prototype prop with same name."
            }
        },
        eventLoop: {
            title: "Event Loop (Async Architecture)",
            tree: `
┌─ Event Loop Runtime
├─ Heap: Memory allocation for objects
├─ Call Stack: Synchronous LIFO processing
├─ Web APIs: Browser threads (setTimeout, Fetch, DOM)
├─ Task Queues (The Pipeline)
│  ├─ Microtask Queue (CRITICAL PRIORITY)
│  │  ├─ Promises (.then/catch/finally)
│  │  ├─ queueMicrotask
│  │  └─ MutationObserver
│  └─ Macrotask Queue (Callback Queue)
│     ├─ setTimeout / setInterval
│     ├─ setImmediate (Node only)
│     └─ UI Events / I/O
└─ Render Queue: UI updates & rAF
        `,
            flow: `
Code → Call Stack → [Async?] → Web APIs → Task Queue → Event Loop → Stack
│
├─ 1. Run Synchronous Code:
│  └─ Call Stack processes until empty.
│
├─ 2. Handle Asynchronous Calls:
│  └─ Offload to Web APIs; Web API handles timer/network.
│
├─ 3. Microtask Phase:
│  └─ Loop checks Microtask Queue. PROCESS ALL until empty.
│
├─ 4. Render Phase:
│  └─ Check if screen needs refresh (rAF).
│
├─ 5. Macrotask Phase:
│  └─ Pick ONE task from Macrotask Queue. Push to Stack.
│
└─ 6. Cycle Repeats...
        `,
            mentalModel: "The Event Loop is a 'Waiter' in a busy restaurant. The Call Stack is the 'Chef'. The Waiter gives orders to the Chef. If an order takes long (Async), the Waiter hands it to a 'Sub-contractor' (Web API). When done, the result is put on a 'Finished Plate Buffer' (Queue). The Waiter only gives the Chef new work when the Chef is completely free.",
            questions: [
                "What is the priority: setTimeout(0) vs Promise.resolve()?",
                "What happens if a Microtask queues another Microtask?",
                "Explain why 'blocking the event loop' is bad for UI.",
                "How does Node.js event loop differ from browser?",
                "What is the role of the Render queue in the event loop?"
            ],
            traps: [
                "Trap: setTimeout(0) runs in 0ms. (Correction: It runs after the current Stack is clear and ALL Microtasks are done).",
                "Trap: Promises are Macrotasks. (Correction: Promises are Microtasks and have much higher priority).",
                "Trap: The Event Loop is part of the V8 Engine. (Correction: No, the Event Loop is part of the host environment - Browser/Node).",
                "Trap: async/await is multi-threaded. (Correction: No, it's just syntactic sugar for Promises on the same event loop).",
                "Trap: click events go to Microtask queue. (Correction: UI Events are Macrotasks)."
            ],
            debugScenario: "Scenario: Infinite Microtask Loop. 'function loop() { Promise.resolve().then(loop); }'. Debug: This WILL freeze the browser. The Event Loop never finishes the 'Microtask Phase', so it never reaches the 'Macrotask' or 'Render' phases. The UI stays frozen forever.",
            productionInsight: "Performance: To keep a 60fps refresh rate, the entire Event Loop cycle (including JS execution and Rendering) must finish in ~16.6ms. In production, use 'requestIdleCallback' for background tasks and 'Web Workers' for heavy data processing.",
            comparison: {
                "Microtasks": "Run immediately after current stack, before any rendering.",
                "Macrotasks": "Run one-by-one, often after rendering cycles.",
                "Main Thread": "Where the Event Loop lives (Single shared thread).",
                "rAF": "Synchronized with the monitor's refresh rate."
            }
        },
        memoryModel: {
            title: "Memory Model & Garbage Collection",
            tree: `
┌─ JavaScript Memory
├─ Stack Memory
│  ├─ Primitive values
│  ├─ Function calls
│  ├─ Local variables
│  └─ Automatic cleanup
├─ Heap Memory
│  ├─ Objects
│  ├─ Arrays
│  ├─ Functions
│  └─ Manual cleanup needed
├─ Garbage Collection
│  ├─ Mark and Sweep
│  ├─ Generational Collection
│  │  ├─ Young Generation
│  │  └─ Old Generation
│  └─ Reference counting
└─ Memory Leaks
   ├─ Global variables
   ├─ Closures
   ├─ Event listeners
   └─ Detached DOM elements
        `,
            flow: `
Object Creation → Memory Allocation → Usage → Garbage Collection
│
├─ 1. Object Creation
│  └─ Memory allocated in heap
│
├─ 2. Object Usage
│  └─ References maintained
│
├─ 3. Garbage Collection
│  ├─ Mark reachable objects
│  ├─ Sweep unreachable objects
│  └─ Free memory
│
└─ 4. Memory Optimization
   ├─ Remove unnecessary references
   ├─ Use weak references
   └─ Monitor memory usage
        `,
            mentalModel: "JavaScript memory is like a library. The stack is the reading room - small, organized, automatically cleaned. The heap is the main collection - large, needs manual organization. Garbage collection is the librarian who removes books no one references anymore.",
            questions: [
                "How does JavaScript memory management work?",
                "What's the difference between stack and heap memory?",
                "Explain garbage collection in JavaScript",
                "What causes memory leaks in JavaScript?",
                "How do you optimize memory usage in large applications?"
            ],
            traps: [
                "Assuming garbage collection is predictable",
                "Forgetting that closures can cause memory leaks",
                "Thinking delete operator frees memory immediately",
                "Confusing reference with value copying"
            ],
            debugScenario: "A React app's memory keeps growing over time. Developer discovers that event listeners in useEffect are not being cleaned up, causing detached DOM elements to remain in memory.",
            productionInsight: "Memory management is critical for long-running applications, mobile devices, and preventing crashes. Understanding GC helps optimize performance and user experience.",
            comparison: {
                "Stack Memory": "Fast, small, automatic, primitives and function calls",
                "Heap Memory": "Slower, large, manual, objects and dynamic data",
                "Garbage Collection": "Automatic, unpredictable, generational, mark-and-sweep"
            }
        },
        promises: {
            title: "Promises Internals",
            tree: `
┌─ Promise States
├─ Pending
│  ├─ Initial state
│  ├─ Asynchronous operation running
│  └─ Can transition to fulfilled/rejected
├─ Fulfilled
│  ├─ Operation completed successfully
│  ├─ Has a value
│  └─ Immutable state
├─ Rejected
│  ├─ Operation failed
│  ├─ Has a reason
│  └─ Immutable state
└─ Settled
   ├─ Either fulfilled or rejected
   └─ Cannot change state
        `,
            flow: `
Promise Creation → Async Operation → State Change → Then/Catch
│
├─ 1. Create Promise
│  └─ new Promise(executor)
│
├─ 2. Execute Async Operation
│  └─ executor(resolve, reject)
│
├─ 3. State Transition
│  ├─ resolve(value) → fulfilled
│  └─ reject(reason) → rejected
│
├─ 4. Handle Result
│  ├─ .then() for fulfillment
│  └─ .catch() for rejection
│
└─ 5. Chain Promises
   ├─ Return new promise
   └─ Continue chain
        `,
            mentalModel: "A Promise is like a restaurant order ticket. When you order (create promise), you get a ticket. The kitchen works on your order (async operation). When it's ready, they call your number (resolve/reject). You can then pick up your food (then/catch).",
            questions: [
                "How do Promises work internally?",
                "What's the difference between Promise.resolve() and new Promise()?",
                "Explain Promise chaining and error handling",
                "How do Promise.all() and Promise.race() work?",
                "What are microtasks in relation to Promises?"
            ],
            traps: [
                "Creating Promises when not needed",
                "Forgetting to handle promise rejections",
                "Confusing Promise.resolve with returning values",
                "Not understanding promise chaining vs nested callbacks"
            ],
            debugScenario: "A developer has unhandled promise rejections causing crashes in production. They're using .then() without .catch() and not understanding how errors propagate through promise chains.",
            productionInsight: "Promises are fundamental to modern JavaScript, essential for async operations, error handling, and building scalable applications. Understanding internals helps debug complex async flows.",
            comparison: {
                "Callbacks": "Nested, error-prone, inversion of control",
                "Promises": "Chainable, composable, error propagation",
                "Async/Await": "Syntactic sugar, readable, try/catch error handling"
            }
        },
        asyncAwait: {
            title: "Async / Await (Syntactic Async)",
            tree: `
┌─ Async/Await Mechanics
├─ async function
│  ├─ Always returns a Promise
│  └─ Enables 'await' keyword
├─ await keyword
│  ├─ Pauses execution (locally)
│  └─ Unwraps Promise value
└─ Control Flow
   ├─ Sequential execution appearance
   ├─ Parallel with Promise.all
   └─ try/catch for errors
        `,
            flow: `
Async Call → Await Promise → Pause FEC → Resume after Settlement
│
├─ 1. Invoke async function
│  └─ Pushes to Call Stack
│
├─ 2. Hit 'await'
│  ├─ Evaluate expression
│  ├─ Suspend current function
│  └─ Pop FEC from Stack (Non-blocking)
│
├─ 3. Promise Settles
│  └─ Result sent to Microtask Queue
│
├─ 4. Loop resumes function
│  ├─ Push FEC back to Stack
│  └─ Assignment happens with resolved value
│
└─ 5. Completion
   └─ Resolve returned promise
        `,
            mentalModel: "Async/Await is like a 'Pause Button' for a specific person, but not for the whole world. While that person waits for their coffee (await), the rest of the coffee shop keeps moving. When the coffee is ready, the person unpauses and continues their day.",
            questions: [
                "Does await block the main thread?",
                "How does error handling differ between .catch() and try/catch?",
                "What happens if you await a non-promise value?",
                "Explain the execution order of code before and after an await.",
                "How can you run multiple async operations in parallel?"
            ],
            traps: [
                "Trap: Await blocks everything. (Correction: Only pauses the current async function's execution).",
                "Trap: Forgetting await makes it synchronous. (Correction: It returns the Promise object instead of the value).",
                "Trap: try/catch only works for async errors. (Correction: It works for both, but only if the error is thrown or awaited).",
                "Trap: Parallel await isn't possible. (Correction: Use Promise.all with await)."
            ],
            debugScenario: "Scenario: Waterfall Requests. 'const user = await fetchUser(); const posts = await fetchPosts(user.id);'. This is okay if dependent, but if independent, it's slow. Debug: Use 'Promise.all([fetch1(), fetch2()])' to trigger them simultaneously.",
            productionInsight: "Best Practice: Always use try/catch with async/await. In production, unhandled async errors are hard to trace. Use high-level wrappers or middleware in Express to catch these automatically.",
            comparison: {
                "Promises": "Explicit .then() chaining, functional style.",
                "Async/Await": "Imperative style, cleaner for nested logic.",
                "Generator Functions": "The underlying tech that enables pausing execution.",
                "Callbacks": "Legacy, leads to callback hell."
            }
        },
        thisBinding: {
            title: "The 'this' Keyword (Invocation Context)",
            tree: `
┌─ 'this' Binding Rules
├─ Default Binding
│  └─ Global object (window) or undefined (strict)
├─ Implicit Binding
│  └─ The object left of the dot (obj.func())
├─ Explicit Binding
│  ├─ .call(obj, args)
│  ├─ .apply(obj, [args])
│  └─ .bind(obj) - Returns new function
├─ New Binding
│  └─ Pointing to the new instance created
└─ Arrow Functions
   └─ Lexical 'this' (Inherited from parent scope)
        `,
            flow: `
Function Call → Determine Call Site → Apply Rules in Priority
│
├─ 1. Is it 'new'? 
│  └─ Use the new instance. (Priority 1)
│
├─ 2. Is it call/apply/bind?
│  └─ Use the specified object. (Priority 2)
│
├─ 3. Is it called on an object (obj.foo)?
│  └─ Use that object. (Priority 3)
│
├─ 4. Arrow Function?
│  └─ Look at the lexical 'this' where defined.
│
└─ 5. Default
   └─ window/global or undefined.
        `,
            mentalModel: "Think of 'this' as a 'Who called me?' question. It's not about where the function was born (except for arrows), but who invited it to the party (the call site). Arrow functions are the 'loyal' ones—they only care about who was around when they were born.",
            questions: [
                "What is the value of 'this' in a simple function call in strict mode?",
                "Explain the difference between .call() and .apply().",
                "Why do arrow functions not have their own 'this'?",
                "What happens to 'this' when a method is passed as a callback?",
                "How does .bind() work internally?"
            ],
            traps: [
                "Trap: 'this' always refers to the object containing the method. (Correction: Not if the method is assigned to a variable and then called).",
                "Trap: call and apply are the same. (Correction: call takes comma-separated args, apply takes an array).",
                "Trap: You can re-bind an arrow function. (Correction: No, arrow 'this' is fixed at birth).",
                "Trap: Bind once, bind many. (Correction: You can only bind a function ONCE; subsequent binds are ignored)."
            ],
            debugScenario: "Scenario: Loss of Implicit Binding. 'const myMethod = obj.method; myMethod();' - here 'this' becomes global/undefined. Debug: Use '.bind(obj)' or use an arrow function for the method if you want it to stay linked to the instance.",
            productionInsight: "Performance: Creating many bound functions in a loop or React render method can lead to memory overhead. Prefer class methods or arrow functions in class properties for efficient 'this' management in UI frameworks.",
            comparison: {
                "call/apply": "Immediate execution with custom 'this'.",
                "bind": "Returns a new function for later execution.",
                "Arrow func": "No dynamic 'this'; great for callbacks.",
                "New": "Creates object and binds 'this' to it."
            }
        },
        typeCoercion: {
            title: "Type Coercion & Equality",
            tree: `
┌─ JS Type System
├─ Primitives (Value types)
│  └─ string, number, boolean, null, undefined, symbol, bigint
├─ Objects (Reference types)
├─ Implicit Coercion
│  ├─ Numeric: 5 - '2' = 3
│  ├─ String: 5 + '2' = '52'
│  └─ Boolean: if (x) {...}
└─ Equality Comparison
   ├─ Abstract (==): Coerces values
   └─ Strict (===): No coercion (Type + Value)
        `,
            flow: `
Operation → Check Types → [Different?] → Apply Coercion Rules → Compute
│
├─ 1. Addition (+):
│  └─ If either is string? → Concatenate.
│
├─ 2. Multi/Sub/Div (* - /):
│  └─ Convert both to Number.
│
├─ 3. Loose Equality (==):
│  ├─ null == undefined: true
│  ├─ string == number: string to number
│  └─ boolean == any: boolean to number
│
└─ 4. Truthiness:
   └─ [0, "", null, undefined, NaN, false] → Falsy. Else → Truthy.
        `,
            mentalModel: "Coercion is like a 'Automatic Translator'. If a French speaker (String) and a German speaker (Number) want to talk, JS tries to translate one into the other's language. Addition is the only one that prefers French (String); most others prefer German (Number).",
            questions: [
                "Explain '[] == ![]' result.",
                "Why is '0.1 + 0.2 !== 0.3' in JavaScript?",
                "What is the difference between null and undefined?",
                "How does the ToPrimitive conversion work on objects?",
                "What are the benefits of using Object.is()?"
            ],
            traps: [
                "Trap: typeof null is 'null'. (Correction: It's 'object' due to a legacy bug).",
                "Trap: NaN === NaN. (Correction: It's false. Use Number.isNaN() or Object.is()).",
                "Trap: [] is falsy. (Correction: Empty objects/arrays are TRUTHY).",
                "Trap: 'false' == false. (Correction: No, 'false' is a non-empty string, so it's TRUTHY in boolean context, but in '==' comparison, 'false' becomes NaN and false becomes 0)."
            ],
            debugScenario: "Scenario: Double Negation. '!!someVariable' is used to cast to boolean. Debug: If 'someVariable' is an empty string, it becomes 'false'. If it's 0, it becomes 'false'. This is a common pattern for validation.",
            productionInsight: "Best Practice: Always use '===' (Strict Equality). Relying on implicit coercion in '==' leads to bugs that are extremely hard to find. Use explicit casting like 'Number(val)' or 'String(val)' to make your intentions clear to other developers.",
            comparison: {
                "== (Loose)": "Values compared after coercion. Dangerous.",
                "=== (Strict)": "Type AND Value must match. Recommended.",
                "Object.is()": "Similar to ===, but handles NaN and -0/+0 correctly.",
                "Truthy/Falsy": "How values behave in boolean conditions."
            }
        },
        esModules: {
            title: "ES Modules & Tree Shaking",
            tree: `
┌─ Module Systems
├─ ES Modules (ESM)
│  ├─ import/export syntax
│  ├─ Static analysis
│  ├─ Tree shaking friendly
│  └─ Native browser support
├─ CommonJS (CJS)
│  ├─ require/module.exports
│  ├─ Dynamic loading
│  ├─ No tree shaking
│  └─ Node.js default
└─ Module Bundling
   ├─ Webpack/Rollup/Vite
   ├─ Code splitting
   ├─ Tree shaking
   └─ Dead code elimination
        `,
            flow: `
Module Import → Static Analysis → Tree Shaking → Bundle Generation
│
├─ 1. Module Analysis
│  └─ Find all imports/exports
│
├─ 2. Dependency Graph
│  └─ Build module relationships
│
├─ 3. Tree Shaking
│  ├─ Mark used exports
│  └─ Remove unused code
│
├─ 4. Code Splitting
│  └─ Split into chunks
│
└─ 5. Bundle Optimization
   └─ Generate final bundles
        `,
            mentalModel: "ES Modules are like a library catalog. Tree shaking is like a smart librarian who only gives you the books you actually need, not the entire section. This makes your backpack (bundle) lighter and faster to carry.",
            questions: [
                "How do ES modules work?",
                "What is tree shaking and how does it work?",
                "Explain the difference between ES modules and CommonJS",
                "How do dynamic imports work?",
                "What are the benefits of code splitting?"
            ],
            traps: [
                "Assuming all imported code is included in bundle",
                "Confusing default vs named imports",
                "Forgetting that tree shaking only works with ES modules",
                "Not understanding side effects in tree shaking"
            ],
            debugScenario: "A developer's bundle size is huge despite using small libraries. They discover that unused imports are not being tree-shaken because they're using CommonJS syntax instead of ES modules.",
            productionInsight: "Understanding modules and tree shaking is crucial for optimizing bundle size, load times, and user experience. Modern web applications depend heavily on efficient module bundling.",
            comparison: {
                "ES Modules": "Static, tree-shakable, native, import/export",
                "CommonJS": "Dynamic, no tree shaking, require/exports",
                "Dynamic Imports": "Runtime loading, code splitting, lazy loading"
            }
        },
        performanceOptimization: {
            title: "JS Performance Optimization",
            tree: `
┌─ Performance Areas
├─ Rendering Performance
│  ├─ DOM manipulation
│  ├─ Layout thrashing
│  ├─ Paint optimization
│  └─ Animation performance
├─ Network Performance
│  ├─ Bundle size
│  ├─ Code splitting
│  ├─ Caching strategies
│  └─ Resource loading
├─ Memory Performance
│  ├─ Memory leaks
│  ├─ Object pooling
│  ├─ Garbage collection
│  └─ Memory profiling
└─ JavaScript Performance
   ├─ Algorithmic complexity
   ├─ Event loop optimization
   ├─ Web Workers
   └─ JIT compilation
        `,
            flow: `
Performance Analysis → Bottleneck Identification → Optimization → Measurement
│
├─ 1. Performance Analysis
│  ├─ Lighthouse audit
│  ├─ Chrome DevTools
│  └─ Real User Monitoring
│
├─ 2. Identify Bottlenecks
│  ├─ Main thread blocking
│  ├─ Large bundle sizes
│  ├─ Memory leaks
│  └─ Slow network requests
│
├─ 3. Apply Optimizations
│  ├─ Code splitting
│  ├─ Lazy loading
│  ├─ Caching
│  └─ Algorithm optimization
│
└─ 4. Measure Impact
   ├─ Performance metrics
   └─ User experience improvement
        `,
            mentalModel: "Performance optimization is like tuning a race car. You measure lap times (performance metrics), identify what's slowing you down (bottlenecks), make specific improvements (optimizations), and measure again to see if you're faster.",
            questions: [
                "How do you optimize JavaScript performance?",
                "What is layout thrashing and how do you avoid it?",
                "Explain code splitting and lazy loading",
                "How do you measure web performance?",
                "What are Web Workers and when should you use them?"
            ],
            traps: [
                "Premature optimization",
                "Focusing on micro-optimizations",
                "Ignoring real user performance",
                "Not measuring before optimizing"
            ],
            debugScenario: "A React app is slow during scrolling. Developer discovers that scroll handlers are causing layout thrashing by reading/writing DOM properties repeatedly, and fixes it with requestAnimationFrame and batching DOM updates.",
            productionInsight: "Performance optimization is critical for user experience, SEO, and conversion rates. Understanding performance principles helps build fast, responsive applications that users love.",
            comparison: {
            }
        },
        v8Internals: {
            title: "V8 Engine Architecture (L7 Depth)",
            tree: `
┌─ V8 Engine Pipeline
├─ Parser (Full-codegen Replacement)
│  ├─ Scanner (Tokens)
│  └─ Parser (AST)
├─ Ignition (Bytecode Interpreter)
│  ├─ Low-level Instructions
│  └─ Collects Profiling Data
├─ TurboFan (JIT Optimizer)
│  ├─ Speculative Optimization
│  ├─ Inline Caches (ICs)
│  └─ Deoptimization (Bailing out)
└─ Objects & Shapes
   ├─ Hidden Classes (Maps/Shapes)
   └─ Optimized Access
        `,
            flow: `
Code → [Scanner] → [Parser] → [AST]
│
├─ 1. Ignition: Execute Bytecode
│  └─ Watch for "Hot" code (Repeat executions)
│
├─ 2. TurboFan: Compile to Optimized Machine Code
│  ├─ Assumption: Types stay the same
│  └─ Inline Caches: Memoize property lookups
│
└─ 3. Deopt: If types CHANGE at runtime
   ├─ Assumption Fail → Revert to Bytecode
   └─ Massive Performance Penalty
        `,
            mentalModel: "V8 is like an expert chef. Usually, it follows a standard recipe (Ignition Bytecode). If it sees you order the same dish 100 times, it prepares a high-speed assembly line for that exact dish (TurboFan Machine Code). But if you suddenly change the order ingredients (Type Change), it has to dismantle the assembly line and go back to the single-chef recipe (Deoptimization).",
            questions: [
                "Explain Speculative Optimization in TurboFan.",
                "What are Hidden Classes and how do they optimize access?",
                "What triggers a Deoptimization in V8?",
                "How does V8 represent numbers internally (Smi vs HeapNumber)?",
                "Why is 'eval()' or 'with' considered an optimization killer?"
            ],
            traps: [
                "Trap: Assuming JIT-ed code stays JIT-ed forever. (Deoptimization happens).",
                "Trap: Thinking object property order doesn't matter. (It affects Hidden Class reuse).",
                "Trap: Creating large objects with numeric keys only. (V8 uses 'Elements' array vs 'Properties' dictionary).",
                "Trap: Using polymorphic functions (multiple types). (Weakens Inline Cache - IC)."
            ],
            debugScenario: "Scenario: Code running 10x slower on specific machines. Debug: V8 is constantly opting/deopting due to 'Polymorphic' function calls (passing {x:1} then {y:2} to the same function). Result: IC cache misses. Fix: Ensure monomorphic calls (consistent object shapes).",
            productionInsight: "Performance: Monomorphic functions (same input shape) allow TurboFan to generate the fastest machine code. In high-frequency loops, avoid changing the 'shape' of objects by adding/deleting properties at runtime.",
            comparison: {
                "Ignition": "Quick start, low overhead, interpreted.",
                "TurboFan": "Peak performance, hardware-specific, optimized.",
                "Hidden Classes": "The way V8 avoids expensive hash-table lookups.",
                "Deoptimization": "The 'Safe Mode' rollback when assumptions fail."
            }
        },
        advancedMemory: {
            title: "Memory Management & Orinoco",
            tree: `
┌─ V8 Memory Layout
├─ New Space (Young Generation)
│  ├─ 1-8 MB size (Typical)
│  └─ Scavenger Algorithm (Copying)
├─ Old Space (Old Generation)
│  ├─ Mark-Sweep-Compact
│  └─ Survival from New Space
├─ Large Object Space
├─ Map Space (Hidden Classes)
└─ Code Space (JIT-ed Instructions)
        `,
            flow: `
Allocation → [New Space] → [Check Survivability] → [Old Space]
│
├─ 1. Scavenger (Young Gen):
│  ├─ Cheney's Algorithm (To-Space / From-Space)
│  └─ Fast, Parallel, Stop-the-world
│
├─ 2. Mark-Sweep (Old Gen):
│  ├─ Marking (Tri-color marking - Black/Grey/White)
│  ├─ Sweeping (Free lists)
│  └─ Compacting (Defragmentation)
│
└─ 3. Orinoco Improvements:
   ├─ Parallel Marking (Multiple threads)
   ├─ Concurrent Sweeping (Background)
   └─ Incremental Marking (Small bites)
        `,
            mentalModel: "Think of memory as a Filter. Most trash is thrown away immediately in a small bin (New Space). If an item survives 2 cleaning cycles, it's moved to a massive warehouse (Old Space). Cleaning the warehouse is slow, so we do it bit-by-bit while the factory is still running (Incremental/Concurrent GC).",
            questions: [
                "Explain Pointer Tagging (Smi vs HeapObject) in V8.",
                "How does Orinoco differ from traditional Stop-the-world GC?",
                "What is 'Major GC' vs 'Minor GC'?",
                "What are the 'Generational' assumptions in GC design?",
                "How do WeakMap/WeakSet prevent memory leaks?"
            ],
            traps: [
                "Trap: Garbage collection only happens when you run out of memory. (V8 schedules it pro-actively).",
                "Trap: Manual GC is possible in JS. (Only via --expose-gc flag in Node/Chrome).",
                "Trap: Circular references always cause memory leaks. (Modern 'Mark-and-Sweep' handles them easily).",
                "Trap: Thinking Young Gen uses Mark-Sweep. (It uses Scavenger/Copying)."
            ],
            debugScenario: "Scenario: Memory usage increases linearly despite no new objects being created. Debug: Closure leak. An outer variable is captured in a callback that lives forever (like an interval), preventing the outer environment fromBeing major GC'd. Fix: Clear interval/set variable to null.",
            productionInsight: "Memory: Watch out for 'Old Space Exhaustion'. In Node.js, you may need to tune '--max-old-space-size' for high-load instances to prevent OOM (Out Of Memory) crashes.",
            comparison: {
                "Scavenger": "Copy-based, fast, small memory (Young Gen).",
                "Mark-Sweep": "Marking-based, larger latency (Old Gen).",
                "Parallel": "Multiple threads do the same work.",
                "Concurrent": "Main thread works while GC thread works."
            }
        },
        concurrencyInternals: {
            title: "Low-Level Concurrency & Shared Memory",
            tree: `
┌─ JS Concurrency Model
├─ Microtasks (Internal Priority)
│  ├─ Promises (then/catch/finally)
│  └─ queueMicrotask()
├─ Macrotasks (External Priority)
│  ├─ setTimeout / setInterval
│  └─ Network/IO (epoll/kqueue)
├─ Multithreading (Real Parallelism)
│  ├─ Web Workers (Browser)
│  └─ Worker Threads (Node.js)
└─ Shared Memory
   ├─ SharedArrayBuffer
   └─ Atomics (Atomic Op, Wait/Notify)
        `,
            flow: `
Task Queue → [Event Loop] → Execution Context
│
├─ 1. Call Stack Check: If empty?
│
├─ 2. Microtask Queue: Process ALL waiting microtasks
│  └─ Important: New microtasks added RUN in the same cycle.
│
├─ 3. Render / Macrotask: Pick ONE macrotask
│
├─ 4. Shared Memory:
│  ├─ Worker 1 writes to SharedArrayBuffer
│  ├─ Atomics.notify() → Wake up Worker 2
│  └─ Atomics.wait() → Zero-CPU sleep until notified
│
└─ 5. OS Level: epoll_wait (Linux) / kqueue (BSD/macOS)
   └─ Wait for Kernel notifications
        `,
            mentalModel: "The Event Loop is like a busy office manager. They have two trays. The 'Priority Inbox' (Microtasks) MUST be cleared before they look at anything else. Even if more mail arrives while they are working, they stay focused. The 'General Mail' (Macrotasks) is only opened once the Priority Inbox is empty. Shared Memory is like a shared whiteboard where multiple people can write simultaneously, but 'Atomics' is the marker cap - only one person can use it at a time to avoid mess.",
            questions: [
                "What is the difference between a task and a microtask?",
                "How does epoll/kqueue interact with the Node.js event loop?",
                "Why can you have a race condition in SharedArrayBuffer?",
                "How do Atomics solve memory consistency issues?",
                "Does a microtask starvation prevent UI rendering? Why?"
            ],
            traps: [
                "Trap: Microtasks run after the next macrotask. (Correction: They run before the next macrotask).",
                "Trap: Web Workers share everything with the main thread. (Correction: They share nothing EXCEPT via SAB or message passing).",
                "Trap: Atomics.wait() can be used on the main thread. (Correction: No, it blocks the thread - illegal on main).",
                "Trap: setInterval(0) is the same as queueMicrotask. (Correction: No, setInterval is a macrotask)."
            ],
            debugScenario: "Scenario: UI freezes despite using Promises for 'async' work. Debug: Too many microtasks (infinite loop of microtasks) are being generated. Since JS processes ALL microtasks before the next render, the screen never updates. Solution: Break up work into macrotasks (setTimeout) to allow rendering.",
            productionInsight: "Performance: For high-throughput Node.js servers handling thousands of TCP connections, understanding how libuv uses 'epoll' is key to identifying 'Event Loop Lag'. Use performance hooks to monitor event loop health.",
            comparison: {
                "Microtask": "High priority, internal, starvation risk.",
                "Macrotask": "Lower priority, external/browser-level execution.",
                "SharedArrayBuffer": "Zero-copy shared memory between threads.",
                "Atomics": "Thread-safe operations on shared memory."
            }
        }
    }
};
