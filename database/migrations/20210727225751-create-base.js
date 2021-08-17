'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('departments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        });

        await queryInterface.createTable('userTypes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        });

        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            departmentId: {
                type: DataTypes.INTEGER,
                references: { model: 'departments', key: 'id' }
            },
            userTypeId: {
                type: DataTypes.INTEGER,
                references: { model: 'userTypes', key: 'id' }
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        });

        await queryInterface.createTable('resourceTypes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        });

        await queryInterface.createTable('resources', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            departmentId: {
                type: DataTypes.INTEGER,
                references: { model: 'departments', key: 'id' }
            },
            resourceTypeId: {
                type: DataTypes.INTEGER,
                references: { model: 'resourceTypes', key: 'id' }
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING
            },
            description: {
                allowNull: true,
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        });

        await queryInterface.createTable('schedules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            resourceId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                references: { model: 'resources', key: 'id' }
            },
            userId: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' }
            },
            description: {
                allowNull: true,
                type: DataTypes.STRING
            },
            start: {
                allowNull: false,
                type: DataTypes.DATE
            },
            end: {
                allowNull: false,
                type: DataTypes.DATE
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('schedules');
        await queryInterface.dropTable('resources');
        await queryInterface.dropTable('resourceTypes');
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('userTypes');
        await queryInterface.dropTable('departments');
    }
};
