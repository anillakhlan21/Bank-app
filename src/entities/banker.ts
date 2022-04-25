import {Entity, Column,CreateDateColumn,UpdateDateColumn, ManyToMany, JoinTable, JoinColumn} from 'typeorm';
import { Client } from './client';
import {Person} from './utils/person'

@Entity('banker')
export class Banker extends Person{

    @Column({unique:true, length:10})
    employee_number:string;

    @ManyToMany(
        ()=> Client,
        
    )
    @JoinTable({
        name:"bankes_client",
        joinColumn:{
            name:"banker",
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name:'client',
            referencedColumnName:'id'
        }
    })
    clients: Client[]

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at : Date; 

}