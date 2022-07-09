import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const verifyEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ email });

  if (user) {
    return res
      .status(400)
      .json({ message: "This email adress ir already being used" });
  }

  next();
};

export default verifyEmailMiddleware;
