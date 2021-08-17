module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            departmentId: DataTypes.INTEGER,
            userTypeId: DataTypes.INTEGER
        },
        {
            sequelize,
            paranoid: true
        }
    );
    return User;
};
