import Express from "express";

import Base from "./base.js";
import KitchenRepository from "../repositories/kitchen.js";

export default class Kitchen extends Base {
  constructor() {
    super();
    this.router = Express.Router();
    this.router.get("/", this.list);
    this.router.post("/", this.create);
  }

  /**
   * @desc Kitchen list of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {array} List of Kitchen
   */

  list = async (req, res) => {
    try {
      console.log("Kitchen list of current shop");
      this.handleSuccess(req, res)("NA");
    } catch (e) {
      this.handleSuccess(req, res)(e);
    }
  };

  /**
   * @desc Create a Kitchen of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {object} New Kitchen
   */

  create = async (req, res) => {
    try {
      if (!req.query.shop) {
        throw new Error("Shop is required");
      }

      console.log("Create a Kitchen of current shop:", req.query.shop);
      const data = await KitchenRepository.create(req.query.shop, req.body);
      this.handleSuccess(req, res)(data);
    } catch (e) {
      console.log("Error:", e);
      this.handleFailure(req, res)(e);
    }
  };
}
