const result = {
  success: (message: string, data?: any) => {
    return {
      success: true,
      message,
      data,
    };
  },
  fail: (message: string, data?: any) => {
    return {
      success: false,
      message,
    };
  },
};

export default result;
