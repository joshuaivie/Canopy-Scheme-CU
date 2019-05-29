export const capitalise = str =>
  str ? `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}` : undefined;
