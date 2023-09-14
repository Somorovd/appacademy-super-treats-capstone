export const postReq = async (url, body) => {
  if (body instanceof FormData) {
    return await fetch(url, {
      method: "post",
      body: body,
    });
  } else {
    return await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
};

export const putReq = async (url, body) => {
  if (body instanceof FormData) {
    return await fetch(url, {
      method: "post",
      body: body,
    });
  } else {
    return await fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
};

export const deleteReq = async (url) => {
  return await fetch(url, { method: "delete" });
};
