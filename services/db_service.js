const mysql = require('mysql2');

class Dbase{

    constructor(host, user, datab, password){   
        this.host = host
        this.user = user
        this.datab = datab
        this.password = password 
    }
    //initiates the connection to the database
    async db_connect(){
        connection  =  await mysql.createPool({host: this.host, user: this.user, database: this.database, password: this.password});
        return connection.promise();
    }
    
    //trying to connect to the database upon initialization
    db_connect();
    
    //allows a user to write to the database
    async insert(promisePool,tableName, column_names, values){
        return await promisePool.query(`INSERT INTO ${tableName} (${column_names}) VALUES (${values})`);
    }
    //allows a user to view records depending on columns
    async select(promisePool, tableName, column_names){
        return await promisePool.query(`SELECT ${column_names} FROM ${tableName}`);
    }
    //allows a user to search through a database
    async search(promisePool, tableName, column_names, field_name, search_parameter){
        return await promisePool.query(`SELECT ${column_names} FROM ${tableName} WHERE ${field_name} LIKE ${search_parameter}`);
    }
    //allows user to update a table
    async update(promisePool, tableName, column_names, update_parameter, field_name, search_parameter){
        if(!field_name && ! search_parameter){
            return await promisePool.query(`UPDATE ${tableName} SET ${column_names} = ${update_parameter}`);
        }
        else{
            return await promisePool.query(`UPDATE ${tableName} SET ${column_names} = ${update_parameter} WHERE ${field_name} = ${search_parameter}`);
        }
    }
    //allows user to delete data
    async delete(tableName, column_names, del_parameter, field_name){
        if(field_name){
            if(!del_parameter && !field_name){
                return await promisePool.query(`DELETE ${column_names} FROM ${tableName}`);
            }
            else{
                //user should be very specific on what they are deleting
                return await promisePool.query(`DELETE ${column_names} FROM ${tableName} WHERE ${field_name}=${del_parameter}`);
            }
        }
        else{
            return await promisePool.query(`DELETE ${tableName}`);
        }
    }

    //extra functions for conditional reads
    
    //greater than
    async check_above(tableName, column_names, field_name, parameter){
        return await promisePool.query(`SELECT ${column_names} FROM ${tableName} WHERE ${field_name} > ${parameter}`);
    }
    //greater or equal
    async check_eq_above(tableName, column_names, field_name, parameter){
        return await promisePool.query(`SELECT ${column_names} FROM  ${tableName} WHERE ${field_name} >= ${parameter}`);
    }
    //less than
    async check_below(tableName, column_names, field_name, parameter){
        return await promisePool.query(`SELECT ${column_names} FROM ${tableName} WHERE ${field_name} < ${parameter}`);
    }
    //less than or eq
    async check_eq_below(tableName, column_names, field_name, parameter){
        return await promisePool.query(`SELECT ${column_names} FROM  ${tableName} WHERE ${field_name} <= ${parameter}`);
    }
    //equalTo almost like search()
    async check_eq(tableName, column_names, field_name, parameter){
        return await promisePool.query(`SELECT ${column_names} FROM ${tableName} WHERE ${field_name}=${parameter}`);
    }

}