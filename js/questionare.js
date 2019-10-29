

function _singleTextComp(label, name) {
  var stc = $("<div class='stc'></div>");
  stc.append("<div><b>[label]</b></div>".replace("[label]",label));
  stc.append("<div><input type='text' name='[name]' />".replace("[name]",name));
  return stc;
}

function _radioComp(label,name,argLabels, argVals, detailIndex,layout) {
  var rc = '';
  if(layout>0) {
    rc = $("<div class='rc-[layout]'></div>".replace("[layout]",layout));
  } else {
    rc = rc = $("<div class='rc'></div>".replace("[layout]",layout));
  }
  rc.append("<div><b>[label]</b></div>".replace("[label]",label));
  rc.append("<div></div>");
  var radioDiv = rc.children().last();
  $.each(argLabels, function(i, d){
    radioDiv.append("<span><input type='radio' name='[name]' value=[val]>[label]</input></span>"
    .replace("[name]",name)
    .replace("[val]",argVals[i])
    .replace("[label]",argLabels[i]));
    if(i==detailIndex) {
      radioDiv.children().last().attr("class","related");
    }
  });
  return rc;
}

function _selectComp(label, name, argLabels, argVals) {
  var sc = $("<div class='sc'></div>");
  sc.append("<div><b>[label]</b></div>".replace("[label]",label));
  sc.append("<select name='[name]'></select>".replace("[name]",name));
  var selectDiv = sc.children().last();
  $.each(argLabels, function(i, d){
    selectDiv.append("<option value='[val]'>[label]</option>"
    .replace("[val]",argVals[i])
    .replace("[label]",argLabels[i]));
  });
  return sc;
}

function _checkboxComp(label,name,argLabels, argVals, detailIndex,layout) {
  var rc = '';
  if(layout>0) {
    rc = $("<div class='rc-[layout]'></div>".replace("[layout]",layout));
  } else {
    rc = rc = $("<div class='rc'></div>".replace("[layout]",layout));
  }
  
  rc.append("<div><b>[label]</b></div>".replace("[label]",label));
  rc.append("<div></div>");
  var radioDiv = rc.children().last();
  $.each(argLabels, function(i, d){
    radioDiv.append("<span><input type='checkbox' name='[name]' value=[val]>[label]</input></span>"
    .replace("[name]",name)
    .replace("[val]",argVals[i])
    .replace("[label]",argLabels[i]));
    if(i==detailIndex) {
      radioDiv.children().last().attr("class","related");
    }
  });
  return rc;
}

function _doubleColPane(widgets) {
  var dc = $("<div class='dc'></div>");
  $.each(widgets, function(i,d ) {
    dc.append(widgets[i]);
  });
  return dc;
}

function _doubleTextComp(label1, name1,label2, name2) {
  var stc = $("<div class='dtc'></div>");
  stc.append("<div></div><div></div>");
  stc.children().first().append("<div><b>[label]</b></div>".replace("[label]",label1));
  stc.children().first().append("<div><input type='text' name='[name]' />".replace("[name]",name1));
  stc.children().last().append("<div><b>[label]</b></div>".replace("[label]",label2));
  stc.children().last().append("<div><input type='text' name='[name]' />".replace("[name]",name2));
  return stc;  
}

function _comboPane(widgets){
  var comboPane =  $("<div></div>");
  $.each(widgets, function(i,d){
    comboPane.append(widgets[i]);
  })
  return comboPane;
}

$("div.base_info_pane").append(_singleTextComp("姓名","cusName"));
$("div.base_info_pane").append(_singleTextComp("联系电话","mobiNumber"));
$("div.base_info_pane").append(_singleTextComp("年龄","age"));
$("div.base_info_pane").append(_doubleTextComp("身高(cm)","height","体重(kg)","weight"));
$(".questionare_pane").append(_radioComp("婚姻状况","marriage",["已婚(含同居)","未婚"],["married","single",]));

$(".questionare_pane").append(_checkboxComp("您是否有自觉症状","issues"
,["无","经常咳嗽、有痰等","上台阶时气喘、心悸","心律不齐","头痛、头晕、摇晃不稳、耳鸣","经常便秘、腹泻"
,"便中有血","便呈黑色","经常口渴并饮茶或水","脸、脚经常浮肿","夜间上数次厕所","排尿时有痛感","其他"]
,["none","cough","breath_difficulty","irregular_pulse","dizzy","poop_often","poop_blood","poop_black","thirsty","edema","pee_often","pee_pain","other"],12,2));
$(".questionare_pane").append(_singleTextComp("其他症状描述","other_issue"));

$(".questionare_pane").append(_checkboxComp("您是否得过以下病症","issues"
,["无","心脏病","脑中风","高血压","糖尿病","肾病"
,"贫血","肝病","高血脂症","胃溃疡","十二指肠溃疡","妇科疾病","痛风","其他"]
,["none","heart_disease","stroke","high_blood_pressure","diebetes","kidney_disease"
,"anemia","liver_disease","hyperlipidemia","gastrohelcoma","duodenal_ulcer","female_desease","gout","other"],13,2));
$(".questionare_pane").append(_singleTextComp("其他病症描述","other_disease"));

$(".questionare_pane").append(_radioComp("您现在是否有内服药物、吸入药物、贴药贴","medicine",["没有","有"],["no","yes",],1));
$(".questionare_pane").append(_singleTextComp("用药描述","medicine_name"));

$(".questionare_pane").append(_radioComp("您是否做过幽门螺旋杆菌的检查与治疗","hp",["没做过","做过","检查结果是阴性","检查结果是阳性"],["no","yes","negtive","positive"],3,2));
$(".questionare_pane").append(_radioComp("是否进行治疗","hp_treatment",["未处置 ","除菌成功","除菌不成功","不知道除菌是否成功"],["not_done","success","fail","no_result"],-1,2));

