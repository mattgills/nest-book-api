import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum MediaType {
    PRINT = 'print',
    EBOOK = 'ebook',
    AUDIO = 'audio'
}

@Entity()
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar'
    })
    title: string;

    @Column({
        type: 'simple-array'
    })
    authors: string[];

    @Column({
        type: 'varchar',
        nullable: true
    })
    isbn: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    isbn13: string
    
    @Column({
        type: 'varchar'
    })
    publisher: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    edition: string

    @Column({
        type: 'decimal'
    })
    length: number;

    @Column({
        type: 'enum',
        enum: [MediaType.PRINT, MediaType.EBOOK, MediaType.AUDIO],
        default: MediaType.PRINT
    })
    media: MediaType;
}