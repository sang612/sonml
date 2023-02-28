import Express from "express";
import { Shopify } from "@shopify/shopify-api";
import Base from "./base.js";
import KitchenRepository from "../repositories/kitchen.js";
import draftOrderCreator from "../../helpers/draft-order-creator.js";

export default class Kitchen extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.router = Express.Router();
    this.router.get("/", this.list);
    this.router.put("/:id", this.update);
    this.router.post("/:id", this.create);
  }

  /**
   * @desc Kitchen list of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {array} List of Kitchen
   */

  list = async (req, res) => {
    try {
      const data = await KitchenRepository.findAll(req.query);
      this.handleSuccess(req, res)(data);
    } catch (e) {
      this.handleSuccess(req, res)([]);
    }
  };

  /**
   * @desc Create a order of current kitchen
   * @param {object} Request
   * @param {object} Response
   * @return {object} New Order
   */

  create = async (req, res) => {
    try {
      const data = await KitchenRepository.findById(req.params.id);

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
          title: product.productName || "NA",
          originalUnitPrice: product.productPrice || 0,
        })),
      });

      console.log("New Order:", rs?.body?.data?.draftOrderCreate);

      this.handleSuccess(
        req,
        res
      )(rs?.body?.data?.draftOrderCreate?.draftOrder);
    } catch (e) {
      console.log("Create order from kitchen error:", e);
      this.handleSuccess(req, res)(e);
    }
  };

  /**
   * @desc Update a kitchen of current shop
   * @param {object} Request
   * @param {object} Response
   * @return {object} Update kitchen
   */

  update = async (req, res) => {
    try {
      const data = await KitchenRepository.update(req.params.id, req.body);
      this.handleSuccess(req, res)(data);
    } catch (e) {
      this.handleSuccess(req, res)([]);
    }
  };
}
