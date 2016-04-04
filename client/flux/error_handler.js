module.exports = err => {
  if(toastr) {
    toastr.error(err.message);
  } else {
    alert(err.message);
  }
};