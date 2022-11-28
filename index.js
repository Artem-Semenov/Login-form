"use strict";
const users = [
  { login: "admin@gmail.com", password: "correctPassword" },
  { login: "correctLogin@gmail.com", password: "admin" },
  { login: "artem@gmail.com", password: "admin" },
  { login: "nikita@gmail.com", password: "admin" },
];

class Form {
  Init() {
    this._getElements();
    this._addEventListeners();
  }
  _getElements() {
    this.mainForm = document.forms.main;
    this.loginInput = this.mainForm.login;
    this.passwordInput = this.mainForm.password;
    this.loginPlaceholder = this.mainForm.login.placeholder;
    this.passwordPlaceholder = this.mainForm.password.placeholder;
    this.successfullLogin = document.getElementById("overAll-wrapper");
    this.submitButton = document.getElementById("submitButton");
    this.passwordShow = document.getElementById("passwordIcon");
  }

  _addEventListeners() {
    this.mainForm.addEventListener("input", (e) => {
      if (this.loginInput.value || this.passwordInput.value) {
        this.submitButton.disabled = false;
      } else {
        this.submitButton.disabled = true;
      }
    });

    this.loginInput.addEventListener("focus", (e) => {
      this.loginInput.placeholder = "";
      this.loginInput.classList.add("input-focus-border");
      if (this.loginInput.nextElementSibling) {
        this.loginInput.nextElementSibling.remove();
      }
      this.loginInput.classList.remove("input_error");
    });

    this.loginInput.addEventListener("blur", (e) => {
      this.loginInput.classList.remove("input-focus-border");
      this.loginInput.placeholder = this.loginPlaceholder;
    });

    this.passwordInput.addEventListener("focus", (e) => {
      this.passwordInput.placeholder = "";
      this.passwordInput.classList.add("input-focus-border");
      if (this.passwordShow.nextElementSibling) {
        this.passwordShow.nextElementSibling.remove();
      }
      this.passwordInput.classList.remove("input_error");
    });

    this.passwordInput.addEventListener("blur", (e) => {
      this.passwordInput.placeholder = this.passwordPlaceholder;
      this.passwordInput.classList.remove("input-focus-border");
    });

    this.passwordShow.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.passwordInput.type === "password") {
        this.passwordInput.type = "text";
        this.passwordShow.classList.add("passwordIconActive");
      } else {
        this.passwordInput.type = "password";
        this.passwordShow.classList.remove("passwordIconActive");
      }
    });

    this.mainForm.addEventListener("submit", (e) => {
      e.preventDefault();

      this._submitForm();
    });
  }

  _validateInputs(loginInput, passwordInput) {
    if (!loginInput.value) {
      loginInput.classList.add("input_error");
      loginInput.parentElement.insertAdjacentHTML(
        "beforeend",
        `<div class ="input-error-missing-value">
                           <p>Заповніть поле!</p>
                        </div>`
      );
      return false;
    } else if (!passwordInput.value) {
      passwordInput.classList.add("input_error");
      passwordInput.parentElement.insertAdjacentHTML(
        "beforeend",
        `<div class ="input-error-missing-value">
                           <p>Заповніть поле!</p>
                        </div>`
      );
      return false;
    } else if (!this._emailTest(loginInput)) {
      loginInput.classList.add("input_error");
      if (!loginInput.nextElementSibling) {
        loginInput.parentElement.insertAdjacentHTML(
          "beforeend",
          `<div class="login-error-invalid">
                           <p>Використовуйте лише латинські літери, цифри та символи @, $, _.</p>
                        </div>`
        );
      }
      return false;
    }
    return true;
  }

  _emailTest(input) {
    const testEmail =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return testEmail.test(input.value);
  }

  _validateData(users) {
    for (const el of users) {
      if (
        this.loginInput.value === el.login &&
        this.passwordInput.value === el.password
      ) {
        this.successfullLogin.classList.add("successfullLogin-wrapper-display");
        this.mainForm.parentElement.classList.add("form-wrapper-display-none");
        return;
      } else if (this.loginInput.value === el.login) {
        this.loginInput.classList.remove("input_error");
        this.passwordInput.classList.add("input_error");
        if (!this.passwordShow.nextElementSibling) {
          this.passwordInput.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="password-eror">
                           <p>Невірний пароль</p>
                        </div>`
          );
        }
        if (this.loginInput.nextElementSibling) {
          this.loginInput.nextElementSibling.remove();
        }
        return;
      } else {
        if (!this.loginInput.nextElementSibling) {
          this.loginInput.classList.add("input_error");
          this.loginInput.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="login-error-missing">
      							<p>Такого лоігну не існує</p>
      						</div>`
          );
        }
      }
    }
  }

  _submitForm() {
    if (this._validateInputs(this.loginInput, this.passwordInput)) {
      this._validateData(users);
    }
  }
}

const testForm = new Form();

testForm.Init();
