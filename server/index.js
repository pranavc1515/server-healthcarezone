const express = require("express");
const cors = require("cors");
const errorHandler = require("./app/middlewares/errorHandler");
const { connectDB } = require("./app/config/db.connect.js");
const { jwtAuth } = require("./app/middlewares/expressJwt");
require("dotenv").config({ path: "./app/config/.env" });
//setting up environment variables
const { PORT, MONGO_URI, SECRET_KEY } = process.env;
const app = express();
// setting up middlewares
app.use(express.json(), cors(), jwtAuth(SECRET_KEY));
//importing routes
const userRoutes = require("./app/routes/userRoutes.js");
const cityRoutes = require("./app/routes/cityRoutes.js");
const categoryRoutes = require("./app/routes/categoryRoutes.js");
const serviceRoutes = require("./app/routes/serviceRoutes.js");
const facilityRoutes = require("./app/routes/facilityRoutes.js");
const peopleRoutes = require("./app/routes/peopleRoutes.js");

// using routes for providing services on different endpoints
app.use("/api", userRoutes.auth);
app.use("/api", cityRoutes.cityCRUD);
app.use("/api", serviceRoutes.serviceCRUD); // service (eg. LAB, hospital, pharmacy)
app.use("/api", categoryRoutes.categoryCRUD); // category (eg, ayurvedic lab, dental clinic,homeopathy clinic)
app.use("/api", facilityRoutes.facilityCRUD); // service provider (eg. ABC hospital, XYZ pharmacy)
app.use("/api", peopleRoutes.peopleCRUD);
// error handler
app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await connectDB(MONGO_URI);
    console.log("Server connected at port", PORT);
  } catch (error) {
    console.log(error);
  }
});
