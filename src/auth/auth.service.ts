import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject; // Texto Plano
    const plainToHash = await hash(password, 10); //return encrypt password
    userObject = { ...userObject, password: plainToHash };
    return this.userModel.create(userObject);
  }

  login() {}
}
