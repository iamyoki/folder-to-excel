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
      total.push(path.concat(nextTree.name, nextTree.birthtime));
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
    item[maxLength - 2] = item[prevLength - 2];
    item[maxLength - 1] = new Date(item[maxLength - 1]).toLocaleString()
    item = item.fill('', prevLength - 2, maxLength - 2);
  });

  const head = Array(maxLength).fill('文件夹');
  head[head.length - 2] = '文件';
  head[head.length - 1] = '创建时间';

  return [head, ...total];
};
