const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3001;

require("dotenv").config();

// MongoDB bağlantısı
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog";
mongoose.set("debug", true);
mongoose
  .connect(mongoURI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Connection error:", err);
    // More detailed error logging
    if (err.code) console.error("Error code:", err.code);
  });

// Blog şeması ve modeli
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    detail: { type: String, required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer ayarları
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Blog ekleme endpoint'i
app.post("/api/blogs", upload.single("image"), (req, res) => {
  const { title, summary, detail } = req.body;
  const slug = title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
  const image = req.file ? `/uploads/${req.file.filename}` : "";

  const newBlog = new Blog({
    title,
    slug,
    summary,
    detail,
    image,
  });

  newBlog
    .save()
    .then((blog) => res.status(201).json(blog))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Blog yazısını güncelleme
app.put("/api/blogs/:id", upload.single("image"), async (req, res) => {
  try {
    const slug = req.body.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const updateData = {
      title: req.body.title,
      slug: slug,
      summary: req.body.summary,
      detail: req.body.detail,
      isActive: req.body.isActive,
    };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).send(updatedBlog);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/api/blogs/:id/toggle-status", async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to update blog status" });
  }
});

// Blog yazılarını alma (sadece aktif olanları)
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({ isActive: true });
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Tüm blog yazılarını alma (admin için)
app.get("/api/admin/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Blog yazısını silme
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = Blog;
