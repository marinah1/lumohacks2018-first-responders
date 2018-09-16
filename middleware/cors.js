function cors() {
  return function(request, response, next) {
    /**
     *  Allow requests any origin (eg. localhost, null)
     *  - Unable to use wildcard `*` b/c `Access-Control-Allow-Credential` is set as `true`
     *  - For HTML pages loaded from file-system (file://...), request.origin is always "null"
     */
    var requestOrigin = request.get("origin");
    response.setHeader("Access-Control-Allow-Origin", requestOrigin);
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Authorization"
    );
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );

    next();
  };
}

module.exports = cors;