$(".questionare_pane").append(_radioComp("您是否接受过手术","surgery",["没有","有"],["no","yes",],1));
$(".questionare_pane").append(_singleTextComp("手术时年龄，病名","surgery_history"));

$(".questionare_pane").append(_radioComp("您是否输过血","transfusion",["没有","有"],["no","yes",],1));
$(".questionare_pane").append(_singleTextComp("输血时年龄，病名","transfusion_history"));

$(".questionare_pane").append(_radioComp("是否吸烟","smoke",["不吸烟","每天小于一包","每天大于一包"],["no","less","heavy"]));

$(".questionare_pane").append(_radioComp("是否有饮酒的习惯(指平均每周喝酒1次以上)","drink",["不喝酒","喝酒","已经戒酒"],["no","yes","quitted"],1));
var drinkHabbit = _radioComp("您一般喝什么酒","drink_type",["白酒","啤酒","红酒","什么都喝"],["chinese_wine","beer","red_wine","all"]);
var drinkCapacity = _radioComp("您每次喝几两(1两相当于50ml白酒,100ml红酒,300ml啤酒)","drinkCapacity",["1~2两","3~4两",">5两"],["100g","200g","250g"]);
var drinkFreq = _radioComp("您每周喝几次","drinkFreq",["1~2次","3~5次","&gt>5次"],["2","4","5"]);
var drinkHistory = _radioComp("您持续喝酒的年限(含戒酒前)","drinkHistory",["0~5年","6~10年","11~20年","21~30年","31~40年",">40年"],["5","10","20","30","40","more"]);
$(".questionare_pane").append(_comboPane([drinkHabbit,drinkCapacity,drinkFreq,drinkHistory]));

$(".questionare_pane").append(_radioComp("您的父母是否患有明确诊断的疾病?","familayhistory",["是","否"],["yes","no"],0));
$(".questionare_pane").append(_checkboxComp("请选择疾病的名称","diseases"
,["高血压病","脑卒中","冠心病","糖尿病","肥胖症","慢性肾脏疾病","慢性阻塞性肺病","高尿酸血症或痛风","其他"]
,["highbloodpressure","stroke","heartattack","diebetes","fat","chronic_kidney_issue","chronic_lung_issue","gout",,"other"],8));
$("div.questionare_pane").append(_singleTextComp("请填写疾病的名称","other_diseases"));
$(".questionare_pane").append(_checkboxComp("家族中是否有亲属有癌症史","cancer"
,["无","肺癌","乳腺癌","甲状腺癌","肝癌","胃癌","食管癌","结直肠癌","胰腺癌","鼻咽癌","宫颈癌","子宫癌","前列腺癌","其他"]
,["lung","breast","jiazhuangxian","liver","stomack","shiguan","oncolony","yixian","ent","oven_neck","oven","qianliexian","other"]
,13));
$("div.questionare_pane").append(_singleTextComp("请填写癌症的名称","other_cancer"));

$(".questionare_pane").append(_radioComp("您参加运动锻炼吗","workout",["不参加","参加"],["no","yes"],1));
var workoutType = _checkboxComp("运动方式","workout_type"
,["散步","慢跑","游泳","骑自行车","爬楼梯","球类","交谊舞","瑜伽","健身操","力量锻炼","登山","太极拳","其他"]
,["walking","jogging","swimming","cycling","stairs","balls","dancing","yoga","jianshencao","power","climbing","taiji","other"]
,12);
var other_workoutType=_singleTextComp("请填写运动方式","other_workoutType");
var workoutFreq = _radioComp("您每周锻炼几次","workoutFreq",["1~2次","3~5次","&gt;5"],["2","5","more"]);
var workoutCapacity = _radioComp("每次锻炼时间","workoutCapacity",["&lt;30分钟","30~60分钟","&gt;60分钟"],["30","60","more"]);
$(".questionare_pane").append(_comboPane([workoutType,other_workoutType,workoutFreq,workoutCapacity]));

$(".questionare_pane").append(_radioComp("性别","gender",["男","女"],["male","female"],1));
var periodComp = _radioComp("是否有月经","period",["否","是"],["no","yes"],1);
var period_regulationComp = _radioComp("月经是否紊乱","period_regulation",["否","是"],["no","yes"]);
var menstrual_cycleComp = _singleTextComp("最后一次月经周期","menstrual_cycle");
$(".questionare_pane").append(_comboPane([periodComp,menstrual_cycleComp,period_regulationComp]));
//"高血压病","脑卒中","冠心病","糖尿病","肥胖症","慢性肾脏疾病","慢性阻塞性肺病","高尿酸血症或痛风","恶性肿瘤","其他"
//"highbloodpressure","stroke","heartattack","diebetes","fat","chronic_kidney_issue","chronic_lung_issue","gout","tumor","other",
$("input[type='radio']").click(function(){
  if( $(this).parent().parent().children().filter(".related").length>0){
    if($(this).is(':checked') && $(this).parent().attr("class")=="related"){
      $(this).parent().parent().parent().next().slideDown();
    } else {
    $(this).parent().parent().parent().next().slideUp();
    }
  }
});
$("input[type='checkbox']").click(function(){
  if( $(this).parent().attr("class")=="related"){
    if($(this).is(':checked')){
      $(this).parent().parent().parent().next().slideDown();
    } else {
    $(this).parent().parent().parent().next().slideUp();
    }
  }
});
$(".related").parent().parent().next().hide();

$("button").click(function(e) {

});
