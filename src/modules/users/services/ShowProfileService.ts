import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({user_id}: IRequest): Promise<User[]> {

    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find()

    return users

  }
}

export default ShowProfileService;