
const mongoose =require ('mongoose');
const { Schema } = mongoose;
const validator = require('validator');


user = new Schema( {
        first_name: {
            type: String,
        },
        last_name: {
        type: String
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            validator: validator.isEmail,
        },
        password: {
            type: String,
        },
        // events:[{
        //     type:Schema.Types.ObjectId,
        //     ref:"event"
        // }],
        // event_user:[{
        //     type:Schema.Types.ObjectId,
        //     ref:"event_user"
        // }]
      },
    )
  
module.exports = mongoose.model('user', user);