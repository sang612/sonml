import { handlePagination } from "../utils/handlePagination.js";
import File from "../models/file.js";
import Proposal from "../models/proposal.js";
import Kitchen from "../models/kitchen.js";

const Tables = {
  proposal: Proposal,
  kitchen: Kitchen,
  estimate: Kitchen,
};

export default class FileRepository {
  /**
   * Finds the File and all its relations.
   *
   * @param {Object} query.filter
   */
  static async findBy(filter) {
    return File.findOne(filter);
  }

  /**
   * Finds the user and all its relations.
   *
   * @param {string} id
   */
  static async findById(id) {
    return File.findById(id);
  }

  /**
   * Finds the File and all its relations.
   *
   * @param {Object} query.filter
   */
  static async findById(id) {
    return File.findOne({ id });
  }

  /**
   * Finds the File based on the query.
   *
   * @param {Object} query
   * @param {Object} query.filter
   * @param {number} query.limit
   * @param  {number} query.page
   * @param  {string} query.orderBy
   *
   * @returns {Promise<Object>} response - Object containing the rows and the count.
   */
  static async findAll({ filter, orderBy, ...query }) {
    let sort = {};
    let criteria = {};

    if (filter && filter.shop) {
      criteria = {
        ...criteria,
        shop: filter.shop,
      };
    }

    const orders = (orderBy || "createdAt_DESC").split("_");

    if (orders[1] === "ASC") {
      sort[orders[0]] = 1;
    } else {
      sort[orders[0]] = -1;
    }

    const { limit, skip, page } = handlePagination(query.limit, query.page);

    return File.find(criteria).sort(sort).limit(limit).skip(skip);
  }

  /**
   * Create a File.
   */
  static async create(data) {
    console.log("data:", data);

    const file = await File.create(data);

    return this.findById(file.id);
  }

  /**
   * Create File list.
   */
  static async creates(body = {}, files) {
    const table = Tables[body.table] || Proposal;
    const instance = await table.findById(body.id);

    if (!instance) {
      throw new Error("Table or item not exist");
    }

    const rs = await File.create(files);

    await table.updateMany(
      {
        _id: instance.id,
      },
      { files: rs.map((v) => v.id) }
    );

    return rs;
  }

  /**
   * Update a File.
   */
  static async update(id, data) {
    await File.updateOne({ _id: id }, data);

    return this.findById(id);
  }
}
