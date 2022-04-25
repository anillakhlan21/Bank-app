
import { createConnection} from "typeorm";
import { Banker } from "./entities/banker";
import {Client} from "./entities/client";
import { Transaction } from './entities/transaction';
import express from 'express';
import { createClientRouter } from "./routes/create-client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter} from "./routes/create_transaction";
import { connectBankerToClient} from "./routes/connect_banker_to_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_clients";

const app = express();
app.use(express.json());
app.use(createClientRouter);
app.use(createBankerRouter);
app.use(createTransactionRouter);
app.use(connectBankerToClient);
app.use(deleteClientRouter);
app.use(fetchClientRouter);
//connect typeORM to postgres  
const main = async()=>{  
    try {
            await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432, 
            username: "postgres", 
            password: "postgres",
            database: "postgres",
            entities: [Client,Banker,Transaction],
            synchronize:true
          });
         console.log("Connnected to postgres successfully");
        app.listen(8080,()=>{
            console.log("Now running on Port 8080")
        })
        
    } catch (error) {
        console.error(error);
    }
}
main(); 