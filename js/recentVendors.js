$(document).ready(function () {

    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"
    }


    $.ajax({
        url: BASEURL + "admin/recentSite/",
        type: "get",
        dataType: "json",

        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },

        success: function (res, textStatus, xhr) {
            if (res.success && res.message === "success") {
                console.log(res.data)

                $.each(res.data, function (index) {
                    var image = ""
                    var status = ""
                    if (res.data[index].profilePhoto[0]) {
                        image = BASEURL + "profileimage/thumb/" + res.data[index].profilePhoto[0].image_name;
                    }
                    if (res.data[index].status === "pending") {
                        status = `<span class = "btn btn-warning btn-sm">${res.data[index].status||'N/A'}</span>`
                    } else if (res.data[index].status === "approved") {
                        status = `<span class = "btn btn-success btn-sm">${res.data[index].status||'N/A'}</span>`
                    } else {
                        status = `<span class = "btn btn-danger btn-sm">${res.data[index].status||'N/A'}</span>`
                    }

                    $('#recentSites').append(
                        `<div class="col-md-4">
                        <div class="card">
                            <img class="card-img-top" src="${image||'images/icon/nophoto.png'}" alt="Card image" height="200px">
                            <div class="card-body">
                                <h4 class="card-title mb-3">${res.data[index].storeName||'N/A'}</h4>
                                <h6 class="card-title mb-3">${res.data[index].ownersName||'N/A'}</h6>
                                <h6 class="card-title mb-3">${res.data[index].shopCategory||'N/A'}</h6>
                                <h6 class="card-title mb-3">${status}</h6>
                                <h6 class="card-title mb-3">${new Date(res.data[index].createdAt).toISOString().split(
                                    'T')[0]} </h6>
                                <a href="vendorDetail.html?id=${res.data[index]._id}"><button class="au-btn au-btn-load">Show Details</button></a>
                            </div>
                        </div>
                    </div>`
                    );


                });
            } else if (res.success && res.message === "No Data") {

            } else {
                alert(res.message);
            }
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Error in Operation");
        }
    });

})