'use strict';

var pagination = require('hexo-pagination');
var config = hexo.config;
var paginationDir = config.pagination_dir || 'page';

hexo.extend.generator.register('index', function(locals) {

  var posts = locals.posts;

  posts.data = posts.data.sort(function(a, b) {
    if (a.top && b.top) { // 两篇文章top都有定义
      if (a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排
      else return b.top - a.top; // 否则按照top值降序排
    } else if (a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）
      return -1;
    } else if (!a.top && b.top) {
      return 1;
    } else return b.date - a.date; // 都没定义按照文章日期降序排
  });

  return pagination('', posts, {
    perPage: config.per_page,
    layout: ['index'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
});
