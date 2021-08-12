function Validator (options) {

    function  validate (inputElement,rule) {
        const errorMessage =rule.test(inputElement.value);
        const errorElement =inputElement.parentElement.querySelector(options.errorSelector);
        if (errorMessage) {
            errorElement.innerText=errorMessage;
            inputElement.parentElement.classList.add('invalid')
        }else {
            errorElement.innerText='';
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    const formElement = document.querySelector(options.form);

    if (formElement)
    {
        options.rules.forEach(function(rule){
            const inputElement = formElement.querySelector(rule.selector);
            
            if(inputElement) {
                inputElement.addEventListener('blur',function(){
                    validate(inputElement,rule);
                })

                inputElement.addEventListener('input',function(){
                    const errorElement =inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText='';
                    inputElement.parentElement.classList.remove('invalid')
                })
            }

            
        })
    }

}


Validator.isRequired = function (selector) {
    return {
        selector:selector,
        test:function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector:selector,
        test:function (value) {
            const regex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        }
    }
}

Validator.isPassword = function (selector,min) {
    return {
        selector:selector,
        test:function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
}

Validator.isPasswordComfirm = function (selector,passwordComfirm) {
    return {
        selector:selector,
        test:function (value) {
            return  value === passwordComfirm() ? undefined : 'Mật khẩu không chính xác';
        }
    }
}