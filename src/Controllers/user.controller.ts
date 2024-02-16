import { Request, Response } from "express";
import { request } from "http";
import { User } from "../Models/user.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const getUserToken = (_id: String | Types.ObjectId) => {
  const token = jwt.sign({ _id }, "$JWT_Signing_Password123!Secure&", {
    expiresIn: "7d",
  });
  return token;
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { email, name, password }: IUser = request.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(409).send("user already exist");
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedpassword,
    });

    return response.status(200).send({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in Create User", error);
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request?.body;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return response.status(409).send({ message: "User don't exist" });
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (isPasswordIdentical) {
      console.log(isUserExist._id, "🦜🦜🦜🦜🦜🦜");
      const token = getUserToken(isUserExist._id);
      response.send({
        token,
        user: {
          email: isUserExist.email,
          name: isUserExist.name,
        },
      });
    } else {
      response.status(400).send({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log("Error in User Login", error);
    throw error;
  }
};
