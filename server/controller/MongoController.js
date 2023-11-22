const MongoRepo = require("../repository/MongoRepository");

class MongoController {
  constructor() {
    this.mongoRepo = new MongoRepo();
  }

  async getReviewsFromDatabase(res, item) {
    try {
      const rows = await this.mongoRepo.selectReview();
      res.status(200).send(rows[item.productName]?rows[item.productName]:[]);
    } catch (error) {
      console.error("Error executing query:", error.message);
      res.status(500).send("Error executing query");
    }
  }

  async setReviewsToDatabase(res, item) {
    try {
      const rows = await this.mongoRepo.insertReview(
        item.productName,
        item.productType,
        item.productPrice,
        item.productMaker,
        item.manufacturerRebate,
        item.storeID,
        item.retailerPin,
        item.retailerCity,
        item.retailerState,
        item.productOnSale,
        item.userAge,
        item.userGender,
        item.userOccupation,
        item.reviewRating,
        item.reviewDate,
        item.reviewText,
        item.username

      );
      res.status(200).send(rows[item.productName]?rows[item.productName]:[]);
    } catch (error) {
      console.error("Error executing query:", error.message);
      res.status(500).send("Error executing query");
    }
  }
}
module.exports = MongoController;
