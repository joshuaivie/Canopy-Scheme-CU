export const validateMatricNo = matricNo => {
  const result = { error: false, msg: "" };
  if (matricNo === null || matricNo === undefined) {
    result.error = true;
    result.msg = "Matriculation number is required.";
  }
  matricNo = matricNo.toLowerCase();
  const verify = /(1[1-4]|1[6-8])([a-z]{2})([0-9]{6})$|(15)([a-z]{2})([0-9]{5})$/;
  if (matricNo.match(verify)) {
    result.msg = "Matriculation number found!";
  } else {
    result.error = true;
    result.msg = "Matriculation number is invalid.";
  }
  return result;
};
