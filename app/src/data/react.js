export const react = {
    title: "React Complete Architecture",
    icon: "⚛️",
    description: "Deep dive into React internals, Fiber, Concurrent Mode and advanced patterns",
    topics: {
    "virtualDOM": {
        "title": "Virtual DOM & Reconciliation",
        "tree": "\n\u250c\u2500 Virtual DOM Architecture\n\u251c\u2500 Core Concepts\n\u2502  \u251c\u2500 React Elements (Plain JS Objects)\n\u2502  \u251c\u2500 Current Tree vs Work-In-Progress Tree\n\u2502  \u2514\u2500 Batching Updates\n\u251c\u2500 Reconciliation Engine (Diffing)\n\u2502  \u251c\u2500 O(n) Heuristic Algorithm\n\u2502  \u251c\u2500 Component Type Comparison\n\u2502  \u2514\u2500 Keyed Elements Matching\n\u2514\u2500 DOM Mutation Phase\n   \u251c\u2500 Minimal Browser Layout Thrashing\n   \u2514\u2500 Synchronous DOM Patches",
        "flow": "\nState Change (setState) -> Render Phase Triggered\n   \u2502\n   \u251c\u2500> 1. React calls component render functions\n   \u251c\u2500> 2. Generates new Virtual DOM Tree (WIP Tree)\n   \u2502\n   \u251c\u2500> 3. Reconciliation (The Diffing Phase)\n   \u2502     \u251c\u2500> Compares WIP Tree against Current Tree\n   \u2502     \u251c\u2500> Identifies changed nodes, changed attributes, deleted nodes\n   \u2502     \u2514\u2500> Generates a list of Effects (Patches)\n   \u2502\n   \u2514\u2500> 4. Commit Phase (DOM Mutation)\n         \u251c\u2500> Applies Effects to the actual Browser DOM natively\n         \u2514\u2500> Triggers layout/paint in the browser",
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
            {
                "title": "React Docs: Preserving and Resetting State",
                "url": "https://react.dev/learn/preserving-and-resetting-state",
                "type": "official"
            },
            {
                "title": "Overreacted: UI as an Afterthought (Dan Abramov)",
                "url": "https://overreacted.io/ui-as-an-afterthought/",
                "type": "blog"
            },
            {
                "title": "Algomaster: Virtual DOM Internals",
                "url": "https://algomaster.io/react/virtual-dom",
                "type": "course"
            }
        ]
    },
    "fiber": {
        "title": "React Fiber Architecture",
        "tree": "\n\u250c\u2500 React Fiber Architecture\n\u251c\u2500 What is a Fiber?\n\u2502  \u251c\u2500 A JavaScript Object representing a Unit of Work\n\u2502  \u251c\u2500 1:1 mapping to a React Element / DOM Node\n\u2502  \u2514\u2500 Linked List structure (child, sibling, return)\n\u251c\u2500 Double Buffering Model\n\u2502  \u251c\u2500 Current Tree (Active on screen)\n\u2502  \u2514\u2500 WorkInProgress Tree (Drafting the next frame)\n\u251c\u2500 Rendering Phases\n\u2502  \u251c\u2500 Render Phase (Asynchronous, Interruptible)\n\u2502  \u2514\u2500 Commit Phase (Synchronous, Uninterruptible)\n\u2514\u2500 Priority & Scheduling (Lanes)\n   \u251c\u2500 SyncLane (Urgent: Typing, Clicks)\n   \u2514\u2500 TransitionLane (Non-urgent: Data fetching, heavy filtering)",
        "flow": "\nSetState() Called -> Update Scheduled via Scheduler (Lane Priority Assigned)\n   \u2502\n   \u251c\u2500> 1. Render Phase (beginWork / completeWork)\n   \u2502     \u251c\u2500> React builds the WorkInProgress (WIP) Fiber tree\n   \u2502     \u251c\u2500> Periodically checks `shouldYieldToHost()`\n   \u2502     \u2502      \u251c\u2500> If > 5ms elapsed: PAUSE work, yield back to browser (paint)\n   \u2502     \u2502      \u2514\u2500> Browser idle: RESUME work exactly where it left off\n   \u2502     \u2514\u2500> Tags Fibers with effect flags (Update, Placement, Deletion)\n   \u2502\n   \u251c\u2500> 2. Pre-Commit Phase\n   \u2502     \u2514\u2500> `getSnapshotBeforeUpdate` is called\n   \u2502\n   \u2514\u2500> 3. Commit Phase\n         \u251c\u2500> Flushes all effect flags synchronously to the DOM\n         \u251c\u2500> Swaps Current Tree pointer to the WIP Tree\n         \u2514\u2500> Fires `useEffect` / `useLayoutEffect`",
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
            {
                "title": "React Fiber Architecture (Lin Clark)",
                "url": "https://www.youtube.com/watch?v=ZCuYPiUIONs",
                "type": "video"
            },
            {
                "title": "Inside Fiber: in-depth overview",
                "url": "https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react",
                "type": "article"
            },
            {
                "title": "React Source Code: ReactFiber.new.js",
                "url": "https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.new.js",
                "type": "source"
            }
        ]
    }
}
};