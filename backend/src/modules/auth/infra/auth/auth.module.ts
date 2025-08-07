import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET_KEY');
        return {
          secret: secret,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
