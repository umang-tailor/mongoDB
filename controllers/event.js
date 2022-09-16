const constants = require("../config/constants");

const events = require("../models/event");
const user_events = require('../models/event_user');
const users = require('../models/user')

const createEvent = async (req, res) => {
    try {
      let createObject = {
        event_name: req.body.event_name,
        user_id: req.userData.id,
      };
      let event = await events.create(createObject);
    //   let createObject1 = {
    //     user_id: req.userData.id,
    //     event_id: event.id,
    //   };
    //   let event_user = await user_events.create(createObject1);
  
      res.json({
        status: constants.success_code,
        message: "successfully created",
        data: event,
      });
  
      return;
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
const updateEvent = async (req, res) => {
    try {
        console.log(req.userData.id,req.params.id);
      const updateObject = await events.findOneAndUpdate(
        { user_id: req.userData.id, id: req.params.id } ,
        {
          event_name: req.body.event_name,
        },
        
      );
        console.log(updateObject);

      res.json({
        status: constants.success_code,
        message: "successfully updated",
        data: updateObject,
      });
  
      return;
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
// const getEventList = async (req, res) => {
//     try {
//       let updatedUserData = await user_events.findOne({
        
//           user_id: req.userData.id,
        
//       });
//       console.log('updateUserData :>> ', updatedUserData);
//       if (!req.body.search_text) {
//         let result = await events.find({
//         //   order: [["createdAt", "DESC"]],
//         //   offset: parseInt(req.body.skip),
//         //   limit: parseInt(req.body.limit),
           
//             user_id: req.userData.id,

        
//         });
  
//         console.log("result :>> ", result);
  
//         res.json({
//           status: constants.success_code,
//           message: "successfully listed",
//           data: result.rows,
//           total: result.count,
//         });
  
//         return;
//       }
//       //with search result
//     //   let searchResult = await user_events.findAndCountAll({
//     //     where: {
//     //       user_id: req.userData.id,
//     //     },
//     //     include: [
//     //       {
//     //         model: events,
//     //         as: "event",
//     //         where: {
//     //           event_name: {
//     //             [Op.iLike]: `%${req.body.search_text}%`,
//     //           },
//     //         },
//     //       },
//     //     ],
  
//     //     order: [["createdAt", "DESC"]],
//     //     offset: parseInt(req.body.skip),
//     //     limit: parseInt(req.body.limit),
//     //   });
//     //   res.json({
//     //     status: constants.success_code,
//     //     message: "successfully listed",
//     //     data: searchResult.rows,
//     //     total: searchResult.count,
//     //   });
  
//       return;
//     } catch (error) {
//       console.log("error :>> ", error);
//       res.status(500).json({
//         status: constants.server_error_code,
//         message:
//           typeof error === "string"
//             ? error
//             : typeof error.message === "string"
//             ? error.message
//             : constants.server_error,
//       });
//       return;
//     }
//   };
const getEventList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      let updatedUserData = await user_events.findOne({
        
        
          user_id: req.userData.id,
        
      });
      console.log('updateUserData :>> ', updatedUserData);
      if (!req.body.search_text) {
        let result = await events.find()
                .limit(limit*1)
                .skip((page - 1) * limit)
               
      const count = await events.countDocuments();
        console.log("result :>> ", result);
  
        res.json({
          status: constants.success_code,
          message: "successfully listed",
          events,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        });
  
        return;
      }
      //with search result
    //   let searchResult = await user_events.findAndCountAll({
    //     where: {
    //       user_id: req.userData.id,
    //     },
    //     include: [
    //       {
    //         model: events,
    //         as: "event",
    //         where: {
    //           event_name: {
    //             [Op.iLike]: `%${req.body.search_text}%`,
    //           },
    //         },
    //       },
    //     ],
  
    //     order: [["createdAt", "DESC"]],
    //     offset: parseInt(req.body.skip),
    //     limit: parseInt(req.body.limit),
    //   });
    //   res.json({
    //     status: constants.success_code,
    //     message: "successfully listed",
    //     data: searchResult.rows,
    //     total: searchResult.count,
    //   });
  
      return;
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
module.exports={
    createEvent,
    updateEvent,
    getEventList
}