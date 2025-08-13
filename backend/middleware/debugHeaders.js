module.exports = function (req, res, next) {
  console.log("===== DEBUG HEADERS =====");
  console.log(req.method, req.originalUrl);
  console.log("All Headers:", req.headers);

  console.log("req.get('Authorization'):", req.get("Authorization"));
  console.log("req.headers['authorization']:", req.headers["authorization"]);
  console.log("req.headers['Authorization']:", req.headers["Authorization"]);

  console.log("Body:", req.body);
  console.log("==========================");
  next();
};
