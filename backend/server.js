import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

dotenv.config();
connectDB();
app.use(express.json());

// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find((x) => x._id === productId);
//   if (product) res.send(product);
//   else res.status(404).send({ msg: "Product Not Found." });
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server ${process.env.NODE_ENV} port ${PORT}`));
