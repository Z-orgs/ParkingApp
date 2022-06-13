function Validator(formSelector) {
    function getParent(element, selector) {
        while(element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var formElement = document.querySelector(formSelector);
    var formRules = {};
  
    var validatorRules = {
        required: function (value) {
            return value ? undefined : `Can't be left blank!`;
        },
        user_name: function (value) {
            const userNameRegex = /^[a-zA-Z0-9\_]+$/;
            return userNameRegex.test(value) ? undefined : `Please re-enter your user name!`
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Password min ${min} characters!`
            }
        },
        max: function (max) {
            return function (value) {
                return value.length <= max ? undefined : `Password max ${max} characters!`
            }
        },
        comfirm: function (value) {
            return value == document.querySelector('#password').value ? undefined : `Invalid confirmation password!`
        },
        isFullName: function(value) {
            const regexName = /^[a-zA-Z ]{2,}$/g;
            return regexName.test(removeAscent(value)) ? undefined : `Full name invalid!`
        },
        isPhoneNumber: function(value) {
            const regexPhoneNumber = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
            return regexPhoneNumber.test(value) ? undefined : `Phone number invalid!`
        },
        isNumber: function(value) {
            const regex = /^[0-9]+$/
            return regex.test(value) ? undefined : `Value must be numeric!`
        }
    };
    
    // Nếu tồn tại formElement
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                rule.split(':');
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');
  
                if(isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }
                var ruleFn = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFn = ruleFn(ruleInfo[1]);
                }
                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFn);
                } else {
                    formRules[input.name] = [ruleFn];
                }
            }
  
            //Xử lí khi blur, click...
            input.onblur = handleValidate;
  
            input.oninput = handleClearError;
        }
  
        
        function handleValidate(e) {
            rules = formRules[e.target.name];
            var errorMsg;
            for (var rule of rules) {
                errorMsg = rule(e.target.value);
                if (errorMsg) break;
            }
  
            //Hiện thị lỗi ra UI
            if (errorMsg) {
                var formGroup = getParent(e.target, '.form-group');
                if (formGroup) {
                    formGroup.classList.add('invalid');
                    var formError = formGroup.querySelector('.error-msg')
                    if (formError) {
                        formError.innerHTML = errorMsg;
                    }
  
                }
            }
            return !errorMsg;
        }
  
        function handleClearError(e) {
            var formGroup = getParent(e.target, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                var formError = formGroup.querySelector('.error-msg')
                    if (formError) {
                        formError.innerHTML = '';
                    }
            }
        }

        function removeAscent (str) {
            if (str === null || str === undefined) return str;
             str = str.toLowerCase();
             str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
             str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
             str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
             str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
             str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
             str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
             str = str.replace(/đ/g, "d");
             return str;
         }
    }
}