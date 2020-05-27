import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SessionsService } from "./sessions.service";
import { SessionsController } from "./sessions.controller";
import { Session } from "src/shared/entities/session.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    providers: [SessionsService],
    controllers: [SessionsController]
})
export class SessionsModule {}