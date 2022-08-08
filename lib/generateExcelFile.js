const XLSX = require('xlsx');
const path = require('path');
const os = require('os');

const desktopDir = `${os.homedir()}/Desktop`;

/**
 *
 * @param {string[][]} data
 */
module.exports = function generateExcelFile(
  data,
  filename = 'folder_to_excel.xlsx'
) {
  if (!path.extname(filename)) {
    filename = path.format({name: filename, ext: '.xlsx'});
  }

  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  // const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet);

  XLSX.writeFile(workbook, path.resolve(desktopDir, filename));

  console.log(`\n成功生成: ${filename} 到你的桌面啦\n`);
};
