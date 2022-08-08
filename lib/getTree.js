const fs = require('fs');
const path = require('path');
const dirTree = require('directory-tree');

module.exports = function getTree(foldername) {
  const tree = dirTree(foldername, {
    attributes: ['type', 'birthtime']
  });
  return tree;
};
