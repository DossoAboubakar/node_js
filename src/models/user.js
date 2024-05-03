/* Authentification : Créer un modèle User avec Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }
  ///REMARQUE: SEQUELIZE LUI MEME AJOUTE LES CHAMPS UPDATEDAT ET CREATEDAT DANS LA BD