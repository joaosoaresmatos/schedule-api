module.exports = (sequelize, DataTypes) => {
    const ResourceType = sequelize.define(
        'ResourceType',
        {
            name: DataTypes.STRING
        },
        {
            sequelize,
            paranoid: true
        }
    );
    return ResourceType;
};
