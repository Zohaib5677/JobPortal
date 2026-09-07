Chapter 3 — Choosing Your Stack
Part A — The Decision
1. My Stack
Language — TypeScript:
 I chose TypeScript because it catches common mistakes before the program runs. I trade a little simplicity for better safety.
Web Framework — Express:
 I chose Express because it is simple and gives me direct control over routes and middleware. I trade some built-in features for simplicity and flexibility.
Database — PostgreSQL:
 PostgreSQL is the given database for this project. It is reliable and works well with relational data such as users, companies, jobs, and applications.As there is lot of relational data so it is best choice.
Database Access — Prisma:
 I chose Prisma because it provides a typed database client and makes database operations easier. I trade some direct control over SQL.
Validation — Zod:
 I chose Zod because it checks real data coming from users at runtime. I trade a small amount of extra code for safer APIs.
Redis:
 Redis is used for caching and as the backend for the job queue.
BullMQ:
 BullMQ handles slow tasks in the background, such as sending emails and processing résumés.
S3-compatible storage:
 It stores files such as résumés instead of storing them directly in PostgreSQL.
2. The Pick I Debated Most

The database-access choice was the closest between Prisma and Drizzle. I chose Prisma because it is easy to use and provides good TypeScript support.

Part B
3. TypeScript vs JavaScript

Suppose an application expects answerCount to be a number, but I accidentally pass "3" as text. TypeScript can catch this before the application runs, while JavaScript may allow it and cause a problem later.

4. Why Express?

Express is simpIle and makes the request path clear. For example, app.get('/jobs', listJobs) clearly shows that a GET request to /jobs calls listJobs. Middleware can also handle things like authentication before the request reaches the route.

5. Database-Access Spectrum
Raw SQL: I write SQL myself. I get maximum control but more work.
Query Builder: I build SQL using TypeScript functions. It is easier while still being close to SQL.
ORM: I work with objects and the ORM creates SQL for me.

A full ORM can hide the N+1 problem, where one database query accidentally becomes many queries. For example, loading 100 jobs and making another query for each company's information.

6. Runtime Validation

TypeScript types exist only during development/compile time and disappear when the program runs. They cannot check what a user actually sends to the API.

Zod checks the real incoming data at runtime. For example, it can reject "three" when answerCount must be a number.

7. Redis's Double Duty

Redis has two jobs:

Cache — stores frequently used data for faster access.
Job queue support — works with BullMQ to handle background jobs.