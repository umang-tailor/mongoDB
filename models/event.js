
const mongoose =require ('mongoose');
const { Schema } = mongoose;



event1 = new Schema( {
        event_name: {
            type: String,
        },
        user_id:{
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        // event_user:[{
        //     type:Schema.Types.ObjectId,
        //     ref:"event_user"
        // }]
      },
    )
module.exports = mongoose.model('event', event1);