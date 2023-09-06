const { Schema, model } = require("mongoose");

// Task model
const taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    when: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    rewardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reward", // Reference to the Reward model
        required: true,
    }
});

const Task = model("Task", taskSchema);
  
module.exports = Task;