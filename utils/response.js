function forge(message,data = []){
    const resp = {
        message: message,
        data: data
    };
    return resp
}

module.exports = {
    forge
}