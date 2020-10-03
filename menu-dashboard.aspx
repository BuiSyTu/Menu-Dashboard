<%@ Page Language="C#" MasterPageFile="~sitecollection/_catalogs/masterpage/default/default.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" meta:webpartpageexpansion="full"%>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageHeaderTitle">
    Bảng điều khiển</asp:Content>
<%@ Register Tagprefix="layout" Namespace="TD.Core.Layouts.Controls" Assembly="TD.Core.Layouts.Controls, Version=1.0.0.0, Culture=neutral, PublicKeyToken=fdcb66d7090aabcd" %>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderLayoutConfig">
	<layout:LayoutConfigControl runat="server">
        <Setters>
            <layout:ConfigSetter Name="CompactMode" Value="True" />
            <layout:ConfigSetter Name="BrandMinimized" Value="True" />
            <layout:ConfigSetter Name="asideLeft.Minimize" Value="True" />
        </Setters>
    </layout:LayoutConfigControl>
</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderMain">
    <!--begin:: Widgets/Input methods-->
    <div class="m-portlet mb-0">
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        Danh sách dashboard
                    </h3>
                </div>
            </div>
            <div class="m-portlet__head-tools">
                <div class="btn-group">
                    <button type="button" add-dashboard-office class="btn btn-outline-success m-btn m-btn--icon m-btn--pill">
                        <span><i class="flaticon-add"></i><span>Thêm mới</span></span>
                    </button>
                </div>
            </div>
        </div>
        <!--begin::Form-->
        <div class="m-portlet__body">
            <!--begin: Datatable -->
            <table class="td-datatable table table-bordered m-table display" style="width:100%">
            </table>
            <script id="action-template" type="text/x-handlebars-template">
                <a href="javascript:void(0)" edit-area data-id="{{ID}}" class="m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="m-tooltip" title="Sửa địa bàn">
                    <i class="la la-edit"></i>
                </a>
                <a href="javascript:void(0)" delete-area data-id="{{ID}}" class="m-portlet__nav-link btn m-btn m-btn--hover-danger m-btn--icon m-btn--icon-only m-btn--pill" data-toggle="m-tooltip" title="Xóa địa bàn">
                    <i class="la la-trash"></i>
                </a>
            </script>
            <!--end: Datatable -->
        </div>
        <!--end::Form-->
    </div>
    <!--end:: Widgets/Input methods-->
    <script id="view-template" type="text/html">
         <div class="m-form m-form--label-align-right p-3 row" tdf-type="form">
            <div class="form-group m-form__group row col-6">
                <label class="col-form-label col-3">Tiêu đề</label>
                <div class="col-9">
                    <input name="Title" class="form-control" type="text" placeholder="Tiêu đề" disabled>
                </div>
            </div>
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-2">Active</label>
                <div class="col-2">
                    <input type="checkbox" checked="Active" class="form-control" type="text" disabled>
                </div>
            </div>
            <div class="form-group m-form__group row col-6">
                <label class="col-form-label col-3">Mã</label>
                <div class="col-9">
                    <input name="Code" class="form-control" type="text" placeholder="Mã" disabled>
                </div>
            </div>
            <div class="col-6">

            </div>
            <div class="form-group m-form__group row  col-9">
                <label class="col-form-label col-2">Đường dẫn</label>
                <div class="col-10">
                    <input name="Link" class="form-control" type="text" placeholder="Đường dẫn"disabled>
                </div>
            </div>
        </div>
    </script>

    <script id="edit-template" type="text/html">
        <div class="m-form m-form--label-align-right p-3 row" tdf-type="form">
            <div class="form-group m-form__group row col-6">
                <label class="col-form-label col-3">Tiêu đề</label>
                <div class="col-9">
                    <input name="Title" class="form-control" type="text" placeholder="Tiêu đề">
                </div>
            </div>
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Active</label>
                <div class="col-1">
                    <input type="checkbox" class="form-control active">
                </div>
            </div>
            <div class="form-group m-form__group row col-6">
                <label class="col-form-label col-3">Mã</label>
                <div class="col-9">
                    <input name="Code" class="form-control" type="text" placeholder="Mã">
                </div>
            </div>
            <div class ="col-6">

            </div>

            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Loại biểu đồ</label>
                <div class="col-9">
                    <select class="select-type bs-select form-control" style="font-size:15px"
                        data-placeholder="Chọn loại biểu đồ" onchange=changeType()>
                        <option id="option-default-office" style="display:none;" selected>Chọn loại biểu đồ</option>
                        <option id="option-type-office" >Đơn vị</option>
                        <option id="option-type-area" >Địa bàn</option>
                    </select>
                </div>
            </div>
            <div class="col-6"></div>
        
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3 label-type">--------</label>
                <div class="col-9">
                    <select class="select-office-area bs-select form-control" style="font-size:15px">                   
                    </select>
                </div>
            </div>
            <div class="col-6"></div>
        
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Dashboard</label>
                <div class="col-9">
                    <select class="select-dashboard bs-select form-control select2" style="font-size:15px"
                        data-placeholder="Chọn dashboard">
                        <option style="display:none;" selected>Chọn dashboard</option>
                    </select>
                </div>
            </div>
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Chọn menu cha</label>
                <div class="col-9">
                    <select class="select-parent bs-select form-control" style="font-size:15px"
                        data-placeholder="Chọn menu cha">     
                        <option selected>----Không----</option>         
                    </select>
                </div>
            </div>

            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Vai trò</label>
                <div class="col-9">
                    <select class="select-permission form-control select2 m-select2" style="font-size:15px" multiple="multiple"
                        data-placeholder="Chọn vai trò">
                    </select>
                </div>
            </div>
            <div class="col-6"></div>
        </div>
   </script>

    <script id="add-office-template" type="text/html">
        <div class="m-form m-form--label-align-right p-3 row" tdf-type="form">
            <div class="form-group m-form__group row col-6">
                <label class="col-form-label col-3">Tiêu đề</label>
                <div class="col-9">
                    <input name="Title" class="form-control" type="text" placeholder="Tiêu đề">
                </div>
            </div>
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Active</label>
                <div class="col-1">
                    <input type="checkbox" class="form-control active">
                </div>
            </div>
            <div class="form-group m-form__group row col-6">
                <label class="col-form-label col-3">Mã</label>
                <div class="col-9">
                    <input name="Code" class="form-control" type="text" placeholder="Mã">
                </div>
            </div>
            <div class ="col-6">

            </div>

            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Loại biểu đồ</label>
                <div class="col-9">
                    <select class="select-type bs-select form-control" style="font-size:15px"
                        data-placeholder="Chọn dashboard" onchange=changeType()>
                        <option id="option-default-office" style="display:none;" selected>Chọn loại biểu đồ</option>
                        <option id="option-type-office" >Đơn vị</option>
                        <option id="option-type-area" >Địa bàn</option>
                    </select>
                </div>
            </div>
            <div class="col-6"></div>
        
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3 label-type">--------</label>
                <div class="col-9">
                    <select class="select-office-area bs-select form-control" style="font-size:15px"
                        data-placeholder="Chọn dashboard" onchange=fillDashboard(this)>                   
                    </select>
                </div>
            </div>
            <div class="col-6"></div>
        
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Dashboard</label>
                <div class="col-9">
                    <select class="select-dashboard bs-select form-control select2" style="font-size:15px"
                        data-placeholder="Chọn dashboard">
                        <option id="option-default-dashboard-office" style="display:none;" selected>Chọn dashboard</option>
                    </select>
                </div>
            </div>
            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Chọn menu cha</label>
                <div class="col-9">
                    <select class="select-parent bs-select form-control" style="font-size:15px"
                        data-placeholder="Chọn menu cha">  
                        <option selected>----Không----</option>                     
                    </select>
                </div>
            </div>

            <div class="form-group m-form__group row  col-6">
                <label class="col-form-label col-3">Vai trò</label>
                <div class="col-9">
                    <select class="select-permission form-control select2 m-select2" style="font-size:15px" multiple="multiple"
                        data-placeholder="Chọn vai trò">
                    </select>
                </div>
            </div>
            <div class="col-6"></div>
        </div>
    </script>

    <script id="combobox-area" type="text/html">
        <span title="{{AreaName}}">{{AreaName}}</span>
    </script>

    <script id="combobox-office" type="text/html">
            <span title="{{OfficeName}}">{{OfficeName}}</span>
    </script>

