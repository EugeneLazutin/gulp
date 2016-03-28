module.exports = errorMessage => {
  if(toastr) {
    toastr.error(errorMessage);
  } else {
    alert(errorMessage);
  }
};