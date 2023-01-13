export const sortDate = (a: any, b: any) => {
  var keyA = new Date(a.datetime),
    keyB = new Date(b.datetime);
  // Compare the 2 dates
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
};

export const getAllTables = (data: any[]) => {
  console.log('util', data);

  const tableList: any[] = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      Object.keys(data[i]).forEach((key) => {
        if (key.includes('table_')) {
          tableList.push(data[i][key]);
        }
      });
    }
  }
  return tableList;
};
