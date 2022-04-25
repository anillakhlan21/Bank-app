import express from "express";
import { Transaction, TransactionTypes } from "../entities/transaction";
import {Client} from "../entities/client"

const rounter = express.Router();

rounter.post("/api/client/:clientId/transaction", async( req, res)=>{
    const { clientId } = req.params;
    const { type,amount} =req.body; 

    const client = await Client.findOne(parseInt(clientId));
    if(!client){
        return res.json({
            msg :"Client not found"
        })
    }
    const transaction = Transaction.create  ({
        amount,
        type,
        client
    });
    await transaction.save();

    if(type=== TransactionTypes.DEPOSIT){
        client.balance += amount;  
    }
    else if(type===TransactionTypes.WITHDRW){
        client.balance-=amount;
    }
    await client.save();

    return res.json({
        msg: "Transaction successful"
    })
})
export {
    rounter as createTransactionRouter
}