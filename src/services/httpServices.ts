import instance from "../api/instance";

export const getServiceWithTokenParams = async (url: string, params: unknown) => {
  try {
    const response = await instance.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
      },
      params,
    });

    return {
      status: response.data.status,
      data: response.data,
      message: response.data.message,
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: 'Something Went Wrong. Please Try Again',
    };
  }
};

export const getService = async (url: string, params?: unknown) => {
  try {
    let response;
    if (params) {
      response = await instance.get(url, {
        params,
      });
    } else {
      response = await instance.get(url);
    }

    return {
      status: response.data.status,
      data: response.data,
      message: response.data.message,
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: 'Something Went Wrong. Please Try Again',
    };
  }
};