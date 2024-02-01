import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { isAfter, addHours } from 'date-fns';
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UserRepository";
import UsersTokensRepository from "../typeorm/repositories/UserTokensRepository";


interface InterfaceRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: InterfaceRequest): Promise<void> {

    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User Token does not exists.')
    }

    const user = await usersRepository.findById(userToken.user_id);

    if(!user) {
      throw new AppError('User does not exists.')
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.')
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);

  }

}

export default ResetPasswordService