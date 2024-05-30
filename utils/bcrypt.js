const bcryptjs = require('bcryptjs');

const encPass = (pass) => {
    return bcryptjs.hashSync(pass);
}

const checkPass = (pass,storePass) => {
    return bcryptjs.compareSync(pass, storePass);
}

module.exports = {encPass,checkPass}