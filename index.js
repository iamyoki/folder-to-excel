const prompts = require('prompts');
const generateExcelFile = require('./lib/generateExcelFile');
const fs = require('fs');
const getFolderStructure = require('./lib/getTree');
const formatTree = require('./lib/formatTree');

// generateExcelFile(data);

function main() {
  prompts([
    {
      type: 'text',
      name: 'foldername',
      message: '请输入或拖入文件夹',
      format: value => value.replace(/("|'|\s)/g, ''),
      validate: value => {
        const foldername = value.replace(/("|'|\s)/g, '');
        let stats;
        try {
          stats = fs.statSync(foldername);
        } catch {
          return `${foldername} 不存在`;
        }
        return stats.isDirectory() || `${foldername} 不是一个目录`;
      }
    },
    {
      type: 'text',
      name: 'filename',
      message: '请输入生成的文件名'
    }
  ]).then(({foldername, filename}) => {
    const tree = getFolderStructure(foldername);
    const data = formatTree(tree);
    generateExcelFile(data, filename);
    main();
  });
}

main();
