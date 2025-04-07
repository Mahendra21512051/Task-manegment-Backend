// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const connectDB = require("./config/db");

// const authRoutes = require("./Routes/userRoutes");
// const taskRoutes = require("./Routes/taskRoutes");
// const shareTaskRoutes = require("./Routes/shareTaskRoutes");
// const categoryRoutes = require("./Routes/categoryRoutes");
// const connectionRoutes = require("./Routes/connectionRoutes");

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/clustertaskmanagment/shareTaskmanegment", shareTaskRoutes); 
// app.use("/clustertaskmanagment/connectionmanegment", connectionRoutes);
// app.use("/clustertaskmanagment/categorymanegment", categoryRoutes);
// app.use("/clustertaskmanagment/taskmanegment", taskRoutes);
// app.use("/clustertaskmanagment", authRoutes);

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./Routes/userRoutes");
const taskRoutes = require("./Routes/taskRoutes");
const shareTaskRoutes = require("./Routes/shareTaskRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const connectionRoutes = require("./Routes/connectionRoutes");

const app = express();
connectDB();

// ✅ Allow list for main frontend and dev URLs
const allowedOrigins = [
  "https://task-manegment-frontend.vercel.app",
  "http://localhost:3000"
];

// ✅ Dynamic CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json());

// ✅ Routes
app.use("/clustertaskmanagment/shareTaskmanegment", shareTaskRoutes); 
app.use("/clustertaskmanagment/connectionmanegment", connectionRoutes);
app.use("/clustertaskmanagment/categorymanegment", categoryRoutes);
app.use("/clustertaskmanagment/taskmanegment", taskRoutes);
app.use("/clustertaskmanagment", authRoutes);

// ✅ Error handling middleware (for CORS & others)
app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));

