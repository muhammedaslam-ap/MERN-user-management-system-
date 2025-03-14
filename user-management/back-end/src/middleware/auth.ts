import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IJwtPayload {
  _id: string,
  email: string
}

export interface ICustomRequest extends Request{
    user:IJwtPayload
}

export function authMiddleWare(req:Request,res:Response,next:NextFunction){
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")){
              res
               .status(403)
               .json({ message: "No token provided or invalid format" });
               return;
        }

        const token = authHeader.split(" ")[1];

        const user = jwt.verify(token,process.env.SECRET!);
        // console.log("User in AuthmiddelWare:",user);
        (req as ICustomRequest).user = user as IJwtPayload
        next();
    } catch (error) {
        console.log('Error in authMiddleWare',error)
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
}