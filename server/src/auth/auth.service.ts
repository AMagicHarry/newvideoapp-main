import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    // Example method to generate a JWT token
    async generateToken(payload: any): Promise<string> {
        return this.jwtService.sign(payload);
    }

        

  async verifyToken(token: string): Promise<any> {
    try {
        const decoded = this.jwtService.verify(token);
            return decoded;
    } catch (error) {
        throw new UnauthorizedException('Invalid token');
    }
}

// Method to check if a token has expired
isTokenExpired(decodedToken: any): boolean {
  const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
  const expirationTimestamp = decodedToken.exp;

  // console.log(`Current time: ${new Date(currentTimestampInSeconds * 1000)}`);
  // console.log(`Token expiration time: ${new Date(expirationTimestamp * 1000)}`);

  return currentTimestampInSeconds > expirationTimestamp;
}
  
}