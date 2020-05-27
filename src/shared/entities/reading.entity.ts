import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Book } from "./book.entity";
import { User } from "./user.entity";

@Entity()
export class Reading {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'date'
    })
    start: Date;

    @Column({
        type: 'date',
        nullable: true
    })
    end: Date;
    
    @ManyToOne(type => Book, { nullable: false })
    @JoinColumn({ name: 'bookId' })
    bookId: Book;

    @ManyToOne(type => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    userId: User
}