export const classNameGenerator = (className) => {
  return className ? ` ${className}` : "";
};

export const getValidObjectValue = (key, obj) => {
  if (typeof obj === "object" && obj !== null) {
    return key in obj ? obj[key] : "";
  }
  return "";
};

export const convertErrors = (data) => {
  const err1 = getValidObjectValue("errors", data);
  const err2 = getValidObjectValue("message", data);
  if (err1) {
    let finalErr = [];
    for (let key in err1) {
      if (Array.isArray(err1[key])) {
        finalErr = [...finalErr, ...err1[key]];
      }
    }
    return finalErr;
  }
  if (err2) {
    return [err2];
  }
  return null;
};

export const errorsGenerator = (res) => {
  let messages = [];
  if (res.response && res.response.data) {
    const errors = convertErrors(res.response.data);
    if (errors === null || (Array.isArray(errors) && errors.length === 0)) {
      messages = ["Something went wrong!"];
    } else {
      messages = errors;
    }
  } else {
    messages = ["Something went wrong!"];
  }
  return messages;
};

export const setAuthHeader = (token) => {
  return {
    headers: {
      Authorization: token,
    },
  };
};
