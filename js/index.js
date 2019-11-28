
function validateEmptyInput() {
  var pass=true;
  var focused = false;
  var dialog = $("#confirmDialog");
  $.each($("div.qTitle:not(:hidden)"), function(i, d){
    var chld = $(d).next();
    if(chld.find("input:text").length>0){
      var textWidget = chld.find("input:text").first()
      if(textWidget.val()) {
        $(d).removeClass("emptyInputMsg");
        console.log(textWidget.attr("name")+":"+textWidget.val());
      } else {
        if(!focused) {
          textWidget.focus();
        }
        pass=false;
        $(d).addClass("emptyInputMsg");
      }
    } else {
      var checked = $(d).next().children().find(":checked");
      if(checked.length>0) {
        $(d).removeClass("emptyInputMsg");
      } else {
        pass=false;
        if(!checked.first() ){
          checked.first().focus();
        }
        $(d).addClass("emptyInputMsg");
      }
    }
    
  });
  return pass;
}
var postData = [];
$("button").click(function(){
  if( !validateEmptyInput()) {
    alert("有未填写信息， 请确认。");
    return ;
  } else {
    postData=paintConfirmDialog();
    scrollPosition("#confirmDialog")
    $("#confirmDialog").dialog("open");
  }
});

var questionItem = function() {
  
}

function paintConfirmDialog() {
  var postData = [];
  var comps = $(".comp:visible");
  $("#confirmDialog").css("display","grid");
  var temp = $("#confirmDialog");
  $.each(comps, function(i, d){
    var l = $(d).children().first().text();
    var v=[];
    var txt = [];
    var vs = $(d).find("input");
    temp.append("<div></div");
    temp.children().last().css("display","grid");
    temp.children().last().append("<span class='cfmTitle'></span>");
    temp.children().last().children().last().text(l);
    var currName = "";
    $.each(vs, function(vsi,vsd){
      currName = $(vsd).attr("name");
      
      if($(vsd).is(":checked")){
        txt.push($(vsd).parent().text());
        v.push($(vsd).val());
      }else if($(vsd).attr("type") == 'text') {
        //TODO fix the text input confirm
        v.push( $(vsd).val());
        txt.push( $(vsd).val());
      }
    });
    temp.children().last().append("<span></span>");
    v=v.join(',');
    txt = txt.join(",");
    
    postData.push({
      'name':currName,
      'label':l,
      'value':v,
      'text':txt
    });
    
    temp.children().last().css("grid-template-rows","auto auto");   
    temp.children().last().children().last().text(txt);
  });
  // TODO remove this info log
  return postData;
}

//build ui page 
$(".base_info_pane").append(new baseComp(nameCompData).write());

$(".base_info_pane").append(new baseComp(mobiNumCompData).write());
$(".base_info_pane").append(new baseComp(ageCompData).write());
$(".base_info_pane").append(new doubleColPane([new baseComp(heightCompData).write(),new baseComp(weightCompData).write()]).write());

$(".base_info_pane").append(new radioComp(marrigeCompData).write());

$(".questionare_pane").append(new checkBoxComp(issueCompData).write());
$(".questionare_pane").append(new baseComp(otherIssueCompData).write());

$(".questionare_pane").append(new checkBoxComp(diseaseCompData).write());
$(".questionare_pane").append(new baseComp(otherDiseaseCompData).write());

$(".questionare_pane").append(new radioComp(medicineCompData).write());
$(".questionare_pane").append(new baseComp(medNameCompData).write());

$(".questionare_pane").append(new radioComp(hpCompData).write());
$(".questionare_pane").append(new baseComp(hpTreatmentCompData).write());

$(".questionare_pane").append(new radioComp(surgeryCompData).write());
$(".questionare_pane").append(new baseComp(surgeryHistoryCompData).write());

$(".questionare_pane").append(new radioComp(transfusionCompData).write());
$(".questionare_pane").append(new baseComp(transfusionHistoryCompData).write());    

