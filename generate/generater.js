const template = require('art-template')
const path = require('path')
const fs = require('fs')

const mysql = require('mysql2')

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'java',
    database: 'teaching_online'
});

function clearEmptyLine(str) {
    return str.replace(/\n(\n)*( )*(\n)*\n/g, '\n')
}

function genePlugins(tables) {
    const plugin_services = clearEmptyLine(template(__dirname + '/tpl/plugins/services.tpl', {
        tables
    }));
    fs.writeFileSync(path.resolve(__dirname, `../plugins/services.js`), plugin_services);
}

function geneModelAndService(table, columns) {
    const model = clearEmptyLine(template(__dirname + '/tpl/models/model.tpl', {
        table,
        columns
    }));
    const service = clearEmptyLine(template(__dirname + '/tpl/services/service.tpl', {
        table,
        columns
    }));
    fs.writeFileSync(path.resolve(__dirname, `../models/${table.Name}.js`), model);
    fs.writeFileSync(path.resolve(__dirname, `../services/${table.Name}.js`), service);
}

function copyCode() {
    fs.copyFileSync(path.resolve(__dirname, './tpl/services/base.service.js'), path.resolve(__dirname, '../services/base.service.js'));
}

const getTables = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err); // not connected!
            var options = { sql: 'select table_name as Name,table_comment as Comment from information_schema.tables where table_schema = database()' };
            connection.query(options, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                resolve(results)
            });
        })
    })
}

const getColumns = (tableName) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err); // not connected!
            // var options = { sql: `show columns from ${tableName} ` }
            const options = {
                sql: "select column_name as `Field`, column_default as `Default`, is_nullable as `Null`," +
                    "column_type as `Type`, column_comment as `Comment` from information_schema.columns " +
                    "where table_name = '" + tableName + "'"
            }
            connection.query(options, function (error, results, fields) {
                connection.release();
                if (error) reject(error);
                resolve(results)
            });
        })
    })
}

const generate = async () => {
    try {
        const tables = await getTables()
        for (let i = 0; i < tables.length; i++) {
            const columns = (await getColumns(tables[i].Name)).filter(c => c.Field !== 'id')
            console.log(columns)
            geneModelAndService(tables[i], columns);
        }
        genePlugins(tables);
        copyCode();
    } catch (error) {
        console.log(error)
    } finally {
        pool.end()
    }

}

generate()

