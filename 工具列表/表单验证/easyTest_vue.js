/**
 * 测试用的表单验证方法
 * 最好是在项目里面使用继承后的test.js方法来使用，通过继承改写errorTip来自定义修改错误提示方法，或者添加验证方法
 * 用在一些数据驱动的js代码，比如小程序、vue等。不太适和用于jq直接操作dom的方式
 * v1.00 初步版本 未测试
 * 来自 张俊斌
 */

class EasyTest {
    constructor() {

    }

    /**
     * 验证方法
     * 传入formObj参数
     * formObj的参数样例
       formObj = {
        name: {
          method: 'required',
          regex: /^[0-9]*$/,
          tip: '请输入用户名',
          tip_regex: '只能输入数字',
          value: ''
        },
        levelIndex: {
          method: 'required|number',
          tip: '请选择会员等级',
          tip_required: '必须输入会员等级',
          tip_number: '必须是数字',
          value: 0
        },
        email: {
          method: 'required|email|equalTo',
          equalTo: 'levelIndex',
          tip: '请输入邮箱2',
          tip_required: '必须输入邮箱2',
          tip_email: '必须是邮箱',
          tip_equalTo: 'email与levelIndex不一样',
          value: '0'
        }
       }
     */
    validate(formObj) {
        let returnObj = {}
        for (let key in formObj) {
            let item = formObj[key]
            let methodArr = item.method.split('|')
            let ok = true
            for (let i = 0; i < methodArr.length; i++) {
                let method = methodArr[i]
                if (this[method] && !this[method].call(this, item, method, formObj)) {
                    return this.errorController(item, method, formObj)
                }
            }
            if (item.regex) {
                let reg = new RegExp(item.regex)
                if (!reg.test(item.value)) {
                    return this.errorController(item, 'regex', formObj)
                }
            }
            returnObj[key] = item.value
        }
        return returnObj
    }

    required(item, regex, formObj) {
        if (!item.value && item.value !== 0) return false
        return true
    }
    email(item, regex, formObj) {
        if (!this.required(item) || /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(item.value)) return true
        return false
    }
    number(item, regex, formObj) {
        if (!this.required(item) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(item.value)) return true
        return false
    }
    tel(item, regex, formObj) {
        if (!this.required(item) || /^1\d{10}$/.test(item.value)) return true
        return false
    }
    pwd(item, regex, formObj) {
        if (!this.required(item) || /^(\w){6,20}$/.test(item.value)) return true
        return false
    }
    equalTo(item, regex, formObj) {
        let equalToItem = formObj[item.equalTo]
        if (item.value === equalToItem.value) return true
        return false
    }

    errorController(item, method, formObj) {
        var label = 'tip_' + method
        if (!item[label] && item[label] !== 0) {
            return this.errorTip(item.tip, item)
        } else {
            return this.errorTip(item[label], item)
        }
    }
    errorTip(msg, item) {
        console.log(msg)
        return false
    }
}

export { EasyTest }