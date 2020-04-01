$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");

    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"
    }

    $.ajax({
        url: BASEURL + "admin/userDetail/" + id,
        type: "get",
        dataType: "json",
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },

        success: function (res, textStatus, xhr) {
            if (res.success && res.message === "success") {

                $('#user_email').html(res.data.email);
                $('#user_username').html(res.data.username);
                $('#user_fullname').html(res.data.name);
                $('#user_contactAddress').html(res.data.contactAddress);


                $('#user_createdAt').html(new Date(res.data.createdAt).toISOString().split(
                    'T')[0]);
            } else {
                alert(res.message);
            }
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Error in Operation");
        }
    });

    $.ajax({
        url: BASEURL + "admin/getVendorsByUser/" + id,
        type: "get",
        dataType: "json",
        beforeSend: function (xhr) {
            if (token) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },

        success: function (res, textStatus, xhr) {
            if (res.success && res.message === "success") {

                $.each(res.data, function (index) {
                    var image = ""
                    var status = ""
                    if (res.data[index].profilePhoto[0]) {
                        image = BASEURL + "profileimage/thumb/" + res.data[index].profilePhoto[0].image_name;
                    }

                    if (res.data[index].status === "pending") {

                        status = `<span class = "btn btn-warning btn-sm">${res.data[index].status||'N/A'}</span>`

                        $('#pendingSiteLists').append(
                            ` <tr class = "tr-shadow">
                            <td><img src="${image||'images/icon/nophoto.png'}" alt="No Photo" height="100px" width="100px"></td> 
                            <td>
                            <span class = "block-email">${res.data[index].storeName||'N/A'}</span> 
                            </td> 
                            <td class = "desc" >${res.data[index].ownersName||'N/A'}</td> 
                            <td >${res.data[index].shopCategory||'N/A'}</td> 
                            <td class = "desc">${res.data[index].userId.username||'N/A'}</td> 
                            <td>${new Date(res.data[index].createdAt).toISOString().split(
                                'T')[0]} </td> 
                                <td>${status}</span> 
                            </td> 
                            <td ><div class = "table-data-feature">
                            <a href="vendorDetail.html?id=${res.data[index]._id}">
                         
                            <button class = "item"
                        data - toggle = "tooltip"
                        data - placement = "top"
                        title = ""
                        data - original - title = "More" >
                            <i class = "zmdi zmdi-more"> </i> 
                            </button> </a>
                            </div> </td> </tr> <tr class = "spacer"> </tr>`
                        );
                    } else if (res.data[index].status === "approved") {

                        status = `<span class = "btn btn-success btn-sm">${res.data[index].status||'N/A'}</span>`

                        $('#approvedSiteLists').append(
                            ` <tr class = "tr-shadow">
                            <td><img src="${image||'images/icon/nophoto.png'}" alt="No Photo" height="100px" width="100px"></td> 
                            <td>
                            <span class = "block-email">${res.data[index].storeName||'N/A'}</span> 
                            </td> 
                            <td class = "desc" >${res.data[index].ownersName||'N/A'}</td> 
                            <td >${res.data[index].shopCategory||'N/A'}</td> 
                            <td class = "desc">${res.data[index].userId.username||'N/A'}</td> 
                            <td>${new Date(res.data[index].createdAt).toISOString().split(
                                'T')[0]} </td> 
                                <td>${status}</span> 
                            </td> 
                            <td ><div class = "table-data-feature">
                            <a href="vendorDetail.html?id=${res.data[index]._id}">
                            <button class = "item"
                        data - toggle = "tooltip"
                        data - placement = "top"
                        title = ""
                        data - original - title = "More" >
                            <i class = "zmdi zmdi-more"> </i> 
                            </button> </a>
                            </div> </td> </tr> <tr class = "spacer"> </tr>`
                        );
                    } else {

                        status = `<span class = "btn btn-danger btn-sm">${res.data[index].status||'N/A'}</span>`

                        $('#rejectedSiteLists').append(
                            ` <tr class = "tr-shadow">
                            <td><img src="${image||'images/icon/nophoto.png'}" alt="No Photo" height="100px" width="100px"></td> 
                            <td>
                            <span class = "block-email">${res.data[index].storeName||'N/A'}</span> 
                            </td> 
                            <td class = "desc" >${res.data[index].ownersName||'N/A'}</td> 
                            <td >${res.data[index].shopCategory||'N/A'}</td> 
                            <td class = "desc">${res.data[index].userId.username||'N/A'}</td> 
                            <td>${new Date(res.data[index].createdAt).toISOString().split(
                                'T')[0]} </td> 
                                <td>${status}</span> 
                            </td> 
                            <td ><div class = "table-data-feature">
                            <a href="vendorDetail.html?id=${res.data[index]._id}"> 
                         
                            <button class = "item"
                        data - toggle = "tooltip"
                        data - placement = "top"
                        title = ""
                        data - original - title = "More" >
                            <i class = "zmdi zmdi-more"> </i> 
                            </button> </a>
                            </div> </td> </tr> <tr class = "spacer"> </tr>`
                        );
                    }
                });
            } else {
                alert(res.message);
            }
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Error in Operation");
        }
    });

})