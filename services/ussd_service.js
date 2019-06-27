const mysql = require('mysql2');

class Ussd{
    constructor(){

    }
    connect(text){
        return `CON ${text}`;
    }
    end(text){
        return `END ${text}`;
    }
    async db_connect(host, user, db, password){
        const connection  =  await mysql.createPool({host: host, user: user, database: database, password: password});
        return connection.promise();
    }
    async db_query(select, from, where, equal, promisePool){
        if(where && equal){
            return await promisePool.query(`SELECT ${select} FROM ${from} WHERE ${where}=${equal}`);
        }
        else{
            return await promisePool.query(`SELECT ${select} FROM ${from}`);
        }
    }
}