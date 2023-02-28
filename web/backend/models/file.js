import AutoIncrement from "mongoose-auto-increment";
import database from "../database.js";
import { UPLOAD_DEST } from "../services/uploader.js";

AutoIncrement.initialize(database.connection);

const FileSchema = new database.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { getters: false },
    toJSON: { getters: false },
  }
);

FileSchema.pre("save", function (next) {
  this.path = this.path?.replace(UPLOAD_DEST, "/uploads");

  next();
});

FileSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

const File = database.model("file", FileSchema);

export default File;
