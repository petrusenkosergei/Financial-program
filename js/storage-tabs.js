var isTabTwoRendered = false;
$(document).ready(function () {
    $('.storage-tabs__link').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');
        $(currentAttrValue).addClass('display-flex').siblings('.storage-stats').removeClass('display-flex');
        $(currentAttrValue).removeClass('display-none').siblings('.storage-stats').addClass('display-none');
        $(this).parent('.storage-tabs__item').addClass('storage-tabs__item_active').siblings().removeClass('storage-tabs__item_active');

        if (!isTabTwoRendered && currentAttrValue=="#tab_two") {
            drawGraphReportMonth();
            isTabTwoRendered = true;
        }
        e.preventDefault();
    });
});
