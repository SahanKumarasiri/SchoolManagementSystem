const router = require("express").Router();
const {getAllBooks , getBookById} = require("../controllers/book");


router.route("/").get(getAllBooks);
router.route("/:id").get(getBookById);

module.exports = router;