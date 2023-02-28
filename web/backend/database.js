import mongoose from "mongoose";

mongoose.stateEntry = {
  type: String,
  enum: ["LOCKED", "ACTIVATE", "PROGRESS", "COMPLETE"],
  default: "LOCKED",
};

mongoose.set("strictQuery", true);

/**
 * Initializes the connection to MongoDB
 */
export const databaseinit = async () => {
  /**
   * If the connection is already established,
   * returns the mongoose instance.
   */
  if (mongoose.connection.readyState) {
    return mongoose;
  }

  /**
   * Connects to MongoDB
   */
  return mongoose
    .connect(process.env.DATABASE_URI || "mongodb://localhost/waocon-shopify", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((r) => {
      console.log(
        `MongoDB connected: host=${r.connections[0].host}, db=${r.connections[0].name}, port=${r.connections[0].port}, user=${r.connections[0].user}`
      );
    })
    .then(() => mongoose);
};

/**
 * Before each request it checks if the connection is established,
 * if not, connects.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const middleware = async (req, res, next) => {
  try {
    await init();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
    return;
  }

  return next();
};

export default mongoose;
