import path from "path";
import nodemailer from "nodemailer";
import express from "express";
import { fileURLToPath } from "url";
import hbs from "nodemailer-express-handlebars";

import { PROPOSAL_MAP_FIELDS } from "../models/mapping/proposal.js";
import { KITCHEN_MAP_FIELDS } from "../models/mapping/kitchen.js";
import { ESTIMATE_MAP_FIELDS } from "../models/mapping/estimate.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewPath = path.resolve(__dirname, "./templates/views/");
const partialsPath = path.resolve(__dirname, "./templates/partials");

class Mailer {
  constructor() {
    this.admin = process.env.SMTP_ADMIN;
    this.sender = process.env.SMTP_USERNAME;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extName: ".handlebars",
          layoutsDir: viewPath,
          defaultLayout: false,
          partialsDir: partialsPath,
          express,
        },
        viewPath: viewPath,
        extName: ".handlebars",
      })
    );
  }

  sendMail = (mailOptions) => {
    console.log("Send email:", mailOptions);

    this.transporter.sendMail(
      {
        ...mailOptions,
        from: this.sender,
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  };

  customer = (to, formData, fields = PROPOSAL_MAP_FIELDS) => {
    this.sendMail({
      to,
      subject: "お問い合わせいただきありがとうございます",
      context: {
        formData: Object.entries(formData)
          .map(([key, value]) => ({
            key,
            value,
            name: fields[key],
          }))
          .filter((v) => v.name),
      },
      template: "contact-form",
    });
  };

  adminEmail = (formData, fields = PROPOSAL_MAP_FIELDS) => {
    this.sendMail({
      to: this.admin,
      subject: "お問い合わせがありました",
      context: {
        formData: Object.entries(formData)
          .map(([key, value]) => ({
            key,
            value,
            name: fields[key],
          }))
          .filter((v) => v.name),
      },
      template: "contact-form-admin",
    });
  };

  contactForm = (to, formData) =>
    this.customer(to, formData, PROPOSAL_MAP_FIELDS);

  contactFormAdmin = (formData) =>
    this.adminEmail(formData, PROPOSAL_MAP_FIELDS);

  kitchenForm = (to, formData) =>
    this.customer(to, formData, KITCHEN_MAP_FIELDS);

  kitchenFormAdmin = (formData) =>
    this.adminEmail(formData, KITCHEN_MAP_FIELDS);

  estimateForm = (to, formData) =>
    this.customer(to, formData, ESTIMATE_MAP_FIELDS);

  estimateFormAdmin = (formData) =>
    this.adminEmail(formData, ESTIMATE_MAP_FIELDS);
}

export default new Mailer();
