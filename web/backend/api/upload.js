import Express from "express";
import { readFileSync } from "fs";
import { uploader, UPLOAD_DEST } from "../services/uploader.js";
import FileRepository from "../repositories/file.js";

import Base from "./base.js";
import { join } from "path";

export default class Upload extends Base {
  constructor() {
    super();
    this.router = Express.Router();
    this.router.post("/", uploader.array("files", 5), this.create);
    this.router.get("/:id", this.detail);
  }

  /**
   * @desc Upload file list of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {array} List of Upload file
   */

  create = async (req, res) => {
    try {
      const files = req.files;
      console.log("Upload file list of current shop:");
      const rs = await FileRepository.creates(req.body, files);
      this.handleSuccess(req, res)(rs);
    } catch (e) {
      this.handleSuccess(req, res)(e);
    }
  };

  /**
   * @desc Upload file list of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {array} List of Upload file
   */

  detail = async (req, res) => {
    try {
      console.log("Upload file of current shop:", req.params.id);
      const rs = await FileRepository.findBy({ filename: req.params.id });
      console.log(
        join(UPLOAD_DEST, rs.path).replace("/uploads/uploads", "/uploads")
      );
      res.send(
        readFileSync(
          join(UPLOAD_DEST, rs.path).replace("/uploads/uploads", "/uploads")
        )
      );
    } catch (e) {
      console.log(e);
      res.status(404).send("File Not Found");
    }
  };
}
