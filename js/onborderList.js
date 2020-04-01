$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var limit = urlParams.get("limit");


    var token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html"
    }


    $.ajax({
        url: BASEURL + "admin/getAllUsers?limit=" + limit,
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

                    $('#onborderList').append(

                        `  <tr>
                        <td>
                            <div class="table-data__info">
                                <h6>${res.data[index].firstName || ' - '} ${res.data[index].lastName || ' - '} </h6>
                                <span>
                                    <a href="#">${res.data[index].email || 'N/A'}</a>
                                </span>
                            </div>
                        </td>
                        <td> <span class = "block-email">${res.data[index].username||'N/A'}</span> 
                        </td> 
                        <td class = "desc" >${res.data[index].contactAddress||'N/A'}</td>
                        <td>
                        <span class="role member">${res.data[index].count}</span>    
                        </td>
                      
                        <td>${new Date(res.data[index].createdAt).toISOString().split(
                            'T')[0]} </td> 
                            <td ><div class = "table-data-feature">
                        <button class = "item" data - toggle = "tooltip"
                    data - placement = "top"
                    title = "" data - original - title = "Edit">
                        <i class = "zmdi zmdi-edit" > </i> 
                        </button> 
                     
                       <a href="onborderDetail.html?id=${res.data[index]._id}"> <button class = "item"
                    data - toggle = "tooltip"
                    data - placement = "top"
                    title = ""
                    data - original - title = "More" >
                        <i class = "zmdi zmdi-more"> </i> 
                        </button>
                        </a> 
                        </div> </td>
                    </tr>`



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