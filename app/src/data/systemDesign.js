export const systemDesign = {
    title: "System Design & DevOps",
    icon: "🏗️",
    description: "Architecting scalable backend systems and robust deployment pipelines",
    topics: {
        "microservices": {
            title: "Microservices Architecture",
            tree: `
┌─ Architecture Styles
├─ Monolith (Single deployable unit)
├─ Service-Oriented Architecture (SOA / ESB)
└─ Microservices
   ├─ Independently Deployable
   ├─ Decentralized Data (Database per service)
   ├─ Polyglot (Any language/tech)
   └─ Resilient (Circuit Breakers)
┌─ Inter-Service Communication
├─ Synchronous (REST/gRPC/GraphQL)
└─ Asynchronous (Kafka/RabbitMQ/EventBridge)`,
            flow: `
Client Request → [API Gateway] → [Auth Service] → [Order Service]
│
├─ 1. API Gateway / BFF (Backend for Frontend):
│  └─ Routes request, terminates SSL, handles rate limiting.
│
├─ 2. Auth Service:
│  └─ Validates JWT, passes context to Order Service.
│
├─ 3. Order Service (Synchronous):
│  ├─ Creates 'Pending Order' in local PostgreSQL.
│  └─ Emits 'OrderCreated' event to Message Broker (Kafka).
│
└─ 4. Inventory Service (Asynchronous):
   └─ Listens to Kafka. Deducts stock. Emits 'InventoryReserved'.`,
            mentalModel: "A Monolith is a 'Multi-tool' (Swiss Army Knife). It has scissors, a knife, and a screwdriver attached. It's easy to carry and deploy. If the knife breaks, the whole tool might need to be sent for repairs. Microservices are an 'Assorted Toolbox'. You have a completely separate Hammer, Wrench, and Screwdriver. If the hammer breaks, you replace just the hammer without interrupting the person using the wrench. However, tracking where all the tools are (Orchestration) is vastly more complex.",
            questions: [
                "[Basic] What is the difference between a Monolith and a Microservice architecture?",
                "[Intermediate] Explain the 'Database per Service' pattern. Why is it necessary, and what massive problem does it introduce?",
                "[Intermediate] What is an API Gateway, and why is it preferred over clients calling microservices directly?",
                "[Advanced] Explain the 'Saga Pattern' for distributed transactions across multiple microservices.",
                "[Advanced] What is the 'Strangler Fig Pattern' used for in Microservices migration?"
            ],
            traps: [
                "The Distributed Monolith Trap: Breaking code into 10 'microservices', but they all connect directly to a single shared central database. Any schema change instantly breaks 5 services simultaneously. This is the worst of both worlds (Monolith coupling + Network latency).",
                "Synchronous Chaining: Service A calls Service B synchronously, which calls Service C synchronously. If C is down or slow, A and B instantly crash or timeout. Creates an incredibly fragile system. Use async event queues (Kafka) instead.",
                "Premature Optimization: A startup breaking their simple CRUD app into 15 microservices on day 1. The operational overhead (Kubernetes, distributed tracing, CI/CD) bankrupts their engineering time before they find product-market fit."
            ],
            debugScenario: "Scenario: Users complain that placing an Order randomly spins for 30 seconds and fails with a Timeout.\nAction: Checked Distributed Tracing (Jaeger/Zipkin).\nDiscovery: OrderService -> PaymentService -> FraudService -> ExternalBank API. The ExternalBank API was experiencing a 30s outage. Because the calls were direct synchronous REST calls without Timeouts, the entire chain locked up causing cascading resource exhaustion on all 3 internal services.\nFix: Implemented a 'Circuit Breaker' pattern (Resilience4j) on PaymentService. If the Bank API fails 5 times, open the circuit and instantly return 'Payment Gateway Offline' to the user in 100ms instead of 30s.",
            productionInsight: "In enterprise Netflix/Amazon scale, services communicate entirely asynchronously via Kafka logs. They never explicitly check inventory by asking the Inventory service. Instead, the Order service replicates the necessary part of the Inventory's data locally by listening to its events (Event Sourcing), achieving near zero-latency lookups at the cost of Eventual Consistency.",
            comparison: {
                "Monolith": "Simple deployment, high coupling, scales vertically (expensive).",
                "Microservices": "Complex deployment, low coupling, scales horizontally (cheap).",
                "API Gateway": "Single entry point router (Kong/NGINX).",
                "Service Mesh": "Internal proxy sidecars managing traffic between services (Istio/Linkerd)."
            },
            resources: [
                { "title": "Microservices Patterns (Chris Richardson)", "url": "https://microservices.io/", "type": "official" },
                { "title": "Martin Fowler: Microservices", "url": "https://martinfowler.com/articles/microservices.html", "type": "article" }
            ]
        },
        "loadBalancing": {
            title: "Load Balancing & Hashing",
            tree: `
┌─ Load Balancer Types
├─ L4 (Transport Layer - TCP/UDP)
│  └─ Ultra-fast, no payload inspection (HAProxy, AWS NLB)
├─ L7 (Application Layer - HTTP/HTTPS)
│  └─ Inspects URLs/Cookies for smart routing (Nginx, AWS ALB)
┌─ Routing Algorithms
├─ Round Robin (Sequential)
├─ Least Connections (Dynamic load)
├─ IP Hash (Sticky Sessions)
└─ Consistent Hashing (Distributed Caches)`,
            flow: `
10,000 Users → [DNS Server] → [L7 Load Balancer] → [Server Array]
│
├─ 1. DNS Resolution:
│  └─ User types amazon.com. DNS geographically routes to closest AWS Region.
│
├─ 2. Firewall / WAF:
│  └─ Cloudflare blocks malicious bots before reaching the Balancer.
│
├─ 3. Load Balancer (Nginx):
│  ├─ Terminates SSL (Decrypts HTTPS to save server CPU).
│  └─ Examines User ID Cookie to route Traffic.
│
└─ 4. Node.js Servers (10x):
   └─ Receives naked HTTP traffic. Processes instantly.`,
            mentalModel: "A Load Balancer is a Traffic Cop at a crosswalk. If 10 cars drive up, they don't all crowd into Lane 1. The Cop directs car 1 to lane 1, car 2 to lane 2, and so on (Round Robin). If the Cop sees that lane 3 has a semi-truck blocking traffic, he directs all new cars away from lane 3 (Health Checking & Least Connections).",
            questions: [
                "[Basic] What is a Load Balancer and why is it the first step in scaling horizontally?",
                "[Intermediate] Explain the difference between Layer 4 (Transport) and Layer 7 (Application) load balancing.",
                "[Intermediate] What are 'Sticky Sessions' and why are they considered an anti-pattern in modern stateless architectures?",
                "[Advanced] Explain 'Consistent Hashing'. How does it dramatically reduce cache misses when you add a 4th Redis server to a 3-server cluster?",
                "[Advanced] What happens if your single Load Balancer crashes? (SPOF)"
            ],
            traps: [
                "The Single Point of Failure (SPOF): Running 15 highly available backend nodes, but directing all traffic through one single EC2 instance running Nginx. If the Nginx box dies, your website has 100% downtime. Use managed highly available balancers (AWS ELB, Cloudflare).",
                "Sticky Session Addiction: Relying on the Load Balancer to route User A always to Server 1 because their login session is held in Server 1's RAM. If Server 1 crashes, the user is logged out and loses data. Backends MUST be completely stateless (store sessions in Redis).",
                "SSL Overhead: Forgetting to Terminate SSL at the balancer. If 100 servers all have to decrypt HTTPS individually, it massively drains their CPU. Terminate at the edge, send unencrypted HTTP internally within the strict VPC."
            ],
            debugScenario: "Scenario: A social media app adds a new cache server to their 5-node Memcached cluster. Instantly, the database is overwhelmed and crashes.\nDebug: Investigated the cache routing code.\nDiscovery: The routing algorithm was standard 'Modulo Hashing' `serverIndex = hash(userId) % totalServers`. Changing `totalServers` from 5 to 6 completely re-mapped 83% of all users to the wrong cache server, causing massive cache misses and hammering the primary database simultaneously.\nFix: Replaced Modulo Hashing with 'Consistent Hashing' (using a Hash Ring algorithm), which guaranteed that only 1/6th of keys had to migrate upon adding the new node. Database survived.",
            productionInsight: "At extreme scale (Discord, Twitter), Consistent Hashing is the absolute holy grail of distributed computing. It is used to shard data across massive Riak or Cassandra databases without catastrophic re-balancing overhead. Meanwhile, modern proxies like Envoy (used in Kubernetes Istio) dynamically shift L7 routes using advanced anomaly detection rather than static Round Robin.",
            comparison: {
                "Round Robin": "Dumb but perfectly even. A, B, C, A, B, C.",
                "Least Connections": "Smart. Sends traffic to the server with the lowest current active TCP connections.",
                "L4 (TCP)": "Fast edge routing. Cannot read HTTP headers.",
                "L7 (HTTP)": "Slower edge routing. Can read paths (e.g., routing `/api/users` to a specific microservice)."
            },
            resources: [
                { "title": "System Design: Load Balancing", "url": "https://www.youtube.com/watch?v=K0Ta65OqQkY", "type": "video" }
            ]
        },
        "capTheorem": {
            title: "CAP Theorem & PACELC",
            tree: `
┌─ CAP Characteristics (Pick 2)
├─ Consistency (C)
│  └─ Every read receives the most recent write or an error.
├─ Availability (A)
│  └─ Every request receives a non-error response (but maybe stale).
├─ Partition Tolerance (P)
│  └─ System operates despite arbitrary messages dropped by network.
┌─ Database Alignments
├─ CP System (MongoDB, HBase, Redis Cluster)
│  └─ Prefers data accuracy. Errors if network splits.
├─ AP System (Cassandra, DynamoDB, CouchDB)
│  └─ Prefers uptime. Returns stale data if network splits.
└─ CA System (RDBMS - PostgreSQL, MySQL)
   └─ Single node. Cannot survive network partitions splits.`,
            flow: `
Network Split Occurs between Server North and Server South
│
├─ 1. Client writes 'Score = 5' to Server North.
│  └─ Server North tries to sync to Server South, but the cable is cut (Partition).
│
├─ 2. AP Database Reaction (Cassandra / DNS):
│  ├─ Server North accepts the write blindly (Highly Available).
│  └─ Client asking Server South reads 'Score = 0' (Stale Data / Inconsistent).
│
└─ 3. CP Database Reaction (MongoDB / ZooKeeper):
   ├─ Server North realizes it cannot reach South to reach 'Majority Quorum'.
   └─ Rejects the write returning '500 Error' (Consistent, but NOT Available).`,
            mentalModel: "CAP Theorem is like trying to manage two identical banks on opposite sides of a broken bridge (Partition). If someone deposits $100 in Bank A, Bank A can't call Bank B (the bridge is out). \nChoice 1 (CP): Bank A closes its doors and refuses all transactions until the bridge is fixed, to prevent people double-spending (Consistency over Availability).\nChoice 2 (AP): Bank A allows the deposit, and Bank B allows withdrawals based on old balances. They resolve the mismatch later when the bridge is fixed (Availability over Consistency).",
            questions: [
                "[Basic] Explain the 3 letters in the CAP Theorem.",
                "[Intermediate] Why is it often said that in a Distributed System on the modern internet, 'P' is not an option, but a given?",
                "[Intermediate] What is 'Eventual Consistency' and which databases utilize it?",
                "[Advanced] What is the PACELC theorem and how does it extend CAP to address 'normal' operations without partitions?",
                "[Advanced] Explain how MongoDB implements 'CP' (Consistency) through its Replica Set election process."
            ],
            traps: [
                "The CA Myth: Believing a distributed database can be CA (Consistent and Available) over a wide area network. If a network partition occurs (a fiber optic cable is cut), you MUST choose between C and A. You cannot choose CA in a partition event.",
                "Thinking Consistency = ACID: In CAP, 'Consistency' strictly means Linearizability (every node sees the exact same data instantly). It does NOT mean referential integrity or ACID transaction consistency.",
                "Binary Thinking: Assuming a DB is strictly AP or CP. Modern systems like DynamoDB or Cassandra allow tunable consistency. You can write specifying `Quorum = All` (CP) or `Quorum = One` (AP)."
            ],
            debugScenario: "Scenario: An e-commerce website shows '0 items in stock' for 3 seconds after an administrator explicitly updates the inventory to 50.\nAction: Checked the DynamoDB table configuration.\nDiscovery: The database was reading using 'Eventual Consistency' (AP mode). The update hit the primary node, but the user's read hit a read-replica node 100 milliseconds before the background replication process successfully copied the new data across the network.\nFix: Switched the Read operation to `ConsistentRead: true` to enforce CP mode for crucial inventory, at the cost of slightly higher latency and higher read unit costs.",
            productionInsight: "Banks use CP systems (relational DBs with strict two-phase commits) ensuring balances are to the penny, accepting system downtime if replication fails. Social networks use AP systems (Cassandra) because if a user 'Likes' a post, and their friend sees 99 likes instead of 100 for a few seconds, it literally does not matter. Always choose the DB theorem based on the exact business requirement of the data.",
            comparison: {
                "Consistency": "Strict accuracy at all times across all nodes.",
                "Eventual Consistency": "Data models will eventually sync up, but might mismatch momentarily.",
                "Strong Quorum": "Requiring a strict mathematical majority of nodes to agree before finalizing a write.",
                "PACELC": "If Partitioned (P) choose A or C. Else (E) choose Latency (L) or Consistency (C)."
            },
            resources: [
                { "title": "An Illustrated Proof of the CAP Theorem", "url": "https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/", "type": "article" }
            ]
        },
        "docker": {
            title: "Docker & Containerization",
            tree: `
┌─ Container vs Virtual Machine
├─ VM (Hypervisor)
│  └─ Heavy, fully emulated hardware, separate Guest OS kernels.
├─ Container (Docker Engine)
│  └─ Lightweight, shares Host OS kernel, isolates via namespaces/cgroups.
┌─ Docker Core Concepts
├─ Image (Read-Only Template)
│  └─ Built in layers (UnionFS/OverlayFS), cached efficiently.
├─ Container (Running Instance)
│  └─ A thin read/write layer on top of an Image.
├─ Volume (Persistent Data)
│  └─ Bypasses union filesystem, stored directly on host.
└─ Network
   └─ bridge, host, none (internal isolation resolution).`,
            flow: `
Dockerfile → \`docker build\` → Docker Image → \`docker run\` → Container
│
├─ 1. Base Layer: \`FROM node:20-alpine\`
│  └─ Fetches a 30MB minimal Linux OS with Node pre-installed.
│
├─ 2. Dependency Layer: \`COPY package.json . && npm install\`
│  └─ Docker caches this step aggressively. Doesn't rerun unless package.json mutates.
│
├─ 3. Source Layer: \`COPY src/ .\`
│  └─ Copies rapidly changing source code. (Cache busts often).
│
└─ 4. Runtime: \`CMD ["node", "server.js"]\`
   └─ Spins up the isolated process on the host Kernel.`,
            mentalModel: "A Virtual Machine (VM) is like buying 5 different Houses, with 5 different plumbing systems and 5 different foundations, to host 5 different families securely. Heavy and expensive. A Docker Container is like building a 5-unit Apartment Building. They all share the same exact foundation and plumbing (The Linux Kernel), but have perfectly soundproof, locked walls (cgroups and namespaces). Extremely cheap and fast to build.",
            questions: [
                "[Basic] What is the fundamental difference between a Docker Container and a Virtual Machine?",
                "[Intermediate] Explain how Docker caches image layers and why `COPY package.json` should always happen BEFORE `COPY . .`.",
                "[Intermediate] Why must you never store databases (like Postgres data) inside a raw Container filesystem?",
                "[Advanced] What are Linux `cgroups` and `namespaces` and how does Docker use them for isolation?",
                "[Advanced] Explain what a multi-stage Docker build is and how it drastically reduces final image size."
            ],
            traps: [
                "The Root Trap: Running Node.js as the default `root` user inside a Docker container. If a hacker exploits a Node.js vulnerability and escapes the container namespace, they have immediate ROOT access to your actual underlying host machine OS. Always explicitly create and use a low-privileged `USER node`.",
                "The Fat Image Trap: Using `FROM ubuntu` or `FROM node:20` (which is often 1GB Debian) instead of `FROM node:20-alpine` (30MB). Huge images bloat CI/CD pipelines, increase EC2 storage costs, and expand the vulnerability surface area massively.",
                "Ephemeral Data Loss: Spinning up a MongoDB container, inserting data, deleting the container, and realizing all user data is gone forever. Containers are inherently ephemeral (temporary). ALWAYS mount a Docker Volume (`-v /host/path:/container/path`) to persist database data safely outside the container lifecycle."
            ],
            debugScenario: "Scenario: A 10-line Node.js 'Hello World' microservice takes 5 minutes to build in GitHub Actions and generates a 1.2GB image.\nAction: Checked the Dockerfile.\nDiscovery: The developer used `COPY . .` followed by `RUN npm install`. Furthermore, `node_modules` was entirely copied from their local machine because there was no `.dockerignore` file. Every time they changed 1 line of code, Docker busted the cache for the entire 1GB `npm install` layer.\nFix: Added `.dockerignore` for `node_modules`. Swapped the order to `COPY package.json`, then `npm install`, then `COPY src/`. Build times shrank from 5 minutes to 15 seconds, image dropped to 80MB.",
            productionInsight: "Multi-stage builds are crucial for compiled languages (TypeScript, Go, Rust). Stage 1 has all the dev-dependencies heavily layered and compiles the code to binary/JS. Stage 2 (`FROM alpine`) simply copies the finalized lean binary from Stage 1 into an incredibly tiny, perfectly secure production image containing absolutely zero source code or compiler tooling.",
            comparison: {
                "Image": "Class blueprint. Immutable and shareable on DockerHub.",
                "Container": "Class instance. The active, executing, isolated process.",
                "Volume": "Safe persistent storage avoiding the container layer.",
                "Alpine": "A heavily stripped down, security-focused Linux distribution (usually 5MB)."
            },
            resources: [
                { "title": "Docker Architecture (Docs)", "url": "https://docs.docker.com/get-started/overview/", "type": "official" }
            ]
        },
        "kubernetes": {
            title: "Kubernetes (K8s) & CI/CD",
            tree: `
┌─ Kubernetes Master Node (Control Plane)
├─ API Server (Receives yamls)
├─ etcd (Key-Value state store)
├─ Scheduler (Assigns pods to nodes)
└─ Controller Manager (Maintains desired state)
┌─ Worker Node
├─ Kubelet (Agent communicating with Master)
├─ Kube-Proxy (Network routing)
└─ Pods (Groups of 1+ tightly coupled containers)
┌─ K8s Objects
├─ Deployment (Self-healing replica management)
├─ Service (Stable internal IP / LoadBalancer)
└─ Ingress (External HTTP routing to Services)`,
            flow: `
Code Merge → [CI Pipeline] → [CD Pipeline] → [Kubernetes Control Plane]
│
├─ 1. CI (Continuous Integration):
│  └─ GitHub Actions runs Unit Tests. Passes -> Runs \`docker build\`.
│
├─ 2. Registry Push:
│  └─ Image tagged (e.g., \`api:v2\`) and pushed to AWS ECR / DockerHub.
│
├─ 3. CD (Continuous Deployment - ArgoCD/Flux):
│  └─ Instructs K8s API server: 'Update Deployment to run image api:v2'.
│
└─ 4. K8s Rolling Update:
   └─ Scheduler slowly kills old \`api:v1\` pods and spins up \`api:v2\` pods safely.`,
            mentalModel: "Docker tells a musician (Container) how to play their instrument perfectly in isolation. \nKubernetes is the Orchestral Conductor. The Conductor (Master Node) looks at a massive piece of sheet music (YAML file) that says 'I want exactly 5 violinists playing at all times'. If a violinist breaks a string and collapses (Container crash), the Conductor instantly points a baton to bring up a backup violinist (Replica self-healing), ensuring the symphony (Application) sounds perfect forever.",
            questions: [
                "[Basic] Explain the difference between a Container and a Pod in Kubernetes.",
                "[Intermediate] What is a K8s 'Deployment' and how does it execute a 'Rolling Update' for zero-downtime?",
                "[Intermediate] Why do Pods need a 'Service' to communicate with each other instead of just using their IP addresses?",
                "[Advanced] Explain the function of the `etcd` database within the Kubernetes Control Plane.",
                "[Advanced] What are Liveness vs Readiness Probes, and why are both absolutely essential for backend APIs?"
            ],
            traps: [
                "IP Churn Trap: Pointing a frontend to a specific backend Pod's IP address. Pods are mortal. They are killed and recreated constantly, generating entirely new IP addresses every time. ALWAYS route traffic to a K8s `Service`, which provides a permanent, stable internal DNS name (e.g. `http://user-api-service`).",
                "Missing Readiness Probe: Spinning up a heavy Spring Boot Java API pod. Kubernetes sees the container started and instantly routes traffic to it. But the App takes 30 seconds to connect to the DB. Thousands of HTTP requests 500-error immediately. Fix: Define a `/health` Readiness probe. K8s will withhold network traffic until the app explicitly returns 200 OK.",
                "OOMKill Ignorance: Deploying identical pods without Memory `Limits` set in the YAML. One memory-leaky Node.js process eats 16GB of RAM, starving out all other microservices on that physical machine, causing catastrophic Node crashes. Always enforce strict CPU/RAM limits."
            ],
            debugScenario: "Scenario: Redeploying a critical microservice with a typo in the code resulted in 100% downtime for 10 minutes.\nAction: Inspected the CI/CD pipeline and K8s Deployment YAML.\nDiscovery: The deployment lacked `readinessProbes` and `maxUnavailable` settings. K8s mindlessly killed all V1 pods and spun up the V2 pods. The V2 pods instantly crashed on startup due to the typo. The deployment went completely offline.\nFix: Configured a proper RollingUpdate strategy. K8s spins up V2 pod -> Waiting for Readiness probe... -> Probe fails (Crash) -> K8s immediately HALTS the rollout, leaving V1 untouched. Result: Bug caught, 0 seconds of user downtime.",
            productionInsight: "At the Enterprise level, interacting forcefully with `kubectl -f apply` locally is considered highly dangerous. Modern CI/CD implements 'GitOps' using controllers like ArgoCD. The entire state of production Kubernetes is strictly mirrored to a Git Repository. If a developer needs 5 pods instead of 3, they make a Markdown Pull Request. Once approved, ArgoCD detects the Git merge and automatically manipulates the cluster state.",
            comparison: {
                "Pod": "The smallest deployable unit. Usually 1 container.",
                "ReplicaSet": "Ensures exactly X number of Pods are running right now.",
                "Deployment": "Manages ReplicaSets to handle version upgrades (v1 -> v2).",
                "Service": "Internal load balancer giving Pods a permanent DNS name.",
                "Ingress": "The actual Nginx HTTP router exposing Services to the public internet."
            },
            resources: [
                { "title": "Kubernetes Comic (Google)", "url": "https://cloud.google.com/kubernetes-engine/kubernetes-comic", "type": "article" },
                { "title": "K8s Docs: Pods", "url": "https://kubernetes.io/docs/concepts/workloads/pods/", "type": "official" }
            ]
        }
    }
};
