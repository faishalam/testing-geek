// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  if (err.name === "notFound") {
    return res.status(404).json({ message: "Resource not found" });
  }
  if (err.name === "Forbidden") {
    return res.status(403).json({ message: "You do not have permission" });
  }
  if (err.name === "ProductNotFound" || err.name === "UserNotFound") {
    return res.status(404).json({ message: "Not found" });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      message: err.errors.map((e) => e.message).join(", "),
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      message: err.errors.map((e) => e.message).join(", "),
    });
  }

  if (err.name === "ResourceNotFound") {
    return res.status(404).json({
      message: err.message || "Resource not found",
    });
  }

  console.error(err);
  return res.status(500).json({
    message: "Internal server error. Please try again later.",
  });
}

module.exports = errorHandler;
