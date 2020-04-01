$(document).ready(function () {

    var token = localStorage.getItem("token");
    if (token) {
        window.location.href = "index.html";
    }

    $("form.registerForm").on("submit", function (e) {
        e.preventDefault();
        firstName = $("#firstName").val();
        lastName = $("#lastName").val();
        contactAddress = $("#contactAddress").val();
        email = $("#email").val();
        username = $("#username").val();
        password = $("#password").val();

        data = {
            firstName: firstName,
            lastName: lastName,
            contactAddress: contactAddress,
            email: email,
            username: username,
            password: password
        };
        $.ajax({
            url: BASEURL + "admin/register",
            type: "post",
            dataType: "json",
            data: data,

            success: function (res, textStatus, xhr) {
                if (res.success) {
                    window.location.href = "login.html";
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