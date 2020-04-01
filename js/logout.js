$(document).ready(function () {
    var token = localStorage.getItem('token');

    $("#logout").click(function () {
        $.ajax({
            type: 'get',
            url: BASEURL + "admin/logout",
            beforeSend: function (xhr) {
                if (token) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
                }
            },
            success: function (res, textStatus, jqXHR) {
                if (res.success) {
                    alert(res.message);
                    localStorage.removeItem('token');
                    location.href = "login.html"
                } else {
                    alert(res.message);
                }
            },
            error: function () {
                console.log('Error in Operation');
            }
        });
    });

});