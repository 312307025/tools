function startScroll(elem, callback, before) {
    var scroll = $(elem)

    // 假如数据没铺满页面 继续加载数据直至铺满为止 假如该页面无数据的话，则不需要运行该方法
    checkScroll(scroll)

    //上拉加载
    scroll.on("scroll", function () {
        checkScroll($(this));
    });
    //判断是否需要ajax数据
    var isRun = false
    function checkScroll(scroll) {
        var scrollTop, clientHeight, scrollHeight
        if (scroll.is(document)) {
            scrollTop = document.documentElement.scrollTop  // 滚动高度
            clientHeight = document.documentElement.clientHeight  // 可视高度
            scrollHeight = document.body.clientHeight  // 内容高度
        } else {
            scrollTop = scroll[0].scrollTop  // 滚动高度
            clientHeight = scroll[0].clientHeight  // 可视高度
            scrollHeight = scroll[0].scrollHeight  // 内容高度
        }
        if (isRun) return "已经在加载数据";
        if (scrollTop + clientHeight + 100 > scrollHeight) {
            //关闭拿ajax数据入口
            isRun = true;

            // 进行ajax前运行该方法
            before && before()

            //进行ajax拿数据
            callback(function () {
                isRun = false;
                checkScroll(scroll)
            })
        }
    }
}
// 显示或隐藏数据加载栏
function loadmore(elem, blooean) {
    $(elem).find('.loadmore').remove()
    if (blooean) {
        $(elem).append('<div class="loadmore" style="text-align: center;line-height: 50px;"><div class="text">正在加载更多数据</div></div>')
    } else {
        $(elem).append('<div class="loadmore" style="text-align: center;line-height: 50px;"><div class="text">已经没有更多了</div></div>')
    }
}