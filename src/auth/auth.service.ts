import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
