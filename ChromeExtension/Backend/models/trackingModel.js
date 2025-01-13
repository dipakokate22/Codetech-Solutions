const db = require("../database");

module.exports = {
  logWebsite: (website, duration, callback) => {
    const query = "INSERT INTO tracking (website, duration) VALUES (?, ?)";
    db.query(query, [website, duration], callback);
  },
  getReport: (callback) => {
    const query = "SELECT website, SUM(duration) AS duration FROM tracking GROUP BY website";
    db.query(query, callback);
  },
};
