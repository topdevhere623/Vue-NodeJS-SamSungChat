import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {jsonwt} from './../utils/jwt.js';
import moment from "moment";

export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: {type: String, required:false},
    lastName: {type: String, required:false},
    email:{type: String, required:[true,"Please provide a valid email"]},
    passwordHash:{type: String, required:false},
    type: {type: String, required:true},
  },
  {
    timestamps: true,
    collection: "users",
  }
);

/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (firstName, lastName, email, password, type) {
  try {
    const passwordHash = jsonwt.hashPassword(password);
    const user = await this.create({ firstName, lastName, email, passwordHash , type });
    delete user.passwordHash;
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw ({ error: 'No user with this id found' });
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.LoginAgent = async function (email,password) {
    try {
      const user = await this.findOne({
        $and: [{ email }, {type:USER_TYPES.SUPPORT}]
      });
      if (!user && jsonwt.comparePassword(password,user.passwordHash)) {
            throw ({ error: 'Email Or Password Invalid' });
      }
      const token = jsonwt.generateJWT(user)
      const refreshExpiry = moment().utc().add(3, 'days').endOf('day')
          .format('X')
      const refreshtoken = jsonwt.generateJWT({ exp: parseInt(refreshExpiry), id: user._id })
      return {user,token,refreshtoken};
    } catch (error) {
      throw error;
    }
  }

  userSchema.statics.LoginConsumer = async function (firstName,lastName,email,type) {
    try {
        let user = null;
        user = await this.findOne({
        $and: [{ email }, {type:USER_TYPES.CONSUMER}]
      });
      if (!user) {
          user = await this.create({ firstName, lastName, email , type:USER_TYPES.CONSUMER });
      }
      const token = jsonwt.generateJWT(user)
      const refreshExpiry = moment().utc().add(3, 'days').endOf('day')
          .format('X')
      const refreshtoken = jsonwt.generateJWT({ exp: parseInt(refreshExpiry), id: user._id })
      return {user,token,refreshtoken};
    } catch (error) {
      throw error;
    }
  }

/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
}

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("User", userSchema);