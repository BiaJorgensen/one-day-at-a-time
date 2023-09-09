const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!    
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    type Task {
        _id: ID!
        description: String!
        when: String!
        completed: Boolean
        userId: ID!
        rewardId: ID!
    }

    input TaskInput {
        description: String!
        when: String!
        completed: Boolean
        userId: ID!
        rewardId: ID!
    }

    type Reward {
        _id: ID!
        description: String!
        quantity: Int!
    }

    input RewardInput {
        description: String!
        quantity: Int!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        # get user by ID
        user: (id: ID!): User
        # get task by user ID
        tasksByUser(userId: ID!): [Task]!
        # get task by ID
        taskById(taskId: ID!): Task
        # get reward by ID
        rewardById(rewardId: ID!): Reward
    }

    type Mutation {
        # create new user
        createUser(input: UserInput): Auth
        # update user by ID
        updateUser(userId: ID!, input: UserInput): Auth
        # delete user by ID
        deleteUser(userId: ID!): Auth
        # create a new task
        createTask(input: TaskInput): Task
        # update task by ID
        updateTask(taskId: ID!, input: TaskInput): Task
        # delete task by ID
        deleteTask(taskId: ID!): Task
        # create a new reward
        createReward(input: RewardInput): Reward
        # update reward by ID
        updateReward(RewardId: ID!, input: RewardInput): Reward
        # delete reward by ID
        deleteReward(RewardId: ID!): Reward
        login(email:String!, password: String!): Auth
    }
`

module.exports = typeDefs;