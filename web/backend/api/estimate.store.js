import Express from "express";

import Base from "./base.js";
import EstimateRepository from "../repositories/estimate.js";

export default class Estimate extends Base {
  constructor() {
    super();
    this.router = Express.Router();
    this.router.get("/", this.list);
    this.router.post("/", this.create);
  }

  /**
   * @desc Estimate list of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {array} List of Estimate
   */

  list = async (req, res) => {
    try {
      console.log("Estimate list of current shop");
      this.handleSuccess(req, res)("NA");
    } catch (e) {
      this.handleSuccess(req, res)(e);
    }
  };

  /**
   * @desc Create a Estimate of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {object} New Estimate
   */

  create = async (req, res) => {
    try {
      if (!req.query.shop) {
        throw new Error("Shop is required");
      }

      console.log("Create a Estimate of current shop:", req.query.shop);
      const data = await EstimateRepository.create(req.query.shop, req.body);
      this.handleSuccess(req, res)(data);
    } catch (e) {
      console.log("Error:", e);
      this.handleFailure(req, res)(e);
    }
  };
}
