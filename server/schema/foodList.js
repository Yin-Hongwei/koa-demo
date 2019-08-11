/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('food_list', {
    id: {
      type: DataTypes.INTEGER, // 字段类型
      allowNull: false, // 是否允许为NULL
      primaryKey: true, // 主键
      autoIncrement: true // 是否自增
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    toggle: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    createdAt: 'create_time',
    updatedAt: 'update_time',
    tableName: 'food_list'
  })
}
