import Express from "express";
import { Shopify } from "@shopify/shopify-api";

import Base from "./base.js";
import ProposalRepository from "../repositories/proposal.js";
import customerCreator from "../../helpers/customer-creator.js";
import "@shopify/shopify-api/dist/rest-resources/2022-10/index.js";
import draftOrderCreator from "../../helpers/draft-order-creator.js";
export default class Proposal extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.router = Express.Router();
    this.router.get("/", this.list);
    this.router.put("/:id", this.update);
    this.router.post("/:id", this.create);
  }

  /**
   * @desc Proposal list of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {array} List of proposal
   */

  list = async (req, res) => {
    try {
      const data = await ProposalRepository.findAll(req.query);

      this.handleSuccess(req, res)(data);
    } catch (e) {
      console.log(e);
      this.handleSuccess(req, res)([]);
    }
  };

  /**
   * @desc Create a order of current proposal
   * @param {object} Request
   * @param {object} Response
   * @return {object} New Order
   */

  create = async (req, res) => {
    try {
      const data = await ProposalRepository.findById(req.params.id);

      const session = await Shopify.Utils.loadCurrentSession(
        req,
        res,
        this.app.get("use-online-tokens")
      );

      let products = data.products;

      if (!products.length) {
        throw new Error("No products in order");
      }

      const rs = await draftOrderCreator(session, {
        email: data.email,
        lineItems: data.products.map((product) => ({
          quantity: product.productQuantity || 1,
          title: product.productName,
          originalUnitPrice: product.productPrice,
        })),
      });

      this.handleSuccess(
        req,
        res
      )(rs?.body?.data?.draftOrderCreate?.draftOrder);
    } catch (e) {
      console.log("Create order from proposal error:", e);
      this.handleSuccess(req, res)(e);
    }
  };

  /**
   * @desc Update a proposal of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {object} Update proposal
   */

  update = async (req, res) => {
    try {
      const data = await ProposalRepository.update(req.params.id, req.body);
      this.handleSuccess(req, res)(data);
    } catch (e) {
      this.handleSuccess(req, res)([]);
    }
  };
}
