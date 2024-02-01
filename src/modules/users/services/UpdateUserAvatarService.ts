import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UserRepository";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';


interface InterfaceRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: InterfaceRequest): Promise<User> {

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if(!user) {
      throw new AppError('User not found.')
    }

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
    
  }

  
}

export default UpdateUserAvatarService