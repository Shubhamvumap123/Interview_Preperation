export const knowledgeBase = {
  // JavaScript Deep Mastery
  javascript: {
    title: "JavaScript Deep Mastery",
    icon: "🟨",
    description: "Complete JavaScript internals and advanced concepts",
    topics: {
      executionContext: {
        title: "Execution Context",
        tree: `
┌─ Execution Context
├─ Global Context
│  ├─ Global Object (window)
│  ├─ this keyword
│  └─ Outer Environment
├─ Function Context
│  ├─ Arguments Object
│  ├─ this binding
│  ├─ Scope Chain
│  └─ Outer Environment
└─ Eval Context (rare)
        `,
        flow: `
Code → Creation Phase → Execution Phase
│
├─ Creation Phase:
│  ├─ Create Scope Chain
│  ├─ Create Variable Object
│  ├─ Determine 'this' value
│  └─ Setup Outer Environment
│
└─ Execution Phase:
   ├─ Variable Assignment
   ├─ Function Execution
   └─ Reference Resolution
        `,
        mentalModel: "JavaScript creates execution contexts for every code execution. Think of it as a box that contains variables, functions, and the 'this' reference. When code runs, JavaScript first sets up the box (creation phase) then fills it (execution phase).",
        questions: [
          "What is execution context and how is it created?",
          "Explain the difference between global and function execution context",
          "How does hoisting work in execution context?",
          "What happens during the creation phase vs execution phase?"
        ],
        traps: [
          "Thinking 'this' refers to the function itself",
          "Confusing variable hoisting with function hoisting",
          "Assuming execution context is the same as scope"
        ],
        debugScenario: "A developer has a function where 'this' is undefined. They expected it to refer to the object but it's not working in strict mode.",
        productionInsight: "Understanding execution context is crucial for debugging scope issues, memory leaks, and optimizing performance in large applications.",
        comparison: {
          "Global Context": "Created once, contains global object, 'this' = window",
          "Function Context": "Created per function call, contains arguments, 'this' varies",
          "Eval Context": "Created for eval(), modifies surrounding scope"
        }
      },
      lexicalEnvironment: {
        title: "Lexical Environment",
        tree: `
┌─ Lexical Environment
├─ Environment Record
│  ├─ Declarative Record
│  │  ├─ Variables
│  │  ├─ Functions
│  │  └─ Classes
│  └─ Object Record
│     ├─ with statement
│     └─ catch blocks
└─ Outer Reference
   └─ Points to parent scope
        `,
        flow: `
Function Declaration → Lexical Environment Creation
│
├─ Step 1: Environment Record
│  ├─ Store all declarations
│  └─ Map identifiers to values
│
├─ Step 2: Outer Reference
│  └─ Link to parent scope
│
└─ Step 3: Scope Chain Formation
   └─ Chain all environments
        `,
        mentalModel: "Lexical environment is like a dictionary that maps variable names to their values, plus a reference to the parent dictionary. This creates a chain of dictionaries that JavaScript uses to find variables.",
        questions: [
          "What is lexical environment and how does it differ from execution context?",
          "Explain the scope chain mechanism",
          "How do closures relate to lexical environment?",
          "What happens when a variable is not found in the current environment?"
        ],
        traps: [
          "Thinking lexical environment is the same as execution context",
          "Confusing lexical scope with dynamic scope",
          "Assuming all variables are stored in the same environment"
        ],
        debugScenario: "A closure is not updating as expected. The developer is confused why the captured variable always has the last value from a loop.",
        productionInsight: "Lexical environments are the foundation of closures, which are essential for data privacy, function factories, and maintaining state in functional programming.",
        comparison: {
          "Lexical Environment": "Static, determined at write time, creates closures",
          "Dynamic Scope": "Runtime determined, based on call stack",
          "Block Scope": "Limited to {} blocks, created by let/const"
        }
      },
      hoisting: {
        title: "Hoisting",
        tree: `
┌─ Hoisting Behavior
├─ Function Declarations
│  ├─ Fully hoisted
│  ├─ Can be called before declaration
│  └─ Name and function body moved
├─ Variable Declarations (var)
│  ├─ Declaration hoisted
│  ├─ Initialization stays
│  └─ undefined until assignment
├─ let/const
│  ├─ Declaration hoisted
│  ├─ TDZ (Temporal Dead Zone)
│  └─ ReferenceError before declaration
└─ Class Declarations
   ├─ Declaration hoisted
   └─ TDZ applies
        `,
        flow: `
Parsing Phase → Hoisting → Execution
│
├─ Function Declarations:
│  └─ Move entire function to top
│
├─ var Variables:
│  ├─ Move 'var x' to top
│  └─ Leave 'x = value' in place
│
└─ let/const:
   ├─ Create binding in TDZ
   └─ Initialize at declaration line
        `,
        mentalModel: "Hoisting is JavaScript moving declarations to the top of their scope before code execution. Think of it as JavaScript reading the script twice: first to note all declarations, then to execute.",
        questions: [
          "What is hoisting and how does it work?",
          "Explain the difference between function and variable hoisting",
          "What is the Temporal Dead Zone?",
          "Why do let and const behave differently from var regarding hoisting?"
        ],
        traps: [
          "Thinking hoisting moves code, not just declarations",
          "Assuming function expressions are hoisted like declarations",
          "Forgetting that class declarations have TDZ"
        ],
        debugScenario: "A developer calls a function before it's defined and it works, but calling a variable before assignment gives undefined.",
        productionInsight: "Understanding hoisting prevents bugs related to accessing variables before initialization and helps write more predictable code organization.",
        comparison: {
          "Function Declaration": "Fully hoisted, callable anywhere",
          "Function Expression": "Not hoisted, undefined before assignment",
          "var": "Declaration hoisted, undefined until assignment",
          "let/const": "Declaration hoisted, TDZ until declaration"
        }
      },
      closures: {
        title: "Closures",
        tree: `
┌─ Closure Formation
├─ Outer Function
│  ├─ Variables
│  └─ Inner Function
│     └─ Captures outer variables
├─ Closure Properties
│  ├─ Remembers outer scope
│  ├─ Private data storage
│  └─ Function factory capability
└─ Use Cases
   ├─ Data privacy
   ├─ Currying
   ├─ Event handlers
   └─ Module pattern
        `,
        flow: `
Function Definition → Function Execution → Closure Creation
│
├─ Step 1: Function Defined
│  └─ Captures lexical environment
│
├─ Step 2: Function Returned
│  └─ Keeps reference to outer variables
│
└─ Step 3: Closure Active
   └─ Can access and modify outer variables
        `,
        mentalModel: "A closure is like a backpack that a function carries. When the function is created, it packs all the variables from its current scope into this backpack and can access them even when it leaves that scope.",
        questions: [
          "What is a closure and how is it formed?",
          "Explain the practical applications of closures",
          "How do closures relate to memory management?",
          "What are common closure patterns in JavaScript?"
        ],
        traps: [
          "Thinking closures create memory leaks by default",
          "Confusing closure with scope",
          "Assuming closures copy values instead of referencing variables"
        ],
        debugScenario: "A loop creates event handlers that all reference the same final value instead of their individual loop values.",
        productionInsight: "Closures are fundamental to modern JavaScript patterns, React hooks, and maintaining state in asynchronous operations.",
        comparison: {
          "Closure": "Function + lexical environment, preserves state",
          "Scope": "Variable accessibility, doesn't preserve state",
          "Context": "this binding, execution environment"
        }
      },
      prototypes: {
        title: "Prototypes & Inheritance",
        tree: `
┌─ Prototype Chain
├─ Object
│  └─ [[Prototype]] → null
├─ Constructor Function
│  ├─ prototype property
│  └─ [[Prototype]] → Function.prototype
├─ Instance
│  └─ [[Prototype]] → Constructor.prototype
└─ Inheritance Methods
   ├─ Prototypal
   ├─ Constructor Functions
   └─ ES6 Classes (syntactic sugar)
        `,
        flow: `
Property Access → Object → Prototype Chain → Found/Not Found
│
├─ Step 1: Check Object Properties
│  └─ Return if found
│
├─ Step 2: Follow [[Prototype]]
│  └─ Check prototype object
│
├─ Step 3: Continue Chain
│  └─ Repeat until Object.prototype
│
└─ Step 4: Return undefined
   └─ Property not found
        `,
        mentalModel: "Prototypes are like a fallback system. When you ask an object for a property it doesn't have, it asks its prototype, which asks its prototype, and so on up the chain until someone has it or the chain ends.",
        questions: [
          "How does prototypal inheritance work in JavaScript?",
          "Explain the difference between __proto__ and prototype",
          "What is the prototype chain?",
          "How do ES6 classes relate to prototypes?"
        ],
        traps: [
          "Confusing prototype property with [[Prototype]]",
          "Thinking classes create classical inheritance",
          "Assuming all objects inherit from Object directly"
        ],
        debugScenario: "A developer adds a method to Array.prototype and it breaks existing code that relied on for...in loops.",
        productionInsight: "Understanding prototypes is crucial for extending built-in objects safely, implementing inheritance patterns, and optimizing property access performance.",
        comparison: {
          "Prototypal Inheritance": "Objects inherit from objects, dynamic",
          "Classical Inheritance": "Classes inherit from classes, static",
          "ES6 Classes": "Syntactic sugar over prototypes"
        }
      },
      eventLoop: {
        title: "Event Loop",
        tree: `
┌─ Event Loop Components
├─ Call Stack
│  └─ Synchronous execution
├─ Web APIs
│  ├─ setTimeout
│  ├─ DOM events
│  └─ Network requests
├─ Callback Queue
│  └─ Completed callbacks
├─ Microtask Queue
│  ├─ Promise callbacks
│  └─ MutationObserver
└─ Event Loop
   └─ Coordinates execution
        `,
        flow: `
Code Execution → Call Stack → Web APIs → Queues → Event Loop
│
├─ 1. Execute synchronous code
│  └─ Fill call stack
│
├─ 2. Handle async operations
│  └─ Move to Web APIs
│
├─ 3. Complete async operations
│  └─ Move to appropriate queue
│
└─ 4. Event Loop coordination
   ├─ Process microtasks first
   └─ Process macrotasks
        `,
        mentalModel: "The event loop is like a restaurant manager. The call stack is the kitchen (one chef at a time), Web APIs are delivery services, queues are waiting customers, and the event loop decides who gets served next.",
        questions: [
          "How does the event loop work in JavaScript?",
          "What is the difference between microtasks and macrotasks?",
          "Explain the execution order in async JavaScript",
          "How does the browser event loop differ from Node.js?"
        ],
        traps: [
          "Thinking JavaScript is truly multithreaded",
          "Confusing setTimeout with Promise timing",
          "Assuming all callbacks are processed equally"
        ],
        debugScenario: "A developer expects setTimeout(callback, 0) to run immediately but it runs after synchronous code and Promise callbacks.",
        productionInsight: "Event loop understanding is critical for performance optimization, preventing UI blocking, and managing complex async operations.",
        comparison: {
          "Microtasks": "Higher priority, Promise.then, queueMicrotask",
          "Macrotasks": "Lower priority, setTimeout, setInterval, I/O",
          "Browser vs Node": "Different phases and queue priorities"
        }
      }
    }
  }, // <-- comma added here

  // React Complete Architecture
  react: {
    title: "React Complete Architecture",
    icon: "⚛️",
    description: "Deep dive into React internals and advanced patterns",
    topics: {
      virtualDOM: {
        title: "Virtual DOM",
        tree: `
┌─ Virtual DOM System
├─ React Elements
│  ├─ Plain objects
│  ├─ Type, props, children
│  └─ Lightweight representation
├─ Component Tree
│  ├─ Nested elements
│  └─ Parent-child relationships
├─ Reconciliation
│  ├─ Diff algorithm
│  ├─ Key-based comparison
│  └─ Minimal updates
└─ Real DOM Updates
   ├─ Batched updates
   └─ Efficient rendering
        `,
        flow: `
State Change → Render → Virtual DOM → Diff → Patch → Real DOM
│
├─ 1. State/Props Change
│  └─ Trigger re-render
│
├─ 2. Create New Virtual DOM
│  └─ Generate new element tree
│
├─ 3. Compare with Previous
│  └─ Find differences (diff)
│
├─ 4. Calculate Minimal Changes
│  └─ Determine what needs updating
│
└─ 5. Apply to Real DOM
   └─ Batch actual DOM operations
        `,
        mentalModel: "Virtual DOM is like having a blueprint. Instead of rebuilding the house (real DOM) for every change, you update the blueprint, compare with the old blueprint, and only change what's different in the actual house.",
        questions: [
          "What is the Virtual DOM and why does React use it?",
          "How does the reconciliation algorithm work?",
          "Why are keys important in React lists?",
          "How does React batch DOM updates?"
        ],
        traps: [
          "Thinking Virtual DOM is faster than real DOM",
          "Confusing Virtual DOM with Shadow DOM",
          "Assuming all re-renders are expensive"
        ],
        debugScenario: "A developer has a list that re-renders completely when one item changes, causing performance issues.",
        productionInsight: "Understanding Virtual DOM is crucial for optimizing React performance, preventing unnecessary re-renders, and building efficient large-scale applications.",
        comparison: {
          "Virtual DOM": "JavaScript objects, fast manipulation",
          "Real DOM": "Browser objects, expensive operations",
          "Shadow DOM": "Encapsulation, web components"
        }
      },
      fiber: {
        title: "React Fiber",
        tree: `
┌─ Fiber Architecture
├─ Fiber Node
│  ├─ State, props
│  ├─ Child, sibling, return
│  └─ Effect list
├─ Work Loop
│  ├─ Interruptible rendering
│  ├─ Priority-based scheduling
│  └─ Time slicing
├─ Phases
│  ├─ Render Phase
│  │  └─ Can be interrupted
│  └─ Commit Phase
│     └─ Cannot be interrupted
└─ Scheduler
   ├─ Priority levels
   └─ Concurrent features
        `,
        flow: `
Initial Render → Fiber Tree Construction → Work Loop → Commit
│
├─ 1. Create Fiber Nodes
│  └─ Build fiber tree structure
│
├─ 2. Begin Work Loop
│  ├─ Process each fiber
│  ├─ Check for interruption
│  └─ Yield to browser
│
├─ 3. Complete Render Phase
│  └─ Generate effect list
│
└─ 4. Commit Changes
   ├─ Update DOM
   └─ Clean up effects
        `,
        mentalModel: "Fiber is like having a smart construction manager. Instead of building everything at once (blocking), the manager works on small pieces, can pause when needed, and ensures important parts are done first.",
        questions: [
          "What problem does React Fiber solve?",
          "How does Fiber enable concurrent rendering?",
          "Explain the render and commit phases",
          "What is time slicing in React?"
        ],
        traps: [
          "Thinking Fiber makes everything faster",
          "Confusing Fiber with Virtual DOM",
          "Assuming all work is interruptible"
        ],
        debugScenario: "A developer's app freezes during heavy rendering. They need to understand how Fiber can help with performance.",
        productionInsight: "Fiber architecture enables React's concurrent features, improves user experience, and allows for better performance in complex applications.",
        comparison: {
          "Stack Reconciler": "Synchronous, blocking, legacy",
          "Fiber Reconciler": "Interruptible, prioritized, current",
          "Concurrent Mode": "Multiple versions, experimental"
        }
      },
      hooks: {
        title: "Hooks Internals",
        tree: `
┌─ Hooks System
├─ Hook Types
│  ├─ State Hooks (useState, useReducer)
│  ├─ Effect Hooks (useEffect, useLayoutEffect)
│  ├─ Context Hooks (useContext, useReducer)
│  └─ Performance Hooks (useMemo, useCallback)
├─ Hook Rules
│  ├─ Only call at top level
│  ├─ Only call from React functions
│  └─ Order must be consistent
├─ Hook Queue
│  ├─ Linked list structure
│  ├─ Per component instance
│  └─ Preserved across renders
└─ Closure Management
   ├─ State preservation
   └─ Effect dependencies
        `,
        flow: `
Component Render → Hook Queue → State Update → Re-render
│
├─ 1. Initialize Hook Queue
│  └─ Create hook objects
│
├─ 2. Process Hooks in Order
│  └─ Execute hook logic
│
├─ 3. State Changes Detected
│  └─ Queue re-render
│
└─ 4. Next Render
   └─ Process same hook order
        `,
        mentalModel: "Hooks are like a row of mailboxes for a component. Each render, React checks each mailbox in order, reads/writes state, and ensures the mailboxes are always in the same order.",
        questions: [
          "How do hooks work internally?",
          "Why can't hooks be called conditionally?",
          "Explain the rules of hooks",
          "How does useState preserve state?"
        ],
        traps: [
          "Thinking hooks create new functions each render",
          "Confusing useEffect with useLayoutEffect timing",
          "Assuming useCallback always prevents re-creation"
        ],
        debugScenario: "A developer gets 'Rules of Hooks' violation error when trying to use a hook inside an if statement.",
        productionInsight: "Understanding hooks internals is essential for debugging state issues, optimizing performance, and building custom hooks.",
        comparison: {
          "useState": "Simple state, setter function",
          "useReducer": "Complex state, dispatch pattern",
          "useContext": "Global state, subscription model"
        }
      },
      concurrentRendering: {
        title: "Concurrent Rendering",
        tree: `
┌─ Concurrent Features
├─ Suspense
│  ├─ Code splitting
│  ├─ Data fetching
│  └─ Error boundaries
├─ Transitions
│  ├─ useTransition hook
│  ├─ Non-urgent updates
│  └─ Loading states
├─ Deferred Updates
│  ├─ startTransition
│  └─ Priority scheduling
└─ Interruptible Rendering
   ├─ Time slicing
   └─ User responsiveness
        `,
        flow: `
Update Request → Priority Check → Render → Interrupt/Commit
│
├─ 1. Classify Update Priority
│  ├─ High: User input
│  ├─ Normal: State updates
│  └─ Low: Data fetching
│
├─ 2. Start Concurrent Render
│  └─ Begin work in background
│
├─ 3. Check for Interruption
│  ├─ Higher priority update?
│  └─ Abort if needed
│
└─ 4. Commit or Discard
   ├─ Commit if uninterrupted
   └─ Restart if interrupted
        `,
        mentalModel: "Concurrent rendering is like having multiple checkout lanes. Important customers (user interactions) get priority, while others can wait or even restart if something more important comes up.",
        questions: [
          "What is concurrent rendering in React?",
          "How does Suspense work with concurrent features?",
          "Explain useTransition and its use cases",
          "What are the benefits of interruptible rendering?",
          "How does React handle concurrent state updates?"
        ],
        traps: [
          "Thinking concurrent means parallel",
          "Confusing Suspense with lazy loading",
          "Assuming all updates are concurrent",
          "Forgetting that concurrent features are opt-in"
        ],
        debugScenario: "A developer's app feels sluggish during data fetching. They need to implement concurrent features to improve user experience.",
        productionInsight: "Concurrent rendering enables better user experience, smoother animations, and more responsive applications under heavy load.",
        comparison: {
          "Blocking Render": "All or nothing, legacy",
          "Concurrent Render": "Interruptible, prioritized",
          "Progressive Render": "Incremental, experimental"
        }
      },
      suspense: {
        title: "Suspense & Error Boundaries",
        tree: `
┌─ Error Handling
├─ Error Boundaries
│  ├─ componentDidCatch
│  ├─ getDerivedStateFromError
│  ├─ Fallback UI
│  └─ Error reporting
├─ Suspense
│  ├─ Lazy loading
│  ├─ Data fetching
│  ├─ Code splitting
│  └─ Loading states
└─ Error Recovery
   ├─ Retry mechanisms
   └─ Graceful degradation
        `,
        flow: `
Error Detection → Boundary Catch → Fallback Render → Recovery
│
├─ 1. Error Occurs
│  └─ In child component
│
├─ 2. Error Boundary Catches
│  ├─ componentDidCatch
│  └─ getDerivedStateFromError
│
├─ 3. Render Fallback
│  └─ Show error UI
│
└─ 4. Recovery Options
   ├─ Retry action
   └─ Alternative content
        `,
        mentalModel: "Error boundaries are like safety nets. When a performer (component) falls (throws error), the net catches them and provides a safe landing (fallback UI) instead of crashing the whole show.",
        questions: [
          "How do error boundaries work in React?",
          "What's the difference between error boundaries and try/catch?",
          "Explain Suspense and its use cases",
          "How do you implement retry logic with Suspense?",
          "What are the limitations of error boundaries?"
        ],
        traps: [
          "Thinking error boundaries catch all errors",
          "Confusing error boundaries with event handlers",
          "Forgetting error boundaries don't catch async errors",
          "Assuming Suspense handles all loading states"
        ],
        debugScenario: "A React app crashes completely when a component throws an error. Developer needs to wrap components in error boundaries to prevent app crashes.",
        productionInsight: "Error boundaries and Suspense are essential for building robust, user-friendly applications that handle failures gracefully.",
        comparison: {
          "Error Boundaries": "Catch render errors, class components only",
          "Try/Catch": "Catch imperative errors, works anywhere",
          "Suspense": "Handle async operations, loading states"
        }
      },
      memoization: {
        title: "Memoization Strategy",
        tree: `
┌─ Memoization Techniques
├─ React.memo
│  ├─ Component memoization
│  ├─ Props comparison
│  └─ Prevents re-renders
├─ useMemo
│  ├─ Value memoization
│  ├─ Dependency array
│  └─ Expensive calculations
├─ useCallback
│  ├─ Function memoization
│  ├─ Stable references
│  └─ Event handlers
└─ Memoization Patterns
   ├─ Derived state
   ├─ Computed values
   └─ Optimized lists
        `,
        flow: `
Props/State Change → Memoization Check → Render Decision
│
├─ 1. Component Update
│  └─ New props/state
│
├─ 2. Memoization Check
│  ├─ React.memo: props comparison
│  ├─ useMemo: dependency comparison
│  └─ useCallback: dependency comparison
│
├─ 3. Render Decision
│  ├─ Use memoized value
│  └─ Skip re-render
│
└─ 4. Cache Update
   └─ Update memoized result
        `,
        mentalModel: "Memoization is like a calculator with memory. Instead of recalculating 2+2 every time, it remembers the answer and reuses it. React's memoization works the same way for components and values.",
        questions: [
          "When should you use React.memo?",
          "What's the difference between useMemo and useCallback?",
          "How does React.memo compare props?",
          "What are the pitfalls of over-memoization?",
          "How do you optimize list rendering with memoization?"
        ],
        traps: [
          "Memoizing everything",
          "Forgetting dependency arrays",
          "Memoizing unstable values",
          "Not understanding reference equality"
        ],
        debugScenario: "A developer's list re-renders unnecessarily. They need to use React.memo and stable keys to optimize performance.",
        productionInsight: "Memoization is crucial for optimizing React performance, preventing unnecessary re-renders, and building smooth user interfaces.",
        comparison: {
          "React.memo": "Memoizes components, compares props",
          "useMemo": "Memoizes values, expensive calculations",
          "useCallback": "Memoizes functions, stable references"
        }
      },
      nextjs: {
        title: "Next.js Architecture",
        tree: `
┌─ Next.js Features
├─ Rendering Strategies
│  ├─ Server-Side Rendering (SSR)
│  ├─ Static Site Generation (SSG)
│  ├─ Client-Side Rendering (CSR)
│  └─ Incremental Static Regeneration (ISR)
├─ React Server Components (RSC)
│  ├─ Server-side execution
│  ├─ No client-side JavaScript
│  └─ Streaming capabilities
├─ Performance Features
│  ├─ Automatic code splitting
│  ├─ Image optimization
│  ├─ Font optimization
│  └─ Bundle optimization
└─ Developer Experience
   ├─ File-based routing
   ├─ API routes
   ├─ Middleware
   └─ Built-in optimizations
        `,
        flow: `
Request → Next.js Router → Page Rendering → Response
│
├─ 1. Request Handling
│  └─ Next.js receives request
│
├─ 2. Route Resolution
│  ├─ File-based routing
│  └─ API route handling
│
├─ 3. Rendering Decision
│  ├─ SSR vs SSG vs CSR
│  ├─ RSC vs RCC
│  └─ Caching strategy
│
├─ 4. Page Generation
│  ├─ Server execution
│  ├─ Data fetching
│  └─ Component rendering
│
└─ 5. Response Delivery
   ├─ HTML streaming
   ├─ JavaScript bundling
   └─ Asset optimization
        `,
        mentalModel: "Next.js is like a smart restaurant chain. Each location (page) has its own kitchen (server), but they share recipes (components) and can pre-prepare meals (SSG) or cook fresh (SSR) based on demand.",
        questions: [
          "How does Next.js SSR work?",
          "What's the difference between SSR and SSG in Next.js?",
          "Explain React Server Components",
          "How does Next.js handle routing?",
          "What are the benefits of Next.js automatic code splitting?"
        ],
        traps: [
          "Using SSR for highly dynamic content",
          "Confusing RSC with regular components",
          "Not understanding when to use ISR",
          "Forgetting about client-side hydration"
        ],
        debugScenario: "A developer's Next.js app is slow due to improper use of SSR for dynamic content. They need to switch to CSR or ISR for better performance.",
        productionInsight: "Next.js architecture provides optimal performance, SEO, and developer experience for modern web applications.",
        comparison: {
          "SSR": "Server renders, good SEO, slower TTFB",
          "SSG": "Build-time renders, fastest, limited dynamic",
          "CSR": "Client renders, interactive, slower initial load"
        }
      },
      testing: {
        title: "Testing (Unit, Integration, E2E)",
        tree: `
┌─ Testing Pyramid
├─ Unit Tests
│  ├─ Component isolation
│  ├─ Function testing
│  ├─ Fast feedback
│  └─ Mock dependencies
├─ Integration Tests
│  ├─ Component interaction
│  ├─ API integration
│  ├─ Database integration
│  └─ Service testing
├─ End-to-End Tests
│  ├─ User workflows
│  ├─ Cross-browser testing
│  ├─ Mobile testing
│  └─ Performance testing
└─ Testing Tools
   ├─ Jest/Vitest
   ├─ React Testing Library
   ├─ Cypress/Playwright
   └─ Testing strategies
        `,
        flow: `
Test Planning → Test Execution → Assertion → Reporting
│
├─ 1. Test Planning
│  ├─ Define test cases
│  ├─ Set up test environment
│  └─ Prepare test data
│
├─ 2. Test Execution
│  ├─ Arrange-Act-Assert
│  ├─ Component rendering
│  └─ User interactions
│
├─ 3. Assertion
│  ├─ Expected vs actual
│  ├─ Error handling
│  └─ Edge cases
│
└─ 4. Test Reporting
   ├─ Coverage reports
   ├─ Test results
   └─ Performance metrics
        `,
        mentalModel: "Testing is like quality control in manufacturing. Each product (feature) goes through multiple inspections (unit, integration, E2E) to ensure it works correctly before reaching customers (users).",
        questions: [
          "What's the testing pyramid in React?",
          "How do you test React components?",
          "What's the difference between unit and integration tests?",
          "When should you use E2E tests?",
          "How do you mock dependencies in tests?"
        ],
        traps: [
          "Testing implementation details",
          "Not testing user behavior",
          "Over-mocking in tests",
          "Ignoring edge cases"
        ],
        debugScenario: "A React component passes unit tests but fails in production. Developer discovers they weren't testing actual user interactions and browser behavior.",
        productionInsight: "Comprehensive testing ensures reliable applications, prevents regressions, and maintains code quality throughout development.",
        comparison: {
          "Unit Tests": "Fast, isolated, function/component level",
          "Integration Tests": "Medium, interactions, service level",
          "E2E Tests": "Slow, workflows, application level"
        }
      },
      designPatterns: {
        title: "React Design Patterns",
        tree: `
┌─ Common Patterns
├─ Component Patterns
│  ├─ Compound Components
│  ├─ Render Props
│  ├─ Higher-Order Components
│  └─ Custom Hooks
├─ State Patterns
│  ├─ Provider Pattern
│  ├─ Reducer Pattern
│  ├─ State Machine
│  └─ Observer Pattern
├─ Performance Patterns
│  ├─ Virtual Scrolling
│  ├─ Lazy Loading
│  ├─ Code Splitting
│  └─ Memoization
└─ Architecture Patterns
   ├─ Feature Flags
   ├─ Error Boundaries
   ├─ Suspense Boundaries
   └─ Micro-frontends
        `,
        flow: `
Pattern Identification → Implementation → Integration → Optimization
│
├─ 1. Pattern Selection
│  └─ Choose appropriate pattern
│
├─ 2. Pattern Implementation
│  ├─ Follow pattern rules
│  ├─ Maintain consistency
│  └─ Document usage
│
├─ 3. Integration
│  ├─ Combine with other patterns
│  └─ Ensure compatibility
│
└─ 4. Pattern Evolution
   ├─ Adapt to requirements
   └─ Optimize performance
        `,
        mentalModel: "Design patterns are like recipes. Instead of figuring out how to cook a complex dish from scratch, you follow a proven recipe that guarantees good results every time.",
        questions: [
          "What are the most common React design patterns?",
          "How do you implement the compound component pattern?",
          "Explain the provider pattern in React",
          "When should you use custom hooks?",
          "What's the difference between HOCs and render props?"
        ],
        traps: [
          "Overusing patterns",
          "Applying patterns incorrectly",
          "Not understanding pattern tradeoffs",
          "Creating over-engineered solutions"
        ],
        debugScenario: "A developer's component hierarchy is complex and hard to maintain. They need to apply appropriate design patterns to simplify the architecture.",
        productionInsight: "Design patterns provide proven solutions, improve maintainability, and enable team collaboration through shared understanding.",
        comparison: {
          "Compound Components": "Flexible API, internal state, composition",
          "HOCs": "Component wrapping, prop enhancement, legacy",
          "Render Props": "Function injection, flexible rendering, modern"
        }
      }
    }
  }, // <-- comma added here

  // Node.js Deep Internals
  nodejs: {
    title: "Node.js Deep Internals",
    icon: "🟢",
    description: "Complete Node.js architecture and performance optimization",
    topics: {
      v8Engine: {
        title: "V8 Engine",
        tree: `
┌─ V8 Architecture
├─ JavaScript Runtime
│  ├─ Parser
│  ├─ AST Generation
│  └─ Bytecode Compiler
├─ Memory Heap
│  ├─ Young Generation
│  │  ├─ Eden Space
│  │  ├─ Survivor 1
│  │  └─ Survivor 2
│  └─ Old Generation
│     ├─ Mark-Sweep
│     └─ Mark-Compact
├─ Call Stack
│  └─ Execution frames
└─ Just-In-Time Compiler
   ├─ Ignition (interpreter)
   └─ TurboFan (optimizer)
        `,
        flow: `
JavaScript Code → Parse → Compile → Execute → Optimize
│
├─ 1. Parse JavaScript
│  └─ Generate AST
│
├─ 2. Compile to Bytecode
│  └─ Ignition interpreter
│
├─ 3. Execute Bytecode
│  └─ Collect profiling data
│
└─ 4. Optimize Hot Code
   └─ TurboFan compiler
        `,
        mentalModel: "V8 is like a smart translator. It first quickly translates JavaScript to basic instructions (Ignition), watches which parts are used most, then creates super-fast optimized versions of those parts (TurboFan).",
        questions: [
          "How does V8 execute JavaScript code?",
          "What is the difference between Ignition and TurboFan?",
          "Explain V8's garbage collection process",
          "How does V8 optimize JavaScript performance?",
          "What are hidden classes in V8?"
        ],
        traps: [
          "Thinking V8 interprets all code",
          "Confusing heap with stack memory",
          "Assuming optimization happens immediately",
          "Forgetting about hidden class optimization"
        ],
        debugScenario: "A developer has a memory leak in their Node.js application and needs to understand V8's garbage collection to debug it.",
        productionInsight: "Understanding V8 is crucial for optimizing Node.js performance, debugging memory issues, and writing efficient JavaScript.",
        comparison: {
          "Interpreter": "Fast startup, slower execution",
          "JIT Compiler": "Slower startup, faster execution",
          "AOT Compiler": "Fastest execution, no flexibility"
        }
      },
      threadPool: {
        title: "Thread Pool & Worker Threads",
        tree: `
┌─ Concurrency Model
├─ Event Loop (Single Thread)
│  ├─ Main thread execution
│  ├─ Non-blocking I/O
│  └─ Event coordination
├─ Thread Pool
│  ├─ libuv thread pool
│  ├─ I/O operations
│  ├─ File system access
│  └─ Network operations
├─ Worker Threads
│  ├─ Isolated JavaScript execution
│  ├─ Shared memory
│  ├─ Message passing
│  └─ CPU-intensive tasks
└─ Concurrency Patterns
   ├─ Event-driven
   ├─ Parallel processing
   └─ Load distribution
        `,
        flow: `
Task Request → Thread Assignment → Execution → Result Callback
│
├─ 1. Task Submission
│  └─ I/O or CPU-intensive
│
├─ 2. Thread Assignment
│  ├─ Event loop for I/O
│  └─ Worker threads for CPU
│
├─ 3. Parallel Execution
│  ├─ Thread pool work
│  └─ Worker isolation
│
└─ 4. Result Handling
   ├─ Callback to main thread
   └─ Event loop processing
        `,
        mentalModel: "Node.js is like a restaurant with one head chef (main thread) and multiple assistants (thread pool). The chef handles customer orders (event loop), while assistants chop vegetables (I/O operations) in parallel.",
        questions: [
          "How does Node.js handle concurrency?",
          "What's the difference between thread pool and worker threads?",
          "When should you use worker threads?",
          "How does the event loop work with threads?",
          "What are the limitations of Node.js concurrency?"
        ],
        traps: [
          "Thinking Node.js is truly multithreaded",
          "Using worker threads for I/O operations",
          "Forgetting about thread communication overhead",
          "Assuming all operations benefit from threads"
        ],
        debugScenario: "A developer's CPU-intensive operation blocks the event loop. They need to move it to a worker thread to maintain responsiveness.",
        productionInsight: "Understanding Node.js concurrency is essential for building scalable, high-performance applications that handle multiple operations efficiently.",
        comparison: {
          "Event Loop": "Single thread, non-blocking I/O, event-driven",
          "Thread Pool": "Background threads, I/O operations, libuv managed",
          "Worker Threads": "Isolated JS, CPU-intensive, manual management"
        }
      },
      streams: {
        title: "Streams & Backpressure",
        tree: `
┌─ Stream Types
├─ Readable Streams
│  ├─ data events
│  ├─ pipe() method
│  └─ Flow control
├─ Writable Streams
│  ├─ write() method
│  ├─ drain events
│  └─ Backpressure handling
├─ Duplex Streams
│  ├─ Read and write
│  └─ Transform streams
└─ Pipeline Streams
   ├─ Chain multiple streams
   ├─ Data transformation
   └─ Flow control
        `,
        flow: `
Data Source → Stream Processing → Data Destination
│
├─ 1. Create Stream
│  └─ Initialize readable/writable
│
├─ 2. Pipe Streams
│  ├─ Connect source to destination
│  ├─ Handle backpressure
│  └─ Flow control
│
├─ 3. Process Data
│  ├─ Transform if needed
│  ├─ Handle events
│  └─ Error handling
│
└─ 4. Complete Stream
   ├─ End event
   └─ Cleanup resources
        `,
        mentalModel: "Streams are like water pipes. Data flows through them continuously. If the destination can't handle the flow fast enough (backpressure), the source slows down to prevent spills (memory issues).",
        questions: [
          "How do streams work in Node.js?",
          "What is backpressure and how do you handle it?",
          "Explain the difference between readable and writable streams",
          "How do you create custom streams?",
          "What are stream pipelines?"
        ],
        traps: [
          "Not handling backpressure",
          "Forgetting error handling in streams",
          "Mixing sync and async operations",
          "Not properly ending streams"
        ],
        debugScenario: "A developer's file processing app runs out of memory when processing large files. They need to implement proper stream handling with backpressure management.",
        productionInsight: "Streams are essential for handling large datasets, memory-efficient processing, and building scalable Node.js applications.",
        comparison: {
          "Readable": "Data source, events, pipe() method",
          "Writable": "Data destination, write(), drain events",
          "Transform": "Both read/write, data modification, duplex"
        }
      },
      cluster: {
        title: "Cluster Mode & Scaling",
        tree: `
┌─ Cluster Architecture
├─ Master Process
│  ├─ Forks workers
│  ├─ Load balancing
│  └─ Worker management
├─ Worker Processes
│  ├─ Isolated processes
│  ├─ Shared server port
│  └─ Inter-process communication
├─ Load Balancing
│  ├─ Round-robin
│  ├─ Least connections
│  └─ Custom strategies
└─ Fault Tolerance
   ├─ Worker restart
   ├─ Health monitoring
   └─ Graceful shutdown
        `,
        flow: `
Cluster Start → Master Fork → Workers Handle → Load Balance
│
├─ 1. Master Process
│  └─ cluster.fork() workers
│
├─ 2. Worker Initialization
│  ├─ Each worker listens
│  └─ Shared port handling
│
├─ 3. Request Distribution
│  ├─ Master routes requests
│  ├─ Load balancing algorithm
│  └─ Worker selection
│
└─ 4. Worker Processing
   ├─ Handle requests
   ├─ Report to master
   └─ Handle failures
        `,
        mentalModel: "Cluster mode is like opening multiple checkout counters. One manager (master) directs customers to available counters (workers) to serve more people simultaneously without making them wait in long lines.",
        questions: [
          "How does Node.js cluster mode work?",
          "What's the difference between cluster and worker threads?",
          "How do you implement load balancing in clusters?",
          "What are the benefits of clustering?",
          "How do clusters handle worker failures?"
        ],
        traps: [
          "Sharing state between workers",
          "Not handling worker process crashes",
          "Forgetting about inter-process communication",
          "Assuming automatic load balancing"
        ],
        debugScenario: "A Node.js server can't handle high traffic. Developer needs to implement clustering to utilize all CPU cores.",
        productionInsight: "Clustering is essential for scaling Node.js applications, utilizing multi-core systems, and improving throughput.",
        comparison: {
          "Single Process": "One core, simple, limited scaling",
          "Cluster Mode": "Multiple cores, load balancing, complex",
          "Container Scaling": "Horizontal scaling, isolation, orchestration"
        }
      },
      security: {
        title: "Security Best Practices",
        tree: `
┌─ Security Areas
├─ Input Validation
│  ├─ Sanitization
│  ├─ Parameter checking
│  └─ Type validation
├─ Authentication
│  ├─ Password hashing
│  ├─ JWT tokens
│  └─ Session management
├─ Authorization
│  ├─ Role-based access
│  ├─ Permission checks
│  └─ Resource protection
├─ Data Protection
│  ├─ Encryption at rest
│  ├─ HTTPS enforcement
│  └─ Sensitive data handling
└─ Attack Prevention
   ├─ XSS protection
   ├─ CSRF prevention
   ├─ SQL injection prevention
   └─ Rate limiting
        `,
        flow: `
Request → Security Check → Validation → Processing → Response
│
├─ 1. Input Validation
│  ├─ Sanitize inputs
│  └─ Validate parameters
│
├─ 2. Authentication
│  ├─ Verify credentials
│  └─ Generate tokens
│
├─ 3. Authorization
│  ├─ Check permissions
│  └─ Resource access
│
└─ 4. Secure Response
   ├─ Set security headers
   └─ Encrypt sensitive data
        `,
        mentalModel: "Node.js security is like building a fortress with multiple layers of defense. Each layer checks different types of threats before allowing access to the treasure (data).",
        questions: [
          "What are the most important Node.js security practices?",
          "How do you prevent XSS in Node.js applications?",
          "Explain JWT implementation in Node.js",
          "What's the difference between authentication and authorization?",
          "How do you implement rate limiting in Node.js?"
        ],
        traps: [
          "Trusting user input",
          "Storing passwords in plain text",
          "Forgetting to set security headers",
          "Not implementing proper error handling for security"
        ],
        debugScenario: "A Node.js application suffers from XSS attacks. Developer needs to implement proper input sanitization and output encoding.",
        productionInsight: "Security is critical for protecting user data, preventing attacks, and maintaining trust in production applications.",
        comparison: {
          "Authentication": "Who you are, credentials, tokens",
          "Authorization": "What you can do, permissions, roles",
          "Input Validation": "Data sanitization, type checking, protection"
        }
      },
      performance: {
        title: "Performance & Memory Management",
        tree: `
┌─ Performance Areas
├─ Event Loop Optimization
│  ├─ Non-blocking operations
│  ├─ Microtask scheduling
│  └─ Batch processing
├─ Memory Management
│  ├─ Memory leak detection
│  ├─ Garbage collection tuning
│  └─ Heap size monitoring
├─ CPU Optimization
│  ├─ Algorithmic efficiency
│  ├─ Worker threads usage
│  └─ Process clustering
└─ I/O Optimization
   ├─ Asynchronous operations
   ├─ Stream processing
   ├─ Connection pooling
   ├─ Caching strategies
        `,
        flow: `
Performance Analysis → Bottleneck Identification → Optimization → Monitoring
│
├─ 1. Performance Profiling
│  ├─ CPU profiling
│  ├─ Memory profiling
│  └─ Event loop analysis
│
├─ 2. Identify Bottlenecks
│  ├─ Blocking operations
│  ├─ Memory leaks
│  ├─ Inefficient algorithms
│  └─ I/O bound operations
│
├─ 3. Apply Optimizations
│  ├─ Async/await patterns
│  ├─ Worker threads
│  ├─ Clustering
│  └─ Caching
│
└─ 4. Monitor Results
   ├─ Performance metrics
   ├─ Memory usage
   └─ Response times
        `,
        mentalModel: "Node.js performance optimization is like tuning a race car. You measure lap times (profiling), identify what's slowing you down (bottlenecks), make specific improvements (optimizations), and measure again to see if you're faster.",
        questions: [
          "How do you optimize Node.js application performance?",
          "What are common Node.js performance bottlenecks?",
          "How do you debug memory leaks in Node.js?",
          "Explain event loop optimization techniques",
          "When should you use clustering vs worker threads?"
        ],
        traps: [
          "Blocking the event loop",
          "Ignoring memory leaks",
          "Over-optimizing prematurely",
          "Not measuring performance"
        ],
        debugScenario: "A Node.js API server becomes slow under load. Developer discovers that synchronous database operations are blocking the event loop and needs to make them asynchronous.",
        productionInsight: "Performance optimization is crucial for scalable Node.js applications, user experience, and resource utilization.",
        comparison: {
          "Event Loop": "Single thread, non-blocking, event-driven",
          "Worker Threads": "Multiple threads, CPU tasks, isolation",
          "Clustering": "Multiple processes, load balancing, scaling"
        }
      }
    }
  }, // <-- comma added here

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
  }, // <-- comma added here

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
  }, // <-- comma added here

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
  }, // <-- comma added here

  performanceOptimization: {
    title: "Performance Optimization",
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
      "Rendering": "60fps target, avoid layout thrashing, use requestAnimationFrame",
      "Network": "Minimize requests, compress assets, use CDNs, implement caching",
      "Memory": "Prevent leaks, pool objects, monitor GC, optimize data structures"
    }
  }, // <-- comma added here

  // Express Architecture
  express: {
    title: "Express Architecture",
    icon: "🚂",
    description: "Complete Express.js patterns and security",
    topics: {
      middleware: {
        title: "Middleware Chain Flow",
        tree: `
┌─ Middleware Types
├─ Application-Level
│  ├─ app.use()
│  └─ Global middleware
├─ Router-Level
│  ├─ router.use()
│  └─ Route-specific
├─ Route-Level
│  ├─ Route handlers
│  └─ Error handling
└─ Built-in Middleware
   ├─ express.json()
   ├─ express.urlencoded()
   └─ express.static()
        `,
        flow: `
Request → Middleware Chain → Route Handler → Response
│
├─ 1. Request Received
│  └─ Start middleware chain
│
├─ 2. Middleware Processing
│  ├─ Execute in order
│  ├─ Modify req/res
│  └─ Call next() or end response
│
├─ 3. Route Handler
│  └─ Final processing
│
├─ 4. Response Sent
│  └─ End of request cycle
│
└─ 5. Error Handling
   └─ Error middleware
        `,
        mentalModel: "Middleware chain is like an assembly line. Each worker (middleware) adds something to the product (request) before passing it to the next worker. If any worker finds an issue, they can stop the line.",
        questions: [
          "How does Express middleware work?",
          "What's the order of middleware execution?",
          "How do you write custom middleware?",
          "What's the difference between app.use() and router.use()?",
          "How does error handling middleware work?"
        ],
        traps: [
          "Forgetting to call next()",
          "Calling next() multiple times",
          "Modifying response after next()",
          "Not handling errors properly"
        ],
        debugScenario: "A developer's middleware isn't running in the expected order. They need to understand how Express processes the middleware chain.",
        productionInsight: "Understanding middleware is crucial for building secure, maintainable Express applications with proper request processing and error handling.",
        comparison: {
          "Application Middleware": "Global, applies to all routes",
          "Router Middleware": "Scoped, applies to router routes",
          "Route Middleware": "Specific, applies to single route"
        }
      },
      errorHandling: {
        title: "Error Handling Flow",
        tree: `
┌─ Error Types
├─ Synchronous Errors
│  ├─ Thrown in route handlers
│  └─ Caught immediately
├─ Asynchronous Errors
│  ├─ In callbacks
│  ├─ In promises
│  └─ Need explicit handling
├─ Validation Errors
│  └─ Input validation failures
├─ System Errors
│  └─ Database, network issues
└─ Error Handling
   ├─ Try/catch blocks
   ├─ Error middleware
   └─ Error handling strategies
        `,
        flow: `
Error Occurs → Error Middleware → Error Response → Logging
│
├─ 1. Error Detection
│  └─ Try/catch or uncaught
│
├─ 2. Error Middleware
│  ├─ Express error handler
│  └─ Custom error handlers
│
├─ 3. Error Response
│  ├─ Status code
│  ├─ Error message
│  └─ Stack trace (development)
│
└─ 4. Error Logging
   ├─ Log error details
   └─ Monitor error rates
        `,
        mentalModel: "Error handling in Express is like having a safety net. When something goes wrong (error), the net catches it and provides a controlled response instead of crashing the application.",
        questions: [
          "How does Express handle errors?",
          "What's the difference between sync and async error handling?",
          "How do you create custom error middleware?",
          "What are the best practices for error responses?",
          "How do you handle validation errors?"
        ],
        traps: [
          "Not handling async errors",
          "Sending stack traces to clients",
          "Not logging errors properly",
          "Forgetting default error handling"
        ],
        debugScenario: "A developer's Express app crashes on async errors because they're not properly handled in promise chains.",
        productionInsight: "Proper error handling is essential for application stability, user experience, and debugging production issues.",
        comparison: {
          "Sync Errors": "Immediate, try/catch, easy to handle",
          "Async Errors": "Delayed, promise/catch, explicit handling",
          "Validation Errors": "Preventable, input checking, user feedback"
        }
      },
      authentication: {
        title: "Authentication & Security",
        tree: `
┌─ Authentication Methods
├─ Session-Based
│  ├─ Cookie storage
│  ├─ Server-side sessions
│  └─ Session middleware
├─ Token-Based
│  ├─ JWT tokens
│  ├─ Bearer tokens
│  └─ Token validation
├─ OAuth Integration
│  ├─ Third-party auth
│  ├─ Social login
│  └─ Permission scopes
└─ Security Best Practices
   ├─ Password hashing
   ├─ Rate limiting
   ├─ CSRF protection
   └─ HTTPS enforcement
        `,
        flow: `
Login Request → Credential Validation → Token Generation → Token Verification → Protected Access
│
├─ 1. Authentication Request
│  └─ User credentials
│
├─ 2. Credential Validation
│  └─ Hash comparison
│
├─ 3. Token Generation
│  ├─ JWT creation
│  └─ Session creation
│
├─ 4. Token Verification
│  └─ Middleware validation
│
└─ 5. Protected Access
│  └─ Route authorization
        `,
        mentalModel: "Authentication is like a secure building entrance. You show ID (credentials), security guard verifies it, and you get a temporary access card (token) to enter restricted areas.",
        questions: [
          "How does JWT authentication work in Express?",
          "What's the difference between session and token authentication?",
          "How do you implement OAuth in Express?",
          "What are the best practices for password security?",
          "How do you protect against CSRF attacks?"
        ],
        traps: [
          "Storing passwords in plain text",
          "Not validating JWT signatures",
          "Forgetting token expiration",
          "Not implementing rate limiting"
        ],
        debugScenario: "A developer's authentication system is vulnerable to timing attacks because they're not using proper password hashing.",
        productionInsight: "Secure authentication is critical for protecting user data, preventing unauthorized access, and maintaining application security.",
        comparison: {
          "Session Auth": "Server-side, cookie-based, stateful",
          "JWT Auth": "Stateless, token-based, scalable",
          "OAuth": "Third-party, delegated access, social login"
        }
      },
      validation: {
        title: "Input Validation Architecture",
        tree: `
┌─ Validation Layers
├─ Schema Validation
│  ├─ Joi/Yup schemas
│  ├─ Express-validator
│  └─ Custom validators
├─ Type Checking
│  ├─ String validation
│  ├─ Number validation
│  └─ Date validation
├─ Business Rules
│  ├─ Email format
│  ├─ Password strength
│  └─ Custom constraints
└─ Sanitization
   ├─ XSS prevention
   ├─ SQL injection prevention
   └─ Input cleaning
        `,
        flow: `
Input → Validation → Sanitization → Processing → Error/Success
│
├─ 1. Receive Input
│  └─ Request body/params
│
├─ 2. Validate Schema
│  ├─ Check required fields
│  ├─ Validate formats
│  └─ Check constraints
│
├─ 3. Sanitize Input
│  ├─ Remove dangerous characters
│  └─ Encode output
│
├─ 4. Process or Reject
│  ├─ Valid: continue processing
│  └─ Invalid: return error
│
└─ 5. Error Handling
   └─ Validation error response
        `,
        mentalModel: "Input validation is like security screening at an airport. Before letting passengers (data) through security, you check their documents (validation) and scan for dangerous items (sanitization).",
        questions: [
          "How do you implement input validation in Express?",
          "What are the best validation libraries for Express?",
          "How do you prevent XSS in Express applications?",
          "What's the difference between validation and sanitization?",
          "How do you handle validation errors?"
        ],
        traps: [
          "Trusting user input",
          "Only validating, not sanitizing",
          "Forgetting to validate nested objects",
          "Not providing clear error messages"
        ],
        debugScenario: "A developer's Express application is vulnerable to XSS because they're not properly sanitizing user input before rendering it.",
        productionInsight: "Input validation is essential for security, data integrity, and preventing common web vulnerabilities.",
        comparison: {
          "Schema Validation": "Structured, declarative, reusable",
          "Manual Validation": "Custom logic, flexible, error-prone",
          "Sanitization": "Security-focused, output encoding, XSS prevention"
        }
      },
      performance: {
        title: "Performance Optimization",
        tree: `
┌─ Performance Areas
├─ Request Processing
│  ├─ Middleware optimization
│  ├─ Route matching
│  └─ Request parsing
├─ Response Optimization
│  ├─ Compression
│  ├─ Caching headers
│  └─ Streaming responses
├─ Memory Management
│  ├─ Connection pooling
│  ├─ Garbage collection
│  └─ Memory leaks
└─ Concurrency
   ├─ Event loop optimization
   ├─ Worker threads
   └─ Clustering
        `,
        flow: `
Request → Optimization → Processing → Response Optimization → Monitoring
│
├─ 1. Request Optimization
│  ├─ Efficient routing
│  └─ Minimal middleware
│
├─ 2. Processing Optimization
│  ├─ Async operations
│  └─ Efficient algorithms
│
├─ 3. Response Optimization
│  ├─ Compression
│  ├─ Caching
│  └─ Streaming
│
├─ 4. Performance Monitoring
│  ├─ Response times
│  └─ Resource usage
│
└─ 5. Continuous Optimization
   └─ Profile and improve
        `,
        mentalModel: "Express performance optimization is like optimizing a factory assembly line. You want to minimize waiting time (latency), maximize throughput, and ensure quality (accuracy) while using resources efficiently.",
        questions: [
          "How do you optimize Express application performance?",
          "What are the common performance bottlenecks in Express?",
          "How does compression work in Express?",
          "What are the best caching strategies for Express?",
          "How do you implement connection pooling?"
        ],
        traps: [
          "Blocking the event loop",
          "Not implementing caching",
          "Ignoring memory leaks",
          "Over-optimizing prematurely"
        ],
        debugScenario: "A developer's Express API is slow because they're using synchronous database operations that block the event loop.",
        productionInsight: "Performance optimization is crucial for user experience, scalability, and resource utilization in Express applications.",
        comparison: {
          "Compression": "Reduces bandwidth, improves load times",
          "Caching": "Reduces database load, improves response times",
          "Streaming": "Reduces memory usage, improves large response handling"
        }
      }
    }
  }, // <-- comma added here

  // MongoDB & Mongoose
  mongodb: {
    title: "MongoDB & Mongoose",
    icon: "🍃",
    description: "Complete MongoDB internals and Mongoose optimization",
    topics: {
      indexing: {
        title: "Indexing Strategies",
        tree: `
┌─ Index Types
├─ Single Field Index
│  └─ One column optimization
├─ Compound Index
│  └─ Multiple columns
├─ Text Index
│  └─ Search optimization
├─ Geospatial Index
│  └─ Location queries
├─ Hashed Index
│  └─ Hash-based sharding
└─ TTL Index
   └─ Auto-expiration
        `,
        flow: `
Query → Index Scan → Document Fetch → Result
│
├─ 1. Query Analysis
│  └─ Check available indexes
│
├─ 2. Index Selection
│  └─ Choose optimal index
│
├─ 3. Index Scan
│  └─ Find matching documents
│
└─ 4. Document Fetch
   └─ Retrieve full documents
        `,
        mentalModel: "Indexes are like a book's table of contents. Instead of reading every page (collection scan), you look up the topic in the table of contents (index) and go directly to the right pages.",
        questions: [
          "How do MongoDB indexes work?",
          "When should you use compound indexes?",
          "What is the difference between covered queries and regular queries?",
          "How do you analyze query performance?",
          "What are best practices for index design?"
        ],
        traps: [
          "Creating too many indexes",
          "Not considering index write overhead",
          "Forgetting about index selectivity",
          "Ignoring query patterns"
        ],
        debugScenario: "A developer's queries are slow despite having indexes. They need to understand why indexes aren't being used.",
        productionInsight: "Proper indexing is crucial for MongoDB performance, affecting both query speed and write performance.",
        comparison: {
          "Collection Scan": "Slow, reads all documents",
          "Index Scan": "Fast, uses index structure",
          "Covered Query": "Fastest, no document fetch"
        }
      },
      aggregation: {
        title: "Aggregation Pipeline",
        tree: `
┌─ Pipeline Stages
├─ $match
│  ├─ Filter documents
│  └─ Query conditions
├─ $group
│  ├─ Group by fields
│  └─ Accumulate results
├─ $project
│  ├─ Reshape documents
│  └─ Select fields
├─ $sort
│  ├─ Order results
│  └─ Memory usage
├─ $limit
│  ├─ Result count
│  └─ Pagination
└─ $lookup
   ├─ Join collections
   └─ Foreign references
        `,
        flow: `
Collection → Pipeline Stages → Aggregation → Results
│
├─ 1. Initial Collection
│  └─ Source documents
│
├─ 2. Pipeline Processing
│  ├─ $match filtering
│  ├─ $group grouping
│  ├─ $project reshaping
│  └─ $sort ordering
│
├─ 3. Memory Management
│  ├─ Stage limits
│  └─ Disk usage
│
└─ 4. Result Generation
   └─ Final aggregated documents
        `,
        mentalModel: "Aggregation pipeline is like a factory assembly line. Each stage ($match, $group, $project) performs a specific operation on the data, passing it to the next stage until you get the final product.",
        questions: [
          "How does MongoDB aggregation pipeline work?",
          "What are the most common aggregation stages?",
          "How do you optimize aggregation performance?",
          "When should you use $lookup vs manual joins?",
          "What are the limitations of aggregation?"
        ],
        traps: [
          "Not using $match early enough",
          "Forgetting about memory limits",
          "Overusing $project",
          "Not understanding stage order"
        ],
        debugScenario: "A developer's aggregation is slow because they're not filtering documents early in the pipeline.",
        productionInsight: "Aggregation pipelines are powerful for complex data analysis, reporting, and transforming data within MongoDB.",
        comparison: {
          "$match": "Filtering, should be first, uses indexes",
          "$group": "Grouping, memory intensive, accumulators",
          "$project": "Reshaping, field selection, performance"
        }
      },
      transactions: {
        title: "Transactions & ACID",
        tree: `
┌─ Transaction Properties
├─ Atomicity
│  └─ All or nothing
├─ Consistency
│  └─ Valid state transitions
├─ Isolation
│  └─ Concurrent transaction safety
└─ Durability
   └─ Committed changes persist
        `,
        flow: `
Start Transaction → Operations → Commit/Abort
│
├─ 1. Start Transaction
│  └─ Begin session
│
├─ 2. Execute Operations
│  ├─ Read/Write/Update
│  └─ Track changes
│
├─ 3. Validation
│  └─ Check constraints
│
├─ 4. Commit or Abort
│  ├─ Commit: apply changes
│  └─ Abort: discard changes
│
└─ 5. End Transaction
   └─ Release locks
        `,
        mentalModel: "Transactions are like a bank transaction. Either all operations succeed (commit) or all fail (abort) - no partial changes. This ensures data integrity.",
        questions: [
          "How do MongoDB transactions work?",
          "What are the ACID properties?",
          "When should you use transactions?",
          "What are the limitations of MongoDB transactions?",
          "How do transactions affect performance?"
        ],
        traps: [
          "Using transactions for single operations",
          "Forgetting about document size limits",
          "Not handling transaction errors",
          "Mixing transactional and non-transactional operations"
        ],
        debugScenario: "A developer's data becomes inconsistent because they're not properly handling transaction failures.",
        productionInsight: "Transactions ensure data integrity in critical operations like financial transactions and inventory management.",
        comparison: {
          "Single Document": "Fast, no overhead, simple operations",
          "Multi-Document": "Slower, more complex, data consistency",
          "Replicated Transactions": "Distributed, complex, sharded clusters"
        }
      },
      sharding: {
        title: "Sharding & Replication",
        tree: `
┌─ Sharding Components
├─ Shard Key
│  ├─ Data distribution
│  └─ Query routing
├─ Shard Strategy
│  ├─ Range-based
│  ├─ Hash-based
│  └─ Directory-based
├─ Config Servers
│  ├─ Metadata storage
│  └─ Shard mapping
└─ Query Router
   └─ Directs queries to shards
        `,
        flow: `
Query → Config Server → Shard Selection → Query Execution → Result Merge
│
├─ 1. Query Analysis
│  └─ Determine shard key
│
├─ 2. Shard Selection
│  └─ Route to appropriate shard
│
├─ 3. Parallel Execution
│  └─ Execute on multiple shards
│
├─ 4. Result Aggregation
│  └─ Combine and sort results
│
└─ 5. Response Return
   └─ Final result set
        `,
        mentalModel: "Sharding is like having multiple warehouses. Each warehouse (shard) stores part of the inventory. When you need something, a manager (config server) tells you which warehouse has it.",
        questions: [
          "How does MongoDB sharding work?",
          "What are the different sharding strategies?",
          "How do you choose a shard key?",
          "What is the role of config servers?",
          "How does sharding affect query performance?"
        ],
        traps: [
          "Choosing wrong shard key",
          "Uneven data distribution",
          "Hot shard problems",
          "Not considering query patterns"
        ],
        debugScenario: "A developer's queries are slow because all traffic goes to one shard (hot shard) while others are idle.",
        productionInsight: "Sharding enables horizontal scaling, handles large datasets, and improves query performance through parallel processing.",
        comparison: {
          "Single Instance": "Simple, limited scaling, vertical only",
          "Replica Set": "High availability, read scaling, eventual consistency",
          "Sharded Cluster": "Horizontal scaling, write scaling, complex architecture"
        }
      }
    }
  }, // <-- comma added here

  // Microservices Architecture
  microservices: {
    title: "Microservices Architecture",
    icon: "🔧",
    description: "Complete microservices patterns and best practices",
    topics: {
      serviceDesign: {
        title: "Service Design Principles",
        tree: `
┌─ Service Characteristics
├─ Single Responsibility
│  └─ One business capability
├─ Bounded Context
│  └─ Domain boundaries
├─ API Design
│  ├─ RESTful APIs
│  ├─ GraphQL
│  └─ gRPC
├─ Data Management
│  ├─ Database per service
│  ├─ Data ownership
│  └─ Eventual consistency
└─ Service Boundaries
   ├─ Clear interfaces
   ├─ Version management
   └─ Backwards compatibility
        `,
        flow: `
Domain Analysis → Service Definition → API Design → Implementation → Deployment
│
├─ 1. Domain Analysis
│  └─ Identify bounded contexts
│
├─ 2. Service Definition
│  ├─ Define responsibilities
│  └─ Set boundaries
│
├─ 3. API Design
│  ├─ Design interfaces
│  └─ Define contracts
│
├─ 4. Implementation
│  └─ Build service
│
└─ 5. Deployment
   └─ Independent deployment
        `,
        mentalModel: "Microservices are like specialized departments in a company. Each department (service) has its own expertise, resources, and responsibilities, but they work together to achieve the company's goals.",
        questions: [
          "What are the key principles of microservices design?",
          "How do you define service boundaries?",
          "What is bounded context in microservices?",
          "How do you design APIs for microservices?",
          "What are the tradeoffs of microservices vs monolith?"
        ],
        traps: [
          "Making services too small or too large",
          "Not defining clear boundaries",
          "Ignoring data ownership",
          "Forgetting about service communication"
        ],
        debugScenario: "A developer creates microservices that are too coupled, defeating the purpose of the architecture.",
        productionInsight: "Proper service design is crucial for maintainable, scalable microservices architecture.",
        comparison: {
          "Monolith": "Single deployment, tight coupling, simple",
          "Microservices": "Multiple deployments, loose coupling, complex",
          "Modular Monolith": "Single deployment, loose coupling, hybrid"
        }
      },
      communication: {
        title: "Service Communication Patterns",
        tree: `
┌─ Communication Types
├─ Synchronous
│  ├─ REST APIs
│  ├─ gRPC
│  └─ GraphQL
├─ Asynchronous
│  ├─ Message Queues
│  ├─ Event Streaming
│  └─ Pub/Sub
├─ Service Discovery
│  ├─ Client-side discovery
│  ├─ Server-side discovery
│  └─ Service registry
└─ API Gateway
   ├─ Single entry point
   ├─ Request routing
   └─ Cross-cutting concerns
        `,
        flow: `
Service Request → Discovery → Communication → Response/Event
│
├─ 1. Service Discovery
│  └─ Find service location
│
├─ 2. Communication
│  ├─ Choose protocol
│  └─ Send request/event
│
├─ 3. Processing
│  └─ Handle request/event
│
├─ 4. Response
│  ├─ Sync: Return response
│  └─ Async: Publish event
│
└─ 5. Error Handling
   └─ Handle failures
        `,
        mentalModel: "Service communication is like a company's internal communication system. Some conversations are immediate phone calls (synchronous), others are emails (asynchronous), and there's a receptionist (API gateway) directing all communications.",
        questions: [
          "What are the different service communication patterns?",
          "When should you use synchronous vs asynchronous communication?",
          "How does service discovery work?",
          "What is the role of an API gateway?",
          "How do you handle communication failures?"
        ],
        traps: [
          "Overusing synchronous communication",
          "Not implementing proper error handling",
          "Forgetting about service discovery",
          "Ignoring network latency"
        ],
        debugScenario: "A developer's microservices are slow because they're using synchronous calls for everything, creating a cascade of delays.",
        productionInsight: "Choosing the right communication pattern is crucial for system performance and reliability.",
        comparison: {
          "REST": "HTTP-based, stateless, widely adopted",
          "gRPC": "Binary, high-performance, type-safe",
          "Message Queue": "Asynchronous, reliable, decoupled"
        }
      },
      dataManagement: {
        title: "Data Management & Consistency",
        tree: `
┌─ Data Patterns
├─ Database per Service
│  ├─ Data isolation
│  └─ Independent scaling
├─ Event Sourcing
│  ├─ Event log
│  └─ State reconstruction
├─ CQRS
│  ├─ Read/Write separation
│  └─ Optimized models
├─ Saga Pattern
│  ├─ Distributed transactions
│  └─ Compensation actions
└─ Data Consistency
   ├─ Eventual consistency
   ├─ Strong consistency
   └─ Consistency boundaries
        `,
        flow: `
Data Request → Service Database → Event Publishing → Data Sync → Consistency
│
├─ 1. Data Operation
│  └─ Local transaction
│
├─ 2. Event Publishing
│  └─ Domain events
│
├─ 3. Event Consumption
│  └─ Update other services
│
├─ 4. Consistency Check
│  └─ Verify data sync
│
└─ 5. Conflict Resolution
   └─ Handle inconsistencies
        `,
        mentalModel: "Data management in microservices is like multiple departments each keeping their own records. When one department updates their records, they notify others to keep everyone in sync, but there might be brief periods where records don't match exactly.",
        questions: [
          "How do you manage data across microservices?",
          "What is the database per service pattern?",
          "How does event sourcing work?",
          "What is the Saga pattern?",
          "How do you ensure data consistency?"
        ],
        traps: [
          "Sharing databases between services",
          "Not handling distributed transactions",
          "Ignoring eventual consistency",
          "Forgetting about data ownership"
        ],
        debugScenario: "A developer's microservices have data inconsistencies because they're not properly handling distributed transactions.",
        productionInsight: "Proper data management is crucial for maintaining data integrity and consistency across distributed systems.",
        comparison: {
          "Database per Service": "Isolated, independent, consistent",
          "Shared Database": "Coupled, convenient, inconsistent",
          "Event Sourcing": "Immutable, auditable, complex"
        }
      },
      resilience: {
        title: "Resilience & Fault Tolerance",
        tree: `
┌─ Resilience Patterns
├─ Circuit Breaker
│  ├─ Failure detection
│  └─ Automatic recovery
├─ Retry Pattern
│  ├─ Exponential backoff
│  └─ Idempotent operations
├─ Bulkhead Pattern
│  ├─ Resource isolation
│  └─ Failure containment
├─ Timeout Management
│  ├─ Request timeouts
│  └─ Graceful degradation
└─ Health Monitoring
   ├─ Health checks
   └─ Metrics collection
        `,
        flow: `
Service Call → Failure Detection → Circuit Breaker → Fallback → Recovery
│
├─ 1. Service Call
│  └─ Make request
│
├─ 2. Failure Detection
│  └─ Monitor failures
│
├─ 3. Circuit Breaker
│  ├─ Open circuit
│  └─ Stop calls
│
├─ 4. Fallback
│  └─ Alternative response
│
├─ 5. Recovery
│  └─ Gradual recovery
│
└─ 6. Normal Operation
   └─ Resume calls
        `,
        mentalModel: "Resilience patterns are like a car's safety features. Airbags (circuit breakers) deploy in crashes, seatbelts (retries) keep you secure, and backup systems (fallbacks) take over when primary systems fail.",
        questions: [
          "What are the key resilience patterns in microservices?",
          "How does the circuit breaker pattern work?",
          "When should you use the retry pattern?",
          "What is the bulkhead pattern?",
          "How do you implement graceful degradation?"
        ],
        traps: [
          "Not implementing circuit breakers",
          "Retrying non-idempotent operations",
          "Ignoring timeout management",
          "Forgetting about monitoring"
        ],
        debugScenario: "A developer's microservices cascade fail when one service goes down because there's no circuit breaker pattern.",
        productionInsight: "Resilience patterns are essential for building reliable distributed systems that can handle failures gracefully.",
        comparison: {
          "Circuit Breaker": "Prevents cascade failures, automatic recovery",
          "Retry": "Handles transient failures, exponential backoff",
          "Bulkhead": "Isolates failures, resource protection"
        }
      },
      deployment: {
        title: "Deployment & Scaling",
        tree: `
┌─ Deployment Strategies
├─ Container Orchestration
│  ├─ Kubernetes
│  ├─ Docker Swarm
│  └─ Service Mesh
├─ Deployment Patterns
│  ├─ Blue-Green Deployment
│  ├─ Canary Deployment
│  └─ Rolling Updates
├─ Auto Scaling
│  ├─ Horizontal scaling
│  ├─ Vertical scaling
│  └─ Predictive scaling
└─ Configuration Management
   ├─ External configuration
   ├─ Feature flags
   └─ Environment variables
        `,
        flow: `
Build → Test → Deploy → Monitor → Scale
│
├─ 1. Build Service
│  └─ Container image
│
├─ 2. Test Deployment
│  └─ Validate functionality
│
├─ 3. Production Deploy
│  ├─ Choose strategy
│  └─ Deploy to production
│
├─ 4. Monitor Performance
│  └─ Collect metrics
│
├─ 5. Auto Scale
│  └─ Adjust resources
│
└─ 6. Update Services
   └─ Continuous deployment
        `,
        mentalModel: "Microservices deployment is like managing a fleet of delivery trucks. Each truck (service) can be deployed independently, routes can be changed (deployment strategies), and the fleet size can be adjusted based on demand (scaling).",
        questions: [
          "What are the different deployment strategies for microservices?",
          "How does Kubernetes help with microservices deployment?",
          "What is the difference between blue-green and canary deployment?",
          "How do you implement auto-scaling?",
          "What are the best practices for configuration management?"
        ],
        traps: [
          "Deploying all services together",
          "Not implementing proper monitoring",
          "Ignoring rollback strategies",
          "Forgetting about configuration management"
        ],
        debugScenario: "A developer's deployment fails because they're trying to update all services at once without proper rollback strategy.",
        productionInsight: "Proper deployment strategies are crucial for maintaining system availability and reliability during updates.",
        comparison: {
          "Blue-Green": "Zero downtime, instant rollback, double resources",
          "Canary": "Gradual rollout, risk mitigation, complex routing",
          "Rolling": "Resource efficient, gradual update, longer deployment"
        }
      }
    }
  }, // <-- comma added here

  // System Design
  systemDesign: {
    title: "System Design",
    icon: "🏗️",
    description: "Complete system design patterns and architecture",
    topics: {
      loadBalancing: {
        title: "Load Balancing",
        tree: `
┌─ Load Balancing Types
├─ Layer 4 (Transport)
│  └─ IP/Port based
├─ Layer 7 (Application)
│  └─ HTTP/HTTPS based
├─ Algorithms
│  ├─ Round Robin
│  ├─ Least Connections
│  ├─ IP Hash
│  └─ Weighted Round Robin
└─ Health Checks
   └─ Instance monitoring
            `,
        flow: `
Client Request → Load Balancer → Backend Server → Response
│
├─ 1. Receive Request
│  └─ Analyze request
│
├─ 2. Select Algorithm
│  └─ Choose backend
│
├─ 3. Forward Request
│  └─ Send to backend
│
├─ 4. Return Response
│  └─ Forward to client
│
└─ 5. Health Monitoring
   ├─ Check instance health
   └─ Remove unhealthy instances
            `,
        mentalModel: "Load balancer is like a receptionist directing visitors to different offices. The receptionist uses different strategies to ensure no office gets overwhelmed and visitors get served quickly.",
        questions: [
          "What are different load balancing algorithms?",
          "How does Layer 4 vs Layer 7 load balancing work?",
          "What are health checks and why are they important?",
          "How do you handle session persistence?",
          "What are challenges in load balancing?"
        ],
        traps: [
          "Choosing wrong algorithm for use case",
          "Forgetting about health checks",
          "Not considering session persistence",
          "Ignoring backend capacity differences"
        ],
        debugScenario: "A developer's application becomes slow under load. They need to implement proper load balancing.",
        productionInsight: "Load balancing is essential for scalability, reliability, and performance of distributed systems.",
        comparison: {
          "Layer 4": "Fast, limited info, network level",
          "Layer 7": "Slower, rich info, application level",
          "DNS Load Balancing": "Simple, no health checks"
        }
      },
      caching: {
        title: "Caching Strategies & Redis",
        tree: `
┌─ Caching Layers
├─ Browser Cache
│  ├─ HTTP headers
│  ├─ Service Worker
│  └─ Local storage
├─ CDN Cache
│  ├─ Edge locations
│  └─ Geographic distribution
├─ Application Cache
│  ├─ In-memory cache
│  ├─ Redis/Memcached
│  └─ Distributed cache
└─ Database Cache
   ├─ Query result cache
   └─ Materialized views
            `,
        flow: `
Request → Cache Check → Cache Hit/Miss → Backend → Cache Update
│
├─ 1. Check Cache
│  └─ Look for cached response
│
├─ 2. Cache Hit
│  └─ Return cached response
│
├─ 3. Cache Miss
│  ├─ Request from backend
│  └─ Process normally
│
├─ 4. Update Cache
│  └─ Store response for future
│
└─ 5. Cache Invalidation
   └─ Remove stale data
            `,
        mentalModel: "Caching is like having a photographic memory. Instead of recomputing complex calculations every time, you take a picture (cache) and reuse it when the same situation occurs.",
        questions: [
          "What are different types of caching?",
          "How does Redis work and when should you use it?",
          "What are cache invalidation strategies?",
          "How do you implement browser caching?",
          "What are tradeoffs of different caching approaches?"
        ],
        traps: [
          "Caching everything without considering invalidation",
          "Not understanding cache coherence",
          "Ignoring cache size limits",
          "Forgetting about cache stampedes"
        ],
        debugScenario: "A developer's application is serving stale data because cache invalidation is not properly implemented.",
        productionInsight: "Caching is crucial for performance, scalability, and user experience in distributed systems.",
        comparison: {
          "In-Memory": "Fastest, limited size, application level",
          "Redis": "Fast, distributed, persistent, TTL support",
          "CDN": "Geographic, edge locations, static assets"
        }
      },
      capTheorem: {
        title: "CAP Theorem & Consistency",
        tree: `
┌─ CAP Properties
├─ Consistency (C)
│  └─ All nodes see same data simultaneously
├─ Availability (A)
│  └─ System always responds to requests
└─ Partition Tolerance (P)
   └─ System continues despite network partitions
            `,
        flow: `
Network Partition → Tradeoff Decision → System Behavior
│
├─ 1. Network Partition
│  └─ Nodes cannot communicate
│
├─ 2. System Choice
│  ├─ CP: Strong consistency
│  ├─ AP: High availability
│  └─ CA: Partition tolerance
│
├─ 3. System Behavior
│  └─ Follows chosen properties
│
└─ 4. Tradeoff Impact
   └─ Affects system design
            `,
        mentalModel: "CAP theorem is like a triangle with three corners (Consistency, Availability, Partition tolerance). You can only pick two corners at once - you can't have all three properties simultaneously in distributed systems.",
        questions: [
          "What is CAP theorem and why is it important?",
          "Explain difference between CP, AP, and CA systems",
          "How does CAP theorem affect database design?",
          "What are consistency models in distributed systems?",
          "How do you choose between consistency and availability?"
        ],
        traps: [
          "Assuming you can achieve all three CAP properties",
          "Not understanding tradeoffs in system design",
          "Ignoring network partition scenarios",
          "Over-engineering for consistency"
        ],
        debugScenario: "A distributed system loses data consistency during network partitions. Developer needs to understand CAP tradeoffs.",
        productionInsight: "Understanding CAP theorem is essential for designing distributed systems, making informed tradeoffs, and building resilient architectures.",
        comparison: {
          "CP Systems": "Strong consistency, lower availability, traditional databases",
          "AP Systems": "Eventual consistency, high availability, modern web",
          "CA Systems": "Partition tolerant, complex coordination, blockchain systems"
        }
      },
      distributedSystems: {
        title: "Distributed Systems Patterns",
        tree: `
┌─ Distributed Components
├─ Service Discovery
│  ├─ Service registry
│  ├─ Health checks
│  └─ Load balancing
├─ Communication
│  ├─ Synchronous vs Asynchronous
│  ├─ Message queues
│  └─ Event streaming
├─ Data Consistency
│  ├─ Eventual consistency
│  ├─ Strong consistency
│  └─ Conflict resolution
└─ Fault Tolerance
   ├─ Circuit breakers
   ├─ Retry patterns
   └─ Fallback mechanisms
            `,
        flow: `
Service Request → Discovery → Communication → Processing → Response
│
├─ 1. Service Discovery
│  └─ Find available services
│
├─ 2. Establish Communication
│  └─ Connect to service
│
├─ 3. Process Request
│  └─ Execute business logic
│
├─ 4. Handle Failures
│  └─ Retry or fallback
│
└─ 5. Return Response
   └─ Send result back
            `,
        mentalModel: "Distributed systems are like a team of specialists working together. Each specialist (service) has their own expertise, and they coordinate through messages to complete complex tasks.",
        questions: [
          "What are the key challenges in distributed systems?",
          "How do you handle service discovery?",
          "What are the differences between synchronous and asynchronous communication?",
          "How do you ensure data consistency across services?",
          "What patterns help with fault tolerance?"
        ],
        traps: [
          "Assuming network is reliable",
          "Not planning for partial failures",
          "Ignoring latency in distributed calls",
          "Forgetting about data consistency"
        ],
        debugScenario: "A developer's distributed system fails when one service goes down because there's no circuit breaker pattern.",
        productionInsight: "Distributed systems enable scalability, fault tolerance, and independent service deployment, but introduce complexity.",
        comparison: {
          "Monolithic": "Simple, tightly coupled, single deployment",
          "Microservices": "Complex, loosely coupled, independent deployment",
          "Serverless": "Event-driven, managed infrastructure, pay-per-use"
        }
      }
    }
  }, // <-- comma added here

  // Docker & DevOps
  devops: {
    title: "Docker & DevOps",
    icon: "🐳",
    description: "Complete DevOps practices and containerization",
    topics: {
      docker: {
        title: "Docker & Containerization",
        tree: `
┌─ Docker Components
├─ Docker Engine
│  ├─ Docker daemon
│  ├─ Docker CLI
│  └─ REST API
├─ Containers
│  ├─ Images
│  ├─ Containers
│  └─ Layers
├─ Dockerfile
│  ├─ Instructions
│  ├─ Multi-stage builds
│  └─ Optimization
└─ Docker Compose
   ├─ Multi-container apps
   ├─ Service definition
   └─ Networking
        `,
        flow: `
Code → Dockerfile → Build → Image → Container → Run
│
├─ 1. Write Dockerfile
│  └─ Define container
│
├─ 2. Build Image
│  └─ Create layers
│
├─ 3. Push to Registry
│  └─ Store image
│
├─ 4. Pull Image
│  └─ Download image
│
└─ 5. Run Container
   └─ Start application
        `,
        mentalModel: "Docker is like shipping containers for software. Instead of shipping furniture assembled (traditional deployment), you pack everything in standardized containers (Docker images) that can be moved anywhere.",
        questions: [
          "How does Docker work?",
          "What's the difference between Docker image and container?",
          "How do you write an efficient Dockerfile?",
          "What is Docker Compose and when should you use it?",
          "How do you optimize Docker images?"
        ],
        traps: [
          "Running everything in one container",
          "Not using .dockerignore",
          "Building large images",
          "Forgetting about security"
        ],
        debugScenario: "A developer's Docker images are too large and slow to build because they're not optimizing their Dockerfile.",
        productionInsight: "Docker is essential for consistent development environments, scalable deployments, and modern DevOps practices.",
        comparison: {
          "Docker Image": "Immutable template, layered, build-time",
          "Docker Container": "Running instance, mutable, runtime",
          "VM": "Full OS, heavy, isolated"
        }
      },
      kubernetes: {
        title: "Kubernetes & Orchestration",
        tree: `
┌─ Kubernetes Architecture
├─ Master Node
│  ├─ API Server
│  ├─ Scheduler
│  ├─ Controller Manager
│  └─ etcd
├─ Worker Nodes
│  ├─ Kubelet
│  ├─ Kube-proxy
│  └─ Container Runtime
├─ Kubernetes Objects
│  ├─ Pods
│  ├─ Services
│  ├─ Deployments
│  └─ ConfigMaps
└─ Networking
   ├─ Services
   ├─ Ingress
   └─ Network Policies
        `,
        flow: `
Application → K8s Manifest → Apply → Schedule → Deploy → Expose
│
├─ 1. Create Manifest
│  └─ Define resources
│
├─ 2. Apply to Cluster
│  └─ kubectl apply
│
├─ 3. Schedule Pods
│  └─ Assign to nodes
│
├─ 4. Deploy Application
│  └─ Run containers
│
├─ 5. Expose Services
│  └─ Create endpoints
│
└─ 6. Monitor & Scale
   └─ Auto-scaling
        `,
        mentalModel: "Kubernetes is like an automated factory manager. It receives orders (deployments), assigns work to machines (nodes), monitors production, and automatically adjusts resources based on demand.",
        questions: [
          "How does Kubernetes work?",
          "What are the key Kubernetes components?",
          "How do you deploy applications to Kubernetes?",
          "What's the difference between Deployment and Service?",
          "How does Kubernetes handle scaling?"
        ],
        traps: [
          "Running stateful applications without proper configuration",
          "Not setting resource limits",
          "Ignoring health checks",
          "Forgetting about persistent storage"
        ],
        debugScenario: "A developer's Kubernetes deployment fails because they're not properly configuring resource limits and health checks.",
        productionInsight: "Kubernetes is essential for managing containerized applications at scale, providing self-healing, auto-scaling, and service discovery.",
        comparison: {
          "Pod": "Smallest unit, one or more containers, ephemeral",
          "Service": "Network endpoint, load balancing, stable IP",
          "Deployment": "Pod management, rolling updates, replicas"
        }
      },
      cicd: {
        title: "CI/CD Pipelines",
        tree: `
┌─ CI/CD Components
├─ Continuous Integration
│  ├─ Code commits
│  ├─ Automated builds
│  ├─ Testing
│  └─ Code quality
├─ Continuous Delivery
│  ├─ Artifact creation
│  ├─ Environment provisioning
│  └─ Automated deployment
├─ Pipeline Tools
│  ├─ Jenkins
│  ├─ GitHub Actions
│  ├─ GitLab CI
│  └─ Azure DevOps
└─ Best Practices
   ├─ Pipeline as code
   ├─ Immutable infrastructure
   └─ Automated testing
        `,
        flow: `
Code Commit → Build → Test → Deploy → Monitor
│
├─ 1. Code Commit
│  └─ Trigger pipeline
│
├─ 2. Build Application
│  └─ Create artifacts
│
├─ 3. Run Tests
│  ├─ Unit tests
│  ├─ Integration tests
│  └─ E2E tests
│
├─ 4. Deploy
│  ├─ Staging
│  └─ Production
│
├─ 5. Monitor
│  └─ Health checks
│
└─ 6. Rollback
   └─ If needed
        `,
        mentalModel: "CI/CD is like an automated assembly line with quality control. Each step (build, test, deploy) is automated and monitored, with the ability to stop the line if anything goes wrong.",
        questions: [
          "What is CI/CD and why is it important?",
          "How do you design a CI/CD pipeline?",
          "What are the key stages in a CI/CD pipeline?",
          "How do you handle different environments?",
          "What are the best practices for CI/CD?"
        ],
        traps: [
          "Skipping tests for speed",
          "Not using pipeline as code",
          "Deploying directly to production",
          "Ignoring rollback strategies"
        ],
        debugScenario: "A developer's CI/CD pipeline keeps failing because they're not properly handling environment-specific configurations.",
        productionInsight: "CI/CD is essential for rapid, reliable software delivery, enabling teams to release changes frequently and safely.",
        comparison: {
          "CI": "Code integration, automated testing, quality gates",
          "CD": "Automated deployment, environment management, release automation",
          "DevOps": "Culture, practices, collaboration"
        }
      },
      monitoring: {
        title: "Monitoring & Observability",
        tree: `
┌─ Monitoring Pillars
├─ Metrics
│  ├─ System metrics
│  ├─ Application metrics
│  └─ Business metrics
├─ Logging
│  ├─ Structured logging
│  ├─ Log aggregation
│  └─ Log analysis
├─ Tracing
│  ├─ Distributed tracing
│  ├─ Request tracing
│  └─ Performance tracing
└─ Alerting
   ├─ Threshold alerts
   ├─ Anomaly detection
   └─ Incident response
        `,
        flow: `
Application → Data Collection → Processing → Visualization → Alerting
│
├─ 1. Data Collection
│  ├─ Metrics collection
│  ├─ Log generation
│  └─ Trace creation
│
├─ 2. Data Processing
│  ├─ Aggregation
│  ├─ Correlation
│  └─ Analysis
│
├─ 3. Visualization
│  ├─ Dashboards
│  ├─ Graphs
│  └─ Reports
│
├─ 4. Alerting
│  ├─ Threshold monitoring
│  └─ Anomaly detection
│
└─ 5. Response
   └─ Incident handling
        `,
        mentalModel: "Monitoring is like a hospital's monitoring system for patients. It continuously checks vital signs (metrics), records events (logs), tracks procedures (traces), and alerts doctors when something is wrong.",
        questions: [
          "What are the three pillars of observability?",
          "How do you implement effective monitoring?",
          "What's the difference between logging and metrics?",
          "How do you design effective alerting?",
          "What are the best monitoring tools?"
        ],
        traps: [
          "Alerting on everything",
          "Not correlating metrics",
          "Ignoring logs",
          "Forgetting about business metrics"
        ],
        debugScenario: "A developer's system crashes without warning because their monitoring setup only tracks system metrics, not application health.",
        productionInsight: "Monitoring and observability are crucial for maintaining system reliability, performance, and user experience.",
        comparison: {
          "Metrics": "Numerical data, time series, aggregated",
          "Logs": "Event data, structured, detailed",
          "Traces": "Request flow, distributed, performance"
        }
      },
      infrastructure: {
        title: "Infrastructure as Code",
        tree: `
┌─ IaC Components
├─ Configuration Management
│  ├─ Ansible
│  ├─ Puppet
│  └─ Chef
├─ Infrastructure Provisioning
│  ├─ Terraform
│  ├─ CloudFormation
│  └─ ARM Templates
├─ Container Orchestration
│  ├─ Kubernetes
│  ├─ Docker Swarm
│  └─ Nomad
└─ Configuration
   ├─ Environment variables
   ├─ Secrets management
   └─ Configuration files
        `,
        flow: `
Code → Plan → Apply → Verify → Monitor
│
├─ 1. Write Infrastructure Code
│  └─ Define resources
│
├─ 2. Plan Changes
│  └─ Preview changes
│
├─ 3. Apply Changes
│  └─ Provision resources
│
├─ 4. Verify
│  └─ Validate deployment
│
├─ 5. Monitor
│  └─ Track changes
│
└─ 6. Update
   └─ Repeat cycle
        `,
        mentalModel: "Infrastructure as Code is like having blueprints for building a house. Instead of manually assembling everything, you follow detailed plans that ensure consistency and repeatability.",
        questions: [
          "What is Infrastructure as Code?",
          "How does Terraform work?",
          "What's the difference between imperative and declarative IaC?",
          "How do you manage secrets in IaC?",
          "What are the best practices for IaC?"
        ],
        traps: [
          "Storing secrets in code",
          "Not version controlling infrastructure",
          "Ignoring state management",
          "Forgetting about testing"
        ],
        debugScenario: "A developer's infrastructure deployment fails because they're not properly managing Terraform state files.",
        productionInsight: "Infrastructure as Code is essential for reproducible, scalable, and maintainable infrastructure management.",
        comparison: {
          "Terraform": "Multi-cloud, declarative, state management",
          "CloudFormation": "AWS only, JSON/YAML, integrated",
          "Ansible": "Configuration management, imperative, agentless"
        }
      }
    }
  }, // <-- comma added here

  // Production Engineering
  productionEngineering: {
    title: "Production Engineering",
    icon: "🚀",
    description: "Complete production engineering and incident response",
    topics: {
      incidentResponse: {
        title: "Incident Response & Management",
        tree: `
┌─ Incident Lifecycle
├─ Detection
│  ├─ Monitoring alerts
│  ├─ User reports
│  └─ Automated detection
├─ Triage
│  ├─ Severity assessment
│  ├─ Impact analysis
│  └─ Resource allocation
├─ Response
│  ├─ Mitigation actions
│  ├─ Communication
│  └─ Documentation
├─ Resolution
│  ├─ Root cause analysis
│  ├─ Permanent fixes
│  └─ Prevention measures
└─ Post-Mortem
   ├─ Incident review
   ├─ Lessons learned
   └─ Process improvement
        `,
        flow: `
Alert → Triage → Response → Resolution → Post-Mortem
│
├─ 1. Incident Detection
│  └─ Alert received
│
├─ 2. Triage & Assessment
│  ├─ Evaluate severity
│  └─ Assign resources
│
├─ 3. Response Actions
│  ├─ Implement fixes
│  └─ Communicate status
│
├─ 4. Resolution
│  └─ Restore service
│
├─ 5. Post-Mortem
│  └─ Learn and improve
│
└─ 6. Prevention
   └─ Implement safeguards
        `,
        mentalModel: "Incident response is like emergency medical care. You assess the patient's condition (triage), provide immediate treatment (response), ensure recovery (resolution), and then study the case to prevent future emergencies (post-mortem).",
        questions: [
          "What are the key phases of incident response?",
          "How do you prioritize incidents?",
          "What's the role of incident commander?",
          "How do you communicate during incidents?",
          "What makes a good post-mortem?"
        ],
        traps: [
          "Blame culture in post-mortems",
          "Not communicating during incidents",
          "Ignoring small incidents",
          "Not documenting lessons learned"
        ],
        debugScenario: "A production outage lasts longer than necessary because the team doesn't have a clear incident response process and communication breaks down.",
        productionInsight: "Effective incident response is crucial for minimizing downtime, maintaining user trust, and continuously improving system reliability.",
        comparison: {
          "Reactive": "Respond to incidents, firefighting, immediate focus",
          "Proactive": "Prevent incidents, monitoring, long-term focus",
          "SRE": "Balance both, error budgets, reliability engineering"
        }
      },
      reliability: {
        title: "Site Reliability Engineering",
        tree: `
┌─ SRE Principles
├─ Service Level Objectives
│  ├─ SLI definitions
│  ├─ SLO targets
│  └─ Error budgets
├─ Reliability Metrics
│  ├─ Availability
│  ├─ Latency
│  ├─ Error rate
│  └─ Throughput
├─ Monitoring & Alerting
│  ├─ Service monitoring
│  ├─ Alert thresholds
│  └─ On-call rotations
└─ Capacity Planning
   ├─ Resource provisioning
   ├─ Load testing
   └─ Scalability planning
        `,
        flow: `
Define SLOs → Monitor → Alert → Respond → Improve
│
├─ 1. Define Objectives
│  └─ Set SLOs and SLIs
│
├─ 2. Implement Monitoring
│  └─ Track metrics
│
├─ 3. Set Alert Thresholds
│  └─ Error budget consumption
│
├─ 4. Respond to Incidents
│  └─ Maintain reliability
│
├─ 5. Analyze Performance
│  └─ Optimize systems
│
└─ 6. Improve Processes
   └─ Enhance reliability
        `,
        mentalModel: "SRE is like being a city's infrastructure manager. You set reliability standards (SLOs), monitor systems (traffic, power, water), respond to failures (outages), and continuously improve infrastructure to keep the city running smoothly.",
        questions: [
          "What are SLOs and SLIs?",
          "How do you calculate error budgets?",
          "What's the difference between availability and reliability?",
          "How do you set appropriate alert thresholds?",
          "What are the key SRE principles?"
        ],
        traps: [
          "Setting unrealistic SLOs",
          "Alerting on everything",
          "Ignoring error budgets",
          "Not measuring the right metrics"
        ],
        debugScenario: "A team keeps getting paged for minor issues because their alert thresholds are too sensitive, leading to alert fatigue and missed critical incidents.",
        productionInsight: "SRE principles help balance feature development with reliability, ensuring systems meet user expectations while enabling innovation.",
        comparison: {
          "Traditional Ops": "Reactive, manual, ticket-based",
          "DevOps": "Collaborative, automated, CI/CD focused",
          "SRE": "Reliability-focused, data-driven, error budgets"
        }
      },
      scalability: {
        title: "Scalability & Performance",
        tree: `
┌─ Scaling Strategies
├─ Vertical Scaling
│  ├─ More CPU/Memory
│  ├─ Faster storage
│  └─ Single instance
├─ Horizontal Scaling
│  ├─ Load balancing
│  ├─ Multiple instances
│  └─ Distributed systems
├─ Auto Scaling
│  ├─ Dynamic provisioning
│  ├─ Traffic-based scaling
│  └─ Cost optimization
└─ Performance Optimization
   ├─ Caching strategies
   ├─ Database optimization
   └─ Network optimization
        `,
        flow: `
Load Analysis → Scaling Strategy → Implementation → Monitoring → Optimization
│
├─ 1. Analyze Load Patterns
│  └─ Traffic and usage
│
├─ 2. Choose Scaling Strategy
│  ├─ Vertical vs horizontal
│  └─ Cost considerations
│
├─ 3. Implement Scaling
│  └─ Add resources
│
├─ 4. Monitor Performance
│  └─ Track metrics
│
├─ 5. Optimize
│  └─ Fine-tune system
│
└─ 6. Plan for Growth
   └─ Future scaling
        `,
        mentalModel: "Scalability is like planning for a restaurant's growth. You can either make the kitchen bigger (vertical scaling) or open more locations (horizontal scaling). Auto-scaling is like hiring more staff during busy hours.",
        questions: [
          "What's the difference between vertical and horizontal scaling?",
          "When should you use auto-scaling?",
          "How do you design for scalability?",
          "What are the challenges of distributed systems?",
          "How do you measure scalability?"
        ],
        traps: [
          "Over-provisioning resources",
          "Not planning for database scaling",
          "Ignoring network bottlenecks",
          "Forgetting about monitoring"
        ],
        debugScenario: "A system crashes under load because it was designed for single-server deployment and couldn't handle the increased traffic during a marketing campaign.",
        productionInsight: "Scalability planning is essential for handling growth, maintaining performance, and ensuring user experience during traffic spikes.",
        comparison: {
          "Vertical": "Simple, limited, single point of failure",
          "Horizontal": "Complex, scalable, distributed",
          "Auto": "Dynamic, cost-effective, responsive"
        }
      },
      security: {
        title: "Production Security",
        tree: `
┌─ Security Layers
├─ Network Security
│  ├─ Firewalls
│  ├─ DDoS protection
│  └─ VPN access
├─ Application Security
│  ├─ Input validation
│  ├─ Authentication
│  └─ Authorization
├─ Data Security
│  ├─ Encryption at rest
│  ├─ Encryption in transit
│  └─ Data masking
├─ Infrastructure Security
│  ├─ Access control
│  ├─ Security patches
│  └─ Vulnerability scanning
└─ Compliance
   ├─ GDPR/CCPA
   ├─ SOC 2
   └─ HIPAA
        `,
        flow: `
Assessment → Protection → Detection → Response → Recovery
│
├─ 1. Security Assessment
│  └─ Identify vulnerabilities
│
├─ 2. Implement Protection
│  └─ Security measures
│
├─ 3. Monitor & Detect
│  └─ Security monitoring
│
├─ 4. Respond to Threats
│  └─ Incident response
│
├─ 5. Recovery
│  └─ Restore services
│
└─ 6. Improve Security
   └─ Lessons learned
        `,
        mentalModel: "Production security is like protecting a bank. You have multiple layers of security (guards, vaults, alarms), monitor for threats (cameras, sensors), and have response plans for robberies.",
        questions: [
          "What are the key security layers in production?",
          "How do you implement defense in depth?",
          "What's the role of encryption in production?",
          "How do you handle security incidents?",
          "What are compliance requirements?"
        ],
        traps: [
          "Relying on a single security layer",
          "Not monitoring for threats",
          "Ignoring security patches",
          "Forgetting about compliance"
        ],
        debugScenario: "A production system suffers a data breach because sensitive data wasn't encrypted at rest and access controls were not properly implemented.",
        productionInsight: "Production security is essential for protecting user data, maintaining trust, and complying with regulations.",
        comparison: {
          "Prevention": "Firewalls, encryption, access control",
          "Detection": "Monitoring, logging, intrusion detection",
          "Response": "Incident response, containment, recovery"
        }
      },
      observability: {
        title: "Observability & Monitoring",
        tree: `
┌─ Observability Pillars
├─ Metrics
│  ├─ System metrics
│  ├─ Application metrics
│  ├─ Business metrics
│  └─ Custom metrics
├─ Logging
│  ├─ Structured logging
│  ├─ Log aggregation
│  ├─ Log analysis
│  └─ Log retention
├─ Tracing
│  ├─ Distributed tracing
│  ├─ Request tracing
│  └─ Performance tracing
└─ Alerting
   ├─ Threshold alerts
   ├─ Anomaly detection
   └─ Escalation policies
        `,
        flow: `
Data Collection → Processing → Analysis → Alerting → Action
│
├─ 1. Collect Data
│  └─ Metrics, logs, traces
│
├─ 2. Process & Store
│  └─ Aggregate and index
│
├─ 3. Analyze Patterns
│  └─ Identify issues
│
├─ 4. Alert Teams
│  └─ Notify stakeholders
│
├─ 5. Take Action
│  └─ Resolve issues
│
└─ 6. Improve Monitoring
   └─ Enhance visibility
        `,
        mentalModel: "Observability is like having a doctor monitor your health. They check vital signs (metrics), review your medical history (logs), and run specialized tests (traces) to understand what's happening inside your body.",
        questions: [
          "What are the three pillars of observability?",
          "How do you design effective monitoring?",
          "What's the difference between monitoring and observability?",
          "How do you set up proper alerting?",
          "What tools are used for observability?"
        ],
        traps: [
          "Alerting on everything",
          "Not correlating different data types",
          "Ignoring business metrics",
          "Forgetting about log retention"
        ],
        debugScenario: "A production issue goes undetected for hours because the monitoring system only tracks system metrics, not application health indicators.",
        productionInsight: "Observability is crucial for understanding system behavior, diagnosing issues quickly, and maintaining reliability in complex systems.",
        comparison: {
          "Monitoring": "Known unknowns, predefined metrics, reactive",
          "Observability": "Unknown unknowns, exploratory analysis, proactive",
          "Logging": "Event records, detailed context, debugging"
        }
      }
    }
  } // <-- no comma after last property
};