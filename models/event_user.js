
const mongoose =require ('mongoose');
const { Schema } = mongoose;



event_user = new Schema( {
        event_id: {
            type: Schema.Types.ObjectId,
            ref:"event"
        },
        user_id:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },

      },
    )
module.exports = mongoose.model('event_user', event_user);