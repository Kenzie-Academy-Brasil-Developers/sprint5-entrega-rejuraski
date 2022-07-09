import { IUser, IUserRequest } from "../../interfaces/users";
import { User } from "../../entities/user.entity";
import { AppDataSource } from "../../data-source";
import { hash } from "bcryptjs";

const createUserService = async ({
  email,
  name,
  password,
  age,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    age,
    email,
    name,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
