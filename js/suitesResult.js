
var itemBlock = function(name, price, desc, url,addItems) {
  this.name = name;
  this.price = price;
  this.desc = desc;
  this.url = url||'#';
  this.addItems = addItems|| [];
}
itemBlock.prototype.write = function(){
  var itemComp = $('<div class="resultComp"></div>');
  itemComp.append($('<div class="resultTitleComp"></div>'));
  
  itemComp.children().last().append($('<a href="[url]">[name]</a>'.replace('"[url]"', this.url).replace('[name]',this.name)));
  itemComp.append($('<div class="resultPriceComp"></div>'));
  itemComp.children().last().text(this.price);
  itemComp.append($('<div class="resultDescComp"></div>'));
  itemComp.children().last().text(this.desc);
  if(this.addItems.length>0) {
    itemComp.children().last().append("<span class='s_view_resean'><a href='javascript:void(0)'>查看推荐原因</a></span>");
    var temp = this;
    itemComp.find('a').last().click(function(){
      if($(this).parent().parent().next().is(':visible')) {
          $(this).text("查看推荐原因");
          $(this).parent().parent().next().slideUp();
        } else {
          $(this).text("收起");
          $(this).parent().parent().next().slideDown();
        }
     
    })
    itemComp.append($('<div class="addItems"></div>'));
    $.each(this.addItems,function(i,d){
      itemComp.children().last().append("<div class='l_addItem'></div>")
      itemComp.children().last().children().last().append("<div><input type='checkbox' >" + d["itemName"] + "</input></div>");
      itemComp.children().last().children().last().append("<div>" + d["itemPurpose"] + "</div>");
      itemComp.children().last().css("display","none");
    });
    
  }
  
  return itemComp;
}

