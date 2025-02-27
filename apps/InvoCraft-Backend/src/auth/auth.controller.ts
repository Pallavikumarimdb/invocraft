import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailService } from '../email/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { EmailVerification } from './schemas/emailVerification.schema';
import { Model } from 'mongoose';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Public } from '../factories/public.factory';
import { User } from '../dectorators/user.decorator';
import { AuthUser } from './strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private configService: ConfigService,
    private emailService: EmailService,
    @InjectModel(EmailVerification.name)
    private emailVerificationModel: Model<EmailVerification>,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const emailToken = await this.authService.generateOtp(20);
    const emailVerification = new this.emailVerificationModel({
      email: createUserDto.email,
      emailToken,
    });
    await emailVerification.save();

    let url = this.configService.get('URL');
    const port = this.configService.get('PORT');
    if (port !== '80' && url.includes('localhost')) {
      url = `${url}:${port}`;
    }

    const content = `
      Hi!<br><br>
      Thanks for your registration<br><br>
      <a href="${url}/api/auth/email/verify/${emailToken}">Click here to activate your account</a>
    `;

    await this.emailService.sendEmail(
      content,
      'Account Activation',
      createUserDto.email,
    );
    return { message: 'User registered successfully', user }; 
  }

  @Public()
  @Get('email/verify/:token')
  async verifyEmail(@Param('token') token: string, @Res() res) {
    const emailVerification = await this.emailVerificationModel
      .findOne({ emailToken: token })
      .exec();
    if (!emailVerification) {
      return new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.updateOne(
      { email: emailVerification.email },
      {
        emailVerified: true,
      },
    );
    await this.emailVerificationModel.deleteOne({ emailToken: token }).exec();
    res.status(302).redirect('/signin');
  }

  @Post('switch-tenant/:tenantId')
  async switchTenant(
    @User() user: AuthUser,
    @Param('tenantId') tenantId: string,
  ) {
    return this.authService.switchTenant(user._id, tenantId);
  }

}
