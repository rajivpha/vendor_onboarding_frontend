$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    var id = "all";
    if (urlParams.get("id")) {
        id = urlParams.get("id");
    }


    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"
    }



    $.ajax({
        url: BASEURL + "admin/siteCount/" + id,
        type: "get",
        dataType: "json",

        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },

        success: function (res, textStatus, xhr) {
            if (res.success) {
                console.log(res)

                $('#totalCount').html(res.total);
                $('#pendingCount').html(res.pending);
                $('#approvedCount').html(res.approved);
                $('#rejectedCount').html(res.rejected);
            } else {
                alert(res.message);
            }
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Error in Operation");
        }
    });

})