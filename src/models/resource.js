module.exports = (sequelize, DataTypes) => {
    const Resource = sequelize.define(
        'Resource',
        {
            departmentId: DataTypes.INTEGER,
            resourceTypeId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            description: DataTypes.STRING
        },
        {
            sequelize,
            paranoid: true
        }
    );
    return Resource;
};
