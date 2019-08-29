$(document).ready(function () {
    $('.storage-action__item-share').mouseover(function () {
        $('.storage-action__links').removeClass('display-none').siblings().addClass('display-none');
    });
    $('.storage-action__item-share').mouseout(function () {
        $('.storage-action__links').addClass('display-none').siblings().removeClass('display-none');
    });

    $('#storage-action__files-backup').on('click', function () {
        window.location.href = '../storage/storage.zip';
    });
});