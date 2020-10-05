// Hàm dùng để tạo 1 phần tử trong list sharepoint
function createListItem(siteUrl, listName, itemProperties, success, failure) {
  var url = `${siteUrl}/_vti_bin/listdata.svc/${listName}`;
  $.ajax({
    url: url,
    type: "POST",
    processData: false,
    contentType: "application/json; odata=verbose",
    data: JSON.stringify(itemProperties),
    headers: {
      Accept: "application/json; odata=verbose",
    },
    success: function (data) {
      success(data.d);
    },
    error: function (data) {
      failure(data.responseJSON.error);
    },
  });
}

// Lấy 1 phần tử trong list sharepoint
function getListItemById(siteUrl, listName, itemId, success, failure) {
  var url = `${siteUrl}/_vti_bin/listdata.svc${listName}(${itemId})`;
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

// Sửa 1 phần tử trong list sharepoint
function updateListItem(siteUrl, listName, itemId, itemProperties, success, failure) {
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

// Xóa 1 phần tử trong list sharepoint
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

// Lấy code từ thẻ select-office-area
// Fill Dashboard từ giá trị nhận được đó
// Dùng chính trong hàm thêm dashboard, cũng có thể dùng trong hàm sửa dashboard
function fillDashboard(obj) {
  var code = obj.value;

  $(".option-dashboard-office-area").remove();
  $("#option-default-office-area").remove();
  var type1 = $(".select-type").val();
  if (type1 == "Đơn vị") {
    fillDashboardOffice(code);
  }

  if (type1 == "Địa bàn") {
    fillDashboardArea(code);
  }
}

// Lấy dữ liệu và đổ giá trị ra thẻ select-dashboard
// Kích hoạt khi giá trị thẻ select-type là "Đơn vị"
function fillDashboardOffice(code) {
  var url = `/bcapi/dashboard/office/${code}`;
  $.ajax({
    async: false,
    type: "GET",
    url: url,
    dataType: "json",
    success: function (response) {
      var data = response.result;
      $(".label-type").text("Đơn vị");

      var defaultOption = `<option id="option-default-office-area" style="display:none;" selected>Chọn đơn vị</option>`;
      $(".select-dashboard").append(defaultOption);

      data.forEach((element) => {
        var option = `<option class="option-office-area" value="${element.ID}">${element.Title}</option>`;
        $(".select-dashboard").append(option);
      });
    },
  });
}


// Lấy dữ liệu và đổ giá trị ra thẻ select-dashboard
// Kích hoạt khi giá trị thẻ select-type là "Địa bàn"
function fillDashboardArea(code) {
  var url = `/bcapi/dashboard/area/${code}`;

  $.ajax({
    async: false,
    type: "GET",
    url: url,
    dataType: "json",
    success: function (response) {
      var data = response.result;
      $(".label-type").text("Địa bàn");

      var defaultOption = `<option id="option-default-office-area" style="display:none;" selected>Chọn địa bàn</option>`;
      $(".select-dashboard").append(defaultOption);

      data.forEach((element) => {
        var option = `<option class="option-office-area" value="${element.ID}">${element.Title}</option>`;
        $(".select-dashboard").append(option);
      });
    },
  });
}

// Được gọi ở hàm changType() bên dưới nếu giá trị type là office
// Đổ ra các đơn vị có dashboard
function fillOffice() {
  $.ajax({
    async: false,
    type: "GET",
    url: "/bcapi/dashboard/deployTeam",
    dataType: "json",
    success: function (response) {
      var data = response.result.Office;
      $(".label-type").text("Đơn vị");

      var defaultOption = `<option id="option-default-office-area" style="display:none;" selected>Chọn đơn vị</option>`;
      $(".select-office-area").append(defaultOption);

      data.forEach((element) => {
        var option = `<option class="option-office-area" value="${element.OfficeCode}">${element.OfficeName}</option>`;
        $(".select-office-area").append(option);
      });
    },
  });
}


// Được gọi ở hàm changType() bên dưới nếu giá trị type là area
// Đổ ra các địa bàn có dashboard
function fillArea() {
  $.ajax({
    async: false,
    type: "GET",
    url: "/bcapi/dashboard/deployTeam",
    dataType: "json",
    success: function (response) {
      var data = response.result.Area;
      $(".label-type").text("Địa bàn");

      var defaultOption = `<option id="option-default-office-area" style="display:none;" selected>Chọn địa bàn</option>`;
      $(".select-office-area").append(defaultOption);

      data.forEach((element) => {
        var option = `<option class="option-office-area" value="${element.AreaCode}">${element.AreaName}</option>`;
        $(".select-office-office-area").append(option);
      });
    },
  });
}

// Thay đổi giá trị của thẻ select-type
// Từ đó fill giá trị tương ứng thẻ select-office-area
function changeType() {
  var value = $(".select-type").val();

  // Bỏ giá trị mặc định
  $("#option-default-office-area").remove();

  // Bỏ giá trị đã chọn trước đó
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

function getLink(id) {
  return `~sitecollection/Sitepages/dashboard.aspx#${id}`;
}

function fillPermissionSelect2(lstPermission) {
  $(".select-permission").select2();


  lstPermission.forEach((element) => {
    var option = `<option value = ${element.Code} data-select2-id = ${element.Code}>${element.Title}</option>`;
    $(".select-permission").append(option);
  });
}

// Lấy danh sách các quyền đã chọn từ thẻ select-permission
function getPermissionSelect2() {
  var listPermissionSelected = $('.select-permission').find(':selected');
  var rs = "";
  if (listPermissionSelected) {
    jQuery.each(listPermissionSelected, function (key, value) {
      if (listPermissionSelected[key].value) {
        var permission = listPermissionSelected[key].value + ",";
        rs += permission;
      }
    });
  }
  return rs.substring(0, rs.length - 1);
}

function fillPermissionSelect2Edit(lstPermission, visibleOnly) {
  var url = "/_vti_bin/tdcore/usersservice.svc/Permissions?siteId=4e620731-b9fd-41f0-8377-eb55a769577c&orderby=Order";
  $(".select-permission-edit").select2();
  var permissions = visibleOnly.split(',');


  lstPermission.forEach((element) => {
    if (permissions.includes(element.Code)) {
      var option = `<option selected value = ${element.Code} data-select2-id = ${element.Code}>${element.Title} </option>`;
      $(".select-permission-edit").append(option);
    } else {
      var option = `<option value = ${element.Code} data-select2-id = ${element.Code}>${element.Title}</option>`;
      $(".select-permission-edit").append(option);
    }
  });

}

function fillParent(lstDashboard) {
  lstDashboard.forEach((element) => {
    var option = `<option value=${element.Code} data-select2-id="${element.ID}">${element.Title}</option>`;
    $(".select-parent").append(option);
  });
}

function fillParentEdit(lstDashboard, parent) {
  lstDashboard.forEach((element) => {
    if (element.Title == parent.Parent?.LookupValue) {
      var option = `<option selected value = ${element.Code} data-select2-id = "${element.ID}">${element.Title}</option>`;
      $(".select-parent-edit").append(option);
    }
    else {
      var option = `<option value = ${element.Code} data-select2-id = "${element.ID}">${element.Title}</option>`;
      $(".select-parent-edit").append(option);
    }
  });
}
