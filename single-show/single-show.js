const backBtn = document.querySelector("#btn-back");
backBtn.addEventListener("click", () => {
  window.history.go(-1);
  return false;
});
