import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server ${process.env.NODE_ENV} port ${PORT}`));
