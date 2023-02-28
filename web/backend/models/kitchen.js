import AutoIncrement from "mongoose-auto-increment";
import database from "../database.js";
import { emailEstmateForm, emailKitchenForm } from "../email/mailer.js";
import { ESTIMATION_ACCEPT_FIELDS } from "./mapping/estimate.js";

AutoIncrement.initialize(database.connection);

const ProductSchema = new database.Schema({
  factoryName: {
    type: String,
  },
  productCode: {
    type: String,
  },
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
  },
  productQuantity: {
    type: String,
  },
});

const KitchenSchema = new database.Schema(
  {
    shop: {
      type: String,
      required: true,
    },
    estimateType: {
      type: String,
      required: true,
      enum: ["estimate", "kitchen"],
    },
    products: [ProductSchema],
    discerning: {
      type: String,
    },
    // システムキッチン情報
    houseType: {
      type: String,
      required: [
        function () {
          return this.estimateType === "kitchen";
        },
        "House Type is required",
      ],
    },
    floors: {
      type: Number,
      required: [
        function () {
          return this.estimateType === "kitchen";
        },
        "Floor is required",
      ],
    },
    layout: {
      type: String,
    },
    layoutBehind: {
      type: String,
    },
    kitchenwide: {
      type: Number,
      required: [
        function () {
          return this.estimateType === "kitchen";
        },
        "Kitchen Wide is required",
      ],
    },
    cabinetType: {
      type: String,
    },
    cabinetColor: {
      type: String,
    },
    doorType: {
      type: String,
    },
    hangingCabinet: {
      type: Boolean,
    },
    light: {
      type: Boolean,
    },
    antiEarthquakeLatch: {
      type: Boolean,
    },
    counterMaterial: {
      type: String,
    },
    counterHeight: {
      type: Number,
    },
    sinkMaterial: {
      type: String,
    },
    sinkPosition: {
      type: Boolean,
    },
    tapType: {
      type: String,
    },
    specType: {
      type: String,
    },
    waterPurifier: {
      type: String,
    },
    stoveType: {
      type: String,
    },
    stoveColor: {
      type: String,
    },
    ovenType: {
      type: String,
    },
    kitchenHoodType: {
      type: String,
    },
    kitchenHoodColor: {
      type: String,
    },
    dishwasherType: {
      type: Boolean,
    },
    dishwasherColor: {
      type: String,
    },
    dishwasherSegment: {
      type: String,
    },
    kitchenPanelType: {
      type: String,
    },
    kitchenPanelColor: {
      type: String,
    },
    tapPoistionMoment: {
      type: String,
    },
    stovePoistionMoment: {
      type: String,
    },
    kitchenHoodPoistionMoment: {
      type: String,
    },
    dishwasherPoistionMoment: {
      type: String,
    },
    contentType: {
      type: String,
    },
    note: {
      type: String,
    }, // お客様情報 - Customer information
    customerType: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    companyNamePhonetic: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    namePhonetic: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    cellPhone: {
      type: String,
    },
    fax: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    // Other information - その他の情報
    quoteType: {
      type: String,
    },
    supplier: {
      type: String,
    },
    supplierType: {
      type: String,
    },
    purpose: {
      type: String,
      required: true,
    },
    quotation: {
      type: String,
    },
    discerning: {
      type: String,
    },
    content: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    estimateDate: {
      type: String,
    },
    budget: {
      type: Number,
    },
    contactHistory: {
      type: String,
    },
    quotation: {
      type: String,
    },
    files: [
      {
        type: database.Schema.ObjectId,
        ref: "file",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

KitchenSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const KITCHEN_ACCEPT_FIELDS = [
  "shop",
  "files",
  "products",
  "discerning",
  "houseType",
  "floors",
  "layout",
  "layoutBehind",
  "kitchenwide",
  "cabinetType",
  "cabinetColor",
  "doorType",
  "hangingCabinet",
  "light",
  "antiEarthquakeLatch",
  "counterMaterial",
  "counterHeight",
  "sinkMaterial",
  "sinkPosition",
  "tapType",
  "specType",
  "waterPurifier",
  "stoveType",
  "stoveColor",
  "ovenType",
  "kitchenHoodType",
  "kitchenHoodColor",
  "dishwasherType",
  "dishwasherColor",
  "dishwasherSegment",
  "kitchenPanelType",
  "kitchenPanelColor",
  "tapPoistionMoment",
  "stovePoistionMoment",
  "kitchenHoodPoistionMoment",
  "dishwasherPoistionMoment",
  "contentType",
  "note",
  "customerType",
  "companyName",
  "companyNamePhonetic",
  "name",
  "namePhonetic",
  "email",
  "postCode",
  "district",
  "city",
  "address",
  "phoneNumber",
  "cellPhone",
  "fax",
  "content",
  "quoteType",
  "supplier",
  "supplierType",
  "purpose",
  "quotation",
  "discerning",
  "content",
  "paymentMethod",
  "estimateDate",
  "budget",
  "contactHistory",
  "quotation",
];

KitchenSchema.pre("save", function (next) {
  this.wasNew = this.isNew;
  next();
});

KitchenSchema.post("save", function (doc) {
  if (this.wasNew) {
    switch (doc.estimateType) {
      case "estimate": {
        emailEstmateForm(
          ESTIMATION_ACCEPT_FIELDS.reduce(
            (obj, key) => ({
              ...obj,
              [key]: doc[key],
            }),
            {}
          )
        );
      }
      case "kitchen": {
        emailKitchenForm(
          KITCHEN_ACCEPT_FIELDS.reduce(
            (obj, key) => ({
              ...obj,
              [key]: doc[key],
            }),
            {}
          )
        );
      }
    }
  }
});

const Kitchen = database.model("kitchen", KitchenSchema);

export default Kitchen;
