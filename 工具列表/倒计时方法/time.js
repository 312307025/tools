
/**
 * 倒计时方法
 * @param {Array} arr 存储对象，对象里面应该要有参数elem（是倒计时需要替换文本的节点）与value（倒计时的初始参数）与obj 配置对象（该对象会覆盖全局默认obj配置对象参数，对该elem进行特别配置的）
 * @param {Object} obj 配置对象，可设置的参数有onlyOneDayTempHtml（当倒计时不到1天的时候，使用该文本进行替换）、DayTempHtml（当倒计时超多1天使用该文本替换）。方法会自动替换DD,HH,MM,SS为对应文本的时间
 */
function startTime(arr, obj) {
    var today = new Date(),
        def = {
            onlyOneDayTempHtml: 'HH:MM:SS',
            dayTempHtml: '还有DD天'
        },
        def = $.extend({}, def, obj),
        format = function (str) {
            if (parseInt(str) < 10) {
                return "0" + str;
            }
            return str;
        },
        controller = function () {
            setTimeout(controller, 1000)
            today = new Date(today.getTime() + 1000)
            for (var i = 0, j = arr.length; i < j; i++) {
                var item = arr[i],
                    elem = $(item.elem),
                    value = item.value,
                    obj = def
                if(item.obj) {
                    obj = $.extend({}, def, item.obj)
                }
                var timeElem = new Date(value).getTime(),
                    timeold = timeElem - today.getTime(),
                    daysold = Math.floor(timeold / 1000 / 60 / 60 / 24),
                    hrsold = format(Math.floor(timeold / 1000 / 60 / 60 % 24)),
                    minsold = format(Math.floor(timeold / 1000 / 60 % 60)),
                    seconds = format(Math.floor(timeold / 1000 % 60))
                if (daysold == 0) {
                    // 如果总倒计时间小于1天
                    var tempHtml = obj.onlyOneDayTempHtml.replace('HH', hrsold)
                    tempHtml = tempHtml.replace('MM', minsold)
                    tempHtml = tempHtml.replace('SS', seconds)
                    elem.html(tempHtml)
                }
                else {
                    if (daysold < 0) {
                        var tempHtml = obj.onlyOneDayTempHtml.replace('HH', '00')
                        tempHtml = tempHtml.replace('MM', '00')
                        tempHtml = tempHtml.replace('SS', '00')
                        elem.html(tempHtml)
                    } else {
                        var tempHtml = obj.dayTempHtml.replace('DD', daysold)
                        tempHtml = tempHtml.replace('HH', hrsold)
                        tempHtml = tempHtml.replace('MM', minsold)
                        tempHtml = tempHtml.replace('SS', seconds)
                        elem.html(tempHtml)
                    }
                }
            }
        }
    // 假如时间存在初始值时使用初始值
    if (obj.time) {
        today = new Date(obj.time)
    }
    setTimeout(controller, 100)
}