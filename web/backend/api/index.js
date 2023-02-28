import Express from "express";
import Uploader from "./upload.js";

import Proposal from "./proposal.js";
import ProposalStore from "./proposal.store.js";

import Estimate from "./estimate.js";
import EstimateStore from "./estimate.store.js";

import Kitchen from "./kitchen.js";
import KitchenStore from "./kitchen.store.js";
import verifyshopify from "../../middleware/verify-shopify.js";

const router = Express.Router();

export const apiStoreRequest = (app) => {
  const uploader = new Uploader(router);
  console.log("apiStoreRequest");

  app.get("/api/uploads/:id", uploader.detail);

  app.use("/api/store/file", uploader.router);

  const proposalStore = new ProposalStore(router);
  app.use("/api/store/proposal", proposalStore.router);

  const estimateStore = new EstimateStore(router);
  app.use("/api/store/estimate", estimateStore.router);

  const kitchenStore = new KitchenStore(router);
  app.use("/api/store/kitchen", kitchenStore.router);
};

export default function apiRequest(app) {
  console.log("apiRequest");

  const proposal = new Proposal(app);
  app.use("/api/proposal", verifyshopify(app), proposal.router);

  const estimate = new Estimate(app);
  app.use("/api/estimate", verifyshopify(app), estimate.router);

  const kitchen = new Kitchen(app);
  app.use("/api/kitchen", verifyshopify(app), kitchen.router);

  return router;
}
