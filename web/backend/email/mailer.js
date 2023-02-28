import nodemailer from "./nodemailer.js";

export const sendEmail = nodemailer.sendMail;

export const emailContactForm = (formData) => {
  delete formData.shop;
  delete formData.products;
  nodemailer.contactForm(formData.email, formData);
  nodemailer.contactFormAdmin(formData);
};

export const emailEstmateForm = (formData) => {
  delete formData.shop;
  delete formData.products;
  nodemailer.estimateForm(formData.email, formData);
  nodemailer.estimateFormAdmin(formData);
};

export const emailKitchenForm = (formData) => {
  delete formData.shop;
  delete formData.products;
  nodemailer.kitchenForm(formData.email, formData);
  nodemailer.kitchenFormAdmin(formData);
};
