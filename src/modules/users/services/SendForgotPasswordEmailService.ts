import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UserRepository";
import UsersTokensRepository from "../typeorm/repositories/UserTokensRepository";


interface InterfaceRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: InterfaceRequest): Promise<void> {

    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UsersTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exists.')
    }

    const token = await userTokenRepository.generate(user.id);

    console.log(token);

  }

}

export default SendForgotPasswordEmailService