/**
 * Checks if the database if theres a USER that has the same token value
 * @param {*} db - database instance
 * @param {*} query - MongoDB find() query object
 */
function findUser(db, query) {
  return db
    .collection("users")
    .find(query)
    .toArray();
}

/**
 * Set response status to 401 & set invalid token message
 * @param {*} response
 */
function sendInvalidTokenResponse(response) {
  response.status(401);
  response.json({
    status: "401",
    message: "Authorization header is missing or invalid"
  });
}

/**
 * Checks if token provided in request header is valid
 * @param {*} db - database instance
 */
function verifyToken(db) {
  return function(request, response, next) {
    // Don't check token for OPTIONS requests
    if (request.method === "OPTIONS") {
      next();
      return;
    }

    var auth = request.get("Authorization") || "";
    var bearer = auth.split(" ")[0];
    var token = auth.split(" ")[1];

    // Check if `Authorization` header is in valid format: `Bearer <TOKEN>`
    if (bearer !== "Bearer" || token === undefined) {
      sendInvalidTokenResponse(response);
      return;
    }

    findUser(db, { token: token })
      .catch(function(err) {
        console.log(err);
        response.status(500);
        response.json({
          status: "500",
          message: `Something went wrong - ${err}`
        });
      })
      .then(function(result) {
        if (result.length > 0) {
          next();
        } else {
          sendInvalidTokenResponse(response);
        }
      });
  };
}

module.exports = verifyToken;