</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageVendorStyles">
	<link rel="stylesheet" type="text/css" href="/_layouts/15/TD.BC/assets/css/vendors.min.css" />
    <link rel="stylesheet" type="text/css" href="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/themes/themes.css" />
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageStyles">
	<link rel="stylesheet" type="text/css" href="/_layouts/15/TD.BC/assets/css/bc.lib.css" />
    <link rel="stylesheet" type="text/css" href="/_layouts/15/TD.BC/assets/themes/fixed.css" />
    <!-- <link rel="stylesheet" type="text/css" href="../Style Library/style.css" /> -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css" />
</asp:Content>
<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageVendorScripts">
    <script type="text/javascript" src="/_layouts/15/TD.BC/assets/js/vendors.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/amcharts.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/pie.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/serial.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/themes/light.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/themes/dark.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/themes/black.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/themes/chalk.js"></script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/themes/patterns.js"></script>
    <script type="text/javascript"
        src="/_layouts/15/TD.BC/vendor/amcharts3/amcharts/plugins/animate/animate.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="PlaceHolderPageScripts">
    <!--use context info of BC-->
    <script src="/sites/bc/_layouts/15/tdcore/contextInfo.ashx"></script>
    <script type="text/javascript">
        try {
            $.fn.dataTable.ext.errMode = 'none';
        } catch (e) { }
    </script>
    <script type="text/javascript" src="/_layouts/15/TD.BC/assets/js/bc.lib.js"></script>
    <script type="text/javascript" src="list.js"></script>
    <script type="text/javascript" src="menu-dashboard.js"></script>
</asp:Content>