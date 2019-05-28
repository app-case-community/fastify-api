module.exports = () => {
    return (req, res, next) => {
        console.log('test middleware')
        next()
    }
}