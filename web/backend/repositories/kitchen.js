import { handlePagination } from "../utils/handlePagination.js";
import Kitchen, { KITCHEN_ACCEPT_FIELDS } from "../models/kitchen.js";

export default class KitchenRepository {
  /**
   * Finds the Kitchen and all its relations.
   *
   * @param {Object} query.filter
   */
  static async findBy(filter) {
    return Kitchen.findOne({ ...filter, estimateType: "kitchen" });
  }

  /**
   * Finds the user and all its relations.
   *
   * @param {string} id
   */
  static async findById(id) {
    return Kitchen.findById(id).populate("files");
  }

  /**
   * Finds the Kitchen based on the query.
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

    const total = await Kitchen.count(criteria);

    const list = await Kitchen.find(criteria)
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
   * Create a Kitchen.
   */
  static async create(shop, data) {
    const formData = Object.entries(data).reduce((formdata, [key, value]) => {
      if (KITCHEN_ACCEPT_FIELDS.includes(key)) {
        formdata[key] = value;
      }

      return formdata;
    }, {});

    const instance = await Kitchen.create({
      ...formData,
      shop,
      estimateType: "kitchen",
    });

    return this.findById(instance.id);
  }

  /**
   * Update a Kitchen.
   */
  static async update(id, data) {
    await Kitchen.updateOne({ _id: id }, data);

    return this.findById(id);
  }
}
