const constants = require("../config/constants");

const user_events = require("../models/event_user");
const users = require("../models/user");
const events = require("../models/event")

const userInvite = async (req, res) => {
    try {
      let user = await users.findOne({
     
          email: req.body.email,
        
      });
  
      if (!user) {
        throw "Invalid email";
      }
      console.log("user :>> ", user);
      let event = await events.findOne({
        id: req.body.event_id,
        
      });
      if (!event) {
        throw "Invalid id";
      }
      console.log("event :>> ", event);
  
      let userExits = await user_events.findOne({
        
          user_id: user.id,
          event_id: req.body.event_id,
        
      });
      console.log("userExits :>> ", userExits);
      if (userExits) {
        throw "Already invited";
      }
      if (req.userData.id == event.user_id) {
        let createObject = {
          user_id: user.id,
          event_id: req.body.event_id,
        };
        let event_user = await user_events.create(createObject);
        console.log(event_user);
        res.json({
          status: constants.success_code,
          message: "successfully created",
          data: event_user,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        status: constants.server_error_code,
        message:
          typeof error === "string"
            ? error
            : typeof error.message === "string"
            ? error.message
            : constants.server_error,
      });
      return;
    }
  };

  module.exports = {
    userInvite,
    
  };
  