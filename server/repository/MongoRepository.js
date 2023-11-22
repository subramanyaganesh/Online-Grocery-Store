const { MongoClient } = require("mongodb");

class MongoRepo {
  constructor() {
    this.myReviews = null;
  }

  async getConnection() {
    try {
      const client = await MongoClient.connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = client.db("groceryStrore");
      this.myReviews = db.collection("reviews");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      throw error;
    }
  }

  async insertReview(
    productname,
    producttype,
    productprice,
    productmaker,
    storeID,
    retailerpin,
    retailercity,
    retailerstate,
    reviewrating,
    reviewdate,
    reviewtext,
    username
  ) {
    try {
      
      await this.getConnection();
      const doc = {
        title: "myReviews",
        productName: productname,
        productType: producttype,
        productprice: productprice,
        productmaker: productmaker,

        storeID: storeID,
        retailerpin: retailerpin,
        retailercity: retailercity,
        retailerstate: retailerstate,

        username: username,
        reviewRating: parseInt(reviewrating),
        reviewDate: reviewdate,
        reviewText: reviewtext,
      };
      console.log("This is Mongo Repo with doc", doc);
      await this.myReviews.insertOne(doc);
      return "Successful";
    } catch (error) {
      return "Unsuccessful";
    }
  }

  async selectReview() {
    let reviews = null;

    try {
      const connection = await this.getConnection(); // Assuming getConnection returns a valid connection
      const cursor = await this.myReviews.find();
      reviews = {};

      const reviewArray = await cursor.toArray();

      reviewArray.forEach((obj) => {
        const productName = obj.productName;

        if (!reviews[productName]) {
          reviews[productName] = [];
        }

        const listReview = reviews[productName];

        const review = {
          productName: obj.productName,
          productType: obj.productType,
          productprice: obj.productprice,
          productmaker: obj.productmaker,
          
          storeID: obj.storeID,
          retailerpin: obj.retailerpin,
          retailercity: obj.retailercity,
          retailerstate: obj.retailerstate,
          
          username: obj.username,
         
          reviewRating: parseInt(obj.reviewRating),
          reviewDate: obj.reviewDate,
          reviewText: obj.reviewText,
        };

        listReview.push(review);
      });

      return reviews;
    } catch (error) {
      reviews = null;
      return reviews;
    }
  }
}

module.exports = MongoRepo;
