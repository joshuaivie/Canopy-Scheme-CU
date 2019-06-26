export const capitalise = str =>
  str ? `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}` : undefined;

export const generateRandomString = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
  for (let i = 0; i < 15; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const shortenString = (str, length = 18) =>
  str.length > length ? `${str.substr(0, length - 3)}...` : str;
