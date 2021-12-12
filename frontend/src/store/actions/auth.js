export const addPhone = function (phone) {
  return {
    type: "ADD_PHONE",
    phone
  }
};
export const deletePhone = function (phone) {
  return {
    type: "DELETE_PHONE",
    phone
  }
};
