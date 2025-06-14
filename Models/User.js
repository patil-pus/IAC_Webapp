import  {sequelize , DataTypes}  from "../Config/userConfig.js";

export const User= sequelize.define( "User",{

      first_name:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        },
      }, 

      last_name:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        },
      },

      email:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        },
      },

      password:  {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
        },
        
        account_created: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        account_updated: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
},
});