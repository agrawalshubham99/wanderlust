const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");

// const MONGO_URL =
//   "mongodb+srv://sa280337:agrawal1234@cluster0.f7cw3.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0";

//require("dotenv").config();

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("Hello World");
});

//index route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

//new route
app.get(
  "/listings/new",
  wrapAsync(async (req, res) => {
    res.render("listings/new.ejs");
  })
);

//show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  })
);

//create route
app.post(
  "/listings",
  wrapAsync(async (req, res, next) => {
    const { listing } = req.body;
    const newListing = new Listing({
      ...listing,
      image: {
        url: listing["image.url"],
      },
    });

    await newListing.save();
    res.redirect("/listings");
  })
);

//edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//update route
app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });
    res.redirect(`/listings/${listing._id}`);
  })
);

//delete route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

// app.get("/listings", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "This is a beautiful villa",
//     price: 200000,
//     location: "Bali",
//     country: "Indonesia",
//   })

// await sampleListing.save();
// console.log(sampleListing);
// res.send("Listing has been saved");

// });

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
