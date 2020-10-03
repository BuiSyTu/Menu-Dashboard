function createListItem(siteUrl, listName, itemProperties, success, failure) {
  $.ajax({
    url: siteUrl + "/_vti_bin/listdata.svc/" + listName,
    type: "POST",
    processData: false,
    contentType: "application/json;odata=verbose",
    data: JSON.stringify(itemProperties),
    headers: {
      Accept: "application/json;odata=verbose",
    },
    success: function (data) {
      success(data.d);
    },
    error: function (data) {
      failure(data.responseJSON.error);
    },
  });
}

function getListItemById(siteUrl, listName, itemId, success, failure) {
  var url = siteUrl + "/_vti_bin/listdata.svc/" + listName + "(" + itemId + ")";
  $.ajax({
    url: url,
    method: "GET",
    headers: { Accept: "application/json; odata=verbose" },
    success: function (data) {
      success(data.d);
    },
    error: function (data) {
      failure(data.responseJSON.error);
    },
  });
}

function updateListItem(
  siteUrl,
  listName,
  itemId,
  itemProperties,
  success,
  failure
) {
  getListItemById(
    siteUrl,
    listName,
    itemId,
    function (item) {
      $.ajax({
        type: "POST",
        url: item.__metadata.uri,
        contentType: "application/json",
        processData: false,
        headers: {
          Accept: "application/json;odata=verbose",
          "X-HTTP-Method": "MERGE",
          "If-Match": item.__metadata.etag,
        },
        data: Sys.Serialization.JavaScriptSerializer.serialize(itemProperties),
        success: function (data) {
          success(data);
        },
        error: function (data) {
          failure(data);
        },
      });
    },
    function (error) {
      failure(error);
    }
  );
}

function deleteListItem(siteUrl, listName, itemId, success, failure) {
  getListItemById(
    siteUrl,
    listName,
    itemId,
    function (item) {
      $.ajax({
        url: item.__metadata.uri,
        type: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "X-Http-Method": "DELETE",
          "If-Match": item.__metadata.etag,
        },
        success: function (data) {
          success();
        },
        error: function (data) {
          failure(data.responseJSON.error);
        },
      });
    },
    function (error) {
      failure(error);
    }
  );
}

function fillDashboard(data) {
    var temp = data.Link.split('#');
    var id = temp[1];
    var option = `<option selected class="option-dashboard-office-area" value="${id}">${data.Name}</option>`;
    $(".select-dashboard").append(option);
}

function fillOffice() {
  $.ajax({
    async: false,
    type: "GET",
    url: "/bcapi/dashboard/deployTeam",
    dataType: "json",
    success: function (response) {
      var data = response.result.Office;
      $(".label-type").text("Đơn vị");
      $(".select-office-area").append(
        `<option id="option-default-office-area" style="display:none;" selected>Chọn đơn vị</option>`
      );

      data.forEach((element) => {
        var option = `<option class="option-office-area" value="${element.OfficeCode}">${element.OfficeName}</option>`;
        $(".select-office-area").append(option);
      });
    },
  });
}

function fillArea() {
  $.ajax({
    async: false,
    type: "GET",
    url: "/bcapi/dashboard/deployTeam",
    dataType: "json",
    success: function (response) {
      var data = response.result.Area;
      $(".label-type").text("Địa bàn");
      $(".select-office-area").append(
        `<option id="option-default-office-area" style="display:none;" selected>Chọn địa bàn</option>`
      );

      data.forEach((element) => {
        var option = `<option class="option-office-area" value="${element.AreaCode}">${element.AreaName}</option>`;
        $(".select-office-office-area").append(option);
      });
    },
  });
}

function fillPermissionCheckBox() {
  $.ajax({
    async: false,
    type: "GET",
    url:
      "https://baocao.hanhchinhcong.net/_vti_bin/tdcore/usersservice.svc/Permissions?siteId=4e620731-b9fd-41f0-8377-eb55a769577c&orderby=Order",
    dataType: "json",
    success: function (response) {
      var data = response.result;

      data.forEach((element) => {
        $(".list-permission").append(`
                    <div class="form-group m-form__group row col-6">
                        <input type="checkbox" id="${element.Code}" class="Permission" value="${element.Code}" class="col-2 form-control">
                        <label for="${element.Code}" class="col-form-label col-5">${element.Name}</label><br>
                    </div>
                    `);
      });
    },
  });
}

function changeType() {
  var value = $(".select-type").val();
  $("#option-default-office-area").remove();
  $(".option-office-area").remove();
  switch (value) {
    case "Đơn vị":
      fillOffice();
      break;
    case "Địa bàn":
      fillArea();
      break;
  }
}

function getPermissionCheckBox() {
  var result = "";

  $(".Permission").each(function () {
    if ($(this).is(":checked")) result += `${this.value},`;
  });

  console.log(result);
  return result.substring(0, result.length - 1);
}

function getLink(id) {
    return `~sitecollection/Sitepages/dashboard.aspx#${id}`;
}

function fillPermissionSelect2() {
    $(".select-permission").select2();

    $.ajax({
        async: false,
        type: "GET",
        url:
          "/_vti_bin/tdcore/usersservice.svc/Permissions?siteId=4e620731-b9fd-41f0-8377-eb55a769577c&orderby=Order",
        dataType: "json",
        success: function (response) {
          var data = response.result;
    
          data.forEach((element) => {
            $(".select-permission").append(`
                <option value = ${element.Code} data-select2-id = ${element.Code}>${element.Title}</option>
                        `);
          });
        },
      });
}

function getPermissionSelect2() {
    var listPermissionSelected = $('.select-permission').find(':selected');
    var rs = "";
    if (listPermissionSelected){
        jQuery.each(listPermissionSelected, function( key, value ) {
            if(listPermissionSelected[key].value){
                var permission = listPermissionSelected[key].value+",";
                rs += permission;
            }
        });
    }
    return rs.substring(0, rs.length - 1);
}

function fillPermissionSelect2Data(visibleOnly) {
  $(".select-permission").select2();
  var permissions;
  if (visibleOnly) permissions = visibleOnly.split(',');
  
  if (permissions) {
    $.ajax({
      async: false,
      type: "GET",
      url:
        "/_vti_bin/tdcore/usersservice.svc/Permissions?siteId=4e620731-b9fd-41f0-8377-eb55a769577c&orderby=Order",
      dataType: "json",
      success: function (response) {
        var data = response.result;
  
        data.forEach((element) => {
          if (permissions.includes(element.Code)) {
            $(".select-permission").append(`
            <option selected value = ${element.Code} data-select2-id = ${element.Code}>${element.Title} </option>
                    `);
          } else {
            $(".select-permission").append(`
            <option value = ${element.Code} data-select2-id = ${element.Code}>${element.Title}</option>
                    `);
          }
        });
      },
    });
  }
}

function fillParent(data) {
    data.forEach((element) => {
        $(".select-parent").append(`
            <option value=${element.Code} data-select2-id="${element.ID}">${element.Title}</option>
                    `);
      });
}

function fillParentData(data, parent) {
  data.forEach((element) => {
    if (element.Title == parent.Parent?.LookupValue) {
      $(".select-parent").append(`
      <option selected value = ${element.Code} data-select2-id = "${element.ID}">${element.Title}</option>
              `);
    } 
    else {
      $(".select-parent").append(`
      <option value = ${element.Code} data-select2-id = "${element.ID}">${element.Title}</option>
              `);
    }
  });
}