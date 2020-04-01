$(document).ready(function () {

    var token = localStorage.getItem("token");
    if (token) {
        window.location.href = "index.html";
    }

    $("form.loginForm").on("submit", function (e) {
        e.preventDefault();
        username = $("#username").val();
        password = $("#password").val();

        data = {
            username: username,
            password: password
        };
        $.ajax({
            url: BASEURL + "admin/login",
            type: "post",
            dataType: "json",
            data: data,

            success: function (res, textStatus, xhr) {
                if (res.success && res.token !== null) {
                    localStorage.setItem("token", res.token);
                    window.location.href = "index.html";
                    alert(res.message);
                } else {
                    alert(res.message);
                }
            },

            error: function (xhr, textStatus, errorThrown) {
                console.log("Error in Operation");
            }
        });
    });

})