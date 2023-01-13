export const sortDate =(a:any,b:any)=>{
    var keyA = new Date(a.datetime),
    keyB = new Date(b.datetime);
  // Compare the 2 dates
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
}