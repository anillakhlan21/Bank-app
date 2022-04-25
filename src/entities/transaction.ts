import { BaseEntity,Column, Entity, PrimaryGeneratedColumn,ManyToOne, JoinColumn} from 'typeorm'
import { Client } from '../entities/client';

export enum TransactionTypes{
    DEPOSIT='deposit',
    WITHDRW='withdraw'
}


@Entity('transaction')
export class Transaction extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"enum", enum:TransactionTypes})
    type:string;

    @Column({type:'numeric'})
    amount:number;

    @ManyToOne(
        ()=>Client,
        client => client.transactions,
        {
            onDelete:"SET NULL"
        }
    )
    @JoinColumn({
        name:'client_id'
    })   
    client: Client; 

}
