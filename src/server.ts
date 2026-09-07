import { buildApp }from "./app.js";

const app = buildApp();

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});