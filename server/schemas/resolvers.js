const { User, Task, Reward } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            // Throw error if no user is found
            throw new AuthenticationError("Cannot find user. Verify if you are logged in.");
          },
          tasksByUser: async(parent, args, context) => {
            if (context.user) {
                try {
                    const tasks = await Task.find({ userId: context.user._id });
                    return tasks;
                } catch (error) {
                    // Throw the error message as a plain string
                    throw error.message;
                }
            } else {
                // Throw error if no user is found
                throw new AuthenticationError("Cannot find user. Verify if you are logged in.");
                }   
            },
            taskById: async (parent, { taskId }) => {
                return Task.findOne({ _id: taskId})
            },
            rewardById: async (parent, { rewardId }) => {
                return Reward.findOne({ _id: rewardId})
            }


    }
}