import { getDataSource } from "./AppDataSource";

const initializeApp = async () => {
  try {
    await getDataSource();
    console.log("Application initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize the application:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  const con = await getDataSource();
  if (con.isInitialized) {
    await con.destroy();
    console.log("Database connection closed.");
  }
  process.exit(0);
});

initializeApp();
