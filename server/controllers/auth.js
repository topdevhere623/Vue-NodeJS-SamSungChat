// utils
import makeValidation from '@withvoid/make-validation';
// models
import UserModel, { USER_TYPES } from '../models/User.js';

export default {
  onLoginAgent: async (req, res) => {
    try {
      const { email , password } = req.body;
      if(!email || !password){
        return res.status(400).json({
            success: false,
            message: 'Not a valid email and password',
          })
      }
      let {user,token,refreshtoken} = await UserModel.LoginAgent(email,password);
      user = Object.assign({},{
        _id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        type:user.support,   
      })
      return res.status(200).json({ success: true, user:user,token:token,refresh:refreshtoken });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  onLoginCustomer: async (req, res) => {
    try {
      const {firstName,lastName,email,type} = req.body;
      if(!email){
        return res.status(400).json({
            success: false,
            message: 'Not a valid email',
          })
      }
      let {user,token,refreshtoken} = await UserModel.LoginConsumer(firstName,lastName,email,type);
      user = Object.assign({},{
        _id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        type:user.support,   
      })
      return res.status(200).json({ success: true, user:user,token:token,refresh:refreshtoken });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
}