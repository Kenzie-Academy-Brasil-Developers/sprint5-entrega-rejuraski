import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const loadUserService = async (userId: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  return user;
};

export default loadUserService;
