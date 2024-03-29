import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updataAvatar = new UpdateUserAvatarService();

    const user = updataAvatar.execute({
      userId: request.user.id, 
      avatarFileName: request?.file?.filename || '',
    });

    return response.json(instanceToInstance(user));
  }
}