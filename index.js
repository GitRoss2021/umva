// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const contactRoute = require("./app/routes/contactAPI");
const userRouter = require("./app/routes/userRouter");
const bookingRouter = require("./app/routes/bookingRouter");
// Setting up MongoDB connection
mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(cors());
app.use(express.json());

// API routes
app.get("/", (req, res, next) => {
  res.send({
    message: "Welcome to Lilitha's API",
    user_routes: {
      user_register: {
        method: "POST",
        route: "/user",
        request_body: {
          fullname: "String",
          email: "String",
          phone_number: "String",
          password: "String",
          cart: "object",
        },
        result: {
          jwt: "String token",
        },
      },
      user_login: {
        method: "PATCH",
        route: "/user",
        request_body: {
          email: "String",
          password: "String",
        },
        result: {
          jwt: "String token",
        },
      },
      all_users: {
        method: "GET",
        route: "/user",
        result: {
          users: "Array",
        },
      },
      single_user: {
        method: "GET",
        route: "/user/:id",
        result: {
          user: "Object",
        },
      },
      update_user: {
        method: "PUT",
        request_body: {
          fullname: "String",
          email: "String",
          phone_number: "String",
          password: "String",
          img: "String *optional* (Must be hosted image on Post Image)",
          cart: "object",
        },
        route: "/user/:id",
        result: {
          user: "Object",
        },
      },
      delete_user: {
        method: "DELETE",
        route: "/user/:id",
        result: {
          message: "Object",
        },
      },
    },
    booking_routes: {
      all_booking: {
        method: "GET",
        route: "/booking",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        result: {
          product: "Array",
        },
      },
      single_booking: {
        method: "GET",
        route: "/booking/:id",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        result: {
          product: "Object",
        },
      },
      create_booking: {
        method: "POST",
        route: "/booking/",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        request_body: {
          title: "String",
          body: "String",
          img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
        },
        result: {
          post: "Object",
        },
      },
      update_booking: {
        method: "PUT",
        route: "/booking/:id",
        headers: {
          authorization: "Bearer (JWT token)",
        },
        request_body: {
          title: "String *optional*",
          body: "String *optional*",
          img: "String *optional* (Must be hosted image. I can suggest to host on Post Image)",
        },
        result: {
          post: "Object",
        },
      },
      delete_post: {
        method: "DELETE",
        route: "/booking/:id",
        result: {
          message: "Object",
        },
      },
    },
  });
});
app.use("/user", userRouter);
app.use("/contact", contactRoute);
app.use("/booking", bookingRouter);
app.set("port", process.env.PORT || 7080);
app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
});
