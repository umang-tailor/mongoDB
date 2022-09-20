const mongoose = require ('mongoose')
const users = require("../models/user");
const jwt = require("jsonwebtoken");
const token = require("../config/secret");
const constants = require("../config/constants");
const bcrypt = require("bcrypt");


const registerUser = async (req, res) => {
    // console.log("registerUser function start");
    try {
      // console.log(req.body);
      if (
        !req.body.first_name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.last_name
      ) {
        throw "Please provide all Data";
      }
  
      let existUserData = await users.findOne({
        
          email: req.body.email,
        
      });
  // console.log(existUserData)
      if (existUserData) {
        throw "User with this email is already registered with us";
      }
  
   
      var hashedPassword = await bcrypt.hash(req.body.password, 8);
  
      let createObject = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
      };
  
      let user = await users.create(createObject);
  
  
      res.json({
        status: constants.success_code,
        message: "successfully created",
        data: user,
       
      });
  
      return;
    } catch (error) {
      
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

const login = async (req, res) => {
    console.log("login function start");
    try {
      if (!req.body.email || !req.body.password) {
        throw "Please provide all Data";
      }
  
      let user = await users.findOne({
      
          email: req.body.email,
        
      });
      // console.log(user);
  
      if (!user) {
        throw "Invalid email";
      }
  // console.log(req.body.password,user.password);

      var isEqual = await bcrypt.compareSync(req.body.password, user.password);
      console.log("!!!!!!!!!!after compare", isEqual);
  
      if (!isEqual) {
        throw "Invalid password"; 
      }
  
      let updatedUserData = await users.findOne({
          id: user.id,
      })
  
      let secret = token();
      let authToken = jwt.sign({ id: user.id, role: "user" }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
  
      console.log("!!!!!!!!all process completed", updatedUserData, authToken);
  
      res.json({
        status: constants.success_code,
        message: "successfully Logged in",
        data: updatedUserData,
        authToken: authToken,
      });
  
      return;
    } catch (error) {
      console.log("!!!!!!!!error printed here", error);
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
const changePassword = async (req, res) => {
    try {
      if (!req.body.password) {
        throw "Please provide password";
      }
  
      let updateObject = {};
  
      updateObject.password = await bcrypt.hash(req.body.password, 8);
      // console.log("updateObject :>> ", updateObject);
      // console.log("req.userData.id :>> ", req.userData.id);
      let editUserData = await users.updateOne(updateObject, {
        
          id: req.userData.id,
        
      });
      console.log("editUserData :>> ", editUserData);
      res.json({
        status: constants.success_code,
        message: "password change Successfully",
      });
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
const resetPassword = async (req, res) => {
    try {
      let userPass = await users.findOne({
        
          email: req.body.email,
        
      });
      if (!userPass) {
        throw "invalid email";
      }
  
      let reset = {
        passwordReset: true,
        id: userPass.id,
      };
      let secret = token();
      let resetKey = jwt.sign(reset, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
  
      res.json({
        status: constants.success_code,
        message: "password resetKey",
        resetKey: resetKey,
      });
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
const updatePassword = async (req, res) => {
    try {
      let secret = token();
  
      const tokenData = await jwt.decode(req.body.passwordReset, secret);
      console.log("tokenData :>> ", tokenData);
      if (tokenData.passwordReset) {
        let userFind = await users.findOne({
          
            id: tokenData.id,
          
        });
        if (!userFind) {
          throw "user not found";
        }
        let updateObject = {};
  
        updateObject.password = await bcrypt.hash(req.body.password, 8);
        let editUserData = await users.updateOne(updateObject, {
      
            id: tokenData.id,
          
        });
        return res.json({
          status: 200,
          message: "change successfully",
        });
      } else {
        return res.json({
          status: "error",
          message: "unauthorized",
        });
      }
    } catch (error) {
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
const listUsers = async (req, res) => {
    console.log("start");
    try {
      let result = await users.find({
        order: [["createdAt", "DESC"]],
        offset: parseInt(req.body.skip),
        limit: parseInt(req.body.limit),
      });
      // console.log("result :>> ", result);
      res.json({
        status: constants.success_code,
        message: "successfully listed",
        data: result,
        
      });
      return;
    } catch (error) {
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
    registerUser,
    login,
    changePassword,
    updatePassword,
    resetPassword,
    listUsers,
  }