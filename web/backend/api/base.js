/**
 * @desc A abstract class for API. Manange check role and handle response
 */

export default class Base {
  handleSuccess = (_, res) => (payload) => {
    res.status(200).json({ payload, success: true });
  };

  handleFailure = (_, res) => (e) => {
    res.status(400).json({
      success: false,
      errors: e.errors
        ? Object.entries(e.errors).reduce(
            (obj, [key, value]) => ({
              ...obj,
              [key]: value?.message,
            }),
            {}
          )
        : e?.message,
    });
  };
}
