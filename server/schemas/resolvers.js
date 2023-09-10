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
    },

    Mutation: {
        createUser: async (_, { userInput }) => {
            const user = await User.create(input);
            // Create signin token
            const token = signToken(user);
            return { token, user };
        },
          updateUser: async (_, { ...updateUser }, context) => {
            return User.findOneAndUpdate({ _id: context.user._id }, updateData, { new: true });
        },
          deleteUser: async (parent, args, context) => {
            return User.findOneAndDelete({ _id: context.user._id });
        },
        createTask: async (_, { taskInput }, context) => {
            if (!context.user) {
                throw new AuthenticationError("You need to be logged in to add Tasks.");
            }

            // Fetch all rewards with quantity greater than 0
            const availableRewards = await Reward.find({ quantity: { $gt: 0 } });
            if (availableRewards.length === 0) {
            // Throw error if no reward with quantity greater than 0 is available
                throw new Error("No rewards available.");
            }
            // Randomly select a reward index
            const randomIndex = Math.floor(Math.random() * availableRewards.length);
            // Select a random reward
            const selectedReward = availableRewards[randomIndex]
            // Decrement the quantity of the selected reward by 1 in the database
            selectedReward.quantity -= 1;
            await selectedReward.save();
      
            const userId = context.user._id;
            const newTask = await Task.create({
                ...taskInput,
                userId,
                rewardId: selectedReward._id,
            })
            return newTask
        }
    }
}