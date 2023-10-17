import { UUIDV4 } from "sequelize";
import { sequelize, DataTypes } from "../Config/userConfig.js";

export const Assignment = sequelize.define("Assignment", {
   
    name: {
        type: DataTypes.STRING,
        
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        unique:true,
    },

    points: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 10,
        }
    ,
    },

    num_of_attempts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            min: 1,
            max: 3,
        },
    },

    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    createdBy:{
        type: DataTypes.STRING,
    }
}, {
    timestamps: true,
    createdAt: 'assignment_created',
    updatedAt: 'assignment_updated'
});
//