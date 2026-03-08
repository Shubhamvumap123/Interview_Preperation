export const react = {
    title: "React Complete Architecture",
    icon: "⚛️",
    description: "Deep dive into React internals, Fiber, Concurrent Mode and advanced patterns",
    topics: {
        "virtualDOM": {
            "title": "Virtual DOM & Reconciliation",
            "tree": `
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
   └─ Synchronous DOM Patches`,
            "flow": `
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
         └─> Triggers layout/paint in the browser`,
            "mentalModel": "The Virtual DOM is like a lightweight architectural blueprint. When a client requests changes to a building (State Update), you don't immediately tear down walls. You draw a new blueprint (WIP Tree), compare it by holding it over the old blueprint (Reconciliation), circle exactly what changed (Diffing), and then send the construction crew to only knock down and rebuild those specific circled spots (Commit Phase).",
            "questions": [
                "[Basic] What is the Virtual DOM and why is it faster than manipulating the Real DOM directly?",
                "[Intermediate] How does React's rendering batching work, and how did it change in React 18?",
                "[Intermediate] Why is using an array `index` as a `key` considered an anti-pattern in dynamic lists?",
                "[Advanced] Explain the O(n) heuristic algorithm used in React's reconciliation process. What are its two core assumptions?",
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
                { "title": "React Docs: Preserving and Resetting State", "url": "https://react.dev/learn/preserving-and-resetting-state", "type": "official" },
                { "title": "Overreacted: UI as an Afterthought (Dan Abramov)", "url": "https://overreacted.io/ui-as-an-afterthought/", "type": "blog" },
                { "title": "Algomaster: Virtual DOM Internals", "url": "https://algomaster.io/react/virtual-dom", "type": "article" }
            ]
        },
        "fiber": {
            "title": "React Fiber Architecture",
            "tree": `
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
   └─ TransitionLane (Non-urgent: Data fetching, heavy filtering)`,
            "flow": `
SetState() Called -> Update Scheduled via Scheduler (Lane Priority Assigned)
   │
   ├─> 1. Render Phase (beginWork / completeWork)
   │     ├─> React builds the WorkInProgress (WIP) Fiber tree
   │     ├─> Periodically checks shouldYieldToHost()
   │     │      ├─> If > 5ms elapsed: PAUSE work, yield back to browser (paint)
   │     │      └─> Browser idle: RESUME work exactly where it left off
   │     └─> Tags Fibers with effect flags (Update, Placement, Deletion)
   │
   ├─> 2. Pre-Commit Phase
   │     └─> getSnapshotBeforeUpdate is called
   │
   └─> 3. Commit Phase
         ├─> Flushes all effect flags synchronously to the DOM
         ├─> Swaps Current Tree pointer to the WIP Tree
         └─> Fires useEffect / useLayoutEffect`,
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
                { "title": "React Fiber Architecture (Lin Clark)", "url": "https://www.youtube.com/watch?v=ZCuYPiUIONs", "type": "video" },
                { "title": "Inside Fiber: in-depth overview", "url": "https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react", "type": "article" },
                { "title": "React Source Code: ReactFiber.new.js", "url": "https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.new.js", "type": "source" }
            ]
        },
        "hooks": {
            "title": "Hooks Internals & Dispatcher",
            "tree": `
┌─ Hook Object Structure
├─ memoizedState (The actual data)
├─ baseState / baseQueue (Priority logic)
├─ queue (Update queue / circular list)
├─ next (Pointer to next hook)
└─ Dispatcher (The 'Brain' switch)
   ├─ ContextOnly (Throws errors - used outside render)
   ├─ OnMount (Initializes the linked list)
   └─ OnUpdate (Reads from the linked list)`,
            "flow": `
Component Call -> Resolve Dispatcher -> Execute Hook Sequence
   │
   ├─> 1. Dispatcher Switching:
   │     ├─> First call? Use Mount Dispatcher.
   │     └─> Re-render? Use Update Dispatcher.
   │
   ├─> 2. Hook Discovery (Order is key!):
   │     ├─> Mount: Create new Hook object, append to linked list.
   │     └─> Update: Traverse existing Linked List to match hook index.
   │
   ├─> 3. useState Internal:
   │     ├─> Actually uses 'useReducer' under the hood.
   │     └─> setState(x) is just dispatch({type: 'UPDATE', value: x}).
   │
   └─> 4. Closure Capture:
         └─> Hooks 'freeze' the scope variables of the render they were created in.`,
            "mentalModel": "Hooks are NOT magic arrays. They are like a 'Tape Player' reading a magnetic tape. In the first render (Mount), React records your hook definitions in order on a magnetic tape (Linked List). In the second render (Update), React blindly rewinds the tape and plays it back one by one. If you put a hook inside an `if` statement and skip it, the tape goes completely out of sync, mismatching all subsequent states to the wrong hooks.",
            "questions": [
                "[Basic] Why does React enforce the 'Rules of Hooks' (not calling hooks conditionally)?",
                "[Intermediate] Explain the Dispatcher switch between mount and update phases.",
                "[Intermediate] Why is `useState` internally implemented as a restricted `useReducer`?",
                "[Advanced] What exactly is stored in the 'memoizedState' of a `useEffect` hook vs a `useState` hook?",
                "[Advanced] How does a hook 'know' which component instance it belongs to without being passed 'this'?"
            ],
            "traps": [
                "Stale Closures: The deadliest trap. A `useEffect` or `useCallback` captures variables from its render scope. If dependencies aren't declared, the callback continues to see ancient state from Render 1, even if it's currently Render 10.",
                "The Linked List Corruption: Calling hooks in loops or conditionals. It shifts the pointer of the internal Linked List, causing `useState` B to read the state of `useState` C.",
                "Primitive Mutation: Mutating an object/array in `useState` and passing it back without cloning. React compares `Object.is(oldState, newState)`. If the reference is identical, React completely bails out of the render.",
            ],
            "debugScenario": "Scenario: 'State not updating' in an event listener.\nAction: Added a `console.log(count)` inside a `setInterval` setup within `useEffect(..., [])`.\nDiscovery: The log always prints '0', even when the UI shows '5'. Stale Closure. The effect was created in Render 1 where `count` was 0, and since `[]` was passed, it never renewed its closure.\nFix: Used a functional state update `setCount(prev => prev + 1)` which doesn't require closing over the `count` variable, or added `count` to the dependency array.",
            "productionInsight": "In massive codebases, React hooks can become a performance nightmare due to excessive re-renders triggered by deep Context updates or un-memoized object references in `useEffect` arrays. Best practice: Extract complex state logic into completely framework-agnostic vanilla JS classes/functions, and only use React hooks (like `useSyncExternalStore`) to subscribe to their surgical updates.",
            "comparison": {
                "useState": "Simple state, internally implemented as useReducer.",
                "useReducer": "Complex state transitions with predictable actions.",
                "useMemo": "Memoizes complex calculation arrays/objects.",
                "useCallback": "Memoizes the function reference itself (prevents prop churning)."
            },
            "resources": [
                { "title": "React Internals: Under the hood of hooks", "url": "https://react.dev/reference/react/hooks", "type": "official" },
                { "title": "A Complete Guide to useEffect (Dan Abramov)", "url": "https://overreacted.io/a-complete-guide-to-useeffect/", "type": "blog" },
                { "title": "Deep dive: How do React hooks really work?", "url": "https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/", "type": "article" }
            ]
        },
        "concurrentRendering": {
            "title": "Concurrent Rendering & React 18+",
            "tree": `
┌─ Scheduler (Task Prioritization)
├─ Priority Lanes (31-bit bitmask)
│  ├─ SyncLane (User Input)
│  ├─ InputContinuousLane (Scrolling)
│  └─ Default/Transition/Idle Lanes
├─ Time Slicing & Yielding
│  ├─ 5ms frame budgets
│  └─ MessageChannel integration
└─ API Utilities
   ├─ startTransition
   ├─ useTransition
   └─ useDeferredValue`,
            "flow": `
Heavy UI Update Triggered -> Wrapped in startTransition() -> Render Yields
   │
   ├─> 1. Lane Assignment:
   │     └─> React tags this update with 'TransitionLane' (low priority).
   │
   ├─> 2. Intermediate Rendering (Off-screen):
   │     ├─> React starts building the WIP tree for the heavy update.
   │     └─> Checks clock. Yields to main thread every 5ms.
   │
   ├─> 3. High Priority Interrupt:
   │     ├─> User clicks a button! Triggering 'SyncLane' update.
   │     ├─> React completely PAUSES the in-progress heavy transition.
   │     └─> Processes button click synchronously and updates DOM.
   │
   └─> 4. Resumption and Entanglement:
         └─> React resumes the heavy transition or throws away stale WIP trees.`,
            "mentalModel": "Concurrent rendering is like 'Multitasking' in your brain. You are writing a 5-page email (Low priority 'Transition' update), but if someone shouts 'FIRE!' (High priority 'Sync' update), you pause mid-sentence, look up, handle the emergency, and then resume the email exactly where you left off without completely freezing in place.",
            "questions": [
                "[Basic] What does it mean that React 18 rendering is 'interruptible'?",
                "[Intermediate] How does `useTransition` differ from wrapping an update in a `setTimeout`?",
                "[Intermediate] Explain the 'Time Slicing' mechanism in the React Scheduler.",
                "[Advanced] What is the 'Lanes Model' in React, and why did it replace 'Expiration Times'?",
                "[Advanced] How does React handle state consistency if a high-priority update mutates state that a paused low-priority update was about to read?"
            ],
            "traps": [
                "The Speed Delusion: Thinking Concurrent mode makes code run *faster*. It doesn't. It makes the UI more *responsive*. The exact same amount of JS executes, but it yields to the browser periodically so it doesn't freeze the screen.",
                "Transitioning Everything: Wrapping every `setState` in `startTransition`. This forces React into complex background rendering loops and ruins the predictability of simple synchronous events.",
                "Suspense Confusion: Thinking Suspense requires Concurrent Mode, or vice versa. Suspense defines the boundaries for loading states, while Concurrent mode defines the *scheduling* of those states."
            ],
            "debugScenario": "Scenario: Input lag while typing to filter a 100,000 item list. Every keystroke freezes the page for 400ms.\nAction: Enabled React 18 Strict Mode and wrapped the filter `setState` in `useTransition`.\nDiscovery: Filtering was a massive synchronous tree regeneration blocking the main thread. By placing it in a transition, React processed the list in 5ms chunks.\nFix: The text input remains buttery smooth at 60FPS while the heavy list filters seamlessly in the background.",
            "productionInsight": "The Scheduler uses a 'Min Heap' to track task execution orders and 'postMessage' via `MessageChannel` for yielding to the browser event loop. This architecture is literally a mini Operating System scheduler running entirely inside JavaScript, granting granular control over frame budgets that generic `requestAnimationFrame` could never achieve.",
            "comparison": {
                "startTransition": "Imperative API to mark an update as non-urgent.",
                "useDeferredValue": "Declarative API to yield an old value while rendering a new one in the background.",
                "Lanes Model": "Internal 31-bit integer tracking 31 distinct priority levels.",
                "Time Slicing": "The behavioral result of yielding Execution Context back to the browser."
            },
            "resources": [
                { "title": "React 18: Concurrent Features", "url": "https://react.dev/blog/2022/03/29/react-v18", "type": "official" },
                { "title": "Real world examples of useTransition", "url": "https://jser.dev/react/2022/04/24/react-18-usetransition-real-world/", "type": "article" },
                { "title": "Demystifying React 18 lanes", "url": "https://tkdodo.eu/blog/demystifying-react-18-lanes", "type": "blog" }
            ]
        },
        "suspense": {
            "title": "Suspense & Error Boundaries",
            "tree": `
┌─ Suspense System
├─ Loading States (Suspense)
│  ├─ catch promises thrown during render
│  ├─ render fallback UI
│  └─ stream content dynamically
├─ Error Handling (Boundaries)
│  ├─ componentDidCatch
│  ├─ getDerivedStateFromError
│  └─ Render fallback UI
└─ Architecture Patterns
   ├─ Render-as-you-fetch
   ├─ Selective Hydration
   └─ Data Fetching Integration (SWR/React Query)`,
            "flow": `
Render Component -> Async Data Required -> Throw Promise -> Catch by Boundary
   │
   ├─> 1. Component execution Starts.
   ├─> 2. Data is missing! Component 'throws' a pending Promise.
   │
   ├─> 3. React Engine Catches the Promise:
   │     ├─> Halts rendering of that specific component tree.
   │     └─> Traverses UP the tree to find nearest <Suspense> boundary.
   │
   ├─> 4. Render Fallback:
   │     └─> React renders the fallback UI (e.g., <Spinner />).
   │
   └─> 5. Promise Settles:
         ├─> React wakes up the component and re-renders it.
         └─> Data is now available, rendering completes.`,
            "mentalModel": "Suspense is like ordering food at a restaurant. You sit down (Render) and ask for a burger. The waiter says 'It'll be 10 minutes' (Throws Promise). Your table gets a 'be right back' sign (Suspense Fallback). You don't freeze and stare at the wall; you browse your phone. When the food is ready (Promise Resolved), the waiter brings it and you eat (Complete Render).",
            "questions": [
                "[Basic] How do Error Boundaries differ from standard try/catch blocks?",
                "[Intermediate] How does Suspense specifically implement 'Render-as-you-fetch'?",
                "[Intermediate] Why does Suspense require throwing a Promise instead of just returning null?",
                "[Advanced] How do Suspense boundaries interact with Next.js Server Components and Selective Hydration?",
                "[Advanced] What triggers a Suspense boundary to show its fallback if a deeply nested component initiates the request?"
            ],
            "traps": [
                "The useEffect Waterfall Trap: Relying on `useEffect` to fetch data and manually managing `isLoading` state. This creates request waterfalls where child components cannot start fetching until parents finish. Suspense allows parallelizing fetches at the top level.",
                "Throwing standard Errors in Event Handlers: Error Boundaries ONLY catch errors occurring during the *Render Phase*, lifecycle methods, or constructors. They DO NOT catch errors thrown in `onClick` handlers or `setTimeout`.",
                "Using Suspense without a Cache: If you throw a promise in render, React will re-render the component when it resolves. If your component just creates *new* promises every render, it will end in an infinite loop. Data must be cached."
            ],
            "debugScenario": "Scenario: An entire page crashes to a white screen because one nested user avatar failed to fetch.\nAction: Checked the component tree.\nDiscovery: The application had a global Error Boundary at the root level, but no granular boundaries. The avatar fetch hook threw an error, which bubbled all the way to the top and completely unmounted the application tree.\nFix: Wrapped the `<AvatarSection>` in its own local `<ErrorBoundary fallback={<DefaultAvatar/>}>`, isolating the failure so the rest of the app remained fully functional.",
            "productionInsight": "In massive SPAs, utilizing React Query/SWR in combination with `<Suspense>` completely eliminates thousands of lines of manual `useState` and `isLoading` boilerplate. Furthermore, Error Boundaries should report immediately to Sentry/Datadog using `componentDidCatch` to track UI fault metrics in production.",
            "comparison": {
                "Fetch-on-Render": "Waterfall execution. Parent fetches, renders child, child fetches.",
                "Render-as-you-fetch": "Parallel execution. Fetching starts instantly, Suspense handles the UI.",
                "Error Boundary": "Catches thrown Javascript Errors.",
                "Suspense Boundary": "Catches thrown Javascript Promises."
            },
            "resources": [
                { "title": "React Docs: Suspense for Data Fetching", "url": "https://react.dev/reference/react/Suspense", "type": "official" },
                { "title": "React Query: Suspense integration", "url": "https://tanstack.com/query/latest/docs/framework/react/guides/suspense", "type": "article" }
            ]
        },
        "nextjs": {
            "title": "Next.js 13+ & Server Components",
            "tree": `
┌─ React Server Components Architecture
├─ Server rendering environments
│  ├─ Static (SSG / Build time)
│  ├─ Dynamic (SSR / Request time)
│  └─ Revalidated (ISR / Background)
├─ Client/Server Boundary
│  ├─ 'use client' directive
│  ├─ Hydration optimization
│  └─ Interleaved trees
└─ Sub-systems
   ├─ App Router structure
   ├─ Server Actions (RPCs)
   └─ Data Cache / Full Route Cache`,
            "flow": `
User Requests Page -> Server Generates RSC Payload -> HTML Streamed -> Client Hydrates
   │
   ├─> 1. Server Executes Server Components (Async DB/API fetches).
   ├─> 2. Generates 'RSC Payload' (JSON-like syntax representing UI holes).
   │
   ├─> 3. Server generates raw HTML using RSC Payload.
   ├─> 4. Client receives HTML (instant First Contentful Paint).
   │
   ├─> 5. React fetches Client Components JS bundles.
   └─> 6. Hydration Phase:
         └─> Attach event listeners ('onClick') to the interactive 'islands' (Client Components).`,
            "mentalModel": "Next.js Server Components are like IKEA flatpack furniture. The factory (Server) does the heavy cutting and drilling (Database fetching, layout structure). They ship a highly optimized flatpack (RSC payload). Your house (Browser) only has to screw in the specific interactive bits (Client Components) rather than building the whole shelf from raw lumber on the living room floor.",
            "questions": [
                "[Basic] What is the difference between an old-school SSR page (Next 12) and a React Server Component (Next 13)?",
                "[Intermediate] Explain what the `'use client'` directive actually does in the compilation process.",
                "[Intermediate] Why can Server Components safely store hardcoded database secrets?",
                "[Advanced] What is the RSC Payload and how does it interleave Server and Client component states without losing client state on re-renders?",
                "[Advanced] Explain how Server Actions replace the need for traditional REST API routes."
            ],
            "traps": [
                "The 'use client' Virus: Marking the root `layout.tsx` or a massive wrapper component with `'use client'`. This forces the entire subtree to become Client Components, completely destroying the performance and bundle size benefits of Server Components.",
                "Passing non-serializable data: Trying to pass a Date object, a Map, or a function as a prop from a Server Component to a Client Component. The RSC payload must be serialized across the network, so it only supports basic JSON data.",
                "Hydration Mismatches: Expecting `window` or `localStorage` to be available during the initial server-side HTML generation of a Client component. Wait for `useEffect`."
            ],
            "debugScenario": "Scenario: 'Text content did not match. Server: X, Client: Y' error on page load.\nAction: Checked the component code.\nDiscovery: The component rendered `new Date().getTime()`. The server generated the HTML with time X. A few milliseconds later, the client executed the JS to attach event listeners and found time Y. React threw a Hydration error because the trees didn't match.\nFix: Render a loading state or placeholder initially, and only execute the `new Date()` logic inside a `useEffect` after initial hydration is complete.",
            "productionInsight": "Server Components solve the billion-dollar 'JavaScript Fatigue' problem. Previously, rendering simple static markdown required sending 500KB of React.js to the client. Now, Server Components send ZERO kilobytes to the client, shipping only pure HTML. This massively improves Core Web Vitals on low-end mobile devices.",
            "comparison": {
                "Next.js 12 (Pages)": "File-based routing, getServerSideProps, entire page hydrates.",
                "Next.js 13+ (App)": "Folder-based routing, Async Server Components, partial island hydration.",
                "Server Action": "Direct function call from client to server (HTML Forms).",
                "API Route": "Traditional separate REST endpoint."
            },
            "resources": [
                { "title": "Next.js Docs: Rendering Fundamentals", "url": "https://nextjs.org/docs/app/building-your-application/rendering", "type": "official" },
                { "title": "Making Sense of React Server Components (Josh W Comeau)", "url": "https://www.joshwcomeau.com/react/server-components/", "type": "blog" }
            ]
        },
        "memoization": {
            "title": "Memoization & Optimization Strategy",
            "tree": `
┌─ React Memoization System
├─ Component Level
│  ├─ React.memo (HOC)
│  └─ prevProps === nextProps shallow compare
├─ Value/Reference Level
│  ├─ useMemo (Compute output cache)
│  └─ useCallback (Function reference cache)
├─ State Structuring
│  ├─ Splitting massive states
│  └─ Moving state down
└─ Escape Hatches
   ├─ Refs (useRef) for mutable state without render
   └─ Children Prop pattern (Bypass diffing)`,
            "flow": `
Parent Re-renders -> Checks Child Props -> Re-render Child?
   │
   ├─> 1. Normal Child: Always re-renders when parent renders.
   │     └─> Destroys deeply nested performance if tree is heavy.
   │
   ├─> 2. React.memo(Child):
   │     ├─> Shallow compares all props: Object.is(prev.prop, next.prop)
   │     ├─> If true: Bail out, use cached VDOM!
   │     └─> If false: Re-render.
   │
   ├─> 3. The Object Reference Trap:
   │     └─> Parent creates new object: <Child config={{}} />
   │     └─> Object.is({}, {}) is FALSE! Memoization broken. 
   │
   └─> 4. useMemo/useCallback Fix:
         └─> Parent caches the object/function reference. Memoization restored.`,
            "mentalModel": "Memoization is like setting up Toll Booths on a highway. Normally, every car passes through freely (components re-render blindly). Setting up a toll booth (React.memo) forces JS to stop the car and check its ID (Props comparison). If you put Toll Booths everywhere, the traffic jam (computation overhead) of checking IDs takes longer than just letting the cars through!",
            "questions": [
                "[Basic] When should you use `React.memo` and when is it a bad idea?",
                "[Intermediate] What is the difference between `useMemo` and `useCallback` under the hood?",
                "[Intermediate] Explain what 'Shallow Comparison' means in the context of React Props.",
                "[Advanced] How can the 'Children as props' pattern prevent re-renders without using `React.memo` at all?",
                "[Advanced] Why does passing inline arrow functions automatically break `React.memo` boundaries?"
            ],
            "traps": [
                "Premature Optimization: Wrapping literally every component in `React.memo` and every function in `useCallback`. Props comparison takes CPU cycles. If a component always receives different props anyway, or is very cheap to render, the memoization overhead actually slows the app down.",
                "The Empty Object Fallacy: Passing `style={{ marginTop: 10 }}` to a memoized component. `{}` is a new memory address on every render, instantly breaking the memo cache.",
                "Missing Dependencies: Purposely excluding dependencies from `useMemo` to prevent recalculation. This creates fatal Stale Closures where your UI shows entirely broken math or outdated arrays."
            ],
            "debugScenario": "Scenario: A massive dashboard chart component is lagging when the user types in a disconnected 'Search' input box.\nAction: Checked React Profiler, noted 'Rendered because props changed'.\nDiscovery: The Parent was passing an inline arrow function `<Chart onTick={() => log('tick')} />`. Although the Chart was wrapped in `React.memo`, the inline function was a new memory address on every Search box keystroke, breaking the memo.\nFix: Wrapped the `onTick` callback in a `useCallback` with an empty dependency array, restoring the Chart's memo cache.",
            "productionInsight": "The most effective performance optimization in React is NOT memoization—it's Architecture. Pushing highly volatile state (like a clock tick or scroll position) to the absolute lowest leaf component in the tree completely eliminates the need for `React.memo`. Alternatively, passing expensive components as `children` automatically bypasses re-renders because React knows `props.children` hasn't mutated.",
            "comparison": {
                "React.memo": "Higher-order component for caching entire component renders.",
                "useMemo": "Hook for caching expensive JS calculations (array sorting).",
                "useCallback": "Hook for caching function references to preserve downstream React.memo.",
                "useRef": "Hook for instantly reading/writing values without ANY rendering."
            },
            "resources": [
                { "title": "Before You memo() (Dan Abramov)", "url": "https://overreacted.io/before-you-memo/", "type": "blog" },
                { "title": "Kent C. Dodds: When to useMemo and useCallback", "url": "https://kentcdodds.com/blog/usememo-and-usecallback", "type": "article" }
            ]
        },
        "designPatterns": {
            "title": "React Design Patterns",
            "tree": `
┌─ Core Design Patterns
├─ Component Composition
│  ├─ Container / Presentational
│  ├─ Compound Components (e.g. <Select> / <Option>)
│  └─ Render Props (Dynamic injection)
├─ Separation of Concerns
│  ├─ Custom Hooks (Headless UI)
│  └─ Higher-Order Components (HOCs)
├─ State Management Architecture
│  ├─ State Colocation
│  ├─ Provider Pattern (Context API)
│  └─ Flux/Redux (Unidirectional data flow)
└─ Code Splitting Patterns
   ├─ Route-based splitting
   └─ Component-based splitting (Suspense)`,
            "flow": `
Pattern Evolution based on Complexity:
   │
   ├─> 1. Simple Props (Basic Data drill)
   │
   ├─> 2. Compound Components ('<Tabs><Tab/></Tabs>')
   │     └─> Solves Prop Drilling and rigid APIs via implicit Context.
   │
   ├─> 3. Render Props ('<MouseTracker render={mouse => <Icon {...mouse}/>} />')
   │     └─> Solves dynamic UI logic sharing before hooks existed.
   │
   ├─> 4. Custom Hooks ('const { data } = useFetch()')
   │     └─> Solves logic reuse without JSX wrapping hell.
   │
   └─> 5. Provider Pattern ('<ThemeProvider><App/></ThemeProvider>')
         └─> Solves global state access, avoiding massive prop drilling chains.`,
            "mentalModel": "Design Patterns are established blueprints. If you need to build an airplane, you don't reinvent wings. Using 'Compound Components' is like building Lego blocks that inherently know how to fit together, rather than building a single monolithic block with 50 configuration switches (props).",
            "questions": [
                "[Basic] What is the difference between a Container and a Presentational (Dumb) component?",
                "[Intermediate] Explain the 'Compound Components' pattern (used in UI libraries like Radix/MUI).",
                "[Intermediate] Why did Custom Hooks largely replace Higher-Order Components (HOCs) and Render Props?",
                "[Advanced] Explain the 'Prop Drilling' problem and how the Provider Pattern solves it.",
                "[Advanced] What is a 'Headless UI' component pattern?"
            ],
            "traps": [
                "Prop Explosion Trap: Trying to handle every permutation of a component via props. `< Button isRed isLarge isGhost loadingText = 'Wait' iconLeft = { ...} /> `. The solution is Compound Components or specific named exports.",
                "Context Abuse Trap: Using Context for rapidly changing state (like mouse position or animations). Every consumer component will completely re-render on every tick. Solution: Use specialized state managers (Zustand) or direct DOM manipulation.",
                "Hook Hell: Writing massive custom hooks taking 15 arguments instead of breaking down business logic."
            ],
            "debugScenario": "Scenario: Component hierarchy consists of `withAuth(withLayout(withRouter(withData(MyComponent))))`.\nAction: Inspected the React DevTools.\nDiscovery: 'Wrapper Hell.' Finding the actual component in the inspector was incredibly difficult, and props were colliding between the HOC wrappers.\nFix: Refactored the architecture to use Custom Hooks. ` < MyComponent /> ` simply calls `useAuth()`, `useLayout()`, etc., completely flattening the VDOM tree and making dependencies explicitly declarative.",
            "productionInsight": "In modern React (18+), 'Headless UI' is the ultimate architectural pattern. You write completely unstyled logic hooks (`useCombobox`), and let the consumer attach UI to it. Libraries like Radix UI or Downshift use this to provide WAI-ARIA compliant accessibility and logic, while giving developers 100% control over the DOM rendering.",
            "comparison": {
                "HOC (withRouter)": "Wraps component, modifies props. Legacy pattern.",
                "Render Prop": "Passes a function returning UI. Powerful but leads to deep nesting.",
                "Custom Hook": "Shares state logic, clean tree, modern standard.",
                "Headless UI": "Complete separation of component functionality from its visual representation."
            },
            "resources": [
                { "title": "Patterns.dev: React Design Patterns", "url": "https://www.patterns.dev/react", "type": "official" },
                { "title": "React Hooks: Headless UI Components", "url": "https://www.robinwieruch.de/react-headless-components/", "type": "article" }
            ]
        }
    }
};
