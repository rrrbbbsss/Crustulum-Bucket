const { Paste } = require("../models");

const PASTE_PERIOD =
  parseInt(process.env.PASTE_PERIOD) * 60 * 1000 || 1000 * 60 * 60 * 24;

const cleanerFunc = async () => {
  console.log("running cleanup");
  try {
    await Paste.deleteMany({
      created: { $lte: new Date(Date.now() - PASTE_PERIOD) },
    });
  } catch (err) {
    console.log("cleaner error:\n");
    console.log(err);
    console.log("\n");
  }
};

const cleaner = () => {
  // run at startup
  cleanerFunc();
  setTimeout(() => {
    // run at start of next minute
    cleanerFunc();
    // start intervals every minute
    setInterval(cleanerFunc, 60 * 1000);
  }, 1000 * 60 - (Date.now() % (1000 * 60)));
};

module.exports = { cleaner };
