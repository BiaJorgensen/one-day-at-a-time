const { Schema, model } = require("mongoose");

// Reward model
const rewardSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const Reward = model("Reward", rewardSchema);
  
module.exports = Reward;