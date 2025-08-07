import { JwtService } from '@nestjs/jwt';
import { Encrypt } from '../../application/cryptography/encrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtEncrypt implements Encrypt {
  constructor(private jwtService: JwtService) {}
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    const payloadJwt = await this.jwtService.signAsync(payload);
    return payloadJwt;
  }
}
