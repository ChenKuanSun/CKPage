<p align="center">
  <img src="http://cksunpage.com/logo.jpg">
</p>

* * *
# [休假計算機網頁]
* * *

CK's Side Project

這是基於[國軍軍官士官請假規則]的網頁。
有鑑於作者本身從事人事業務時，時常發現很多國軍同仁對於自身權益的不瞭解，並且常常因為計算錯誤導致休假獎金申請錯誤而造成多數行政人員困擾，因此特地設計了此網頁方便各位去概算自己的休假日數。

* * *

計算說明： 
整個慰勞假的核心就是用年資去計算，以月計算，避免掉28天這種尷尬天數，年資至慰休的前一年12月31日止去計算。

    年資 = (慰休年度 - 1 - 任官年度) * 12 + 12 - 任官月份

如果是再入營者，含育嬰的人員，只是退伍日期改成育嬰生效日期、任官月份改成復職日期而已(因為育嬰期間年資不累計)

    年資 = (慰休年度 - 1 - 再入營年度) * 12 + 12 - 再入營月份 
            + 
          (第一次退伍年度 - 第一次任官年度) * 12 + (第一次退伍月份 - 第一次任官月份)
          
另外是研讀停職人員，年資比照一般公式辦理，因為研讀期間年資有累計(但會管制役期)
然後根據[國軍軍官士官請假規則]法條規定如下：
1. 至年終服役滿一年者，自第二年起，每年七日。但初任人員於二月以後任職者，得依當月至年終之在職月數比例，於次年一月起核給慰勞假。
2. 至年終服役滿三年者，自第四年起，每年十四日。
3. 至年終服役滿六年者，自第七年起，每年二十一日。
4. 至年終服役滿九年者，自第十年起，每年二十八日。
5. 至年終服役滿十四年者，自第十五年起，每年三十日。

這邊就要注意一點情況是，新法規改成第**次**一年起，也就是說年資要算到前一年底為止，然後也**不依比例**去給慰勞假，講白一點，年資1-3年就是7天，不像以前可以按比例去核給。
依上面法規可以訂出，慰勞假的給予：
```javascript
function 慰勞假規則(總年資){
    //達14年有30天慰休
    if( (總年資 / 12) >= 14){
        慰勞假 = 30;
    }
    //達9年有28天慰休
    else if( (總年資 / 12) >= 9){
        慰勞假 = 28;
    }
    //達6年有21天慰休
    else if( (總年資 / 12) >= 6){
        慰勞假 = 21;
    }
    //達3年有14天慰休
    else if( (總年資 / 12) >= 3){
        慰勞假 = 14;
    }
    //未達3年有7天慰休
    else{
        慰勞假 = 7
    }
    return 慰勞假;
}
```
接下來就是複雜的部份，在職比例，依據[國軍軍官士官請假規則]規定

    - 第二章請假種類及標準
      - 第3條慰勞假規定如下：
        -六、軍官、士官不論開缺與否，因受訓、疾病休養或住院期間，於次年度慰勞假核給時，依第一款所定日數，比例折算扣除之，不另補休。

依上面所述的比例去扣除，一般來說就是直接用受訓(含疾病休養或住院期間)清單去計算未在職的月份。

但這邊**要注意的是，國防部當初記者會簡報檔的試算方式可以解讀為，當月份只要有一天責任掛在單位上就算是在職**，什麼意思呢，如果一個弟兄某月1日受訓到某月30日結訓，結果當月為大月有31天，他剛好第31天責任掛在單位上，放個例休、還是回單位報到，都算那個月在職，這樣算也許是當初訂定這個規定的時候要避免掉有28天的問題、一個月同時受兩個短期訓等等各種因人而異的小問題，直接概括全部無視掉了。(如果國防部對於這個解讀有問題可以聯絡作者，會再做修正。)

另外，初官(也就是慰休年度剛好在任官日次年)，根據規定的第一款:初任人員於二月以後任職者，得依當月至年終之在職月數比例，於次年一月起核給慰勞假。也就是說直接把初官的任官錢全部算做不在職就好，然後按在職比例直接去乘7天，再入營跟育嬰的人員就當作那段退伍(停職)期間不在職就可以通算所有比例。如果看不懂我說的，直接在計算紙上根據規定算看看就知道基本上都是一樣的算法。

