$(document).ready(function () {
    $('.slider').slick({
        arrows: false,
        dots: true,
        adaptiveHeight: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 1000,
        initialSlide: 1,
        autoplay: true,
        autoplay: 500,
        waitForAnimate: false,
        variableWidth: true,
        rows: 2,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                rows: 1,
                dots: false,
            }
        }]
    });
});

let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function () {
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');
    let comment = {
        name: commentName.value,
        body: commentBody.value,
        time: Math.floor(Date.now() / 1000)
    }
    if (commentName.value == '' | commentBody.value == '') {
        let commentField = document.getElementById('comment-field');
        err = 'Какое-то поле осталось пустым...';
        commentField.innerHTML = err;
    } else {
        commentName.value = '';
        commentBody.value = '';
        comments.push(comment);
        saveComments();
        showComments();
    }
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments() {
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function (item) {
        out += `<div class="text-right"> ${timeConverter(item.time)}</div>`
        out += `<div class="alert-primary" role="alert">${item.name}</div>`;
        out += `<div class="alert-success" role="alert">${item.body}</div>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let time = hour + ':' + min + ' ' + date + '.' + month + '.' + year;
    return time;
}
