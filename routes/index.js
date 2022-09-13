var express = require("express");
var router = express.Router();
const user = require("../controllers/user");
const event = require("../controllers/event");
const user_events = require('../controllers/event_user')
const isAuthorized = require("../middleware/isAuthorized");

router.post("/v1/create-user", user.registerUser);
router.post("/v1/login", user.login);
router.patch("/v1/changePassword", isAuthorized, user.changePassword);
router.post("/v1/resetPass", user.resetPassword);
router.patch("/v1/updatePass", user.updatePassword);
router.get("/v1/list-user", user.listUsers);

//EVENTS
router.post("/v1/create-event", isAuthorized, event.createEvent);
router.put("/v1/update-event/:id", isAuthorized, event.updateEvent);
router.get("/v1/getList", isAuthorized, event.getEventList);

//INVITE_USER
router.post("/v1/user_invite", isAuthorized, user_events.userInvite);

module.exports = router;