在職比例計算的程式碼如下(有改成易懂的模式了)：
```javascript
/*
基本上所有人都算做全年度都在職，把整個年度都用成布林運算職，在的話就是True(1)，不在職的話就是False(0)，
初始化方式就是初官任職後都算在職，其他人就是全年度在職，
*/
if(初官){
    for(從任官月到年底){
        if(任官那個月){                    
            for(任官日開始到月底){
                在職;
            }
        }
        else{
            for(月初到月底){
                在職;
            }
        }
    }
}
//其他全年都先在職
else{
    for(年頭到年尾){
        for(月初到月底){
            在職;
        }   
    }
}
//如果某個人退伍了，卻選擇當年度再入營，退伍前的在職月數就要給
if(當年度再入營){
for(把退伍前的日期都在職){
    省略，太長了。
}
//如果第一次入伍、退伍、再入營皆同一年的話.....再把入伍日期前面都變不在職(四個月退伍後就簽了)
if(入伍那年=退伍那年){
    for(從年初到入伍日都算不在職){
        省略，太長了。
    }
}
if($(檢查有沒有受訓){ //有受訓資料就讀沒有就跳過
    //有受訓的天數陣列改為0
        for(從第一筆受訓到最後一筆){
            讀取受訓日期
            var trainstemp = $('#trainning_list>div').eq(i).find("input").val();
            trainstemp = trainstemp.split("-");
            var trains = trainstemp[0].split("/");//分割受訓開始年月日
            var traine = trainstemp[1].split("/");//分割受訓結束年月日
            console.log(trains +">"+ traine);
            //遇到當月受訓當月結訓
            if(parseInt(trains[0]) == parseInt(traine[0])){
                for(var k = parseInt(trains[1]); k<=parseInt(traine[1]);k++){
                    adat[trains[0]][k]= 0;
                } 
            }
            else{//下面就是去把受訓的那天變成不在職
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
//開始判斷整年度的當月在不在職
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
for(var i=1;i<=12;i++){
    if(那個月不在職){
        $('#result_list>li').eq(i).attr('class','list-group-item list-group-item-danger');
        $('#result_list>li').eq(i).text(i+"月不在職")
    }
    else{
        $('#result_list>li').eq(i).attr('class','list-group-item list-group-item-success');
        $('#result_list>li').eq(i).text(i+"月在職")
    }
}
```
算完在職比例後，就是殘酷的按比例扣除了：
```javascript
實際慰勞假 = (慰勞假天數*在職月數/整個年度);
```
接下來就是新法規與舊法規不同的地方，
**新的按比例扣除後未滿半天以半天計，超過半天未滿一日以一日計算。(跟舊法規不一樣)**
由於有人會問那0.00000001呢，我直接這邊解釋，只算到小數後第二位，0.01就當作0，0.05就會解讀為0.1也就是半天
```javascript
function halfday(實際慰勞假){
    if(實際慰勞假 % 1 > 0.5){
        實際慰勞假 = Math.floor(m) + 1;
    }
    else if(實際慰勞假% 1 > 0){
        實際慰勞假 = Math.floor(m) + 0.5;
    }
    else{
        實際慰勞假 = Math.floor(m);
    }
    return 實際慰勞假;
}
```
然後算完實際慰勞假天數後，就會關心休假補助費的問題，這邊財務組很貼心的幫大家化整為零了，有些奇怪的多一塊少一塊的這邊都有統一規定。
(有修正請聯絡作者)
```javascript
function showmethemoney(實際慰勞假){//休假補助費基準表
    var money =0;
    if(實際慰勞假 >= 14){
        money = 16000;
    }
    else if(實際慰勞假 == 10.5){
        money = 12000;
    }
    else if(實際慰勞假 == 7){
        money = 8000;
    }
    else if(實際慰勞假 == 3.5){
        money = 4000;
    }
    else{
        money = 實際慰勞假 * 1143;
        money = Math.round(money);//四捨五入
    }
    return money;
}
```
以上為整個計算機的演算法，如果有更改規定或需要修正的部分請聯絡作者。
* * *

[國軍軍官士官請假規則]: http://law.mnd.gov.tw/scp/Query4B.asp?FullDoc=%A9%D2%A6%B3%B1%F8%A4%E5&Lcode=A003714607        "國軍軍官士官請假規則"
[休假計算機網頁]: http://cksunpage.com/		"休假計算機網頁"
