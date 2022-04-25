import express, { Router } from 'express';

import {Client} from "../entities/client";
import {Banker} from "../entities/banker";

const router = express.Router();

router.put( "/api/banker/:bankerId/client/:clientId", async(req, res)=>{
    const { bankerId,clientId}= req.params;

    const client = await Client.findOne(parseInt(clientId));
    const banker = await Banker.findOne(parseInt(bankerId));

    if(!client || !banker){
        return res.json({
            msg: "bank or client not found"
        });
    }
    banker.clients = [ 

        client
    ]
    await banker.save();

    return res.json({
        msg:" Banker connected to client"
    })
})

export {
    router as connectBankerToClient
}