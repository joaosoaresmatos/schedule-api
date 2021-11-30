module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define(
        'Schedule',
        {
            resourceId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            description: DataTypes.STRING,
            start: DataTypes.DATE,
            end: DataTypes.DATE
        },
        {
            sequelize,
            paranoid: true
        }
    );
    return Schedule;
};
