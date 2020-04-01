$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");


    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"
    }






    $.ajax({
        url: BASEURL + "admin/singleSite/" + id,
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
                var image = ""
                var status = ""
                if (res.data.profilePhoto[0]) {
                    image = BASEURL + "profileimage/thumb/" + res.data.profilePhoto[0].image_name;
                }
                if (res.data.status === "pending") {
                    status = `<span class = "btn btn-warning btn-sm">${res.data.status||'N/A'}</span>`
                } else if (res.data.status === "approved") {
                    status = `<span class = "btn btn-success btn-sm">${res.data.status||'N/A'}</span>`
                } else {
                    status = `<span class = "btn btn-danger btn-sm">${res.data.status||'N/A'}</span>`
                }
                if (res.data.differentCorporateAddress) {
                    $('#corporateAddress').append(`
                    <div class="col col-md-4">
                    <label class=" form-control-label">Corporate Address</label>
                </div>
                <div class="col-12 col-md-8">
                <p class="form-control-static" id="blandmarkNearby">Landmark Nearby: ${res.data.corporateAddress.landmarkNearby || "N/A"}
                </p>
                <p class="form-control-static" id="bprovince">Province:  ${res.data.corporateAddress.province || "N/A"} </p>
                <p class="form-control-static" id="bmunicipality">Municipality:  ${res.data.corporateAddress.municipality || "N/A"}</p>
                <p class="form-control-static" id="bward"> Ward:  ${res.data.corporateAddress.ward || "N/A"} </p>
                <p class="form-control-static" id="barea">Area:  ${res.data.corporateAddress.area || "N/A"}</p>
                <p class="form-control-static" id="bfullAddress">Full Address:  ${res.data.corporateAddress.fulladdress || "N/A"}</p>
                </div>`);

                }



                $('#vendorName').append(res.data.storeName);

                $('#profilePhoto').html(`<img src="${image||'images/icon/nophoto.png'}" alt="John Smith">`);

                $('#storeName').html(res.data.storeName);
                $('#panVat').html(res.data.panVat || "N/A");
                $('#ownersName').html(res.data.ownersName || "N/A");
                $('#mobileNumber').html(res.data.mobileNumber || "N/A");
                $('#emailAdd').html(res.data.email || "N/A");
                $('#shopCategory').html(res.data.shopCategory || "N/A");
                $('#blandmarkNearby').append(res.data.businessAddress.landmarkNearby || "N/A");
                $('#bprovince').append(res.data.businessAddress.province || "N/A");
                $('#bmunicipality').append(res.data.businessAddress.municipality || "N/A");
                $('#bward').append(res.data.businessAddress.ward || "N/A");
                $('#barea').append(res.data.businessAddress.area || "N/A");
                $('#bfullAddress').append(res.data.businessAddress.fulladdress || "N/A");
                $('#status').html(status);
                $('#addedBy').html(`<a href="onborderDetail.html?id=${res.data.userId._id}">${res.data.userId.username || "N/A"}</a>`);
                $('#addedOn').html(new Date(res.data.createdAt).toISOString().split(
                    'T')[0]);

                if (res.data.storeLocation !== "null" || res.data.storeLocation) {
                    var mymap = L.map('mapid').setView([res.data.storeLocation.latitude, res.data.storeLocation.longitude],
                        13);
                    var marker = L.marker([res.data.storeLocation.latitude, res.data.storeLocation.longitude]).addTo(mymap);
                    marker.bindPopup("<b>This is Vendors Location.</b>").openPopup();
                    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: 'mapbox/streets-v11',
                        tileSize: 512,
                        zoomOffset: -1,
                        accessToken: 'pk.eyJ1IjoicmFqaXZwaGEiLCJhIjoiY2s4ZWVxbHJmMTU4bDNsbWo0ZDliNGJ3bSJ9.xFUMuBZ1le5RC1weV2daXw'
                    }).addTo(mymap);
                }

                if (res.data.insidePhotos.length) {

                    $.each(res.data.insidePhotos, function (index) {
                        var indexCounter = "";
                        var indexDiv = "";
                        var image = BASEURL + "insideimage/thumb/" + res.data.insidePhotos[index].image_name;
                        if (index === 0) {
                            indexCounter = `<li data-target="#InsidePhoto" data-slide-to="${index}" class="active"></li>`;
                            indexDiv = ` <div class="carousel-item active"> <img class="d-block w-100" src="${image}" alt="First slide"></div>`
                        } else {
                            indexCounter = `<li data-target="#InsidePhoto" data-slide-to="${index}"></li>`
                            indexDiv = ` <div class="carousel-item"> <img class="d-block w-100" src="${image}" alt="First slide"></div>`
                        }
                        $('#indexInside').append(indexCounter);
                        $('#imagesCarouselInside').append(indexDiv);
                    });
                } else {
                    $('#insidePhotosMainDiv').html(`<p><h6>No inside photos were added!</h6></p>`);

                }


                if (res.data.outsidePhotos.length) {
                    $.each(res.data.outsidePhotos, function (index) {
                        var indexCounter = "";
                        var indexDiv = "";
                        var image = BASEURL + "outsideimage/thumb/" + res.data.outsidePhotos[index].image_name;
                        if (index === 0) {
                            indexCounter = `<li data-target="#OutsidePhoto" data-slide-to="${index}" class="active"></li>`;
                            indexDiv = ` <div class="carousel-item active"> <img class="d-block w-100" src="${image}" alt="First slide"></div>`
                        } else {
                            indexCounter = `<li data-target="#OutsidePhoto" data-slide-to="${index}"></li>`
                            indexDiv = ` <div class="carousel-item"> <img class="d-block w-100" src="${image}" alt="First slide"></div>`
                        }
                        $('#indexOutside').append(indexCounter);
                        $('#imagesCarouselOutside').append(indexDiv);

                    });
                } else {
                    $('#outsidePhotosMainDiv').html(`<p><h6>No outside photos were added!</h6></p>`);
                }

                if (res.data.docsPhotos.length) {
                    $.each(res.data.docsPhotos, function (index) {
                        var indexCounter = "";
                        var indexDiv = "";
                        var image = BASEURL + "docsimage/thumb/" + res.data.docsPhotos[index].image_name;
                        if (index === 0) {
                            indexCounter = `<li data-target="#docsPhoto" data-slide-to="${index}" class="active"></li>`;
                            indexDiv = ` <div class="carousel-item active"> <img class="d-block w-100" src="${image}" alt="First slide"></div>`
                        } else {
                            indexCounter = `<li data-target="#docsPhoto" data-slide-to="${index}"></li>`
                            indexDiv = ` <div class="carousel-item"> <img class="d-block w-100" src="${image}" alt="First slide"></div>`
                        }
                        $('#indexDocs').append(indexCounter);
                        $('#imagesCarouselDocs').append(indexDiv);

                    });
                } else {
                    $('#docsPhotosMainDiv').html(`<p><h6>No photos of documents were added!</h6></p>`);
                }

            } else if (res.success && res.message === "No Data") {

            } else {
                alert(res.message);
            }
        },

        error: function (xhr, textStatus, errorThrown) {
            console.log("Error in Operation");
        }
    });



    $(document).on("click", ":submit", function (e) {
        e.preventDefault();


        status = $(this).val();
        remarks = $("#remarks").val();
        data = {
            username: remarks,
            status: status
        };
        $.ajax({
            url: BASEURL + "admin/updateStatus/" + id,
            type: "post",
            dataType: "json",
            data: data,
            beforeSend: function (xhr) {
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },

            success: function (res, textStatus, xhr) {
                if (res.success && res.message === "Status Changed Successfully") {
                    alert(res.message);
                    window.location.href = "index.html";
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