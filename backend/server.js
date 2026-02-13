import { PORT } from "./config.js";
import app from "./src/app.js";

app.listen(PORT, () => {
  console.log(`IncidentTracker API running on http://localhost:${PORT}`);
});
