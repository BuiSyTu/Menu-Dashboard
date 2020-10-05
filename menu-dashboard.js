!(function (factory) {
  factory(
    jQuery,
    tdcore.modals,
    tdcore.forms
  );
})(function ($, modals, forms) {
  var lstDashboard;
  var lstPermission;

  $("[add-dashboard-office]").click(function () {
    viewAdd();
  });
  
  // Lưu giá trị cho biến toàn cục lstPermission
  $.ajax({
    async: false,
    type: "GET",
    url:
      "/_vti_bin/tdcore/usersservice.svc/Permissions?siteId=4e620731-b9fd-41f0-8377-eb55a769577c&orderby=Order",
    dataType: "json",
    success: function (response) {
      lstPermission = response.result;
    }
  });

  // Đổ dữ liệu ra table, lưu giá trị cho biến lstDashboard và gán sự kiện cho các button
  $.ajax({
    async: false,
    type: "GET",
    url: "/sites/bc_board/_vti_bin/tdcore/lists.svc/items?listTitle=Menu",
    dataType: "json",
    crossDomain: true,
    success: function (response) {
      lstDashboard = [];
      for (let i = response.result.length - 1; i >= 0 ; i--) {
        const db = response.result[i];

        lstDashboard.push(db);
      }

      $(".td-datatable")
        .DataTable({
          initComplete: function (settings, json) {},
          searching: false,
          responsive: true,
          data: lstDashboard,
          order: [], // bỏ icon sắp xếp ở cột check box
          sDom: '<"top">rt<"bottom"lp><"clear">',
          columns: [
            {
              data: null,
              title: "STT",
              orderable: false,
              class: "text-center",
              render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
              },
            },
            {
              data: "Title",
              title: "Tiêu đề",
              orderable: false,
              class: "text-center",
            },
            {
              data: "Code",
              title: "Mã",
              orderable: false,
              class: "text-center",
            },
            {
              data: null,
              title: "Menu dashboard/ Đường dẫn",
              orderable: false,
              class: "text-center",
              render: function(data, type, item) {
                return data.Name ? data.Name : data.Link;
              }
            },
            {
              data: "Parent.LookupValue",
              title: "Loại",
              orderable: false,
              class: "text-center",
            },
            {
              orderable: false,
              title: "Sử dụng",
              data: "Active",
              render: function (data, type, item) {
                var checked = null;
                if (data) checked = "checked";
                return `<label class="m-checkbox m-checkbox--single  m-checkbox--success m-checkbox">
                            <input type="checkbox" name="checkbox" disabled ${checked} value="true">
                            <span></span>
                            </label>`;
              },
              class: "text-center",
            },
            {
              orderable: false,
              data: null,
              title: "Thao tác",
              render: function (data, type, item) {
                var re = `<a href="javascript:void(0)" btn-showdata data-id= "${data.ID}" 
                            class="m-portlet__nav-link btn m-btn btn-outline-primary m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="m-tooltip" title="Xem chi tiết"><i class="la la-file-text-o"></i> </a>`;
                re += `<a href="javascript:void(0)" btn-editdata  data-id="${data.ID}"
                            class="m-portlet__nav-link btn m-btn btn-outline-warning m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="m-tooltip" title="Sửa thông tin"><i class="la la-edit"></i> </a>`;
                re += `<a href="javascript:void(0)" btn-deletedata data-id="${data.ID}"
                            class="m-portlet__nav-link btn m-btn btn-outline-danger m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="m-tooltip" title="Xóa dữ liệu"><i class="la la-trash"></i> </a>`;
                return re;
              },
              class: "text-center",
            },
          ],
          language: {
            decimal: "",
            emptyTable: "Không có dữ liệu",
            info: "Hiển thị từ _START_ đến _END_ của _TOTAL_ dữ liệu",
            infoEmpty: "",
            infoFiltered: "(Lọc từ tổng số _MAX_ dữ liệu)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "Hiển thị _MENU_ dữ liệu",
            loadingRecords: "Đang tải ...",
            processing: "Đang xử lý...",
            search: "Tìm kiếm theo từ khóa:",
            zeroRecords: "Không tìm thấy bản ghi phù hợp",
            paginate: {
              first: "Trang đầu",
              last: "Trang cuối",
              next: "Trang tiếp",
              previous: "Trang trước",
            },
            aria: {
              sortAscending: ": Sắp xếp cột tăng dần",
              sortDescending: ": Sắp xếp cột giảm dần",
            },
          },
        })
        .on("click", "[btn-showdata]", function (evt) {
          var id = $(evt.currentTarget).attr("data-id");
          viewDetail(id);
        })
        .on("click", "[btn-editData]", function (evt) {
          var id = $(evt.currentTarget).attr("data-id");
          viewEdit(id);
        })
        .on("click", "[btn-deletedata]", function (evt) {
          var id = $(evt.currentTarget).attr("data-id");
          viewDelete(id);
        });
    },
  });

  function getDashboardById(id) {
    for (let i = 0; i < lstDashboard.length; i++) {
      if (lstDashboard[i].ID == id) return lstDashboard[i];
    }
  }

  function viewDetail(id) {
    modals
      .modal("Xem thông tin")
      .content($("#view-template").html())
      .size(800, 500)
      .ready(function (mdl) {
        forms.WidgetActivator.parse(mdl.panel.content).then(function () {
          if (id) {
            var data = getDashboardById(id);
            var form = forms.Widget.findWidgets(
              mdl.panel.content,
              false,
              forms.Form
            )[0];
            form.setData(data);
          }
        });
      })
      .okCancel()
      .closeOnly()
      .show();
  }

  function viewAdd() {
    modals
      .modal("Thêm dashboard")
      .content($("#add-template").html())
      .size(800, 500)
      .okCancel()
      .ready(function (mdl) {
        forms.WidgetActivator.parse(mdl.panel.content).then(function () {
          var form = forms.Widget.findWidgets(
            mdl.panel.content,
            false,
            forms.Form
          )[0];
        });
        
        fillPermissionSelect2(lstPermission);
        fillParent(lstDashboard);

      })
      .addCmd("OK", function (mdl) {
        var form = forms.Widget.findWidgets(
          mdl.panel.content,
          false,
          forms.Form
        )[0];
        return form.tryValidate().then(function () {
          var val = form.getData();
          val.Active = $(".active").prop("checked") ? true : false;
          var id = $(".select-dashboard").children("option:selected").val();
          val.Link = getLink(id);
          val.VisibleOnly = getPermissionSelect2();
          val.Name = $(".select-dashboard :selected").text();
           
          var parentId = parseInt($(".select-parent").children("option:selected").attr("data-select2-id"));
          var parentTitle = $(".select-parent").children("option:selected").text();
          if (parentId) {
            val.Parent = {__metadata: {uri: `${window.location.origin}/sites/bc_board/_vti_bin/ListData.svc/Menu(${parentId})`}};
          }
          console.log(val);
          createListItem(
            "/sites/bc_board",
            "Menu",
            val,
            function (task) {
              toastr.success("Thêm thành công");
              window.location.reload();
            },
            function (error) {
              toastr.error(JSON.stringify(error));
            }
          );
        });
      })
      .closeOnly()
      .show();
  }

  function viewEdit(id) {
    modals
      .modal("Sửa thông tin")
      .content($("#edit-template").html())
      .size(800, 500)
      .okCancel()
      .ready(function (mdl) {
        forms.WidgetActivator.parse(mdl.panel.content).then(function () {
          if (id) {
            var data = getDashboardById(id);
            console.log(data);
            var form = forms.Widget.findWidgets(
              mdl.panel.content,
              false,
              forms.Form
            )[0];
            form.setData(data);
            if (data.Active) {
              $(".active").prop("checked", true);
            }
            fillPermissionSelect2Edit(lstPermission, data.VisibleOnly);
            fillParentEdit(lstDashboard, data);
            fillDashboard(data);
          }
        });
      })
      .addCmd("OK", function (mdl) {
        var form = forms.Widget.findWidgets(
          mdl.panel.content,
          false,
          forms.Form
        )[0];
        return form.tryValidate().then(function () {
          var val = form.getData();
          val.Active = $(".active").prop("checked") ? true : false;

          var id = $(".select-dashboard").children("option:selected").val();
          val.Link = getLink(id);
          val.VisibleOnly = getPermissionSelect2();
          val.Name = $(".select-dashboard :selected").text();
           
          var parentId = parseInt($(".select-parent").children("option:selected").attr("data-select2-id"));
          var parentTitle = $(".select-parent").children("option:selected").text();
          if (parentId) {
            val.Parent = {__metadata: {uri: `${window.location.origin}/sites/bc_board/_vti_bin/ListData.svc/Menu(${parentId})`}};
          }
          console.log(val);

          updateListItem(
            "/sites/bc_board",
            "Menu",
            id,
            val,
            function (item) {
              window.location.reload();
              toastr.success("Sửa thành công");
            },
            function (error) {
              toastr.error(JSON.stringify(error));
            }
          );
        });
      })
      .closeOnly()
      .show();
  }

  function viewDelete(id) {
    if (confirm("Bạn chắc chắn muốn xóa dữ liệu này?")) {
      deleteListItem(
        "/sites/bc_board",
        "Menu",
        id,
        function () {
          toastr.success("Xoá thành công");
          window.location.reload();
        },
        function (error) {
          toastr.error(JSON.stringify(error));
        }
      );
    } else {
      toastr.info("Đã hủy thao tác!");
      return false;
    }
  }
});