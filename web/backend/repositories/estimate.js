import { ESTIMATION_ACCEPT_FIELDS } from "../models/mapping/estimate.js";
import Estimate from "../models/kitchen.js";

export default class EsitmateRepository {
  /**
   * Finds the Estimate and all its relations.
   *
   * @param {Object} query.filter
   */
  static async findBy(filter) {
    return Estimate.findOne({ ...filter, estimateType: "estimate" });
  }

  /**
   * Finds the user and all its relations.
   *
   * @param {string} id
   */
  static async findById(id) {
    return Estimate.findById(id);
  }

  /**
   * Finds the Estimate based on the query.
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

    const total = await Estimate.count(criteria);

    const list = await Estimate.find(criteria)
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
   * Create a Estimate.
   */
  static async create(shop, data) {
    const formData = Object.entries(data).reduce((formdata, [key, value]) => {
      if (ESTIMATION_ACCEPT_FIELDS.includes(key)) {
        formdata[key] = value;
      }

      return formdata;
    }, {});

    const instance = await Estimate.create({
      ...formData,
      shop,
      estimateType: "estimate",
    });

    return this.findById(instance.id);
  }

  /**
   * Update a Estimate.
   */
  static async update(id, data) {
    await Estimate.updateOne({ _id: id }, data);

    return this.findById(id);
  }
}
