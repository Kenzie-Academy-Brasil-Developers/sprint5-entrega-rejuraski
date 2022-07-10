import { IUser, IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { hash } from "bcryptjs";

const updateUserService = async (
  id: string,
  { email, name, password, age }: IUserRequest
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const userLoaded = await userRepository.findOneBy({ id });

  if (userLoaded) {
    let hashedPassword = null;

    if (password) {
      hashedPassword = await hash(password, 10);
    }

    (userLoaded.age = age ? age : userLoaded.age),
      (userLoaded.email = email ? email : userLoaded.email),
      (userLoaded.name = name ? name : userLoaded.name),
      (userLoaded.password = hashedPassword
        ? hashedPassword
        : userLoaded.password),
      userRepository.update(id, userLoaded);

    return userLoaded;
  } else {
    throw new Error("Usuário não encontrado");
  }
};

export default updateUserService;
