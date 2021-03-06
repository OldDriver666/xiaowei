$(function() {
    var userName = Util.cookieStorage.getCookie("username");
    var token_value = Util.cookieStorage.getCookie("accesstoken");
    var depart_id = Util.cookieStorage.getCookie("departId");
    var company_id = Util.cookieStorage.getCookie("companyId");
    var role_level = Util.cookieStorage.getCookie("userLevel");
    var admin_id = Util.cookieStorage.getCookie("adminId");
    var nick_name = Util.cookieStorage.getCookie("nickname");

    var url=location.search;
    var Request = new Object();
    if(url.indexOf("?")!=-1) {
        var str = url.substr(1)　//去掉?号
        strs = str.split("&");
        for(var i=0;i<strs.length;i++){
            Request[strs[i ].split("=")[0]]=unescape(strs[ i].split("=")[1]);
        }
    };
    var moduleId = parseInt(Request["moduleId"]);
    var insertAuth = parseInt(Request["insertAuth"]);
    var queryAuth = parseInt(Request["queryAuth"]);
    var updateAuth = parseInt(Request["updateAuth"]);

	var action = {
        init: function(){
            if(0 == insertAuth){
                $("#btn-add").hide();
            }
            if(0 == queryAuth){

            }
            if(0 == updateAuth){

            }
        },
		//新增数据
		add : function() {
            var url = ctx + "boss/departconf/addimdepartconfig";
            var data = new Object();
            data.company_id = parseInt($('#input-depart_id option:selected').val());
            data.client_type = parseInt($('#input-devType option:selected').val());
            data.avatar = $("#input-avatar").val();

            Util.ajaxLoadData(url,data,moduleId,"POST",true,function(result) {
                if (result.code == ReturnCode.SUCCESS) {
                    $("#addTempl-modal").modal('hide');
                    toastr.success("添加成功!");
                    action.loadPageData();
                    if(parseInt($("#input-depart_id").val()) == parseInt(company_id)){
                        action.myDevTypeQuery();
                    }
                }
                else{
                    alert(result.msg);
                }
            });
		},
		//获取所有数据
		loadPageData : function() {
            var search_company_id = parseInt($('#input-search-name option:selected').val());
            var search_client_type = parseInt($('#input-search-client_type option:selected').val());
            var td_len = $("#table thead tr th").length;//表格字段数量

            var url = ctx + "boss/departconf/queryimdepartconfig";
            var data = new Object();
            data.client_type = search_client_type;
            data.company_id = parseInt(company_id);


            Util.ajaxLoadData(url,data,moduleId,"POST",true,function(result) {
                if(result.code == ReturnCode.SUCCESS){
                    $('#pageContent').find("tr").remove();
                    $("#pageTmpl").tmpl(result.data).appendTo('#pageContent');

                    if($('#pageContent tr').length == 0){
                        $('#pageContent').append("<tr><td  colspan='" + td_len + "' class='t_a_c'>暂无数据</td></tr>");
					}
                    if(0 == updateAuth){
                        $(".table-update").hide();
                        $(".table-manage").hide();
                    }
                } else {
                    toastr.error(result.msg);
                }
            },function(errorMsg) {
                alert(errorMsg);
            });

		},
        //获取设备类型列表数据
        loadDevTypeData : function() {
            var allDevTypeArray = JSON.parse(localStorage.getItem("allDevTypeArray"));
            $("#pageDevType").tmpl(allDevTypeArray).appendTo('#input-search-client_type');
            $("#pageDevType").tmpl(allDevTypeArray).appendTo('#input-devType');
        },
        //获取设备类型列表数据
        myDevTypeQuery: function(){
            var dataArray1 = [];
            var dataArray2 = [];
            var myDevTypeArray = [];
            var url = ctx + "boss/clienttype/queryclienttype";
            var data = new Object();
            data.client_type = null;
            data.client_name = "";
            data.depart_id = parseInt(depart_id);
            data.company_id = parseInt(company_id);

            Util.ajaxLoadData(url,data,0,"POST",true,function(result) {
                if(result.code == ReturnCode.SUCCESS && result.data != ""){
                    dataArray1 = result.data;

                    var url_query = ctx + "boss/departconf/queryimdepartconfig";
                    var data_query = new Object();
                    data_query.depart_id = parseInt(depart_id);
                    data_query.client_type = null;
                    /*data_query.depart_id = parseInt(depart_id);*/
                    data_query.company_id = parseInt(company_id);

                    Util.ajaxLoadData(url_query,data_query,0,"POST",true,function(result_query) {
                        if(result_query.code == ReturnCode.SUCCESS && result_query.data != ""){
                            dataArray2 = result_query.data;
                            var Len1 = dataArray1.length;
                            var Len2 = dataArray2.length;
                            for(var i =0; i < Len2; i++){
                                for(var j=0; j<Len1; j++){
                                    if(dataArray2[i].client_type == dataArray1[j].client_type){
                                        var str ={
                                            client_type :dataArray1[j].client_type,
                                            client_name :dataArray1[j].client_name
                                        };
                                        myDevTypeArray.push(str);
                                    }
                                }
                            }
                            localStorage.setItem("myDevTypeArray",JSON.stringify(myDevTypeArray));
                            localStorage.setItem("allDevTypeArray",JSON.stringify(dataArray1));
                        } else {
                            alert(result_query.msg);
                        }
                    },function() {
                        alert("服务器开个小差，请稍后重试！")
                    });

                } else {
                    alert(result.msg);
                }
            },function() {
                alert("服务器开个小差，请稍后重试！")
            });

        },
        //获取全部公司团体数据
        loadCompanyInfoData: function(){
            var allCompanyArray = JSON.parse(localStorage.getItem("allCompanyArray"));
            $("#pageCompanyInfo").tmpl(allCompanyArray).appendTo('#input-search-name ');
            $("#pageCompanyInfo").tmpl(allCompanyArray).appendTo('#input-depart_id ');
        },
		//编辑数据
		edit : function() {
			var url = ctx + "boss/departconf/updateimdepartconfig";
			var data = new Object();
            data.config_id = parseInt($("#input-config_id").val());
            data.depart_id = parseInt($('#input-depart_idNo').val());
            data.client_type = parseInt($("#input-devTypeNo").val());
            data.avatar = $("#input-avatar").val();
            /*data.depart_id = parseInt(depart_id);*/
            data.company_id = parseInt(company_id);

			Util.ajaxLoadData(url,data,moduleId,"POST",true,function(result) {
				if (result.code == ReturnCode.SUCCESS) {
			 		$("#addTempl-modal").modal('hide');
                    toastr.success("编辑成功!");
                    action.loadPageData();
                    if(parseInt($("#input-depart_idNo").val()) == parseInt(company_id)){
                        action.myDevTypeQuery();
                    }
				}else{
                    alert(result.msg);
                }
			});
		},
		//删除数据
		deleteConfig : function(id) {
			if (confirm("删除后不可恢复，确定删除" + name + "？")) {
				var url = ctx + "boss/departconf/delimdepartconfig";
				var data = new Object();
                data.config_id = id;
                data.depart_id = parseInt(depart_id);
                data.company_id = parseInt(company_id);

				Util.ajaxLoadData(url,data,moduleId,"POST",true,function(result) {
					if (result.code == ReturnCode.SUCCESS) {
                        toastr.success("删除成功!");
                        $("#input-search-depart_id").val("");
                        $("#input-search-client_type").val("");
                        action.loadPageData();
                        action.myDevTypeQuery();
					}else{
                        alert(result.msg);
                    }
				});
			}
		}
	};
	window.action = action;
    action.init();
	action.loadPageData();
    action.loadDevTypeData();
    action.loadCompanyInfoData();

	$("#addTempl-modal").on('show.bs.modal', function(e) {
		// 处理modal label显示及表单重置
		var $form = $("form#form-addTempl");
		if (!e.relatedTarget) {
			$("h4#addTempl-modal-label").text("编辑公司设备信息");
            $("#input-devType-wrap").hide();
            $("#input-devTypeNo-wrap").hide();
            $("#input-devType-txt-wrap").show();
            $("#input-depart_id-wrap").hide();
            $("#input-depart_id-txt-wrap").show();
            $("#input-depart_idNo-wrap").hide();
			$form.data("action", "edit");
		} else if (e.relatedTarget.id = "btn-add") {
			$("h4#addTempl-modal-label").text("添加公司设备信息");
            $("#input-devType-wrap").show();
            $("#input-devTypeNo-wrap").hide();
            $("#input-devType-txt-wrap").hide();
            $("#input-depart_id-wrap").show();
            $("#input-depart_id-txt-wrap").hide();
            $("#input-depart_idNo-wrap").hide();
			$form.data("action", "add");
			$form[0].reset();
		}
	});

    //编辑获取数据
    $("#pageContent").on("click",".table-edit-btn",function(){
        var that = $(this).parent().parent();
        var imgUrl = that.find("td").eq(4).find("img").prop("src");
        var arrObj = imgUrl.split("//");
        var startIndx = arrObj[1].indexOf("/");
        var relUrl = arrObj[1].substring(startIndx).slice(1);

        $("#input-config_id").val(that.find("td").eq(0).text());
        $("#input-depart_id-txt").val(that.find("td").eq(2).text());
        $("#input-depart_idNo").val(that.find("td").eq(1).text());
        $("#input-devType-txt").val(that.find("td").eq(3).text());
        $("#input-devTypeNo").val(that.find("td").eq(5).text());
        $("#input-avatar").val(relUrl);
        $("#addTempl-modal").modal("show");
    });


	//验证表单
    $("#form-addTempl").validate({
        rules : {
            depart_id : {
                required : true
            },
            devType : {
                required : true
            }
        }
    });

	$("#btn-add-submit").on('click', function() {
        var action = $("form#form-addTempl").data("action");
        if(action == "add"){
            if (!$("#form-addTempl").valid()) {
                return;
            }else {
                window.action.add();
            }
        }else if(action == "edit"){
                window.action.edit();
        }

	});

	$("#btn-search").on('click', function() {
        action.loadPageData();
	});
	$("#input-search-depart_id").on('keydown', function(e) {
        if (e.keyCode == 13) {
            action.loadPageData();
        }

	});

});