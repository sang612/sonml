import { Shopify } from "@shopify/shopify-api";
import { ShopifyBillingError } from "../helpers/ensure-billing.js";
import redirectToAuth from "../helpers/redirect-to-auth.js";

import returnTopLevelRedirection from "../helpers/return-top-level-redirection.js";

export default function verifyshopify(app) {
  return async (req, res, next) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );

    let shop = Shopify.Utils.sanitizeShop(req.query.shop);
    if (session && shop && session.shop !== shop) {
      // The current request is for a different shop. Redirect gracefully.
      return redirectToAuth(req, res, app);
    }

    req.query = req.query || {};

    if (session?.isActive()) {
      try {
        req.query.shop = session.shop;
        return next();
      } catch (e) {
        if (
          e instanceof Shopify.Errors.HttpResponseError &&
          e.response.code === 401
        ) {
          // Re-authenticate if we get a 401 response
        } else if (e instanceof ShopifyBillingError) {
          console.error(e.message, e.errorData[0]);
          res.status(500).end();
          return;
        } else {
          throw e;
        }
      }
    }

    returnTopLevelRedirection(
      req,
      res,
      `/api/auth?shop=${encodeURIComponent(shop)}`
    );
  };
}
