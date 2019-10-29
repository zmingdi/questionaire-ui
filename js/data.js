var genderCompData = {
  name:"gender",
  label: "性别",
  data: { "男":"male","女":"female"} ,
  detailIndex: "female"
}

var otherIssueCompData = {
  "name":"other_issue", "label":"其他症状描述"
};
var nameCompData = {name:"name",label:"姓名"};
var mobiNumCompData = {name:"mobiNumber",label:"联系电话"};
var ageCompData = {name:"age",label:"年龄"};
var heightCompData = {name:"height",label:"身高(cm)"};
var weightCompData = {name:"weight",label:"体重(kg)"};
var marrigeCompData = {name:"marriage",label:"婚姻状况",data:{"已婚(含同居)":"married","未婚":"single"}};

var issueCompData = {
  name:"issues",
  label:"您是否有自觉症状",
  data: {
    "无":"none","经常咳嗽、有痰等":"cough","上台阶时气喘、心悸":"breath_difficulty"
    ,"心律不齐":"irregular_pulse","头痛、头晕、摇晃不稳、耳鸣":"dizzy"
    ,"经常便秘、腹泻":"poop_often","便中有血":"poop_blood"
    ,"便呈黑色":"poop_black","经常口渴并饮茶或水":"thirsty"
    ,"脸、脚经常浮肿":"edema","夜间上数次厕所":"pee_often"
    ,"排尿时有痛感":"pee_pain","其他":"other"
  },
  detailIndex: "other",
  layout:2
}
var diseaseCompData = {
  name:"issues",
  label:"您是否有自觉症状",
  data: {
    "无":"none"
    ,"心脏病":"heart_disease"
    ,"脑中风":"stroke"
    ,"高血压":"high_blood_pressure"
    ,"糖尿病":"diebetes"
    ,"肾病":"kidney_disease"
    ,"贫血":"anemia"
    ,"肝病":"liver_disease"
    ,"高血脂症":"hyperlipidemia"
    ,"胃溃疡":"gastrohelcoma"
    ,"十二指肠溃疡":"duodenal_ulcer"
    ,"妇科疾病":"female_desease"
    ,"痛风":"gout"
    ,"其他":"other"
  },
  detailIndex: "other",
  layout:2
}
var otherDiseaseCompData  = {
  name:"other_disease"
  ,label:"其他病症描述"
}
var medicineCompData = {
  name:"medicine",
  label:"您现在是否有内服药物、吸入药物、贴药贴",
  data: {
    "没有":"no"
    ,"有":"yes"
  },
  detailIndex:"yes",
  layout:2
}
var medNameCompData = {
  name:"medicine_name",
  label:"用药描述"
}
var hpCompData = {
  name:"hp",
  label:"您是否做过幽门螺旋杆菌的检查与治疗",
  data: {
    "没做过":"no"
    ,"做过":"yes"
    ,"检查结果是阴性":"negtive"
    ,"检查结果是阳性":"positive"
  },
  detailIndex:"positive",
  layout:2
}
var hpTreatmentCompData = {
  name:"hp",
  label:"是否进行治疗",
  data: {
    "未处置":"not_done"
    ,"除菌成功":"success"
    ,"除菌不成功":"fail"
    ,"不知道除菌是否成功":"no_result"
  },
  detailIndex:"",
  layout:2
}

var surgeryCompData = {
  name:"surgery",
  label:"您是否接受过手术",
  data: {
    "没有":"no"
    ,"有":"yes"
  },
  detailIndex:"yes",
  layout:2
}
var surgeryHistoryCompData = {
  name:"surgery_history",
  label:"手术时年龄，病名",
}
var transfusionCompData = {
  name:"transfusion",
  label:"您是否输过血",
  data: {
    "没有":"no"
    ,"有":"yes"
  },
  detailIndex:"yes",
  layout:2
}
var transfusionHistoryCompData = {
  name:"transfusion_history",
  label:"输血时年龄，病名",
}
var smokeCompData = {
  name:"smoke",
  label:"是否吸烟",
  data: {
    "不吸烟":"no"
    ,"每天小于一包":"less"
    ,"每天大于一包":"heavy"
  },
  detailIndex:"",
  layout:2
}
var drinkCompData = {
  name:"drink",
  label:"是否有饮酒的习惯(指平均每周喝酒1次以上)",
  data: {
    "不喝酒":"no"
    ,"喝酒":"yes"
    ,"已经戒酒":"quitted"
  },
  detailIndex:"yes"
}
var drinkTypeCompData = {
  name:"drink_type",
  label:"您一般喝什么酒",
  data: {
    "白酒":"chinese_wine"
    ,"啤酒":"beer"
    ,"红酒":"red_wine"
    ,"什么都喝":"all"
  }  
}
var drinkCapacityCompData = {
  name:"drinkCapacity",
  label:"您每次喝几两(1两相当于50ml白酒,100ml红酒,300ml啤酒)",
  data: {
    "1~2两":"100g"
    ,"3~4两":"200g"
    ,">5两":"250g"
  }  
}
var drinkFreqCompData = {
  name:"drinkFreq",
  label:"您每周喝几次",
  data: {
    "1~2次":"2"
    ,"3~5次":"4"
    ,">5次":"5"
  }  
}
var drinkHistoryCompData = {
  name:"drinkHistory",
  label:"您持续喝酒的年限(含戒酒前)",
  data: {
    "0~5年":"5"
    ,"6~15年":"15"
    ,"15年以上":"more"
  }  
}

