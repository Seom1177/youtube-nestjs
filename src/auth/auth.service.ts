import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';

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

  async login(userObjectlogin: LoginAuthDto) {
    const { email, password } = userObjectlogin;
    // const findUser = await this.userModel.findOne({ email: email });
    const findUser = await this.userModel.findOne({ email });

    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);

    const checkedPassword = await compare(password, findUser.password);

    if (!checkedPassword) throw new HttpException('PASSSWORD_INCORRECT', 403);

    const data = findUser;

    return data;
  }
}
