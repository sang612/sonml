import { handlePagination } from "../utils/handlePagination.js";
import Proposal, { PROPOSAL_ACCEPT_FIELDS } from "../models/proposal.js";
export default class ProposalRepository {
  /**
   * Finds the proposal and all its relations.
   *
   * @param {Object} query.filter
   */
  static async findBy(filter) {
    return Proposal.findOne(filter);
  }

  /**
   * Finds the user and all its relations.
   *
   * @param {string} id
   */
  static async findById(id) {
    return Proposal.findById(id).populate("files");
  }

  /**
   * Finds the proposal based on the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.page
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAll({ q, shop, filter, orderBy, ...query }) {
    let sort = {};
    let criteria = { shop };

    if (filter && filter.shop) {
      criteria = {
        ...criteria,
        shop: filter.shop,
      };
    }

    if (!!q) {
      criteria = {
        $and: [
          criteria,
          {
            $or: [
              { name: { $regex: q, $options: "i" } },
              { email: { $regex: q, $options: "i" } },
            ],
          },
        ],
      };
    }

    const orders = (orderBy || "createdAt_DESC").split("_");

    if (orders[1] === "ASC") {
      sort[orders[0]] = 1;
    } else {
      sort[orders[0]] = -1;
    }

    const { limit, skip, page } = handlePagination(query.limit, query.page);

    const total = await Proposal.count(criteria);

    const list = await Proposal.find(criteria)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate("files");

    return {
      data: list,
      meta: {
        limit,
        page,
        total,
      },
    };
  }

  /**
   * Create a proposal.
   */
  static async create(shop, data) {
    const formData = Object.entries(data).reduce((formdata, [key, value]) => {
      if (PROPOSAL_ACCEPT_FIELDS.includes(key)) {
        formdata[key] = value;
      }

      return formdata;
    }, {});

    console.log("formData:", formData);

    const proposal = await Proposal.create({ ...formData, shop });

    return this.findById(proposal.id);
  }

  /**
   * Update a proposal.
   */
  static async update(id, data) {
    await Proposal.updateOne({ _id: id }, data);

    return this.findById(id);
  }
}
