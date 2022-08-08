/**
 * @param {directoryTree.DirectoryTree<IObj>} tree
 */
module.exports = function formatTree(tree) {
  let total = [];
  let maxLength = 0;

  /**
   * @param {directoryTree.DirectoryTree<IObj>} nextTree
   */
  function traverse(nextTree, path = []) {
    if (nextTree.children) {
      nextTree.children.forEach(item => {
        traverse(item, path.concat(nextTree.name));
      });
    } else {
      total.push(path.concat(nextTree.name));
    }
  }

  traverse(tree);

  total.forEach(item => {
    maxLength = Math.max(item.length, maxLength);
  });

  total.forEach((item, i) => {
    const prevLength = item.length;
    item.length = maxLength;
    item[maxLength - 1] = item[prevLength - 1];
    item = item.fill('', prevLength - 1, maxLength - 1);
  });

  const head = Array(maxLength).fill('文件夹');
  head[head.length - 1] = '文件';

  return [head, ...total];
};
