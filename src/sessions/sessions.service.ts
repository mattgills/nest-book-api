import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionDto } from 'src/shared/dtos/session.dto';
import { Session } from 'src/shared/entities/session.entity';
import { User } from 'src/shared/entities/user.entity';

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(Session)
        private sessionsRepository: Repository<Session>
    ) {}

    async findAll(user: User): Promise<Session[]> {
        let sessions = null;
        try {
            sessions = await this.sessionsRepository.find({ where: { user: user.id } });
        } catch(err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return sessions;
    }

    async findOne(id: string, user: User): Promise<Session> {
        let session = null;
        try{
            session = await this.sessionsRepository.findOne(id, { where: { user: user.id } });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return session;
    }

    async addSession(session: SessionDto) {
        let result = null;
        try {
            //if (session.id) delete session.id;
            result = await this.sessionsRepository.save(session);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async updateSession(id: string, session: SessionDto) {
        let result = null;
        try {
            //if (session.id) delete session.id;
            result = await this.sessionsRepository.update(id, session);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }

    async deleteSession(id: string) {
        let result = null;
        try {
            result = await this.sessionsRepository.delete(id);
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }
}
