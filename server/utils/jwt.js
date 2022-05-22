import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs"


const privateKEY = fs.readFileSync('./private.key', 'utf8')
const publicKEY = fs.readFileSync('./public.key', 'utf8')

const i = 'jwt-node'
const s = 'jwt-node'
const a = 'jwt-node'

const verifyOptions = {
    // issuer: i,
    // subject: s,
    // audience: a,
    expiresIn: '8784h',
    // algorithm: ['RS256'],
}

const saltRounds = 10

const salt = bcrypt.genSaltSync(saltRounds)

    const generateJWT = (payload) => {
        const signOptions = {
            expiresIn: '8784h',
            // algorithm: 'RS256',
        }

        const options = signOptions
        if (payload && payload.exp) {
            delete options.expiresIn
        }
        return jwt.sign({id:payload._id}, privateKEY,options)
    }

    const verifyJWT = (payload) => {
        return jwt.verify(payload, publicKEY, verifyOptions)
    }

    const hashPassword = (password) => {
        const hash = bcrypt.hashSync(password, salt)
        return hash
    }

    const comparePassword = (password,passwordHash) => {
        return !bcrypt.compareSync(password,passwordHash)
    }

export const jsonwt = {
    hashPassword,comparePassword,verifyJWT, generateJWT
}