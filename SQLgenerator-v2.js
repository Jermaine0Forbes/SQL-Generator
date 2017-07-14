


var obj=[
    {
         values:["male","female"],
         type : "string",
         name : "sex" ,
         multiple: false,
         last:false,
         nested:false,
         dependent: false,
         if:false,
         between:false,
         not: false,
         equals : false,
         lessThan:false,
         greaterThan:false,
    },
    {
         values:{
           male:['Michael','Tom','Noah','Benjamin','Sebastian','Daniel','David','James',
           'Jacob','Matthew','Samuel','Jonathan','Nathan','Cooper','John','Arthur','Jackson',
           'Aiden','Liam','Lucas','Mason','Ethan',
           'Caden','Jayden','Logan','Elijah','Jermaine'] ,

           female:["Alice","Caitlyn","Jessica","Samantha","Bianca","Chelsea","Amanda",
           "Francesca","Kelly","Jennifer","Olivia","Leah","Zoey","Sophia","Emma","Isabella",
           "Ava","Cadence","Clara","London","Bella","Paisley","Gianna"]
         },
         type : "string",
         name : "first_name" ,
         multiple: true,
         last:false,
         nested:true,
         dependent: "sex",
         if:false,
         between:false,
         not: false,
         equals : false,
         lessThan:false,
         greaterThan:false,
    },
    {
         values:["Smith","Johnson","Forbes","Wilson","Brown","Jones","Moore","Anderson",
         "Jackson","Harris","Russel","Sanders","Butler","Kelly","Watson","Bryant",
        "Torres", "Parker","Collins" ,"Edwards" ,"Stewart" ,"Flores" ,"Morris" , "Nguyen",
         "Murphy", "Rivera","Cook"]
         ,
         type : "string",
         name : "last_name" ,
         multiple: true,
         last:false,
         nested:false,
         dependent: false,
         if:false,
         between:false,
         not: false,
         equals : false,
         lessThan:false,
         greaterThan:false,
    },
    {
         values:[18,70]
         ,
         type : "number",
         name : "age" ,
         multiple: false,
         last:false,
         nested:false,
         dependent: false,
         if:false,
         between:false,
         not: false,
         equals : false,
         lessThan:false,
         greaterThan:false,
    },
    {
         values:[110,300]
         ,
         type : "number",
         name : "weight" ,
         multiple: true,
         last:true,
         nested:false,
         dependent: false,
         if:false,
         between:false,
         not: false,
         equals : false,
         lessThan:false,
         greaterThan:false,
    }
]





function $(selector){
    return document.querySelector(selector);
}


class F{

  constructor(data, table, columns){
      this.start = "#start";
      this.copy = "#copy";
      this.result = "#result";
      this.input = "#input";
      this.timeOutput = "#time";
      this.data = data;
      this.table = table;
      this.column = columns;
      this.insert = "";
      this.time;
    console.log("starting generator ...");
  }

  init(){
      var self = this;
      this.generateData();
      self.insertInfo();
      $(this.copy).onclick = function(){
          self.selectText(self.result);
      }
  }

  random(max,min, arr){
      let num = Math.round(Math.random()*(min-max)+max);
  return arr[num];
}//random

seconds(prevTime, curTime){
    let time = curTime - prevTime;
    let seconds = time/1000;
    return seconds.toFixed(2);
}

insertInfo(){
    var self = this;
    var str = "",
        length = self.column.length,
        table = self.table,
        last = self.column.length - 1;
    for(let x = 0; x < length ; x++){
        if( x === last){
            str += self.column[x];
            continue;
        }
        str += self.column[x]+",";
    }

    self.insert = `INSERT INTO ${table} (${str}) VALUES <br>`;

}

setButtons(start, copy){
     this.start  = start || this.start;
     this.copy = copy || this.copy;

}

selectText(selector) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.querySelector(selector));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.querySelector(selector));
            window.getSelection().addRange(range);
        }
    }

generateData(){
    var
    start = this.start,
    input = this.input,
    self = this,
    data = this.data,
    number ;
    $(start).onclick = function(){
        number = $(input).value;
        number = (number)? number:1;
        $(input).value = "";
        self.generate(data, number)
    }



}

returnResults(results){
    var self  = this,
      allData = self.insert,
         length = results.length,
         last = results.length -1,
         seconds = self.time,
         selector = self.result;

    for(var y = 0 ; y < length; y++){
        if( y === last){
            allData += results[y];
            continue;
        }

        allData += (y % 5 == 0)?results[y]+",<br>":results[y]+",";

    }
    seconds = self.seconds(seconds,Date.now());
    $(selector).innerHTML = allData;
    $(self.timeOutput).innerHTML = seconds+" seconds";
}






generate(object,dataNumber){
    // keeps the current values of an object

    var currentObj ={},
        value ,
        checkingCond = false,
        strData = "",
        strArr = [],
        arr = []
        self = this;
        self.time = Date.now();


    for(let x = 0 ; x < dataNumber; x++){
        for( let obj of object){
            let dependentValue = currentObj[obj.dependent] || "",
            value   = self.isNested(obj.nested,dependentValue, obj);
            if( obj.if ){
                checkingCond = false
                    arr = [true];

                while( checkingCond === false){

                    obj.between && arr.push(self.between(obj.between,currentObj[obj.dependent]));
                    obj.not && arr.push(self.not(obj.not,currentObj[obj.dependent]));
                    obj.equals && arr.push(self.equals(obj.equals,currentObj[obj.dependent]));
                    obj.lessThan && arr.push(self.lessThan(obj.lessThan,currentObj[obj.dependent]),value);
                    obj.greaterThan && arr.push(self.greaterThan(obj.greaterThan,currentObj[obj.dependent]),value);

                    checkingCond = arr.every(function(value){
                        return value === true;
                    })

                    if(!checkingCond){
                        value = self.isNested(obj.nested,currentObj[obj.dependent], obj);
                        arr = [];
                    }


                }//while


            }//if

            currentObj[obj.name] = value;
            value = (obj.type == "string")?`'${value}'`:value;
            strData += (obj.last)?`${value}`: `${value},`;
            arr = [];


        }//for of

        strData = `(${strData})`;
        strArr.push(strData);
        strData = "";
    }
 self.returnResults(strArr);
}//generate


isNested(nested, key, obj){
    var self = this;
    if(nested){
        let val = obj.values[key];
        return self.isMultiple(obj.multiple, val)
    }else{
        return self.isMultiple(obj.multiple, obj.values)
    }

}


isMultiple(multiple, arr){
    var self = this;
    var min = 0, max = arr.length - 1;
    if(multiple){
        return self.random(max, min, arr)
    }else{

        return self.random(max,min, arr);
    }

}

between( between,  dependentVal){
    if( dependentVal > between[0] && dependentVal < between[1]){
        return true;
    }else{
         return false;
    }

}//between

not(not , dependentVal){
    if(dependentVal !== not.Argument ){
        return true;
    }else{
         return false;
    }
}

equals(equals , dependentVal){
    if(dependentVal == equals){
        return true;
    }else{
         return false;
    }
}

lessThan(less , dependentVal, value){

    if( dependentVal < less.Argument || less.Value <= value){
        return true;
    }else{
         return false;
    }
}

greaterThan(greater , dependentVal, value){
    if(dependentVal > greater.Argument || greater.Value >= value  ){
        return true;
    }else{
         return false;
    }
}

}// class F

var gen = new F(obj, "user", ["sex","first_name","last_name","age","weight"]);
// console.log(gen)
gen.init();
