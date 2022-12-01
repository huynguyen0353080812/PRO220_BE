import accountModel from '../models/account.model'
import bcyrpt from 'bcrypt'
import { accountServices } from '../services'

export const listAccount = async (req,res)=>{
    try {
        const data = await accountServices.getAll()
        res.json(data)
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}

export const addAccount = async (req,res)=>{
    try {
        const checkEmail = await accountModel.findOne({email:req.body.email})
        if (checkEmail) {
            return res.json({
                message:'email đã tồn tại'
            })
        }
        const passwordVerify = bcyrpt.hashSync(req.body.password, 10)
        const data = await accountServices.create({...req.body,password:passwordVerify})
        res.json(data)
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}

export const deleteAccount = async(req,res)=>{
    try {
        const data = await accountServices.removeById(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}

export const updateAccount = async(req,res)=>{
    try {
        const data = await accountServices.updateById(req.params.id,req.body)
        res.json(data)
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}

export const getAccount = async (req,res)=>{
    try {
        const data = await accountServices.getById(req.params.id)
        res.json(data)
    } catch (error) {
        res.status(400).json({
            message:error
        })
    }
}