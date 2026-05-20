const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

/* ================= AVATARS ================= */

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
});

/* ================= RECEIPTS ================= */

const receiptStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "receipts",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const receiptUpload = multer({
  storage: receiptStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = {
  avatarUpload,
  receiptUpload,
};