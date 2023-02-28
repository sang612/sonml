import AutoIncrement from "mongoose-auto-increment";
import database from "../database.js";
import { emailContactForm } from "../email/mailer.js";

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
	productQuantity: {
		type: Number,
	},
	productPrice: {
		type: Number,
	},
});

const ProposalSchema = new database.Schema(
	{
		shop: {
			type: String,
			required: true,
		},
		// お客様情報 - Customer information
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
		// Product information - 商品情報
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
		budget: {
			type: Number,
		},
		contactHistory: {
			type: String,
		},
		quotation: {
			type: String,
		},
		discerning: {
			type: String,
		},
		files: [
			{
				type: database.Schema.ObjectId,
				ref: "file",
			},
		],
		products: [ProductSchema],
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProposalSchema.virtual("id").get(function () {
	return this._id.toHexString();
});

export const PROPOSAL_ACCEPT_FIELDS = [
	"name",
	"shop",
	"email",
	"customerType",
	"namePhonetic",
	"postCode",
	"district",
	"city",
	"address",
	"phoneNumber",
	"cellPhone",
	"fax",
	"content",
	"supplier",
	"supplierType",
	"purpose",
	"budget",
	"contactHistory",
	"products",
	"discerning",
	"quotation",
];

ProposalSchema.pre("save", function (next) {
	this.wasNew = this.isNew;
	next();
});

ProposalSchema.post("save", function (doc) {
	if (this.wasNew) {
		emailContactForm(
			PROPOSAL_ACCEPT_FIELDS.reduce(
				(obj, key) => ({
					...obj,
					[key]: doc[key],
				}),
				{}
			)
		);
	}
});

const Proposal = database.model("proposal", ProposalSchema);

export default Proposal;
