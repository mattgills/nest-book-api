import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Reading } from "./reading.entity";

@Entity()
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'date'
    })
    date: Date;

    @Column({
        type: 'decimal'
    })
    quantity: number;

    @Column({
        type: 'text',
        nullable: true
    })
    notes: string;

    @ManyToOne(type => Reading, { nullable: false })
    @JoinColumn({ name: 'readingId' })
    reading: Reading;

    @ManyToOne(type => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User;
}