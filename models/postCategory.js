module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', {}, {
    timestamps: false,
    underscored: false,
    tableName: 'PostCategories',
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,
      { as: 'blog_posts', through: PostCategory, foreignKey: 'postId', otherKey: 'categoryId' });
    models.BlogPost.belongsToMany(models.Category,
      { as: 'categories', through: PostCategory, foreignKey: 'categoryId', otherKey: 'postId' });
  };

  return PostCategory;
};
