import Usermodel from "../Models/Usermodel.js";
import { hashPassword, comparePassword } from './../Helpers/authHelpers.js';
import jwt from 'jsonwebtoken';
import Ordermodel from "../Models/Ordermodel.js"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, phone, answer } = req.body;
        //validations
        if (!name) {

            return res.send({ error: "The name is required" })
        }
        if (!email) {
            return res.send({ error: "Email is required" })
        }
        if (!password) {
            return res.send({ error: "password is required" })
        }
        if (!address) {
            return res.send({ error: "address is required" })
        }
        if (!phone) {
            return res.send({ error: "Number is required" })
        }
        if (!answer) {
            return res.send({ error: "answer is required" })
        }

        const ExistingUser = await Usermodel.findOne({ email }) //check whether user exist or not
        //existing user
        if (ExistingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered please login"
            });
        }

        //register user
        const hashedPassword = await hashPassword(password) //checking register for user 
        //save
        const User = await new Usermodel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer
        }).save();
        res.status(201).send({
            success: true,
            message: "successfully registered"
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed",
            error
        });
    }


};

export const orderStatusController = async (req,res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await Ordermodel.findByIdAndUpdate(
            orderId,
            {status},
            {new:true}
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error while updating order",
            error,
        });
    }
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        //check user
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10d",
        });
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Failed to login",
            error
        })
    }
}



export const forgetPasswordController = async (req, res) => {
    //validate
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) {
            return res.send({ error: "email is not registered" })
        }
        if (!answer) {
            return res.send({ error: "answer is invalid" })
        }
        if (!newPassword) {
            return res.send({ error: "password required" })
        }

        const user = await Usermodel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email and answer is wrong"
            })
        };

        const hashedPassword = await hashPassword(newPassword)
        await Usermodel.findByIdAndUpdate(user._id, {
            password: hashedPassword

        })
        res.status(200).send({
            success: true,
            message: "password changed successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: "something went wrong"
        })
    }
};

export const updateProfileController= async (req,res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await Usermodel.findById(req.user._id);

        if(password && password.length < 6){
            return res.json({ error:"Password is required and 6 character long"});
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await Usermodel.findByIdAndUpdate(
            req.user._id,
            {
                name : name || user.name,
                password: hashedPassword || user.password,
                email: email || user.email,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true}
        );
        res.status(200).send({
            success: true,
            message:"Profile updated successfully",
            updatedUser
        });
             
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error while updated details",
            error
        })
    }
};





export const testController = async (req, res) => {
    res.send("admin successfully verified")
}