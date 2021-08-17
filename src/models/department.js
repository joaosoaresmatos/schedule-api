module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define(
        'Department',
        {
            name: DataTypes.STRING
        }
        // {
        //     freezeTableName: true
        // }
    );
    return Department;
};
