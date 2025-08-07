import { Module } from '@nestjs/common';
import { Encrypt } from '../../application/cryptography/encrypt';
import { JwtEncrypt } from './jwt-encrypt';
import { Hasher } from '../../application/cryptography/hasher';
import { BcryptHasher } from './bcrypt-hasher';

@Module({
  providers: [
    {
      provide: Hasher,
      useClass: BcryptHasher,
    },
    {
      provide: Encrypt,
      useClass: JwtEncrypt,
    },
  ],
  exports: [Hasher, Encrypt],
})
export class CryptographyModule {}
