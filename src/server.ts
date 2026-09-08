import { buildApp }from "./app.js";
import { config } from './shared/config.js';
const app = buildApp();

app.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${config.PORT}`);
});