export function imageCheck(files) {
  const { length } = files;
  const reader = new FileReader();
  if (length === 0) {
    return false;
  }
  const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const { size, type } = files[0];
  setData(null);
  // Limit to either image/jpeg, image/jpg or image/png file
  if (!fileTypes.includes(type)) {
    setErr("File format must be either png or jpg");
    return false;
  }
  // Check file size to ensure it is less than 2MB.
  if (size / 1024 / 1024 > 2) {
    setErr("File size exceeded the limit of 2MB");
    return false;
  }
  setErr(false);

  reader.readAsDataURL(files[0]);
  setFile(files[0]);
  reader.onload = (loadEvt) => {
    setData(loadEvt.target?.result);
  };
}
