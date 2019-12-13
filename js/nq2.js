
// data: {"label":label,"name":name,"detailIndex":relativeTo}
var fingerprint = new Fingerprint().get();
function baseComp(data) {
  this.label = data['label'];
  this.name = data['name'];
  this.layout=data['layout'];
  this.mandatory=data['mandatory']||true;
  this.detailIndex = data['detailIndex'];
  var temp = this;
  this.writeFrame=function() {
    var comp=$("<div class='comp'></div>");
    if(temp.mandatory) {
      comp.addClass("mandatory");
    }
    comp.append( "<div class='qTitle'>[label]</div>".replace("[label]",this.label) );
    var targets = this.detailIndex.split(":");
    if(targets.length>1) {
      comp.hide();
     // $("input[name=/name/][value=/value/]".replace("/name/",targets[0]).replace("/value/",targets[1])).change(function(e) {
      $("input[name=/name/]".replace("/name/",targets[0])).change(function(e) {
        if(e.target.type == 'radio') {
          if(e.target.value == targets[1]){
            comp.slideDown();
          } else {
            var ts = $("input[name=/name/]".replace("/name/",temp.name));
            ts.prop("checked", false);
            comp.slideUp();
          }
        } else if(e.target.type == 'checkbox') {
          if(e.target.value == targets[1] && e.target.checked){
            comp.slideDown();
          } else {
            var ts = $("input[name=/name/]".replace("/name/",temp.name));
            ts.attr("checked", false);
            ts.change();
            comp.slideUp();
          }
        }
      });
    }
    return comp;
  }
}

baseComp.prototype.write = function() {
    var comp=this.writeFrame();
    comp.append("<div><span><input type='text' name='[name]'/><span></div>".replace("[name]",this.name));
    return comp;
}
// 
// data: {"label":label,"name":name,"data":{"label":"values"},"detailIndex":detailIndex,"type":type,layout=3}
function multiComp(data) {
  baseComp.call(this,data);
  this.data=data['data'];
  this.detailIndex = data['detailIndex'];
  this.type = data['type'];
  this.layout=data["layout"];
}
multiComp.prototype.write=function() {
  var comp=this.writeFrame();
  comp.append("<div class='rc'></div>");
  var dv=comp.children().last();
  var temp = this;
  var count=0;
  $.each(this.data, function(i, d){
    count++;
    dv.append("<span><input type='[type]' name='[name]' value=[val]>[label]</input></span>"
    .replace("[type]",temp.type)
    .replace("[name]",temp.name)
    .replace("[val]",i)
    .replace("[label]",d));
    
    if(d==temp.detailIndex) {
      dv.children().last().attr("class","related");
    }
    $(dv).children().last().children().last().click(function(){
      if($(this).parent().parent().children().filter(".related").length>0){
        if($(this).is(':checked') && $(this).parent().attr("class")=="related"){
          $(this).parent().parent().parent().next().slideDown();
        } else if($(this).attr('type')=='radio'){
        $(this).parent().parent().parent().next().slideUp();
        }
      }
    })
  });
  if(count==2) {
    comp.addClass("rc-2");
  } else if(count==3) {
    comp.addClass("rc");
  } else  {
    comp.addClass("rc-2");
  }
  return comp;
}
multiComp.prototype.getVal = function() {
  var aa = $(this.write()).find("input :checked");
  return aa;
}

function checkBoxComp(data) {
  data['type']="checkbox";
  multiComp.call(this,data);
}
checkBoxComp.prototype.__proto__ = multiComp.prototype;
function radioComp(data) {
  data['type']="radio";
  multiComp.call(this,data);
}
radioComp.prototype.__proto__ = multiComp.prototype;



function doubleColPane(widgets) {
  this.widgets = widgets;
}
doubleColPane.prototype.write=function(){
  var dc = $("<div class='dc comp'></div>");
  var temp = this;
  $.each(temp.widgets, function(i,d ) {
    dc.append(temp.widgets[i]);
  });
  return dc;
}

