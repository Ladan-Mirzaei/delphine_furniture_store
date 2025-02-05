/**
 * Express middleware to add `userInfo` to the request object.
 *
 * @example
 * app.get("/", addUserInfo, (req, res) => {
 *   console.debug(req.userInfo);
 *   // ...
 * });
 *
 * @param {Object} req - The request object.
 * @param {Object} _ - The response object (unused).
 * @param {Function} next - The next middleware function.
 */
export async function addUserInfo(req, _, next) {
  const { payload, token } = req.auth;
  const userInfoUrl = payload.aud[1];
  const userInfo = await fetch(userInfoUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  req.userInfo = await userInfo.json();
  next();
}
