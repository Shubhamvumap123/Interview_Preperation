export const mongodb = {
    title: "MongoDB & Mongoose",
    icon: "🍃",
    description: "Complete MongoDB internals and Mongoose optimization",
    topics: {
        indexing: {
            title: "Indexing & Query Planner (ESR Rule)",
            tree: `
┌─ B-Tree Structure
├─ Index Types
│  ├─ Compound (The ESR Rule)
│  ├─ Multikey (Arrays)
│  ├─ Partial (Filtered)
│  └─ TTL (Expiring)
├─ Storage Engine: WiredTiger
└─ Query Planner (Explain Plan)
        `,
            flow: `
Query Receive → [Cache Check] → [Planner] → [Winner Plan] → [Execution]
│
├─ 1. The ESR Rule (Equality, Sort, Range):
│  ├─ 1st: Equality fields (status: "A")
│  ├─ 2nd: Sort fields (created_at: -1)
│  └─ 3rd: Range fields (age: { $gt: 20 })
│
├─ 2. Query Planner:
│  ├─ Runs multiple plans in parallel. 
│  └─ First plan to finish X documents wins. Cached for future.
│
├─ 3. Covered Queries:
│  └─ Index contains ALL requested fields. Total IO = 0 documents fetched.
│
└─ 4. Multikey Indexing:
   └─ Indexing an array produces one index entry PER element. 
      Watch out for 'Exploding Indexes'.
        `,
            mentalModel: "Indexing is like an 'Address Book' sorted by Last Name, then First Name. If you look for 'Smith, John', you go straight there (IXSCAN). If you look for 'John' without the Last Name, you have to read the WHOLE book (COLLSCAN). The ESR rule is your guide for the 'Sorted order' of the address book to ensure it works for most your queries.",
            questions: [
                "What is the ESR rule and why is it critical for Compound Indexes?",
                "Explain the difference between COLLSCAN, IXSCAN, and FETCH in an explain plan.",
                "How does MongoDB's query planner decide the 'Winning Plan'?",
                "What are the performance implications of indexing a large array (Multikey)?",
                "When would you use a Partial Index over a regular one?"
            ],
            traps: [
                "Trap: Using a low-cardinality field (like 'gender') as the first field in a compound index.",
                "Trap: Thinking a { a: 1, b: 1 } index works for { b: 1 } queries. (Correction: Prefix rule - it doesn't).",
                "Trap: Adding too many indexes. (Result: Massive write latency as EVERY index must be updated per write).",
                "Trap: In-memory sort limit (32MB). (Result: Query fails/slows if no index is used for sorting)."
            ],
            debugScenario: "Scenario: A query with a sort is extremely slow even though the sort field is indexed. Debug: Use .explain('executionStats'). Look for 'SORT_KEY_GENERATED'. This means the index was used for filtering but NOT for sorting. Fix: Reorder the index to follow the ESR rule (Equality first, then the Sort field).",
            productionInsight: "Performance: Aim for 'Documents Examined' : 'Documents Returned' = 1:1. If it's 1000:1, your index is not selective enough. Use Index TTLs for auto-cleaning old session data without manual scripts.",
            comparison: {
                "IXSCAN": "Index Scan. Examining index entries only.",
                "FETCH": "Document Fetch. Retrieving actual document from disk.",
                "COLLSCAN": "Collection Scan. READING EVERY DOCUMENT (Danger Zone).",
                "Covered Query": "IXSCAN only. No FETCH. Maximum speed."
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
        wiredTiger: {
            title: "WiredTiger Storage Engine",
            tree: `
┌─ Storage Components
├─ B-Tree Structures (Data & Indexes)
├─ Checkpoints (Snapshots)
├─ Journaling (Write-Ahead Log)
└─ Cache Management
        `,
            flow: `
Write Incoming → [Memory Cache] → [Journal Write] → [Checkpoint]
│
├─ 1. Write Path:
│  ├─ Data is written to the 'Internal Cache' (WiredTiger Cache).
│  └─ Logged to the Journal (on disk) every 100ms for durability.
│
├─ 2. Checkpointing:
│  └─ Every 60 seconds (default), memory is flushed to data files (permanent).
│
├─ 3. Document-Level Locking:
│  └─ Allows concurrent writes to different documents in the same collection.
│
└─ 4. Compression:
   └─ Snappy (default) or Zlib to reduce disk footprint by 70%+.
        `,
            mentalModel: "WiredTiger is like a 'Smart Bank'. When money comes in (Write), they write it in a temporary ledger (Journal) and put it in the desk drawer (Cache). Every hour (Checkpointing), they move all the money from the drawer to the safe (Data files). If the bank crashes, they use the Journal to see what was in the drawer and restore it to the safe.",
            questions: [
                "How does Document-Level Locking differ from the old Collection-Level Lock?",
                "What is the relationship between the WiredTiger Cache and the OS Page Cache?",
                "Explain the role of 'Journaling' in MongoDB's crash recovery.",
                "What triggers a Checkpoint and what happens during it?",
                "How do you tune the WiredTiger cache size for high-load systems?"
            ],
            traps: [
                "Trap: Setting WiredTiger cache too high (90% of RAM). (Result: No RAM left for the OS, leading to OOM/Swapping).",
                "Trap: Disabling the Journal for 'speed'. (Result: Complete data loss on power failure).",
                "Trap: Using slow disks with high write load. (Result: Journal write-stall blocks all database operations).",
                "Trap: Not monitoring 'Cache Eviction' rates."
            ],
            debugScenario: "Scenario: Periodic 'latency spikes' every 60 seconds. Debug: WiredTiger Checkpointing. The flush to disk is saturating the Disk I/O. Fix: Improve disk IOPS, enable I/O throttling, or refine the write-heavy workload.",
            productionInsight: "Internal: WiredTiger uses 'Optimistic Concurrency Control'. It assumes no two writes will conflict. If they do, one write will transparently retry. This is why it scales horizontally across CPU cores so well.",
            comparison: {
                "Journal": "Durability. The 'Undo' log for crashes.",
                "Data Files": "The permanent storage on disk.",
                "Cache": "The high-speed memory area. Target 50-80% of RAM.",
                "Snappy": "Fast compression, low CPU usage (Standard)."
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
        replication: {
            title: "Replication & High Availability",
            tree: `
┌─ Replica Set Roles
├─ Primary (Accepts Writes)
├─ Secondary (Replicates Oplog)
├─ Arbiter (Voting Only)
└─ The Oplog (Heart of Replication)
        `,
            flow: `
Write to Primary → [Write Oplog] → [Secondary Fetches Oplog] → [Apply]
│
├─ 1. Write Concern (w):
│  ├─ w: 1 (Fastest, risky)
│  └─ w: majority (Safe, waits for 51% of nodes)
│
├─ 2. Read Concern:
│  ├─ local: Latest data on that node.
│  └─ majority: Data confirmed by 51% of nodes (prevents rollbacks).
│
├─ 3. Elections (RAFT-like):
│  └─ If Primary is down for 10s, Secondaries elect a new one.
│
└─ 4. Oplog:
   └─ A 'Capped Collection' that stores all data-modifying operations.
        `,
            mentalModel: "A Replica Set is like a 'King and his Scribes'. The King (Primary) makes all the laws (Writes). The Scribes (Secondaries) sit behind him and copy every law into their own books (Oplog). If the King dies, the Scribes vote on who the most up-to-date Scribe is and crown him the new King.",
            questions: [
                "What is the Oplog and why is its size important?",
                "Explain the difference between 'w: majority' and 'j: true' in a write concern.",
                "How does 'Read Concern: majority' protect against Rollbacks?",
                "What happens during a MongoDB election process?",
                "Explain 'Replication Lag' and how to monitor it."
            ],
            traps: [
                "Trap: Primary-Secondary-Arbiter setup. (Risk: Limited read scaling, Arbiter can't hold data).",
                "Trap: Small Oplog size. (Result: Secondaries fall off the end of the Oplog and need a full resync).",
                "Trap: Reading from Secondaries for 'consistency'. (Problem: Secondaries are Eventually Consistent, not Strong).",
                "Trap: Even number of voting members. (Result: Tie in elections, no Primary available)."
            ],
            debugScenario: "Scenario: A secondary is stuck in 'STARTUP2' state or 'RECOVERING'. Debug: The Secondary fell too far behind the Primary, and the Primary's Oplog rotated (overwrote the history). Fix: Increase Oplog size or perform an 'Initial Sync'.",
            productionInsight: "Architecture: Use 'Hidden' or 'Delayed' secondaries for backup protection. A delayed secondary (e.g. 1 hour lag) allows you to recover from an accidental 'dropDatabase' command.",
            comparison: {
                "Primary": "Single point of truth for writes.",
                "Secondary": "Read-scale and Failover target.",
                "Read Preference": "Selection of which node to read from.",
                "Write Concern": "Guarantee of how many nodes saved the write."
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
        },
        security: {
            title: "Security & Access Control",
            tree: `
┌─ MongoDB Security
├─ Authentication
│  ├─ SCRAM (Default)
│  ├─ x.509 Certificates
│  └─ LDAP/Active Directory
├─ Authorization
│  ├─ RBAC (Role-Based)
│  ├─ Built-in roles
│  └─ Custom roles
├─ Encryption
│  ├─ TLS/SSL (In transit)
│  ├─ Storage Engine (At rest)
│  └─ Client-Side Field Level
└─ Auditing
   ├─ System log
   └─ Audit log
        `,
            flow: `
Client Connect → TLS Handshake → Authentication → Authorization → Operations
│
├─ 1. TLS Handshake
│  └─ Establish secure tunnel
│
├─ 2. Authentication
│  └─ Verify user identity
│
├─ 3. Authorization
│  └─ Check role permissions
│
├─ 4. Operation Audit
│  └─ Record sensitive actions
│
└─ 5. Data Access
   └─ Perform requested work
        `,
            mentalModel: "MongoDB security is like a high-security vault. First, you must prove who you are (Authentication), then a guard checks if you're allowed to enter specific rooms (Authorization), and everything you do is recorded (Auditing). All items inside are in locked boxes (Encryption).",
            questions: [
                "How does MongoDB handle authentication?",
                "What is RBAC and how does it work in MongoDB?",
                "How do you enable encryption at rest?",
                "What is Client-Side Field Level Encryption?",
                "Best practices for securing a MongoDB cluster?"
            ],
            traps: [
                "Running without auth enabled",
                "Binding to all IP addresses (0.0.0.0)",
                "Using default admin passwords",
                "Over-privileged roles"
            ],
            debugScenario: "A database shows unauthorized access attempts from external IPs because bind_ip was not restricted and auth was disabled.",
            productionInsight: "Security is non-negotiable. Always enable auth, use TLS, restrict network access via firewalls, and follow the principle of least privilege for roles.",
            comparison: {
                "Authentication": "Verify identity (Who are you?)",
                "Authorization": "Check permissions (What can you do?)",
                "Encryption": "Protect data (Secret code)"
            }
        },
        performance: {
            title: "Performance Tuning & Profiling",
            tree: `
┌─ Performance Pillars
├─ Query Optimization
│  ├─ Index usage
│  ├─ Explain plan analysis
│  └─ Covered queries
├─ WiredTiger Engine
│  ├─ Cache size
│  ├─ Checkpointing
│  └─ Concurrency control
├─ Network & I/O
│  ├─ Connection pooling
│  ├─ Read/Write concerns
│  └─ Compression
└─ Monitoring
   ├─ mongostat / mongotop
   ├─ Atlas Performance Advisor
   └─ Database Profiler
        `,
            flow: `
Slow Query → Explain Plan → Index Analysis → Optimization → Verification
│
├─ 1. Identify Slow Query
│  └─ Profiler / Logs
│
├─ 2. Run .explain()
│  └─ Analyze execution stats
│
├─ 3. Check Indexing
│  └─ Is it a COLLSCAN?
│
├─ 4. Optimize
│  ├─ Add/Fix indexes
│  └─ Revise query logic
│
└─ 5. Verify Fix
   └─ Re-run explain plan
        `,
            mentalModel: "Performance tuning is like being a detective for a traffic jam. You check the sensors (monitoring), find the bottleneck (slow query), look at the road map (explain plan), and build a faster route (indexes) to get traffic moving again.",
            questions: [
                "How do you use the explain() plan to optimize queries?",
                "What are the WiredTiger storage engine's key performance factors?",
                "Explain readPreference and writeConcern tradeoffs",
                "How do you detect and fix memory issues in MongoDB?",
                "What is the difference between mongostat and mongotop?"
            ],
            traps: [
                "Memory swapping (OOM)",
                "Document growth causing moves",
                "High lock contention",
                "Unindexed queries in production"
            ],
            debugScenario: "A query that worked fine in dev is timing out in production. Developer uses .explain('executionStats') and finds it's doing a collection scan on 10M documents.",
            productionInsight: "Performance is an ongoing process. Monitor your working set size, keep indexes in RAM, and regularly audit slow queries using the profiler.",
            comparison: {
                "Memory": "RAM, Working set, Cache",
                "I/O": "Disk latency, Throughput",
                "CPU": "Calculations, Aggregations"
            }
        }
    }
};
