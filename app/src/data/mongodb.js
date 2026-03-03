export const mongodb = {
    title: "MongoDB & WiredTiger Deep Dive",
    icon: "🍃",
    description: "Advanced database internals, engine architecture, and sharded scaling.",
    topics: {
    "indexing": {
        "title": "Indexing & Query Planner (ESR Rule)",
        "tree": "\n\u250c\u2500 B-Tree (Balanced Tree) Architecture\n\u251c\u2500 Root Node (High-level routing)\n\u251c\u2500 Branch Nodes (Mid-level ranges)\n\u2514\u2500 Leaf Nodes (Actual Key + Document Pointer/RecordId)\n   \u251c\u2500 Compound Indexes (Multiple fields)\n   \u2502  \u2514\u2500 ESR Rule (Equality, Sort, Range)\n   \u251c\u2500 Multikey Indexes (Arrays)\n   \u2502  \u2514\u2500 Index Bounds & Exploding Arrays\n   \u251c\u2500 Partial / Sparse Indexes\n   \u2502  \u2514\u2500 Filtered expression indexing\n   \u2514\u2500 TTL Indexes\n      \u2514\u2500 Background deletion thread (Every 60s)",
        "flow": "\nIncoming Query -> [Query Planner]\n       \u2502\n       \u251c\u2500> Parse Query & Extract Predicates\n       \u251c\u2500> [Shape Cache] -> Cache Hit? -> [Execution Plan]\n       \u2502\n       \u2514\u2500> Cache Miss?\n             \u251c\u2500> Generate Candidate Plans (A, B, C)\n             \u251c\u2500> Execute Plans in Parallel (Trial Period)\n             \u251c\u2500> First to return 101 results (or finish) WINS\n             \u2514\u2500> [Cache Winning Plan] -> [Execute Remaining Query]",
        "mentalModel": "Think of MongoDB Indexing as a massive physical library. Without an index, the librarian must walk every single aisle and check every single book (Collection Scan / COLLSCAN). An index is the card catalog at the front. The ESR Rule is how the cards are sorted: first by Exact Category (Equality), then alphabetically by Title (Sort), and finally allowing you to search a range of publication years (Range). If you sort before equality, you end up jumping between different categories.",
        "questions": [
            "Explain the ESR (Equality, Sort, Range) rule and describe a scenario where violating it causes a massive performance drop.",
            "How does MongoDB's Query Planner select a winning plan, and when does it evict cached plans?",
            "What is a 'Covered Query' and why is it considered the holy grail of MongoDB performance?",
            "Describe the performance implications of 'Multikey Indexes' on an array of embedded documents.",
            "When would you choose a Partial Index over a Sparse Index?"
        ],
        "traps": [
            "Neglecting the ESR Rule: Placing a Range field before a Sort field, causing an expensive in-memory sort.",
            "Low Cardinality Prefix: Using a boolean or gender field as the first index key, leading to massive index scanning.",
            "Exploding Multikey Indexes: Indexing two extremely large arrays in the same document (MongoDB actually prevents this, but indexing one large array still inflates index size).",
            "Over-indexing: Every index must be updated during write operations. Having 20 indexes on a write-heavy collection will cripple your database."
        ],
        "debugScenario": "Scenario: A query has an index, but latency is extremely high during peak hours.\nAction: Run `.explain('executionStats')`.\nDiscovery: The output shows `IXSCAN` (Index Scan) but the `totalKeysExamined` is 1,000,000 while `totalDocsExamined` is also 1,000,000, and `nReturned` is 10. The `SORT_KEY_GENERATED` flag is true.\nFix: The index was used for filtering but NOT for sorting. The database had to pull 1M documents into RAM to sort them. Reordered the index to `{ equalityField: 1, sortField: 1 }`.",
        "productionInsight": "In high-traffic production environments, never build an index in the foreground. Always use background index builds (or rolling index builds in a replica set) to prevent database lockups. Additionally, leverage Partial Indexes for fields like 'status: active' where you only care about querying the active subset (saves RAM and disk space).",
        "comparison": {
            "COLLSCAN": "Reads every document in the collection. Terrible for large datasets.",
            "IXSCAN -> FETCH": "Uses the index to find the pointer, then fetches the document from disk.",
            "Covered Query (IXSCAN Only)": "The index contains all fields needed by the query. No disk fetch is required. Peak performance.",
            "In-Memory Sort": "Occurs when index cannot be used for sorting. Fails if memory exceeds 32MB."
        }
    },
    "aggregation": {
        "title": "Aggregation & Data Pipelines",
        "tree": "\n\u250c\u2500 Aggregation Pipeline Architecture\n\u251c\u2500 Pipeline Stages (Array of operators)\n\u2502  \u251c\u2500 Phase 1: Filtering & Shaping ($match, $project)\n\u2502  \u251c\u2500 Phase 2: Transformation ($unwind, $group)\n\u2502  \u251c\u2500 Phase 3: Relational ($lookup, $graphLookup)\n\u2502  \u2514\u2500 Phase 4: Output ($out, $merge)\n\u251c\u2500 Optimization Engine\n\u2502  \u251c\u2500 Stage Reordering ($match moved forward)\n\u2502  \u2514\u2500 Stage Coalescing ($sort + $limit = TopK)\n\u2514\u2500 Memory Limits\n   \u251c\u2500 100MB RAM limit per stage\n   \u2514\u2500 allowDiskUse: true (Spills to temp files)",
        "flow": "\nCollection -> Pipeline Runtime\n   \u2502\n   \u251c\u2500> $match (Filters dataset -> Uses Index!)\n   \u251c\u2500> $unwind (Deconstructs arrays -> 1 doc becomes N docs)\n   \u251c\u2500> $group (Accumulates data -> Requires RAM/allowDiskUse)\n   \u251c\u2500> $lookup (Left Outer Join -> Fetches from Foreign Collection)\n   \u251c\u2500> $project (Shapes output -> Excludes heavy fields)\n   \u2514\u2500> Result Set (Cursor returned to Client)",
        "mentalModel": "An Aggregation Pipeline is an industrial chemical refinery. Raw crude oil (Documents) enters the factory. It goes through a series of specialized pipes and tanks (Stages). First, a filter removes the dirt ($match). Then it's heated and separated into components ($unwind). Next, certain chemicals are combined together ($group). Finally, special additives are mixed in from another warehouse ($lookup), and it's packaged into final barrels ($project) to be shipped out.",
        "questions": [
            "Why is placing $match early in the pipeline crucial for performance?",
            "How does $lookup work computationally, and what are its memory implications on large datasets?",
            "Explain the difference between $out and $merge stages.",
            "What happens if a $group stage exceeds the 100MB memory limit, and how do you resolve it?",
            "How does the aggregation optimizer rewrite and reorder pipeline stages internally?"
        ],
        "traps": [
            "Late Matching: Placing a $match after a $group or $unwind, meaning you processed millions of documents you didn't even need.",
            "Huge Unwinds: Using $unwind on arrays with 10,000 items on a 1M document collection, instantly creating 10 Billion documents in the pipeline.",
            "Uncorrelated Lookups: Using $lookup without an index on the foreign field, causing a COLLSCAN on the foreign collection for EVERY document.",
            "Excessive Projection: Fetching huge text fields or nested arrays only to drop them in the last $project stage."
        ],
        "debugScenario": "Scenario: Dashboard takes 30 seconds to load a daily sales aggregation.\nAction: Append `{ explain: true }` to the aggregation call.\nDiscovery: The optimizer was unable to use an index because the pipeline started with an `$addFields` stage that computed a new date format, followed by a `$match` on that computed format.\nFix: Moved the `$match` to the top using a direct date range query on the indexed raw date field, allowing the pipeline to start with an `IXSCAN`.",
        "productionInsight": "For complex real-time analytics, don't aggregate on the fly. Use `$merge` in a background cron job to incrementally update a Materialized View collection. Your client apps then do simple, instant queries `find()` against the pre-aggregated materialized view.",
        "comparison": {
            "find() vs Aggregate": "find() is just filtering/sorting. Aggregate is data transformation, grouping, and joining.",
            "$lookup vs Client-side Join": "$lookup happens inside the DB engine (faster, network efficient). Client-side join requires pulling heavy data to Node.js memory.",
            "$out vs $merge": "$out replaces the entire output collection. $merge can incrementally insert/update existing data.",
            "ALLOW_DISK_USE": "Prevents crash on >100MB sorts/groups, but writes to disk, slowing down the aggregation significantly."
        }
    },
    "wiredTiger": {
        "title": "WiredTiger Storage Engine",
        "tree": "\n\u250c\u2500 WiredTiger Architecture\n\u251c\u2500 Cache Layer (Memory)\n\u2502  \u251c\u2500 Internal Cache (Uncompressed Data)\n\u2502  \u2514\u2500 OS Page Cache (Filesystem Cache)\n\u251c\u2500 Persistence Layer (Disk)\n\u2502  \u251c\u2500 Data Files (B-Tree blocks, Snappy compression)\n\u2502  \u251c\u2500 Journal (Write-Ahead Log, uncompressed)\n\u2502  \u2514\u2500 Checkpoints (Snapshots of consistent state)\n\u2514\u2500 Concurrency Control\n   \u251c\u2500 Optimistic Concurrency\n   \u251c\u2500 MVCC (Multi-Version Concurrency Control)\n   \u2514\u2500 Document-Level Locking",
        "flow": "\nClient Write Request -> Write to WiredTiger Internal Cache\n   \u2502\n   \u251c\u2500> Immediately log operation to Journal (Memory Buffer)\n   \u251c\u2500> FSync Journal Buffer to Disk (Every 100ms or on w:1) -> [Acknowledge Client]\n   \u2502\n   \u2514\u2500> Background Thread (Every 60 seconds):\n         \u251c\u2500> Create Checkpoint (Consistent Snapshot)\n         \u251c\u2500> Flush modified pages from Internal Cache to Data Files\n         \u2514\u2500> Truncate old Journal logs",
        "mentalModel": "WiredTiger is like a highly secure, efficient bank. When a customer deposits money (Write), the teller quickly notes it in an open ledger on the desk (Journal Buffer) and puts the cash in a drawer (Cache). Every few seconds, the ledger is locked into a fireproof safe (Disk Journal) so nothing is lost if the power fails. At the end of every hour (Checkpoint), the manager moves all the accumulated loose cash from the drawers into the main underground vault (Data Files) and gets a fresh ledger.",
        "questions": [
            "Explain the dual-cache mechanism in WiredTiger (Internal Cache vs OS Page Cache).",
            "What is MVCC (Multi-Version Concurrency Control) and how does it enable Document-Level locking?",
            "How does the Journaling process guarantee durability even if a Checkpoint hasn't happened?",
            "What occurs during a WiredTiger 'Eviction Stall'?",
            "How does Snappy compression affect CPU utilization vs Disk I/O?"
        ],
        "traps": [
            "RAM Starvation: Manually setting the WiredTiger cache size to 90% of RAM, leaving no memory for the OS Page Cache or Node.js runtime, causing extreme swapping/OOM.",
            "Journal Disabling: Turning off journaling for 'performance gains'. A hard crash will result in complete catastrophic data loss and corruption.",
            "Huge Documents: Updating a 15MB document constantly causes immense Cache write pressure, as MVCC must keep multiple 15MB copies in RAM.",
            "Slow Disks: If the disk cannot keep up with Journal flushes, WiredTiger will halt all new incoming writes (Eviction/Write stall)."
        ],
        "debugScenario": "Scenario: Periodic enormous latency spikes (queries taking 5s+) every 60 seconds.\nAction: Monitor `mongostat` and observe the `dirty` cache metric and disk IOPS.\nDiscovery: The internal cache is filling up with 'dirty' (modified) data. Checkpointing triggers every 60s, overwhelming the IOPS capacity of the underlying AWS EBS volume, stalling the database.\nFix: Increase disk IOPS (upgrade EBS volume), or tweak WT settings to checkpoint more frequently but with smaller chunks, smoothing out the disk I/O.",
        "productionInsight": "By default, WiredTiger reserves 50% of (RAM - 1GB) for its internal cache. Do not change this unless you have a highly specialized workload. The remaining RAM is not 'wasted'\u2014the Linux OS aggressively uses it as the Page Cache to keep your most accessed standard files in memory.",
        "comparison": {
            "WiredTiger Internal Cache": "Stores raw, uncompressed documents. Fast access for the query engine.",
            "OS / File System Cache": "Stores compressed blocks of data directly from the disk.",
            "Document-Level Lock": "Multiple clients can write to the same collection, just not the same document.",
            "Collection-Level Lock (MMAPv1 - Deprecated)": "Only one client could write to a collection at a time."
        }
    },
    "transactions": {
        "title": "ACID Transactions (Distributed)",
        "tree": "\n\u250c\u2500 MongoDB Transaction Architecture\n\u251c\u2500 Core Concepts (ACID)\n\u2502  \u251c\u2500 Atomicity (All or Nothing)\n\u2502  \u251c\u2500 Consistency (Data Integrity)\n\u2502  \u251c\u2500 Isolation (Snapshot Isolation)\n\u2502  \u2514\u2500 Durability (Write Concern dependent)\n\u251c\u2500 Distributed Transactions (Clusters)\n\u2502  \u251c\u2500 Two-Phase Commit (2PC) internally\n\u2502  \u251c\u2500 Coordinator Node (Manages state)\n\u2502  \u2514\u2500 Participant Nodes (Shards executing queries)\n\u2514\u2500 Transaction Lifecycle\n   \u251c\u2500 Start Session\n   \u251c\u2500 Start Transaction\n   \u251c\u2500 Execute Operations (Locks acquired)\n   \u2514\u2500 Commit / Abort (Locks released)",
        "flow": "\nClient -> Start Session -> Start Transaction\n   \u2502\n   \u251c\u2500> Operation 1: Update Doc A (Transaction acquires Lock on A)\n   \u251c\u2500> Operation 2: Insert Doc B (Transaction acquires Lock on B)\n   \u2502\n   \u251c\u2500> Validation:\n   \u2502     \u251c\u2500> Did another connection modify A or B? -> WriteConflictError\n   \u2502     \u2514\u2500> Did the transaction exceed 60sec or memory limit? -> Abort\n   \u2502\n   \u2514\u2500> Decision:\n         \u251c\u2500> CommitTransaction -> Persist changes to Oplog -> Acknowledge\n         \u2514\u2500> AbortTransaction -> Discard changes -> Release Locks",
        "mentalModel": "A Transaction is an exclusive 'Parallel Universe'. When you start one, Mongo gives you a frozen snapshot of the database at that exact millisecond. You make all your changes in this private universe. Right before you merge it back into reality (Commit), Mongo checks: 'Did anyone else modify these specific documents while you were in your universe?' If yes, your universe collapses (WriteConflict / Abort). If no, your changes are permanently sealed into reality atomically.",
        "questions": [
            "How does Snapshot Isolation prevent Dirty Reads and Non-Repeatable Reads?",
            "What is a WriteConflictError in MongoDB, and how should applications handle it?",
            "Why are Multi-Document Transactions significantly slower than Single-Document operations?",
            "Explain the role of the Two-Phase Commit protocol in a Sharded Cluster transaction.",
            "What are the hard limits of a MongoDB transaction (e.g., maximum execution time, DDL restrictions)?"
        ],
        "traps": [
            "Overuse: Using transactions for everything like a traditional SQL dev. In Mongo, a single document update is already atomic. Embed data where possible.",
            "Long-Running Transactions: Keeping a transaction open for 30 seconds while waiting on an external API call. This holds locks and blows up the WiredTiger cache leading to massive stalls.",
            "Lack of Retry Logic: Failing to implement transient error handling. WriteConflictErrors are expected; your app MUST gracefully retry the transaction.",
            "DDL Inside Transactions: Trying to create a collection or an index inside a transaction (it will instantly fail)."
        ],
        "debugScenario": "Scenario: Random 'TransientTransactionError' exceptions are breaking a checkout flow.\nAction: Check logs for Write conflicts.\nDiscovery: The application reads an inventory document, does heavy math for 5 seconds, then updates it within the transaction. Another process frequently subtracts inventory. By the time the 5s math is done, the document changed, causing an abort.\nFix: Shift the transaction boundary to be as tight as possible. Do the heavy math FIRST, then start the transaction, read, and write immediately.",
        "productionInsight": "Modern Mongoose supports `session.withTransaction()` which automatically handles retry logic for TransientTransactionErrors and UnknownTransactionCommitResults. Always use this helper rather than manually calling start/commit/abort.",
        "comparison": {
            "Single-Doc Atomicity": "Default, incredibly fast, uses intrinsic lock.",
            "Multi-Doc Transaction": "Slower, requires a session, explicit commit/abort.",
            "WriteConflict": "Fails safe (aborts). Requires explicit retry from client.",
            "Snapshot Isolation": "You never see half-committed data from other transactions."
        }
    },
    "replication": {
        "title": "Replication & Automated Failover",
        "tree": "\n\u250c\u2500 Replica Set Architecture\n\u251c\u2500 Core Nodes\n\u2502  \u251c\u2500 Primary (Accepts Reads & Writes, generates Oplog)\n\u2502  \u251c\u2500 Secondary (Replicates Oplog, applies writes)\n\u2502  \u2514\u2500 Arbiter (No data, exists only to tie-break elections)\n\u251c\u2500 The Oplog (Operations Log)\n\u2502  \u251c\u2500 Capped Collection (Rolling window of history)\n\u2502  \u2514\u2500 Idempotent Operations (Can be applied safely multiple times)\n\u2514\u2500 Consensus & Failover\n   \u251c\u2500 Heartbeats (Pings every 2s)\n   \u251c\u2500 Elections (RAFT algorithm)\n   \u2514\u2500 Rollbacks (Resolving diverged timelines)",
        "flow": "\nClient -> Write to Primary Node -> [Apply locally] -> [Write to Oplog]\n   \u2502\n   \u251c\u2500> Secondary A (Tails Oplog via network) -> Pulls new entry\n   \u251c\u2500> Secondary B (Tails Oplog via network) -> Pulls new entry\n   \u2502\n   \u251c\u2500> Secondary A -> Applies Oplog entry -> Acknowledges\n   \u251c\u2500> Secondary B -> Applies Oplog entry -> Acknowledges\n   \u2502\n   \u2514\u2500> If WriteConcern is 'majority':\n         \u2514\u2500> Primary waits for 1 Secondary ACK -> Returns Success to Client",
        "mentalModel": "A Replica Set is like a Kingdom. The King (Primary) is the only one who can make laws (Writes). The Scribes (Secondaries) sit in the back, constantly watching the King's diary (Oplog) and copying everything into their own local ledgers. If the King is assassinated (Server Crash), the Scribes immediately hold an election. The Scribe with the most up-to-date ledger wins and is crowned the new King within seconds.",
        "questions": [
            "What is the Oplog, and why must its operations be idempotent?",
            "Explain the concept of 'Replication Lag'. What are its primary causes?",
            "How does WriteConcern 'majority' interact with ReadConcern 'majority' to prevent Rollbacks?",
            "Describe the election mechanism. Why is an odd number of voting members critical?",
            "What happens to a Primary node if it becomes partitioned from the rest of the cluster?"
        ],
        "traps": [
            "Arbiter Bottleneck: Using an Arbiter to save money on a 3-node set, meaning you only have 2 data copies. If one data node fails, you belong to a 1-node data set, risking massive data loss.",
            "Small Oplog Size: Having an oplog that only holds 1 hour of writes. If a Secondary is offline for 2 hours, it falls 'off the end' of the oplog and requires a massive, painful Full Initial Sync.",
            "Reading from Secondaries for Consistency: Routing reads to secondaries expecting instant data. Secondaries are EVENTUALLY consistent due to replication lag.",
            "Even Number of Voters: Having 4 voting nodes. If a network split happens 2-and-2, neither side can reach a >50% majority (3). The whole cluster becomes Read-Only."
        ],
        "debugScenario": "Scenario: High-value financial writes are mysteriously disappearing after a network blip.\nAction: Audit the replica set logs and look for 'Rollback'.\nDiscovery: Writes were being sent with `w: 1` (Primary acknowledgement only). A network partition happened, but the Primary accepted writes for a few seconds before stepping down. When it rejoined, those writes weren't on the new Primary, so it 'rolled back' (deleted) them to match the new reality.\nFix: Enforced `writeConcern: 'majority'`. Writes now wait for replication before succeeding, eliminating rollbacks.",
        "productionInsight": "Utilize specialized secondary nodes: 'Hidden' nodes for heavy analytical BI queries so they don't affect production latency, and 'Delayed' nodes (e.g., 4-hour delay) as a time-machine. If a rogue script drops a massive collection, the delayed node hasn't processed it yet, allowing you to salvage the data instantly.",
        "comparison": {
            "w: 1 (WriteConcern)": "Fast. Safe from app-crash, but vulnerable to hardware/network failures.",
            "w: majority (WriteConcern)": "Slower. Guaranteed safe across cluster failovers.",
            "readPreference: primary": "Strong consistency. Default.",
            "readPreference: secondary": "Eventual consistency. Used to offload read pressure."
        }
    },
    "sharding": {
        "title": "Sharding & Horizontal Scaling",
        "tree": "\n\u250c\u2500 Sharded Cluster Architecture\n\u251c\u2500 Shards (The storage warehouses)\n\u2502  \u2514\u2500 Each Shard is a complete Replica Set\n\u251c\u2500 Config Servers (The central directory)\n\u2502  \u2514\u2500 Stores metadata and chunk maps\n\u251c\u2500 Query Routers (mongos)\n\u2502  \u2514\u2500 The gateway/proxy for applications\n\u2514\u2500 Data Distribution Methods\n   \u251c\u2500 The Shard Key (Immutable routing rule)\n   \u251c\u2500 Chunks (Contiguous ranges of data, ~64MB)\n   \u2514\u2500 The Balancer (Background chunk migration thread)",
        "flow": "\nClient App -> Query Router (mongos)\n   \u2502\n   \u251c\u2500> Mongos checks cached metadata (from Config Servers)\n   \u2502\n   \u251c\u2500> Does Query contain the Shard Key?\n   \u2502     \u251c\u2500> YES (Targeted Query):\n   \u2502     \u2502    \u2514\u2500> Mongos routes directly to Shard A -> Returns Data fast\n   \u2502     \u2514\u2500> NO (Scatter-Gather Query):\n   \u2502          \u251c\u2500> Mongos sends query to Shard A, Shard B, Shard C\n   \u2502          \u251c\u2500> Merges and sorts results from all shards\n   \u2502          \u2514\u2500> Returns Data (High Latency)\n   \u2502\n   \u2514\u2500> Background: The Balancer detects Shard A has 100 chunks and Shard B has 20 chunks. It securely migrates 40 chunks from A to B.",
        "mentalModel": "Sharding is an Amazon Fulfillment network. You are the customer (Client). You talk to the Customer Service rep (`mongos`). The rep checks the central database (`Config Server`) to see where your item is stored. If you provide a Tracking ID (`Shard Key`), the rep knows exactly which warehouse (`Shard`) to call. If you don't provide the Tracking ID and just say 'Find my blue shirt', the rep must call EVERY warehouse in the country, wait for all of them to search, combine the answers, and report back (`Scatter-Gather`).",
        "questions": [
            "What happens behind the scenes during a Scatter-Gather query, and why is it dangerous at scale?",
            "Explain the difference between a Ranged Shard Key and a Hashed Shard Key.",
            "What is a 'Jumbo Chunk', why does it occur, and how does it break the cluster?",
            "How does the MongoDB Balancer ensure zero-downtime during chunk migration?",
            "Why is choosing a Shard Key effectively an irreversible decision (pre-Mongo 4.4/5.0)?"
        ],
        "traps": [
            "Monotonically Increasing Shard Key: Sharding on an ObjectId or Timestamp. Result: ALL new writes go to a single shard (Hot Shard). The other shards sit completely idle.",
            "Low Cardinality Key: Sharding by 'country' when you only operate in 5 countries. You can only ever have 5 chunks. Sharding is useless.",
            "Jumbo Chunks: Sharding on 'tenant_id'. A single massive tenant grows past the 64MB chunk size, but because all their data shares the exact same key, the Balancer cannot split it. The chunk becomes 'Jumbo' and permanently stranded on one shard.",
            "Heavy Scatter-Gather: Sharding a massive database, but the app's most frequent queries do not include the shard key in the filter."
        ],
        "debugScenario": "Scenario: One node in the cluster is hitting 100% CPU and disk IO, while the others are at 5%.\nAction: Run `sh.status()` and analyze the shard key distribution.\nDiscovery: The shard key was set to `created_at`. All current inserts are hitting the 'highest range' chunk, which lives exclusively on Shard C. Shard C is melting down.\nFix: Switched the sharding strategy. Hashed the `_id` field for perfectly even write distribution, or used a compound key `{ company_id: 1, created_at: 1 }` to isolate writes within logical boundaries.",
        "productionInsight": "Sharding is the most operationally complex feature of MongoDB. Never shard prematurely. A well-tuned, heavily indexed Replica Set on large NVMe instances can handle TBs of data and massive throughput. Shard only when you are hitting physical hardware RAM limits or require absolute multi-region geographic distribution.",
        "comparison": {
            "Ranged Sharding": "Great for range queries (e.g., date between X and Y). Requires careful planning to avoid write hotspots.",
            "Hashed Sharding": "Guarantees perfectly even write distribution. Terrible for range queries (forces scatter-gather).",
            "Config Server": "The brain. If Config Servers go down, cluster metadata cannot be updated (though mongos cache keeps serving).",
            "Mongos Router": "Stateless proxy. Run multiple mongos instances closely to your app servers for resilience."
        }
    },
    "security": {
        "title": "Security, RBAC & Encryption",
        "tree": "\n\u250c\u2500 MongoDB Defense in Depth\n\u251c\u2500 Network Perimeter\n\u2502  \u251c\u2500 Bind IP Limitations\n\u2502  \u251c\u2500 VPC & Firewalls\n\u2502  \u2514\u2500 TLS/SSL Transit Encryption\n\u251c\u2500 Authentication (Who are you?)\n\u2502  \u251c\u2500 SCRAM-SHA-256 (Salted Challenge)\n\u2502  \u251c\u2500 x.509 Certificate Auth (Machines/Mongos)\n\u2502  \u2514\u2500 Enterprise (LDAP / Kerberos / AWS IAM)\n\u251c\u2500 Authorization (What can you do?)\n\u2502  \u251c\u2500 Role-Based Access Control (RBAC)\n\u2502  \u251c\u2500 Built-in (readWrite, dbAdmin, root)\n\u2502  \u2514\u2500 Custom Roles (Granular action permissions)\n\u2514\u2500 Data Encryption (At Rest)\n   \u251c\u2500 WiredTiger Encryption (AES-256)\n   \u2514\u2500 Client-Side Field Level Encryption (CSFLE)",
        "flow": "\nApp -> TLS Handshake -> [Network Layer] -> [Mongod Port 27017]\n   \u2502\n   \u251c\u2500> Auth Challenge (SCRAM over TLS)\n   \u2502     \u251c\u2500> Client hashes password, proves knowledge via challenge logic\n   \u2502     \u2514\u2500> Server verifies hash without ever seeing plaintext password\n   \u2502\n   \u251c\u2500> Connection Established (Session granted)\n   \u2502\n   \u251c\u2500> App sends Command: `db.users.drop()`\n   \u2502\n   \u251c\u2500> Authorization Check\n   \u2502     \u251c\u2500> Does token possess `dropCollection` privilege on `users` namespace?\n   \u2502     \u251c\u2500> NO -> Unauthorized Error -> Logged to Audit Trail\n   \u2502     \u2514\u2500> YES -> Execute Drop\n   \u2502\n   \u2514\u2500> Disk Write -> Encrypted via AES-256 -> Flushed to disk",
        "mentalModel": "MongoDB Security is a high-tech fortress. First, the moat prevents anyone from arriving except from recognized roads (VPC/Firewalls). At the gate, you must present an encrypted passport (TLS + SCRAM Auth). Once inside, you wear a colored badge (RBAC Roles). Whenever you try to touch a file cabinet (Collection), an invisible laser scans your badge to see if you have clearance (Authorization). Also, all the contents inside the cabinets are written in alien code (Encryption at rest).",
        "questions": [
            "Explain how SCRAM authentication protects against Man-In-The-Middle attacks.",
            "What is Client-Side Field Level Encryption (CSFLE), and how does it protect against a compromised DBA?",
            "How do x.509 certificates simplify internal Replica Set authentication?",
            "What is the principle of Least Privilege applied to MongoDB Roles?",
            "How does MongoDB's Auditing framework impact performance in strict compliance environments?"
        ],
        "traps": [
            "The Default Trap: Installing MongoDB, failing to enable `<security.authorization>`, and leaving `bindIp` as `0.0.0.0`. Botnets will find it, encrypt your data, and drop a ransomware note within 6 hours.",
            "God Mode Credentials: Giving the application connection string the `dbOwner` or `root` role. If a developer accidentally writes a destructive script or an injection occurs, it wipes the DB.",
            "Plaintext Transit: Skipping TLS configuration so data and auth hashes are sent in plaintext, interceptable by anyone in the VPC segment.",
            "Hardcoded Keys: Storing the KMS or master encryption key in the same repository as the application code."
        ],
        "debugScenario": "Scenario: App connections periodically drop with 'SSL Handshake Failed' or 'Authentication Failed'.\nAction: Check TLS certificate expiry and network configs.\nDiscovery: The internal x.509 certificates used for Node-to-Node communication in the Replica set expired. The nodes stopped trusting each other, causing the Primary to step down and the cluster to fail apart.\nFix: Implement automated SSL certificate rotation before expiry using a secrets manager. Rotated the certs and the cluster instantly reformed.",
        "productionInsight": "Client-Side Field Level Encryption (CSFLE) is a game-changer for PII/PCI data. The Node.js driver encrypts specific fields (like SSN) BEFORE they leave your app server. The MongoDB server only ever sees ciphertext. Even a DBA with root server access cannot read the data, as the decryption keys remain securely in AWS KMS or HashiCorp Vault.",
        "comparison": {
            "Authentication": "Verifying identity ('I am the backend service').",
            "Authorization": "Verifying permissions ('I am allowed to write to the invoices collection').",
            "Encryption In Transit (TLS)": "Protects data from network sniffers.",
            "Encryption At Rest (WiredTiger)": "Protects data if someone steals the physical hard drives."
        }
    },
    "performance": {
        "title": "Performance Tuning, Profiling & Mongoose",
        "tree": "\n\u250c\u2500 Performance Optimization Ecosystem\n\u251c\u2500 Database Profiler (Diagnostics)\n\u2502  \u251c\u2500 System.profile collection\n\u2502  \u251c\u2500 Slowms threshold (e.g., > 100ms)\n\u2502  \u2514\u2500 Captured Explain Plans\n\u251c\u2500 Query Optimization\n\u2502  \u251c\u2500 Index Coverage\n\u2502  \u251c\u2500 Projection (Discarding bulky fields)\n\u2502  \u2514\u2500 Cursor Management (Batch size)\n\u251c\u2500 Connection Management\n\u2502  \u251c\u2500 Connection Pooling (MinPoolSize / MaxPoolSize)\n\u2502  \u2514\u2500 Network latency reduction\n\u2514\u2500 Mongoose Optimization (Node.js specifically)\n   \u251c\u2500 .lean() (Bypassing heavy Class instantiation)\n   \u251c\u2500 populate() pitfalls (N+1 queries)\n   \u2514\u2500 Virtuals and heavy getters",
        "flow": "\nBottleneck Detected (High CPU/Latency) -> Profiling Phase\n   \u2502\n   \u251c\u2500> 1. DB Profiler / Atlas Advisor -> Identifies slow operations\n   \u251c\u2500> 2. Analyze Output -> Extract slow query signature structure\n   \u2502\n   \u251c\u2500> 3. Execution Stats Analysis (`.explain('executionStats')`)\n   \u2502     \u251c\u2500> COLLSCAN? -> Build an Index (ESR Rule)\n   \u2502     \u251c\u2500> Excessive FETCH? -> Compound index for a Covered Query\n   \u2502     \u2514\u2500> Sorting without index? -> Reorder index keys\n   \u2502\n   \u251c\u2500> 4. Application Logic Review (Mongoose)\n   \u2502     \u251c\u2500> Is it querying 10,000 documents into RAM? -> Add Pagination/Limit\n   \u2502     \u251c\u2500> Are Mongoose Document methods needed? -> Append `.lean()`\n   \u2502     \u2514\u2500> Is it mapping references in a loop? -> Use native `$lookup`\n   \u2502\n   \u2514\u2500> Measure -> Latency returns to < 20ms",
        "mentalModel": "Performance tuning is a pit stop in Formula 1. When the car (Database) slows down, you look at telemetry (Profiler). If the tires are worn out from doing too much work, you change them (Add Indexes). If the engine is carrying too much fuel (Heavy Mongoose Documents), you drain it (Use `.lean()`). If the driver is taking a horribly inefficient route (COLLSCAN), you redraw the map for them (Query Optimization). Every millisecond counts.",
        "questions": [
            "What does Mongoose's `.lean()` method do internally, and why is it drastically faster?",
            "How does connection pooling work in the MongoDB Node.js driver, and what happens if PoolSize is exhausted?",
            "Explain the concept of 'Cursor Batch Size' and its impact on network round-trips.",
            "Why is Mongoose `.populate()` dangerous on large datasets compared to an aggregation `$lookup`?",
            "How do you interpret the `mongotop` and `mongostat` diagnostic tools?"
        ],
        "traps": [
            "The Mongoose Bloat: Returning 10,000 documents via Mongoose without `.lean()`. Mongoose wraps every single object in a heavy Class wrapper with get/set traps. It freezes the Node.js Event Loop and consumes massive RAM.",
            "Unbounded Queries: Running `.find({})` without `.limit()`. The DB will try to stream millions of documents to the Node.js process, crashing the application with an Out Of Memory error.",
            "Connection Flooding: Running serverless functions (e.g., AWS Lambda) without caching the DB connection outside the handler. Thousands of concurrent invocations open thousands of auth connections, cratering the Mongo CPU.",
            "N+1 Populate: Using `.populate()` in a loop or deeply nested array. Mongoose has to execute dozens of separate queries under the hood to fetch references."
        ],
        "debugScenario": "Scenario: Express.js API response time randomly spikes to 5 seconds, CPU on API server hits 100%, but DB CPU is only 10%.\nAction: Profile Node.js CPU and memory usage.\nDiscovery: The query is fetching 5,000 user records doing `.find({ status: 'active' })`. The DB executes it instantly, but Mongoose spends 4.5 seconds instantiating 5,000 Document classes, triggering GC pauses.\nFix: Appended `.lean()` to the query: `.find({ status: 'active' }).lean()`. Response time dropped from 5000ms to 40ms.",
        "productionInsight": "For large-scale, high-concurrency Node.js applications, minimize ORM overhead. Use Mongoose for schemas, validations, and single-document mutations. But for bulk reads, reporting, and high-velocity APIs, either use `.lean()` or bypass Mongoose entirely to use the native `mongodb` driver collection functions. Keep the Node.js Event Loop clean.",
        "comparison": {
            "Mongoose Document": "Heavy, feature-rich (save(), virtuals, hooks). Slow for bulk reads.",
            "Lean Document (.lean())": "Plain Old JavaScript Object (POJO). Extremely fast, but no save() method.",
            ".populate()": "Application-level join. Node.js sends extra queries to stitch data. Good for small relations.",
            "$lookup": "Database-level join. Mongo stitches data using C++. Necessary for analytical/large data."
        }
    }
}
};