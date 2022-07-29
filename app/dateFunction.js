export const getDate = () => {
  let date = new Date(Date.now());
  let dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
};