function comboPane(widgets) {
  this.widgets = widgets;
}
comboPane.prototype.write=function(){
  var dc = $("<div></div>");
  var temp = this;
  $.each(temp.widgets, function(i,d ) {
    dc.append(temp.widgets[i]);
  });
  return dc;
}
//TODO create confirm page widgets. 
// first will be left-right layout, for the text and radio components
// second is bottom-top layout, the checkbox widgets with value.length>2
function confirmLabelWidget(data) {
  baseComp.call(this,data);
  this.data=data['data'];
}
function scrollPosition(element) {
    var tTop = $(element).offset().top;  //得到控件Top
    var tWindowHeight = $(window).height(); //浏览器可视窗口高度
    var tElementHeight = $(element).height(); //控件高度
    var tScrollTop = tTop-tWindowHeight*0.2-tElementHeight*0.5; //让控件中心位于可视窗口3分之1处
    $('html, body').animate({  
            scrollTop: tScrollTop
    }, 1000);  
}
function paintQuestions(token) {
  console.log(fingerprint);
  $.ajax({
      headers: {
          "fingerprint": fingerprint
      },
      type: "GET",
      url: "/questionaire_service/group/current",
      success: function (data) {
          $.each(data, function(i,di){
              var dq=di['question'];
              //$(".container").append("<div><h2>"+di['label']+"</div></h2>");
              $(".dc").children("h2").text(di['label']);
              $(".container").append("<div></div>");
              var nd = $(".container").children().last();
              nd.attr("id",dq['name']);
              $.each(dq, function(i, d){
                var ops = d['options'];
                var counter ='' ;
                if(d['relative']) {
                  $.each(ops,function(i,d) {
                    counter=d;
                  });
                }
                if(d['type'] == 'text') {
                  nd.append(new baseComp({"label":d['label'],"name":d['name'],"detailIndex":d['relative']}).write());
                } else if(d['type'] =='radio') {
                  nd.append(new radioComp({"label":d["label"],"name":d['name'],"data":d["options"],"detailIndex":d['relative']}).write());
                } else if(d['type'] =='checkbox') {
                  nd.append(new checkBoxComp({"label":d["label"],"name":d['name'],"data":d["options"],"detailIndex":d['relative']}).write());
                }
              })
              
            });
            // $(".related").parent().parent().next().hide();
          },
          
      }).fail(function(data){
            window.location="/nq2Intro.html";
          });
  }
  
  function validateEmptyInput() {
    var pass=true;
    var focused = false;
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

  //data: {"label":label,"name":name,"data":{"label":"values"},"detailIndex":detailIndex,"type":type,layout=3}
  // $.get("/questionaire_service/component/findAll", function(data) {
  //   $.each(data, function(i,d){
  //       var ops = d['options'];
  //       var counter ='' ;
  //       if(d['relative']) {
  //         $.each(ops,function(i,d) {
  //           counter=d;
  //         });
  //       }
  //       if(d['type'] == 'text') {
  //         $("."+d['group']).children().last().append(new baseComp({"label":d['label'],"name":d['name'],"detailIndex":d['relative']}).write());
  //       } else if(d['type'] =='radio') {
  //         $("."+d['group']).children().last().append(new radioComp({"label":d["label"],"name":d['name'],"data":d["options"],"detailIndex":d['relative']}).write());
  //       } else if(d['type'] =='checkbox') {
  //         $("."+d['group']).children().last().append(new checkBoxComp({"label":d["label"],"name":d['name'],"data":d["options"],"detailIndex":d['relative']}).write());
  //         }
  //     });
  //     $(".related").parent().parent().next().hide();
  //   });
function postData() {
  var postData = [];
  var comps = $(".comp:visible");
  $.each(comps, function(i, d){
    var l = $(d).children().first().text();
    var v=[];
    var txt = [];
    var vs = $(d).find("input");
    
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
    v=v.join(',');
    txt = txt.join(",");
    
    postData.push({
      'name':currName,
      //'label':l,
      'value':v,
      //'text':txt
    });
  });
  $.ajax({
      headers: {
          "fingerprint": fingerprint
      },
      type: "POST",
      data: postData,
      url: "/questionaire_service/selection/addData/",
      success: function (data) {
        
      },
    });
  return postData;
}

function addItemList(items){
  var itemComp=$("<div></div>");
  itemComp.append("<h3>加项检查列表</h3>")
  itemComp.hide();
  $.each(items, function(i,d){
      var itemSub = $("<div class='ic'></div>");
      itemSub.append("<div>"+d['itemName']+"</div>");
      var desc = d['itemPurpose'];
      if(!desc || desc == ''){
        desc = "<span class='no_item_error'>非常规健康体检项目</span>";
      }
      itemSub.append("<div>"+desc+"</div>");
      itemComp.append(itemSub);
  });
  return itemComp;
} 