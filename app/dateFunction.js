export const getDate = () => {
  var date = new Date(Date.now());
  var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
};
