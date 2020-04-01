$(document).ready(function () {
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"
    }

    $.ajax({
        url: BASEURL + "admin/profile",
        type: "get",
        dataType: "json",
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },

        success: function (res, textStatus, xhr) {
            if (res.success) {

                $('#name').html(res.username);
                $('#fname').html(res.name);
                $('.email').html(res.email);

                $('#email').html(res.email);
                $('#username').html(res.username);
                $('#fullname').html(res.name);
                $('#contactAddress').html(res.contactAddress);


                $('#createdAt').html(new Date(res.createdAt).toISOString().split(
                    'T')[0]);
            } else {
                alert(res.message);
            }
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Error in Operation");
        }
    });

})