//判斷是否當年再入營用的KEY
var p = 0;
//判斷育嬰還是念書用的KEY
var h = 0;
//判斷是否在育嬰頁面
var studying = 0;
//判斷慰休年度是否為育嬰留職復職當年度
var ttt1 = 0;

$( function() {
    /*說明選單*/
    var duration = 300;
    var b = 0;
    $("#readme").find('button')
        .on('click', function(){
            if(b == 0){
                b = 1;
                $("#readme").stop(true).animate({left: '-70px'}, duration, 'easeOutBack');
                $("#readme > button").find('i').attr("class","fi-x");
                $("#readme > button").find('div').text("關閉");
            }
            else{
                b = 0;
                $("#readme").stop(true).animate({left: '-500px'}, duration, 'easeInBack');
                $("#readme > button").find('i').attr("class","fi-comment");
                $("#readme > button").find('div').text("說明");
            };
        });
    $( "#thedate" )//任官日期選擇器
        .datepicker({
            //顯示完整日曆
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass("no-calendar-here");
                },
            //只能選任官之後的慰修年度
            changeMonth: true,
            changeYear: true,
            maxDate: 0,
            yearRange: "-100:+0",
            /*中文樣式*/
                closeText: "關閉",
                prevText: "&#x3C;上個月",
                nextText: "下個月&#x3E;",
                currentText: "今天",
                monthNames: [ "一月","二月","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
                monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
                dayNames: [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六" ],
                dayNamesShort: [ "週日","週一","週二","週三","週四","週五","週六" ],
                dayNamesMin: [ "日","一","二","三","四","五","六" ],
                weekHeader: "週",
                dateFormat: "yy/mm/dd",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: "年"
        });
    $( "#loginin" )//再入營的第一次任官日期選擇器
        .datepicker({
            //顯示完整日曆
                beforeShow: function (input, inst) {
                    inst.dpDiv.removeClass("no-calendar-here");
                },
                onSelect: function (dat, inst) {
                    $('#loginout').datepicker('option', 'minDate', dat);
                },
            //只能選任官之後的慰修年度
            changeMonth: true,
            changeYear: true,
            maxDate: 0,
            yearRange: "-100:+0",
            /*中文樣式*/
                closeText: "關閉",
                prevText: "&#x3C;上個月",
                nextText: "下個月&#x3E;",
                currentText: "今天",
                monthNames: [ "一月","二月","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
                monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
                dayNames: [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六" ],
                dayNamesShort: [ "週日","週一","週二","週三","週四","週五","週六" ],
                dayNamesMin: [ "日","一","二","三","四","五","六" ],
                weekHeader: "週",
                dateFormat: "yy/mm/dd",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: "年"
        });
    $("#loginout")//再入營的退伍日期選擇器
        .datepicker({
        //顯示完整日曆
            beforeShow: function (input, inst) {
                inst.dpDiv.removeClass("no-calendar-here");
            },
            onSelect: function (dat, inst) {
                $('#thedate').datepicker('option', 'minDate', dat);
            },
            //只能選任官之後的慰修年度
            changeMonth: true,
            changeYear: true,
            maxDate: 0,
            yearRange: "-100:+0",
            /*中文樣式*/
                closeText: "關閉",
                prevText: "&#x3C;上個月",
                nextText: "下個月&#x3E;",
                currentText: "今天",
                monthNames: [ "一月","二月","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
                monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
                "七月","八月","九月","十月","十一月","十二月" ],
                dayNames: [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六" ],
                dayNamesShort: [ "週日","週一","週二","週三","週四","週五","週六" ],
                dayNamesMin: [ "日","一","二","三","四","五","六" ],
                weekHeader: "週",
                dateFormat: "yy/mm/dd",
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: "年"
        });
    $( "#theyear" )//慰修年度選擇器
        .datepicker({
            /*只顯示年份*/
                beforeShow: function (input, inst) {
                    inst.dpDiv.addClass("no-calendar-here");
                },
            changeYear: true,
            minDate: new Date(2017, 1, 1),
            showButtonPanel: true,
            dateFormat: "yy",
            "autoclose": true,
            closeText:'完成',
            currentText: '今年'
        })
        .focus(function() {
            var thisCalendar = $(this);
            $('.ui-datepicker-calendar').detach();
            $('.ui-datepicker-close').click(
                function() {
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    thisCalendar.datepicker('setDate', new Date(year, 1));
                    if(studying == 1){
                        var tt1 = new Date($( "#thedate" ).val());
                        var tt2  = new Date($( "#theyear" ).val());
                        var yyyy1 = tt1.getFullYear();
                        var yyyy2 = tt2.getFullYear();
                        //如果慰休年度為育嬰留職復職當年度，則受訓日期改為復職前的年份
                        if(yyyy1 == yyyy2){
                            ttt1 = 1;
                            tt1 = new Date($( "#loginout" ).val());
                            year = tt1.getFullYear();
                        }
                        else{
                        year--;
                        }
                    }
                    else{
                        year--;
                    }
                    $('#tdstart').datepicker('setDate',new Date(year, 1));
                    $('#tdend').datepicker('setDate',new Date(year, 1));
                }
            );
        });
    $('#tdend').datepicker({//受訓迄日選擇器
        changeMonth: true,
        beforeShow: function (input, inst) {
            inst.dpDiv.removeClass("no-calendar-here");
        },
        /*中文樣式*/
            closeText: "關閉",
            prevText: "&#x3C;上個月",
            nextText: "下個月&#x3E;",
            currentText: "今天",
            monthNames: [ "一月","二月","三月","四月","五月","六月",
            "七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
            "七月","八月","九月","十月","十一月","十二月" ],
            dayNames: [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六" ],
            dayNamesShort: [ "週日","週一","週二","週三","週四","週五","週六" ],
            dayNamesMin: [ "日","一","二","三","四","五","六" ],
            weekHeader: "週",
            dateFormat: "yy/mm/dd",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: "年"
    });
    $('#tdstart').datepicker({//受訓起日選擇器
        changeMonth: true,
        beforeShow: function (input, inst) {
            inst.dpDiv.removeClass("no-calendar-here");
        },
        onSelect: function (dat, inst) {
        $('#tdend').datepicker('option', 'minDate', dat);
        },
        /*中文樣式*/
            closeText: "關閉",
            prevText: "&#x3C;上個月",
            nextText: "下個月&#x3E;",
            currentText: "今天",
            monthNames: [ "一月","二月","三月","四月","五月","六月",
            "七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
            "七月","八月","九月","十月","十一月","十二月" ],
            dayNames: [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六" ],
            dayNamesShort: [ "週日","週一","週二","週三","週四","週五","週六" ],
            dayNamesMin: [ "日","一","二","三","四","五","六" ],
            weekHeader: "週",
            dateFormat: "yy/mm/dd",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: true,
            yearSuffix: "年"
    });
    //留職程式按鈕
    $("#babybt").on('click', function(){
        $(".backfont")
            .stop(true).animate({left: '0%'}, duration, 'swing')
            .text("育");
        $(".hh3")
           .text("請輸入任官及留職生效日期");
        h = 0;
    });
    $("#stuybt").on('click', function(){
        $(".backfont")
            .stop(true).animate({left: '60%'}, duration, 'swing')
            .text("修");
        $(".hh3")
            .text("請輸入任官及進修生效日期");
        h = 1;
    });
});
function tfdatekeyin(){ //增加受訓日期
    var oy = new Date($("#theyear").val());
    if(isNaN(oy)){
        alert("請輸入慰休年度");
        return 0;
    }
    var sd = new Date($("#tdstart").val());
    var d = sd.getDate();
    var m =  sd.getMonth();
    m += 1;
    var y = sd.getFullYear();
    if (y >= oy.getFullYear()){
        alert("請輸入慰休前一年度之受訓日期");
        return 0;
    }
    else if(y < oy.getFullYear()-1){
        y = oy.getFullYear()-1;
        m = 1;
        d = 1;
    }
    var ds= m + "/" + d;
    sd = new Date($("#tdend").val());
    d = sd.getDate();
    m =  sd.getMonth();
    m += 1;
    y = sd.getFullYear();
    if (y >= oy.getFullYear()){
        y = oy.getFullYear()-1;
        m = 12;
        d = 31;
    }
    ds= ds + "-" + m+ "/" + d;
    var lines = $("#tfli").val().split("\n");
    $('#tfli').val($('#tfli').val()+ds+ "\n");
    var psconsole = $('#tfli');
    if(psconsole.length){//自動到最後一行
        psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
    }
}
function tfpop(){//減少受訓日期
    var lines = $("#tfli").val().split("\n");
    lines.pop();
    lines.pop();
    $("#tfli").val(lines.join("\n"));
    if(lines.length!=0){
        $("#tfli").val($("#tfli").val()+ "\n");
    }
}
function dayrule(mmm){//這是累積年資達多少就有幾天慰休的函數
    //達14年有30天慰休
    if( (mmm / 12) >= 14){
        mmm = 30;
    }
    //達9年有28天慰休
    else if( (mmm / 12) >= 9){
        mmm = 28;
    }
    //達6年有21天慰休
    else if( (mmm / 12) >= 6){
        mmm = 21;
    }
    //達3年有14天慰休
    else if( (mmm / 12) >= 3){
        mmm = 14;
    }
    //未達3年有7天慰休
    else{
        mmm = 7
    }
    return mmm;
}
function traindate(){ //在職比例程式
    //宣告二維陣列
    var adat = new Array();
    for(var l =1; l<=12; l++){
         adat[l] = new Array();
    }
    //全年算在職，初倌就是任官前不在職
    var temp1 = new Date($( "#thedate" ).val());
    var temp2  = new Date($( "#theyear" ).val());
    var fy = temp1.getFullYear();
    var z = temp2.getFullYear() - 1;
    //初官就是任職後先算都在職
        if(fy == z){
            var d = temp1.getDate();
            var m = temp1.getMonth();
            m += 1;
            for(var i=m; i<=12; i++){
                if(i == m){                    
                    for(var j = d; j<=(new Date(z,m,0).getDate());j++){
                        adat[i][j] = 1;
                    }
                }
                else{
                    for(var j = 1; j<=(new Date(z,m,0).getDate());j++){
                        adat[i][j] = 1;
                    }
                }
            }
        }//其他全年都先在職
        else{
            for(var i=1; i<=12; i++){
                for(var j=1;j<=(new Date(z,i,0).getDate());j++){
                    adat[i][j] = 1;
                }   
            }
        }
    //如果當年度再入營，退伍前的在職月數加上
    if(p == 1){
        temp2 = new Date($("#loginout").val());
        for(var i = 1; i<=(temp2.getMonth());i++){
            if(i== (temp2.getMonth())){
                for(var j = 1; j <=(temp2.getDate());j++){
                    adat[i][j] = 1;
                }
            }
            else{
                for(var j = 1; j <=(new Date(temp2.getFullYear(),i,0).getDate());j++){
                    adat[i][j] = 1;
                }
            }
        }
        temp1  = new Date($( "#loginin" ).val());
        if(temp2.getFullYear() == temp1.getFullYear()){//如果第一次入伍、退伍、再入營皆同一年的話.....再把入伍日期前面都變不在職
            for(i = 1; i<=(temp1.getMonth());i++){
                if(i== (temp1.getMonth())){
                    for(j = 1; j <=(temp1.getDate());j++){
                        adat[i][j] = 0;
                    }
                }
                else{
                    for(j = 1; j <=(new Date(temp1.getFullYear(),i,0).getDate());j++){
                        adat[i][j] = 0;
                    }
                }
            }
        }
    }
    if($("#tfli").val() != ''){ //有受訓資料就讀沒有就跳過
        var trainaa = $("#tfli").val().split("\n");//分割受訓資料
        //有受訓的天數陣列改為0
            for(var i = 0; i <= trainaa.length; i++){
                if(trainaa[i] == ''){break;}
                var trainstemp = trainaa[i].split("-");//分割受訓開始跟結束日期
                var trains = trainstemp[0].split("/");//分割受訓開始年月日
                var traine = trainstemp[1].split("/");//分割受訓結束年月日
                console.log(trains +">"+ traine);
                if(parseInt(trains[0]) == parseInt(traine[0])){//當月受訓當月結訓
                    for(var k = parseInt(trains[1]); k<=parseInt(traine[1]);k++){
                        adat[trains[0]][k]= 0;
                    } 
                }
                else{
                    for(var j = parseInt(trains[0]); j<=parseInt(traine[0]);j++){
                        if(j == parseInt(trains[0])){
                            for(var k = parseInt(trains[1]); k<=(new Date(z,j,0).getDate());k++){
                                adat[j][k]= 0;
                            }
                        }
                        else if(j == parseInt(traine[0])){
                            for(var k = 1;k<=traine[1];k++){
                                adat[j][k]= 0;
                            }
                        }
                        else{
                            for(var k = 1; k<=(new Date(z,j,0).getDate());k++){
                                adat[j][k]= 0;
                            }
                        }
                    }
                }
            }
    }
    //開始判斷當月在不在職
    var cup = [];
    fy= 0;
    for(var i=1; i<=12; i++){
        for(var j=1;j<=(new Date(z,i,0).getDate());j++){
            if(adat[i][j] == 1){
                cup[i] = 1;
                fy++;
                break;
            }
            else{
                cup[i] = 0;
            }
        }
    }
    if(fy != 0){
        if(fy == 12){
            $('#info1').val($('#info1').val()+"全年皆在職，");
        }
        else{
            $('#info1').val($('#info1').val()+"12個月中有" + (12-fy) +"個月不在職");
            $('#info1').val($('#info1').val()+"(");
            for(var i=1;i<=12;i++){
                if(cup[i] == 0){
                    $('#info1').val($('#info1').val()+ i +"月、");
                }
            }
        $('#info1').val($('#info1').val()+"不在職)，");
        }
    }
    else{
        $('#info1').val($('#info1').val()+"全年不在職，");        
    }
    
    return fy;
}
function studydate(){ //讀取受訓資料
    //宣告二維陣列
    var adat = new Array();
    for(var l =1; l<=12; l++){
         adat[l] = new Array();
    }
    /*if(ttt1 == 1){//復職當年度慰休為停職前的在職比例------------------20170725至此

    }
    var temp1 = new Date($( "#thedate" ).val());
    var temp2  = new Date($( "#theyear" ).val());
    var fy = temp1.getFullYear();
    var z = temp2.getFullYear();
    
    else{
        z--;
    }*/
    //全年算在職，初倌就是任官前不在職
    //初官就是任職後先算都在職
        if(fy == z){
            var d = temp1.getDate();
            var m = temp1.getMonth();
            m += 1;
            for(var i=m; i<=12; i++){
                if(i == m){                    
                    for(var j = d; j<=(new Date(z,m,0).getDate());j++){
                        adat[i][j] = 1;
                    }
                }
                else{
                    for(var j = 1; j<=(new Date(z,m,0).getDate());j++){
                        adat[i][j] = 1;
                    }
                }
            }
        }//其他全年都先在職
        else{
            for(var i=1; i<=12; i++){
                for(var j=1;j<=(new Date(z,i,0).getDate());j++){
                    adat[i][j] = 1;
                }   
            }
        }
    //如果當年度再入營，退伍前的在職月數加上
    if(p == 1){
        temp2 = new Date($("#loginout").val());
        for(var i = 1; i<=(temp2.getMonth());i++){
            if(i== (temp2.getMonth())){
                for(var j = 1; j <=(temp2.getDate());j++){
                    adat[i][j] = 1;
                }
            }
            else{
                for(var j = 1; j <=(new Date(temp2.getFullYear(),i,0).getDate());j++){
                    adat[i][j] = 1;
                }
            }
        }
        temp1  = new Date($( "#loginin" ).val());
        if(temp2.getFullYear() == temp1.getFullYear()){//如果第一次入伍、退伍、再入營皆同一年的話.....再把入伍日期前面都變不在職
            for(i = 1; i<=(temp1.getMonth());i++){
                if(i== (temp1.getMonth())){
                    for(j = 1; j <=(temp1.getDate());j++){
                        adat[i][j] = 0;
                    }
                }
                else{
                    for(j = 1; j <=(new Date(temp1.getFullYear(),i,0).getDate());j++){
                        adat[i][j] = 0;
                    }
                }
            }
        }
    }
    if($("#tfli").val() != ''){ //有受訓資料就讀沒有就跳過
        var trainaa = $("#tfli").val().split("\n");//分割受訓資料
        //有受訓的天數陣列改為0
            for(var i = 0; i <= trainaa.length; i++){
                if(trainaa[i] == ''){break;}
                var trainstemp = trainaa[i].split("-");//分割受訓開始跟結束日期
                var trains = trainstemp[0].split("/");//分割受訓開始年月日
                var traine = trainstemp[1].split("/");//分割受訓結束年月日
                console.log(trains +">"+ traine);
                if(parseInt(trains[0]) == parseInt(traine[0])){//當月受訓當月結訓
                    for(var k = parseInt(trains[1]); k<=parseInt(traine[1]);k++){
                        adat[trains[0]][k]= 0;
                    } 
                }
                else{
                    for(var j = parseInt(trains[0]); j<=parseInt(traine[0]);j++){
                        if(j == parseInt(trains[0])){
                            for(var k = parseInt(trains[1]); k<=(new Date(z,j,0).getDate());k++){
                                adat[j][k]= 0;
                            }
                        }
                        else if(j == parseInt(traine[0])){
                            for(var k = 1;k<=traine[1];k++){
                                adat[j][k]= 0;
                            }
                        }
                        else{
                            for(var k = 1; k<=(new Date(z,j,0).getDate());k++){
                                adat[j][k]= 0;
                            }
                        }
                    }
                }
            }
    }
    //開始判斷當月在不在職
    var cup = [];
    fy= 0;
    for(var i=1; i<=12; i++){
        for(var j=1;j<=(new Date(z,i,0).getDate());j++){
            if(adat[i][j] == 1){
                cup[i] = 1;
                fy++;
                break;
            }
            else{
                cup[i] = 0;
            }
        }
    }
    if(fy != 0){
        if(fy == 12){
            $('#info1').val($('#info1').val()+"全年皆在職");
        }
        else{
            $('#info1').val($('#info1').val()+"12個月中有" + (12-fy) +"個月不在職");
            $('#info1').val($('#info1').val()+"(");
            for(var i=1;i<=12;i++){
                if(cup[i] == 0){
                    $('#info1').val($('#info1').val()+ i +"月、");
                }
            }
        $('#info1').val($('#info1').val()+"不在職)，");
        }
    }
    else{
        $('#info1').val($('#info1').val()+"全年不在職");        
    }
    return fy;
}
function showmethemoney(m){//休假補助費基準表
    var money =0;
    if(m >= 14){
        money = 16000;
    }
    else if(m == 10.5){
        money = 12000;
    }
    else if(m == 7){
        money = 8000;
    }
    else if(m == 3.5){
        money = 4000;
    }
    else{
        money = m * 1143;
        money = Math.round(money);//四捨五入
    }
    return money;
}
function halfday(m){
    if(m % 1 > 0.5){
        m = Math.floor(m) + 1;
    }
    else if(m% 1 > 0){
        m = Math.floor(m) + 0.5;
    }
    else{
        m = Math.floor(m);
    }
    return m;
}
function gobt(){/*一般計算機主程式*/
    //浮現視窗
    $(".banner > span").stop(true).animate({opacity: 1,zIndex: 3}, 1);
    //讀取任官日計算年資
    var sd = new Date($( "#thedate" ).val());
    var d = sd.getDate();
    var m =  sd.getMonth();
    m += 1;
    var y = sd.getFullYear();
    var od = new Date($( "#theyear" ).val());
    var ey = od.getFullYear();
    var Howyouold = (ey - 1 - y) * 12 + 12 - m;
    //年資換算慰休
    var da = dayrule(Howyouold);
    //顯示任官日
    $('#info1').val("貴倌"+y+"年"+m+"月"+d+"日任官。")
    //總月數換算成幾年幾月
    d = Math.floor(Howyouold/12);
    m = Howyouold%12;
    //顯示年資
    $('#info1').val($('#info1').val() + "至去年底為止年資共計"+ d +"年");
    if(m != 0){
        $('#info1').val($('#info1').val() + m +"個月。");
    }
    else{
        $('#info1').val($('#info1').val() +"。");
    }
    //因應法規修訂106年除初官再入營者以外皆有完整慰休天數---20170725
        if(ey==2017 && y != 2016){
            $('#info1').val($('#info1').val() +"因法規於106年修訂，除初官或前一年再入營者以外皆有完整慰勞假天數"+da+"天。");
            m = da;
        }
        else{
            //讀取在職月數
            d = traindate();    
            //天數*比例
            m = (da*d/12);
            //未滿半天及超過半天處理
            m = halfday(m);
            $('#info1').val($('#info1').val() +"你的慰勞假天數是" + da +"X"+d+"/12="+ m +"天(未滿半天以半天計，超過半天以一天計)");
        }
    $('#info1').val($('#info1').val() +"共可請領休假補助費"+ showmethemoney(m) + "元");
    //點擊關閉視窗
    $(".banner > span").on('click',function(){
        $(this).stop(true).animate({opacity: 0,zIndex: 0}, 1);
    });
}
function resgobt(){/*再入營計算機主程式*/
    //浮現視窗
    $(".banner > span").stop(true).animate({opacity: 1,zIndex: 3}, 1);
    //讀取任官日計算年資(只到月數不計算天數)
    var sd = new Date($( "#thedate" ).val());
    var d = sd.getDate();
    var m =  sd.getMonth();
    m += 1;
    var y = sd.getFullYear();
    var od = new Date($( "#theyear" ).val());
    var ey = od.getFullYear();
    var Howyouold = (ey - 1 - y) * 12 + 12 - m;
    //加上前一春年資(只到月數不計算天數)
    var rst = new Date($( "#loginin" ).val());
    var rend = new Date($( "#loginout" ).val());
    var rsty = rst.getFullYear();
    var rstm = rst.getMonth();
    var rendy = rend.getFullYear();
    var rendm = rend.getMonth();
    Howyouold = Howyouold + ((rendy - rsty) * 12) + (rendm - rstm);
    //年資換算慰休
    var da = dayrule(Howyouold);
    //如果當年是再入營者標記
    if(rendy == y){
        p = 1;
    }
    //顯示再入營日
    $('#info1').val("貴倌"+y+"年"+m+"月"+d+"日再入營。")
    d = Math.floor(Howyouold/12);
    m = Howyouold%12;
    //顯示年資
    $('#info1').val($('#info1').val() + "至去年底為止總年資共計"+d+"年");
    if(m != 0){
        $('#info1').val($('#info1').val() + m +"個月。");
    }
    else{
        $('#info1').val($('#info1').val() +"。");
    }
    //因應法規修訂106年除初官再入營者以外皆有完整慰休天數---20170725
        if(ey==2017 && y != 2016){
            $('#info1').val($('#info1').val() +"因法規於106年修訂，除初官或前一年再入營者以外皆有完整慰勞假天數"+da+"天。");
            m = da;
        }
        else{
            //讀取在職月數
            d = traindate();  
            //天數*比例
            m = (da*d/12);
            //未滿半天及超過半天處理
            m = halfday(m);
            $('#info1').val($('#info1').val() +"你的慰勞假天數是" + da +"X"+d+"/12="+ m +"天(未滿半天以半天計，超過半天以一天計)");
        }
    $('#info1').val($('#info1').val() +"共可請領休假補助費"+ showmethemoney(m) + "元");
    //點擊關閉視窗
    $(".banner > span").on('click',function(){
        $(this).stop(true).animate({opacity: 0,zIndex: 0}, 1);
    });
}
function study(){/*留職計算機主程式*/
    //浮現視窗
    $(".banner > span").stop(true).animate({opacity: 1,zIndex: 3}, 1);
    //讀取任官日年資(只到月數不計算天數)
    if(h == 1){//進修年資累計
        var sd = new Date($( "#thedate" ).val());
        var d = sd.getDate();
        var m =  sd.getMonth();
        m += 1;
        var y = sd.getFullYear();
        var od = new Date($( "#theyear" ).val());
        var ey = od.getFullYear();
        var Howyouold = (ey - 1 - y) * 12 + 12 - m;
    }
    else{//育嬰停薪期間年資不計
        //復職後累計年資
        var sd = new Date($( "#thedate" ).val());
        var d = sd.getDate();
        var m =  sd.getMonth();
        m += 1;
        var y = sd.getFullYear();
        var od = new Date($( "#theyear" ).val());
        var ey = od.getFullYear();
        var Howyouold = (ey - 1 - y) * 12 + 12 - m;
        //加上停薪前年資
        var rst = new Date($( "#loginin" ).val());
        var rend = new Date($( "#loginout" ).val());
        var rsty = rst.getFullYear();
        var rstm = rst.getMonth();
        var rendy = rend.getFullYear();
        var rendm = rend.getMonth();
        Howyouold = Howyouold + ((rendy - rsty) * 12) + (rendm - rstm);
    }
    //年資換算慰休
    var da = dayrule(Howyouold);
    //如果當年是再入營者標記
    if(rendy == y){
        p = 1;
    }
    //顯示再入營日
    $('#info1').val("貴倌"+y+"年"+m+"月"+d+"日復職。")
    d = Math.floor(Howyouold/12);
    m = Howyouold%12;
    //顯示年資
    $('#info1').val($('#info1').val() + "至去年底為止總年資共計"+d+"年");
    if(m != 0){
        $('#info1').val($('#info1').val() + m +"個月。");
    }
    else{
        $('#info1').val($('#info1').val() +"。");
    }
    //因應法規修訂106年復職者皆有完整慰休天數---20170725
    //    if(ey==2017){
    //        $('#info1').val($('#info1').val() +"因法規於106年修訂，106年度復職者皆有完整慰勞假天數"+da+"天。");
    //        m = da;
    //    }
    //    else{
            //讀取在職月數
            d = studydate();  
            //天數*比例
            m = (da*d/12);
            //未滿半天及超過半天處理
            m = halfday(m);
            $('#info1').val($('#info1').val() +"你的慰勞假天數是" + da +"X"+d+"/12="+ m +"天(未滿半天以半天計，超過半天以一天計)");
    //    }
    $('#info1').val($('#info1').val() +"共可請領休假補助費"+ showmethemoney(m) + "元");
    //點擊關閉視窗
    $(".banner > span").on('click',function(){
        $(this).stop(true).animate({opacity: 0,zIndex: 0}, 1);
    });
}