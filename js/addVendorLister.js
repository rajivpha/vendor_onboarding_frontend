$(document).ready(function () {
    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
    }

    $("form.addVendorLister").on("submit", function (e) {
        e.preventDefault();
        firstName = $("#firstName").val();
        lastName = $("#lastName").val();
        contactAddress = $("#contactAddress").val();
        email = $("#email").val();
        username = $("#username").val();

        data = {
            firstName: firstName,
            lastName: lastName,
            contactAddress: contactAddress,
            email: email,
            username: username
        };
        $.ajax({
            url: BASEURL + "admin/addListers",
            type: "post",
            dataType: "json",
            data: data,
            beforeSend: function (xhr) {
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },

            success: function (res, textStatus, xhr) {
                if (res.success) {
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