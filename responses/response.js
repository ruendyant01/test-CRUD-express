function response(code, messages, data) {
    return {
        code,
        messages,
        data
    }
}

module.exports = {response};