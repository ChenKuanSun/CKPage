$( "#date_appointment" )//任官日期選擇器
    .datepicker({
        //顯示完整日曆
        format: "yyyy-mm-dd",
	    autoclose: true,
	    startDate: "today",
	    clearBtn: true,
	    calendarWeeks: true,
	    todayHighlight: true,
	    language: 'zh-TW',
	    endDate:"+0",
	    startDate: "-100y",
        //只能選任官之後的慰修年度
        changeMonth: true,
        changeYear: true
	});
$( "#date_specialbreak" )//慰修年度選擇器
    .datepicker({
    	//顯示完整日曆
        format: "yyyy",
	    autoclose: true,
	    startDate: "today",
	    clearBtn: true,
	    calendarWeeks: true,
	    todayHighlight: true,
	    language: 'zh-TW',
	    startDate: new Date(2017, 1, 1),
        /*只顯示年份*/
        minViewMode:"years"
    });
$('.input-daterange')
	.datepicker({
		format: "yyyy-mm-dd",
	    autoclose: true,
	    clearBtn: true,
	    calendarWeeks: true,
	    todayHighlight: true,
	    language: 'zh-TW'

	});
$('#add_trainning')
	.on('click', function(){
		var time_range = $('.input-daterange').val();
	    var div = "<div class=\"input-group mb-3\"><input type=\"text\" class=\"form-control\" value=\"" + time_range + "\"><div class=\"input-group-append\"><button class=\"btn btn-outline-secondary\" name=\"list_delete\" type=\"button\">&times;</button></div></div></div>";
	    $("#trainning_list").append(div);
	    delete_list()
    });
function delete_list(){
	$('button[name="list_delete"]')
		.click(function(){
			$(this).parent().parent().remove()
		});
}