var familyDiseaseHistoryCompData = {
  name:"familyDiseaseHistory",
  label:"您的父母是否患有明确诊断的疾病",
  data: {
    "无":"none"
    ,"高血压病":"highbloodpressure"
    ,"脑卒中":"stroke"
    ,"冠心病":"heartattack"
    ,"糖尿病":"diebetes"
    ,"肥胖症":"fat"
    ,"慢性肾脏疾病":"chronic_kidney_issue"
    ,"慢性阻塞性肺病":"chronic_lung_issue"
    ,"高尿酸血症或痛风":"chronic_lung_issue"
    ,"其他":"other"
  }  ,
  detailIndex:"other",
  layout:2
}
var otherFamilyDiseaseHistoryCompData = {
  name:"otherFamilyDiseaseHistory",
  label:"请填写疾病的名称"
}

var cancerHistoryCompData = {
  name:"cancerHistory",
  label:"家族中是否有亲属有癌症史",
  data: {
    "无":"none"
    ,"肺癌":"lung"
    ,"乳腺癌":"breast"
    ,"甲状腺癌":"jiazhuangxian"
    ,"肝癌":"liver"
    ,"胃癌":"stomack"
    ,"食管癌":"shiguan"
    ,"结直肠癌":"oncolony"
    ,"胰腺癌":"yixian"
    ,"鼻咽癌":"ent"
    ,"宫颈癌":"oven_neck"
    ,"子宫癌":"oven"
    ,"前列腺癌":"qianliexian"
    ,"其他":"other"
  }  ,
  detailIndex:"other",
  layout:2
}
var otherCancerHistoryCompData = {
  name:"other_cancer",
  label:"请填写癌症的名称"
}

var workoutCompData = {
  name:"workout",
  label:"您参加运动锻炼吗",
  data: {
    "不参加":"no"
    ,"参加":"yes"
  }  ,
  detailIndex:"yes",
  layout:2
}
var workoutTypeCompData = {
  name:"cancerHistory",
  label:"运动锻炼方式是哪些",
  data: {
    "散步":"walking"
    ,"慢跑":"jogging"
    ,"游泳":"swimming"
    ,"骑自行车":"cycling"
    ,"爬楼梯":"stairs"
    ,"球类":"balls"
    ,"交谊舞":"dancing"
    ,"瑜伽":"yoga"
    ,"健身操":"jianshencao"
    ,"力量锻炼":"power"
    ,"登山":"climbing"
    ,"太极拳":"taiji"
    ,"其他":"other"
  }  ,
  detailIndex:"other",
  layout:2
}
var otherWorkoutTypeCompData = {
  name:"other_workoutType",
  label:"请填写运动方式"
}
var workoutFreqCompData = {
  name:"workoutFreq",
  label:"您每周锻炼几次",
  data: {
    "1~2次":"light"
    ,"3~5次":"medium"
    ,"&gt;5":"high"
  }
}
var workoutCapacityCompData = {
  name:"workoutCapacity",
  label:"每次锻炼时间",
  data: {
    "&lt;30分钟":"light"
    ,"30~60分钟":"medium"
    ,"&gt;60分钟":"high"
  }
}
var genderCompData = {
  name:"gender",
  label:"性别",
  data: {
    "男":"male"
    ,"女":"female"
  }  ,
  detailIndex:"female",
  layout:2
}
var periodCompData = {
  name:"period",
  label:"是否有月经",
  data: {
    "否":"no"
    ,"是":"yes"
  }  ,
  detailIndex:"yes",
  layout:2
}
var periodRegulationCompData = {
  name:"period_regulation",
  label:"月经是否紊乱",
  data: {
    "否":"no"
    ,"是":"yes"
  }  ,
  detailIndex:"",
  layout:2
}
var menstrualCycleCompData = {
  name:"menstrual_cycle",
  label:"最后一次月经周期"
}