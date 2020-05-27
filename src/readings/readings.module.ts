import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reading } from "src/shared/entities/reading.entity";
import { ReadingsService } from "./readings.service";
import { ReadingsController } from "./readings.controller";
import { Session } from "src/shared/entities/session.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Reading]), TypeOrmModule.forFeature([Session])],
    providers: [ReadingsService],
    controllers: [ReadingsController]
})
export class ReadingsModule {}