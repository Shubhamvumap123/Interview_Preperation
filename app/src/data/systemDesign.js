export const systemDesign = {
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
            sagaPattern: {
    title: "Saga Pattern (Distributed Trans)",
        tree: `
┌─ Saga Implementation
├─ Choreography (Events)
│  └─ Decentralized, event-driven
├─ Orchestration (Command)
│  └─ Centralized controller
├─ Transaction Types
│  ├─ Pivot (The 'Decision' point)
│  ├─ Compensatable (Can be undone)
│  └─ Retriable (Cannot be undone)
└─ Failures: Undoing work
        `,
            flow: `
Request → [Saga Start] → [Step 1] → [Step 2] → [Step 3] → [Done]
│
├─ 1. Happy Path:
│  └─ Each service finishes and notifies the next.
│
├─ 2. Failure Path:
│  ├─ Step 3 fails.
│  ├─ Trigger 'Compensating Transactions'.
│  └─ Undo Step 2 → Undo Step 1.
│
├─ 3. Orchestration:
│  └─ A 'Manager Service' tells A, then B, then C what to do.
│
└─ 4. Choreography:
   └─ Service A emits 'Done', Service B listens and starts. (Implicit).
        `,
                mentalModel: "A Saga is like 'Booking a Vacation'. 1. Book Flight. 2. Book Hotel. 3. Book Car. If the Car booking fails, you can't just 'delete' the flight (it's a row in an external DB). You must 'Compensate' by calling the Flight Cancellation API. It's an 'Undo' button for every step since you can't have a global lock across services.",
                    questions: [
                        "What is the difference between Choreography and Orchestration in Sagas?",
                        "What is a 'Compensating Transaction' and how does it differ from a Rollback?",
                        "Explain the 'Pivot Transaction' in a Saga flow.",
                        "How do you handle 'Idempotency' in Saga retries?",
                        "What are the downsides of the Choreography approach as the system grows?"
                    ],
                        traps: [
                            "Trap: Forgetting to handle the 'Cancellation of a Compensation' fail. (Solution: Guard with retries/manual logs).",
                            "Trap: Cyclic dependencies in Choreography. (Result: Infinite event loops).",
                            "Trap: Not making every step Idempotent. (Result: Double-charging customers on retries).",
                            "Trap: Allowing 'Dirty Reads'. (Note: Sagas are ACID-lite; isolation is not guaranteed)."
                        ],
                            debugScenario: "Scenario: A customer was charged for an order that 'failed'. Debug: The Payment service succeeded but the Inventory service failed. The Saga started compensation, but the 'Refund' event was lost. Fix: Use an 'Outbox Pattern' to ensure events are always sent, and implement a reconciliation worker.",
                                productionInsight: "Architecture: For complex workflows (>5 steps), always use Orchestration (e.g. AWS Step Functions, Temporal). It provides a central 'State Machine' that makes debugging 10x easier than tracing 20 different event types.",
                                    comparison: {
        "Orchestration": "Easy to track. Bottleneck at the manager.",
            "Choreography": "Extremely decoupled. Hard to visualize/debug.",
                "Compensate": "Semantic undo (e.g. a refund row).",
                    "Rollback": "Physical undo (database engine level)."
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
    },

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
            title: "CAP & PACELC Theorem",
                tree: `
┌─ CAP (During Partition)
├─ Consistency (C)
├─ Availability (A)
├─ Partition Tolerance (P)
├─ PACELC (Beyond CAP)
│  ├─ Latency (L)
│  └─ Consistency (C)
└─ Consistency Models
        `,
                    flow: `
        Network State → [Failure?] → [Yes: CAP] / [No: ELC]
        │
        ├─ 1. CAP (Partitioned):
        │  ├─ Choose 'A' for High Availability (AP).
        │  └─ Choose 'C' for Strong Consistency (CP).
        │
        ├─ 2. ELC (Normal State):
        │  ├─ Choose 'L' for Low Latency (Read from local).
        │  └─ Choose 'C' for Consistency (Sync with all nodes).
        │
        ├─ 3. Quorum (N/R/W):
        │  └─ N = Nodes, R = Read Quorum, W = Write Quorum. 
        │     If R + W > N, you have Strong Consistency.
        │
        └─ 4. Real World:
           ├─ DynamoDB/Cassandra (AP/EL).
           └─ MongoDB/PostgreSQL (CP/EC).
        `,
                        mentalModel: "CAP is a 'Crisis' rule. It tells you what happens when the network fails. PACELC is a 'Day-to-Day' rule. It tells you that even when the network is FINE, you still have to choose: Do I want to be FAST (Latency) or do I want to be RIGHT (Consistency)? You can't be both perfectly at scale.",
                            questions: [
                                "What is PACELC and how does it extend the CAP theorem?",
                                "Explain why 'CA' systems basically don't exist in distributed environments.",
                                "How does the Quorum equation (R+W > N) guarantee strong consistency?",
                                "In a network partition, why does an 'AP' system lead to eventual consistency?",
                                "What is 'Causal Consistency' and where does it fit in the spectrum?"
                            ],
                                traps: [
                                    "Trap: Thinking CAP applies to a single-node database. (Correction: It's only for DISTRIBUTED systems).",
                                    "Trap: Assuming eventual consistency is 'broken'. (Correction: It's a deliberate design choice for ultra-high availability).",
                                    "Trap: Over-valuing Strong Consistency. (Result: Extreme latency and system-wide timeouts during minor blips).",
                                    "Trap: Ignoring the 'L' in PACELC. (Result: Slow system even when everything is healthy)."
                                ],
                                    debugScenario: "Scenario: Users in Europe see old data while users in US see new data. Debug: The system is 'AP' and using asynchronous replication for low latency. There is a 'Replication Lag' causing 'Stale Reads'. Solution: Switch to 'Strong Consistency' (Read Concern: Majority) if the data is critical (e.g. Bank Balance), or accept it if it's social media.",
                                        productionInsight: "Architecture: Most modern cloud DBs (DynamoDB Premium) allow you to toggle between Eventual and Strong consistency PER REQUEST. This allows you to choose the tradeoff based on the specific business operation.",
                                            comparison: {
                "CP": "Prioritize correctness. System goes down if majority unavailable.",
                    "AP": "Prioritize uptime. System works but might show old data.",
                        "Latency": "The time it takes for one node to reply.",
                            "Consistency": "The guarantee that all nodes show the same value."
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
},

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
│  ├─ Performance tracing
└─ Alerting
   ├─ Threshold alerts
   ├─ Anomaly detection
   └─ Escalation policies
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
                                    "Not correlating different data types",
                                    "Ignoring business metrics",
                                    "Forgetting about log retention"
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
},

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
   ├─ Network optimization
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
│  ├─ Performance tracing
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
}
};
