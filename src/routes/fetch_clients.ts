import express, { Router } from "express";
import { Client } from "../entities/client";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get('/api/clients',async(req,res)=>{
    const client = await createQueryBuilder(
        'client'
    )
    .select('client.first_name')
    .addSelect('client.last_name')
    // .addSelect("SUM(transactions)","sum")
    .from(Client,'client')
    .where('client.id=:clientId',{ clientId:1 })
    .getOne()
    // console.log(client);
    return res.json(client);
})

export{
    router as fetchClientRouter
}