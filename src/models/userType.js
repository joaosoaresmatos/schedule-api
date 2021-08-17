module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define(
        'UserType',
        {
            name: DataTypes.STRING
        }
    );
    return UserType;
};
