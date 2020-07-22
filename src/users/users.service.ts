import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { UserDto } from 'src/shared/dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async findAll(): Promise<{ data: User[] }> {
        let users = null;
        try {
            users = await this.usersRepository.find();
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return { data: users };
    }

    async findOne(id: string): Promise<{ data: User }> {
        let user = null;
        try{
            user = await this.usersRepository.findOne(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return { data: user };
    }

    async findOneByEmail(email: string): Promise<User> {
        let user = null;
        try{
            user = await this.usersRepository
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where('user.email = :email', {email})
                .getOne();
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return user;
    }

    async addUser(user: UserDto) {
        let result = null;
        try {
            //if (user.id) delete user.id;
            result = await this.usersRepository.save(user);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        delete result.password;
        return result;
    }

    // async updateUser(id: string, user: CreateUserDto) {
    //     let result = null;
    //     try {
    //         //if (user.id) delete user.id;
    //         result = await this.usersRepository.update(id, user);
    //     } catch (err) {
    //         throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    //     }
    //     return result;
    // }

    async deleteUser(id: string) {
        let result = null;
        try {
            result = await this.usersRepository.delete(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}
