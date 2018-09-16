function parseBody() {
  return function(request, response, next) {
    var data = "";
    request.on("data", function(chunk) {
      data += chunk;
    });
    request.on("end", function() {
      request.rawBody = data;
      if (request.is("application/json")) {
        try {
          request.jsonBody = JSON.parse(data);
        } catch (e) {}
      }
      next();
    });
  }
}

module.exports = parseBody;
