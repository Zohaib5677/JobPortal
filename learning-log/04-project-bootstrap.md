Chapter 4 — Project Bootstrap
1. Which folder structure did you choose, and why?
I chose a feature/module-based structure because it keeps related code together. My project has separate modules for authentication, companies, jobs, applications, applicants, and admin.
In a feature-based structure, everything related to jobs is together, so it is easier to find and maintain.

In a layer-based structure, I might have:
Then the job-related files would be spread across different folders. As the project becomes larger, this can make it harder to find everything related to one feature.
That is why I chose feature/module-based structure.

2. Why keep TypeScript strict mode on?

I keep "strict": true because it makes TypeScript check my code more carefully.
Strict mode helps me find mistakes early instead of discovering them later while the application is running.

3. Development vs production
In development, I use:
npm run dev
This runs my TypeScript code directly using tsx and watches for changes. When I change the code, the server can reload automatically.
In production, I first compile TypeScript:
npm run build
This creates JavaScript files inside dist/.
Then:
npm start
runs the compiled JavaScript using Node.js.
4. Why split app.ts from server.ts?
I keep app.ts and server.ts separate because they have different responsibilities.
app.ts creates and configures the Express application and defines routes.
server.ts starts the server and listens on a port.
For example:

app.ts    → create/configure Express app
server.ts → app.listen(...)

This is useful for testing because I can import the Express app without automatically starting a real server.
