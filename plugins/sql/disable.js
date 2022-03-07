const config = require('../../config');
const { DataTypes } = require('sequelize');

const DisableDB = config.DATABASE.define('Disable', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

async function disableCommand(cmd) {
    var Plugin = await DisableDB.findAll({
        where: {command: cmd}
    });

    if (Plugin.length >= 1) {
        return false;
    } else {
        return await DisableDB.create({ command: cmd });
    }
}
module.exports = { DisableDB: DisableDB, disableCommand: disableCommand };
