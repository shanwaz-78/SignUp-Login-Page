window.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = `http://localhost:8081`;
  const form = document.getElementById("form");

  function getUserDetails(formElement) {
    const dataObject = {};
    const formData = new FormData(formElement);
    for (const [eachKey, eachValue] of formData) {
      dataObject[eachKey] = eachValue;
    }
    return dataObject;
  }

  function isValidEmail(userEmail) {
    const validEmail = /\w+(.|_)[a-z@]+\w\.(com)/gi;
    const isValid = validEmail.test(userEmail);
    return isValid;
  }

  async function postData(url, form) {
    try {
      const userDetails = getUserDetails(form);
      const isValidData = isValidEmail(userDetails.email);
      if (!isValidData) {
        alert(`Email is not in correct form`);
        return;
      }

      const requestHeader = {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json", 
        },
      };

      const response = await fetch(url, requestHeader);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error occurred while fetching data:", error.message);
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    postData(`${BASE_URL}/user/sign-up`, form);
  });
});
