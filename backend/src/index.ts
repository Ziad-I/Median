import { ENV } from "./config/env";
import connectDB from "./config/db";
import { app } from "./server";

// Connect to the database
// connectDB();

// Start the server
app.listen(ENV.BACKEND_PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${ENV.BACKEND_PORT}`
  );
});
