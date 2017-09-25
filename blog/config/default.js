module.exports = {
    port: 3000,
    session: {
        secret: 'blog',
        key: 'blog',
        maxAge: 60 * 60 * 1000
    },
    mongodb: 'mongodb://localhost:27017/myblog'
};
