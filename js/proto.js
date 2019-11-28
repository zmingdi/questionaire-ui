
// data: {"label":label,"name":name}
function baseComp(data) {
  this.label = data['label'];
  this.name = data['name'];
  this.layout=data['layout'];
  this.mandatory=data['mandatory']||true;
  var temp = this;
  this.writeFrame=function() {
    var comp=$("<div class='comp'></div>");
    if(temp.mandatory) {
      comp.addClass("mandatory");
    }
    comp.append( "<div class='qTitle'>[label]</div>".replace("[label]",this.label) );
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
  if(this.layout) {
    comp.addClass("rc-[l]".replace("[l]",this.layout));
  } else {
    comp.addClass("rc");
  }
  comp.append("<div class='rc'></div>");
  var dv=comp.children().last();
  var temp = this;
  $.each(this.data, function(i, d){
    dv.append("<span><input type='[type]' name='[name]' value=[val]>[label]</input></span>"
    .replace("[type]",temp.type)
    .replace("[name]",temp.name)
    .replace("[val]",d)
    .replace("[label]",i));
    
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


// TODO remove this unused function
$("button").click(function(){
  $.each($(".comp"), function(i, d){
    var ele = $(d).children().last().children().find(":checked");
    if(ele.length) {
      $.each(ele, function(i, d){
        //console.log($(d).attr("name") + ":" +$(d).val());
      });
    }
  })
});

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
confirmLabelWidget.prototype.write = function() {
  var comp=this.writeFrame();
  comp.append
}
