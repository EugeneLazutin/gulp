var imageType = /^image\//;

exports.file2base64 = file => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      reject('file is empty');
    }
  });
};

exports.isImage = file => {
  return imageType.test(file.type);
}