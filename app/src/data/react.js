export const react = {
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
            title: "React Fiber Architecture (L8 Depth)",
            tree: `
┌─ Fiber Structure (Work Unit)
├─ Identity: tag, key, elementType
├─ Links: return (parent), child, sibling
├─ State: memoizedState, updateQueue
├─ Double Buffering (The "Git" of UI)
│  ├─ Current Tree (What's on screen)
│  └─ workInProgress Tree (What's being built)
└─ Effects: flags (Placement, Update, Deletion)
        `,
            flow: `
Update Triggered → [Schedule] → [Render Phase] → [Commit Phase]
│
├─ 1. Render Phase (Asynchronous/Interruptible):
│  ├─ workLoopSync / workLoopConcurrent
│  ├─ beginWork (Down the tree)
│  ├─ completeWork (Up the tree)
│  └─ Diffing: Compare WIP with Current fiber
│
├─ 2. Commit Phase (Synchronous/Atomic):
│  ├─ Before Mutation (getSnapshotBeforeUpdate)
│  ├─ Mutation (DOM update)
│  └─ Layout (Effect hooks, componentDidMount)
│
└─ 3. Reconciliation Assumptions:
   ├─ Different types produce different trees
   └─ 'key' prop identifies stable nodes
        `,
            mentalModel: "Fiber is like a Branching system in Git. The 'Current Tree' is your Main branch (what users see). When a state change happens, React creates a 'Feature Branch' (workInProgress tree). It works on this branch in the background, pausing for high-priority tasks. Once the branch is perfect, it 'merges' (commits) it to Main instantly and swaps the pointers.",
            questions: [
                "What is the difference between a React Element and a Fiber node?",
                "Explain Double Buffering in React Fiber.",
                "How does Fiber handle 'yielding' to the browser main thread?",
                "What are 'Flags' (formerly Effect Tags) in Fiber?",
                "Why can the Render phase be called multiple times but Commit only once?"
            ],
            traps: [
                "Trap: Thinking Fiber recreates the whole tree on every update. (Correction: It reuses fibers where possible).",
                "Trap: Assuming 'workInProgress' is just a copy. (Correction: It's a pool of nodes where existing fibers are recycled).",
                "Trap: Blocking the main thread in the Render phase. (Result: UI jank, defeats the point of Fiber).",
                "Trap: Using random 'key' values. (Result: Complete tree destruction and fiber recreation)."
            ],
            debugScenario: "Scenario: High CPU usage but low FPS. Debug: The 'Render Phase' is constantly being interrupted and restarted because work is too heavy for a single frame. Fix: Use 'useTransition' to mark work as non-urgent, allowing React to finish it in the background without blocking input.",
            productionInsight: "Internal Architecture: Fiber's 'Lanes Model' (31-bit bitmask) allows React to track priorities at a granular level. High priority (SyncLane) vs Low priority (TransitionLane). This is why React 18+ can handle massive trees smoothly.",
            comparison: {
                "Current Tree": "The immutable source of truth for the screen.",
                "WIP Tree": "The mutable scratchpad for the next render.",
                "Reconciliation": "The logic that decides which Fiber nodes to recycle.",
                "Commit": "The atomic swap of Current and WIP pointers."
            }
        },
                hooks: {
            title: "Hooks Internals (Dispatcher Depth)",
            tree: `
┌─ Hook Object Structure
├─ memoizedState (The actual data)
├─ baseState / baseQueue (Priority logic)
├─ queue (Update queue / circular list)
├─ next (Pointer to next hook)
└─ Dispatcher (The 'Brain' switch)
   ├─ ContextOnly (Throws errors - used outside render)
   ├─ OnMount (Initializes the list)
   └─ OnUpdate (Reads from the list)
        `,
            flow: `
Component Call → Resolve Dispatcher → Execute Hook Sequence
│
├─ 1. Dispatcher Switching:
│  ├─ Is this the first call? Use Mount Dispatcher.
│  └─ Is this a re-render? Use Update Dispatcher.
│
├─ 2. Hook Discovery (order is key):
│  ├─ Mount: Create new Hook object, append to linked list.
│  └─ Update: Re-use existing Hook object at current pointer.
│
├─ 3. useState Internal:
│  ├─ Actually uses 'useReducer' under the hood.
│  └─ setState(x) is just dispatch({type: 'UPDATE', value: x}).
│
└─ 4. Closure Capture:
   └─ Hooks remember the environment of the render they were created in.
        `,
            mentalModel: "Hooks are like a 'Tape Player'. In the first render (Mount), React records your hook definitions in order on a magnetic tape. In the second render (Update), React rewinds the tape and plays it back. If you skip a hook (conditional), the tape goes out of sync with the logic, and you get a Reference Error. This is why order must be consistent.",
            questions: [
                "How does React know which state belongs to which hook?",
                "Explain the Dispatcher switch between mount and update.",
                "Why is useState internally just useReducer?",
                "What is stored in the 'memoizedState' of useEffect vs useState?",
                "How does a hook 'know' its component instance?"
            ],
            traps: [
                "Trap: Hooks are stored in a simple array. (Correction: It's a Linked List of Hook objects).",
                "Trap: Each hook call creates a new object in every render. (Correction: Only in the Mount phase; updates reuse objects).",
                "Trap: Stale Closures in useEffect. (Cause: Dependency array doesn't match captured variables).",
                "Trap: Calling hooks in loops. (Cause: Corrupts the 'next' pointer chain)."
            ],
            debugScenario: "Scenario: 'State not updating' in a callback. Debug: Stale Closure. The callback was created in Render 1 and 'closed over' state variables from Render 1. Even when Render 2 happens with new state, the old callback still sees Render 1's values. Fix: Use a 'functional update' (setState(prev => ...)) or include the state in dependencies.",
            productionInsight: "Performance: Hooks are incredibly fast because they are simple object lookups in a list. However, heavy logic inside 'useMemo' or 'useEffect' can still block if not careful. The Dispatcher architecture allows React to swap behavior (like Dev vs Prod) without changing your code.",
            comparison: {
                "memoizedState": "For useState: the value. For useEffect: the effect function + deps.",
                "Update Queue": "A circular linked list of pending state changes.",
                "Dispatcher": "The global object that maps 'useState' to the right internal function.",
                "Order": "The only way React identifies which hook is which."
            }
        },
                concurrentRendering: {
            title: "Concurrent Rendering & Lanes Model",
            tree: `
┌─ Scheduler (Task Prioritization)
├─ Priority Lanes (31-bit bitmask)
│  ├─ SyncLane (User Input)
│  ├─ InputContinuousLane (Scrolling)
│  └─ Default/Transition/Idle Lanes
├─ Time Slicing (Yielding to browser)
└─ Transitions (useTransition / useDeferredValue)
        `,
            flow: `
Trigger Update → [Assign Lane] → [Work Loop] → [Yield Check]
│
├─ 1. Lane Assignment:
│  └─ Is it inside startTransition? Assign 'TransitionLane'.
│
├─ 2. Intermediate Rendering (Off-screen):
│  ├─ React builds a WIP tree for the lower priority lane.
│  └─ If high priority work arrives, interrupt WIP and handle high priority first.
│
├─ 3. Yielding:
│  └─ Uses 'MessageChannel' to check if 5ms have passed. 
│     If yes, stop and let browser paint/input happen.
│
└─ 4. Entanglement:
   └─ Multiple updates to the same state in different lanes are 'entangled'.
        `,
            mentalModel: "Concurrent rendering is like 'Multitasking' in your brain. You are writing an email (Low priority), but if someone shouts your name (High priority), you pause mid-sentence, look up, answer them, and then resume the email exactly where you left off. The 'Lanes' are like different urgency levels in your to-do list.",
            questions: [
                "What is the Lanes model and why did it replace Expiration Times?",
                "How does useTransition differ from a simple setTimeout?",
                "Explain the 'Time Slicing' mechanism in the Scheduler.",
                "How does React handle state consistency during concurrent rendering?",
                "What is 'Entanglement' in the context of priority lanes?"
            ],
            traps: [
                "Trap: Thinking Concurrent mode makes code run faster. (Correction: It makes UI more RESPONSIVE, but work still takes time).",
                "Trap: Using useTransition for EVERY update. (Correction: Use only for non-blocking UI updates).",
                "Trap: Assuming Suspense is only for lazy templates. (Correction: It's for any async data resource).",
                "Trap: Manual Priority setting is possible. (Correction: No, React manages lanes internally via hook choice)."
            ],
            debugScenario: "Scenario: Input lag while filtering a 10,000 item list. Debug: Filtering is a synchronous, heavy task blocking the main thread. Solution: Wrap the filter state update in 'startTransition'. React will now process the list in small chunks, yielding to the browser so the input field remains snappy.",
            productionInsight: "Architecture: The Scheduler uses a 'Min Heap' to track task expiration and 'postMessage' via MessageChannel for yielding. This provides a much more granular control over the frame budget than requestIdleCallback.",
            comparison: {
                "startTransition": "Markers for low-priority updates.",
                "useDeferredValue": "Yielding a previous value while the new one renders.",
                "Lanes Model": "The internal bitmask for 31 priority levels.",
                "Priority 0": "No priority (Idle)."
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
            title: "Next.js 13+ & Server Architecture",
            tree: `
┌─ Server Components (RSC)
├─ Server Mode: No client hydration / No state
├─ Client Mode: 'use client' boundary
├─ Rendering Layers
│  ├─ Static (SSG/ISR)
│  ├─ Dynamic (SSR)
│  └─ Streaming (Suspense)
└─ Data Architecture
   ├─ fetch() with caching levels
   └─ Server Actions (RPC replacement)
        `,
            flow: `
URL Request → [Server] → [Generate RSC Payload] → [Client Hydration]
│
├─ 1. RSC Payload Generation:
│  ├─ Runs on server. Fetches data directly from DB.
│  └─ Serializes UI into a special JSON-like string.
│
├─ 2. Client Boundary:
│  └─ Only 'Client Components' are hydrated and interactive.
│
├─ 3. Partial Hydration:
│  └─ React hydrates only the interactive islands.
│
└─ 4. Streaming:
   └─ Header/Nav sent immediately; slow content streamed via Suspense.
        `,
            mentalModel: "Next.js with RSC is like 'Multi-stage Production'. The heavy lifting (fetching 1GB from DB) happens at the factory (Server). The factory sends a simple, pre-assembled kit (RSC Payload) to your home (Browser). You only have to put in the batteries (Hydration) for the specific parts that move (Client Components).",
            questions: [
                "What is the RSC Payload and what does it contain?",
                "Explain the 'Client-Server Boundary' in Next.js 13+.",
                "How does 'Selective Hydration' improve TTI (Time to Interactive)?",
                "What is the difference between Server Components and Server-Side Rendering?",
                "How do Server Actions handle progressive enhancement?"
            ],
            traps: [
                "Trap: Thinking Server Components are like SSR in Next 12. (Correction: RSCs don't re-run on client; SSR components do).",
                "Trap: Passing non-serializable data from Server to Client (e.g. classes, functions).",
                "Trap: Marking every component as 'use client'. (Result: Lost performance benefits of RSC).",
                "Trap: Using 'window' or 'document' in a Server Component.",
            ],
            debugScenario: "Scenario: 'Next.js Error: Serializing functions is not supported'. Debug: You are passing an onClick handler from a Page (Server Component) to its children. Fix: Move the interactivity into a sub-component and mark it 'use client'.",
            productionInsight: "Performance: RSCs significantly reduce Bundle Size because the code for 'Server Components' is never sent to the client. This is the ultimate fix for the 'JS Fatigue' problem where we sent massive libraries just to render static text.",
            comparison: {
                "Server Component": "Zero client JS, direct data access, non-interactive.",
                "Client Component": "Standard React component, hydrated, interactive.",
                "SSR": "Generates HTML for the WHOLE page first.",
                "RSC": "Streams components AS they are ready."
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
};
