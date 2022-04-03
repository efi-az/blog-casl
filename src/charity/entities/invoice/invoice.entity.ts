import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('invoice')
export class InvoiceEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column()
    departmentId: number
}