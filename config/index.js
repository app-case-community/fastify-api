module.exports = {
    sequelize: {
        // instance: 'teaching', // default sequelize
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'java',
        database: 'teaching_online',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        timezone: '+08:00'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
        // namespace: 'hello'
    }
}