$(".questionare_pane").append(new radioComp(smokeCompData).write());

$(".questionare_pane").append(new radioComp(drinkCompData).write());
var drinkTypeComp = new radioComp(drinkTypeCompData).write() ;
var drinkCapacityCompData = new radioComp(drinkCapacityCompData).write();
var drinkFreqComp = new radioComp(drinkFreqCompData).write();
var drinkHistoryComp = new radioComp(drinkHistoryCompData).write();
$(".questionare_pane").append(new comboPane([drinkTypeComp,drinkCapacityCompData,drinkFreqComp,drinkHistoryComp]).write());

$(".questionare_pane").append(new checkBoxComp(familyDiseaseHistoryCompData).write());
$(".questionare_pane").append(new baseComp(otherFamilyDiseaseHistoryCompData).write());

$(".questionare_pane").append(new checkBoxComp(cancerHistoryCompData).write());
$(".questionare_pane").append(new baseComp(otherCancerHistoryCompData).write());

$(".questionare_pane").append(new radioComp(workoutCompData).write());
var workoutTypeComp = new checkBoxComp(workoutTypeCompData).write() ;
var otherWorkoutTypeComp = new baseComp(otherWorkoutTypeCompData).write();
var workoutFreqComp = new radioComp(workoutFreqCompData).write();
var workoutCapacityComp = new radioComp(workoutCapacityCompData).write();
$(".questionare_pane").append(new comboPane([workoutTypeComp,otherWorkoutTypeComp,workoutFreqComp,workoutCapacityComp]).write());

$(".questionare_pane").append(new radioComp(genderCompData).write());

var periodComp = new radioComp(periodCompData).write() ;
var periodRegulationComp = new radioComp(periodRegulationCompData).write();
var menstrualCycleComp = new baseComp(menstrualCycleCompData).write();

$(".questionare_pane").append(new comboPane([periodComp,new comboPane([periodRegulationComp,menstrualCycleComp]).write()]).write());

$("#confirmDialog").dialog({'autoOpen':false,
     position: { using:function(pos){          
           var topOffset = $(this).css(pos).offset().top;  
          if (topOffset = 0||topOffset>0) {  
             $(this).css('top', ($(window).height()-510)/2);  
          }  
      }}
     , buttons: {
     "确认问卷": function() {
        var confirmURL = "/questionaire_service/analysis/";
        var dialog = $(this);
        $.ajax({
          url: confirmURL,
          data: postData,
          dataType:'json',
          type:'POST',
          success: function (result, status, xht) {
            console.log(result);
            dialog.text("");
            dialog.dialog('close');
            window.location.href ="suitesResult.html?sessionId="+result;
          },
          complete : function (result) {
            console.log(result);
            dialog.text("");
            dialog.dialog('close');
            window.location.href ="suitesResult.html?sessionId="+result.responseText;
          }
        });
      },
     "修改一下": function() {
        $(this).dialog('close');
		postData=[];
        $("#confirmDialog").text('');
     },
  },
  title:"请确认问卷信息",
  modal:true //遮罩效果默认是false不遮住
  });
// 控制页面滚动到指定位置
function scrollPosition(element) {
    var tTop = $(element).offset().top;  //得到控件Top
    var tWindowHeight = $(window).height(); //浏览器可视窗口高度
    var tElementHeight = $(element).height(); //控件高度
    var tScrollTop = tTop-tWindowHeight*0.3-tElementHeight*0.5; //让控件中心位于可视窗口3分之1处
    $('html, body').animate({  
            scrollTop: tScrollTop
    }, 1000);  
}
// $(".base_info_pane").append(new radioComp(genderCompData1).write());
// $(".base_info_pane").append(new baseComp(nameCompData1).write());
// $(".base_info_pane").append(new doubleColPane([new baseComp(nameCompData1).write(),new baseComp(nameCompData1).write()]).write());
$(".related").parent().parent().next().hide();
$("button").button();