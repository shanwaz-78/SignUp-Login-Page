window.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = `http://localhost:8081`;
  const form = document.getElementById("login-form");

  function getFormData(form) {
    const dataObj = {};
    const formData = new FormData(form);
    for (const [eachKey, eachValue] of formData) {
      dataObj[eachKey] = eachValue;
    }
    return dataObj;
  }

  async function submitFormData(url) {
    const dataObj = getFormData(form);
    try {
      const requestHeader = {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, requestHeader);
      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg.message);
      }
      const responseMsg = await response.json();
      console.log(responseMsg);
    } catch (error) {
      console.log(error.message);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitFormData(`${BASE_URL}/user/sign-in`);
  });
});
