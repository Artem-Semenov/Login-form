'use strict'
      const mainForm = document.forms.main;
      const loginInput = mainForm.login;
      const passwordInput = mainForm.password;
      const loginPlaceholder = mainForm.login.placeholder;
      const passwordPlaceholder = mainForm.password.placeholder;
      const successfullLogin = document.getElementById("overAll-wrapper");
      const submitButton = document.getElementById("submitButton");
      const passwordShow = document.getElementById("passwordIcon");


      class Form {
				
        validateInputs (loginInput, passwordInput) {
					if (!loginInput.value) {
          loginInput.classList.add("input_error");
          loginInput.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class ="input-error-missing-value">
                           <p>Заповніть поле!</p>
                        </div>`
          );
					return false
        } else if (!passwordInput.value) {
          passwordInput.classList.add("input_error");
          passwordInput.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class ="input-error-missing-value">
                           <p>Заповніть поле!</p>
                        </div>`
          );
					return false
        } else if (!this.emailTest(loginInput)) {
          loginInput.classList.add("input_error");
          if (!loginInput.nextElementSibling) {
            loginInput.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="login-error-invalid">
                           <p>Використовуйте лише латинські літери, цифри та символи @, $, _.</p>
                        </div>`
            );
          }
					return false
				}
				return true
				}

        emailTest(input) {
          const testEmail =
            /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          return testEmail.test(input.value);
        }

        validateData(users) {
          for (const el of users) {
            if (loginInput.value === el.login && passwordInput.value === el.password) {
              successfullLogin.classList.add(
                "successfullLogin-wrapper-display"
              );
              mainForm.parentElement.classList.add("form-wrapper-display-none");
              return;
            } else if (loginInput.value  === el.login) {
              loginInput.classList.remove("input_error");
              passwordInput.classList.add("input_error");
              if (!passwordShow.nextElementSibling) {
                passwordInput.parentElement.insertAdjacentHTML(
                  "beforeend",
                  `<div class="password-eror">
                           <p>Невірний пароль</p>
                        </div>`
                );
              }
              if (loginInput.nextElementSibling) {
                loginInput.nextElementSibling.remove();
              }
              return;
            } else {
              if (!loginInput.nextElementSibling) {
                loginInput.classList.add("input_error");
                loginInput.parentElement.insertAdjacentHTML(
                  "beforeend",
                  `<div class="login-error-missing">
      							<p>Такого лоігну не існує</p>
      						</div>`
                );
              }
            }
          }
        }
      
				submitForm() {
					if (this.validateInputs (loginInput, passwordInput) === true) {
						this.validateData (users)
					}
				}
       
        init() {
          mainForm.addEventListener("input", function (event) {
            if (loginInput.value || passwordInput.value) {
              submitButton.disabled = false;
            } else {
              submitButton.disabled = true;
            }
          });
    
          loginInput.addEventListener("focus", function (f) {
            loginInput.placeholder = "";
            loginInput.classList.add("input-focus-border");
            if (loginInput.nextElementSibling) {
              loginInput.nextElementSibling.remove();
            }
            loginInput.classList.remove("input_error");
          });
    
          loginInput.addEventListener("blur", function (f) {
            loginInput.classList.remove("input-focus-border");
            loginInput.placeholder = loginPlaceholder;
          });
    
          passwordInput.addEventListener("focus", function (f) {
            passwordInput.placeholder = "";
            passwordInput.classList.add("input-focus-border");
            if (passwordShow.nextElementSibling) {
              passwordShow.nextElementSibling.remove();
            }
            passwordInput.classList.remove("input_error");
          });
    
          passwordInput.addEventListener("blur", function (f) {
            passwordInput.placeholder = passwordPlaceholder;
            passwordInput.classList.remove("input-focus-border");
          });
    
          passwordShow.addEventListener("click", function (event) {
            event.preventDefault();
            if (passwordInput.type === "password") {
              passwordInput.type = "text";
              passwordShow.classList.add("passwordIconActive");
            } else {
              passwordInput.type = "password";
              passwordShow.classList.remove("passwordIconActive");
            }
          });
    
          
          
          mainForm.addEventListener("submit", function (event) {
            event.preventDefault();
         
          testForm.submitForm()
          });
        }
        
			}




      const users = [
        { login: "admin@gmail.com", password: "correctPassword" },
        { login: "correctLogin@gmail.com", password: "admin" },
        { login: "artem@gmail.com", password: "admin" },
        { login: "nikita@gmail.com", password: "admin" },
      ];
      
      const testForm = new Form();

      testForm.init()



