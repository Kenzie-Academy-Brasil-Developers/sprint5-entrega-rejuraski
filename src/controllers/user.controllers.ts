import { Request, Response } from "express";
import createUserService from "../services/users/createUsers.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUsers.service";
import loadUserService from "../services/users/loadUser.service";
import updateUserService from "../services/users/updateUsers.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, age } = req.body;
    const newUser = await createUserService({ name, email, password, age });
    return res.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await deleteUserService(userId);
    return res.status(200).json({
      message: "Usuário deletado com sucesso",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const loadUserController = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const userId = req.params.id;
    const user = await loadUserService(userId);
    return res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email, password, age } = req.body;
    const user = await updateUserService(userId, {
      name,
      email,
      password,
      age,
    });
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

export {
  createUserController,
  listUserController,
  deleteUserController,
  loadUserController,
  updateUserController,
};
