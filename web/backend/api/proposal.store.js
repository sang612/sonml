import Express from "express";

import Base from "./base.js";
import ProposalRepository from "../repositories/proposal.js";

export default class Proposal extends Base {
	constructor() {
		super();
		this.router = Express.Router();
		this.router.get("/", this.list);
		this.router.post("/", this.create);
	}

	/**
	 * @desc Proposal list of current shop
	 * @param {object} Request
	 * @param {object} Response
	 * @return {array} List of proposal
	 */

	list = async (req, res) => {
		try {
			console.log("Proposal list of current shop");
			this.handleSuccess(req, res)("NA");
		} catch (e) {
			this.handleSuccess(req, res)(e);
		}
	};

	/**
	 * @desc Create a proposal of current shop
	 * @param {object} Request
	 * @param {object} Response
	 * @return {object} New proposal
	 */

	create = async (req, res) => {
		try {
			console.log("Create a proposal of current shop:", req.query.shop);

			if (!req.query.shop) {
				throw new Error("Shop is required");
			}

			const data = await ProposalRepository.create(req.query.shop, req.body);

			console.log(req.body);
			console.log(data);

			this.handleSuccess(req, res)(data);
		} catch (e) {
			console.log("Error:", e);
			this.handleFailure(req, res)(e);
		}
	};
}
