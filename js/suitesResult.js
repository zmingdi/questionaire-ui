
var itemBlock = function(name, price, desc, url) {
  this.name = name;
  this.price = price;
  this.desc = desc;
  this.url = url||'#';
}
itemBlock.prototype.write = function(){
  var itemComp = $('<div class="resultComp"></div>');
  itemComp.append($('<div class="resultTitleComp"></div>'));
  
  itemComp.children().last().append($('<a href="[url]">[name]</a>'.replace('"[url]"', this.url).replace('[name]',this.name)));
  itemComp.append($('<div class="resultPriceComp"></div>'));
  itemComp.children().last().text(this.price);
  itemComp.append($('<div class="resultDescComp"></div>'));
  itemComp.children().last().text(this.desc);
  return itemComp;
}

