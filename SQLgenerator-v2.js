


var obj=[
    {
         values:["male","female"],
         type : "string",
         name : "sex" ,
         range: false,
         last:false,
         nested:false,
         dependent: false,
         if:false,
         between:false,
         not: false,
         equals : false,
         lessThan:false,
         greaterThan:false
    
    },{
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
         range: false,
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
         range: false,
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
         values:[16,70]
         ,
         type : "number",
         name : "age" ,
         range: true,
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
         range: true,
         last:true,
         nested:false,
         dependent: false,
         if:true,
         between:false,
         not: false,
         equals : false,
         lessThan: false, //{ Argument:150, Value:150},
         greaterThan:false
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

 copyData(){
    var 
    self = this,
    copy = self.copy,
    copyClass = $(copy).className;

    console.log("inside copy data") 
    $(self.copy).addEventListener('click', function(event) {
      var copyArea = document.querySelector('textarea#result');
      copyArea.select();

      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        $(copy).innerHTML = "Copied";
        $(copy).className += " bg-success";
         setTimeout(function(){
            console.log("debug")
            $(copy).className = copyClass;
            $(copy).innerHTML = "Select All";
        },1000);

           // clearTimeout(time);


      } catch (err) {
        console.log('Oops, unable to copy');
      }
    });
 } 

// INIT:
// 1.STARTS THE FUNCTION TO GENERATE DATA
// 2. CREATES THE SQL INSERT COMMAND BASED ON THE TABLE AND VALUES INSERTED
// 3. INITIALIZES THE COPY BUTTON SO NOW YOU WILL BE ABLE TO SELECT ALL THE DATA

  init(){
      var self = this;
      self.generateData();
      self.insertInfo();
      self.copyData();
  }

// RANDOM:
// RETURNS AN ARRAY WITH A RANDOM POSITION NUMBER INSIDE THE ARRAY
  random(max,min, arr){
      let num = Math.round(Math.random()*(min-max)+max);
  return arr[num];
}//random

// RANGE:
// TAKES THE MAXIMUM AND MINIMUN VALUE OF THE RANGE AND RETURNS A RANDOM NUMBER

range(max, min){
     let num = Math.round(Math.random()*(min-max)+max);
  return num;
}

// SECONDS:
// CONVERTS THE MILLISECONDS OF THE CURRENT TIME MINUS THE PREVIOUS TIME
// IN SECONDS
seconds(prevTime, curTime){
    let time = curTime - prevTime;
    let seconds = time/1000;
    return seconds.toFixed(2);
}

// INSERT INFO:
// CREATES THE SQL INSERT COMMAND WITH SPECIFIED VARIABLES
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

    self.insert = `INSERT INTO ${table} (${str}) VALUES \n`;

}

// SET BUTTONS:
// CHANGES THE DEFAULT BUTTONS TO START THE GENERATOR AND COPY THE 
// GENERATED DATA

setButtons(start, copy){
     this.start  = start || this.start;
     this.copy = copy || this.copy;

}

// SELECT TEXT:
// WHEN CLICKING ON COPY THIS FUNCTION HIGHLIGHTS ALL THE GENERATED DATA SO THAT YOU CAN 
// COPY AND PASTE INTO MYSQL

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

// GENERATE DATA:
// 1. CREATES A CLICK EVENT ON THE START SELECTOR 
// 2. IF THERE IS NO NUMBER IN THE INPUT FIELD, THEN IT WILL ONLY GENERATE ONE
//    ROW OF DATA
// 3. RUNS THE FUNCTION GENERATE TO GENERATE THE FAKE DATA

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


// RETURN RESULTS:
// 1.INSERTS ALL THE FAKE DATA THAT HAS BEEN COLLECTED FROM THE RESULTS ARRAY AND 
//   STUFFS IT INTO THE ALLDATA VARIABLE
// 2. THE ALLDATA VARIABLE THEN OUTPUTS INTO THE RESULT SELECTOR
// 3. THE TIME IT TOOK TO GENERATE ALL THE DATA GETS DISPLAYED IN THE TIME SELECTOR

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

        allData += (y % 5 == 0)?results[y]+",\n":results[y]+",";

    }
    seconds = self.seconds(seconds,Date.now());
    $(selector).innerHTML = allData;
    $(selector).style.display = "block";
    $(self.timeOutput).innerHTML = seconds+" seconds";
}

// GENERATE:
// 1.LOOPS THROUGH THE SPECIFIED NUMBER OF DATA IT IS SUPPOSED TO GENERATE
// 2. LOOPS THROUGH  EACH COLUMN THAT WILL BE RANDOMLY GENERATED
// 3. CHECKS TO SEE IF THE COLUMN HAS NESTED VALUES AND IF THE COLUMN WILL HAVE MULTIPLE
//     VALUES OR A RANGE OF VALUES. THEN IT RANDOMLY GENERATES THE VALUE
// 4. CHECKS TO SEE IF THERE ARE ANY CONDITIONAL STATEMENTS THE VALUE NEEDS TO PASS. IF 
//     THERE ARE THEN IT REGENERATE THE VALUE UNTIL IT PASSES THE PROPER CONDITIONS 
// 5. ASSIGNS THE VALUE TO THE CURRENT OBJECT, IF THE VALUE IS A STRING THEN THE VALUE WILL
//     BE IN QUOTES, IF THE OBJECT IS THE LAST OBJECT OR COLUMN THEN REMOVE DO NOT ADD A COMMA 
//     AT THE END OF THE VALUE
// 6. PUTS THE BLOCK OF VALUES IN PARENTHEISES, PUSHES THE VALUE INTO STRARR ARRAY,
//     CLEARS THE VARIABLE THAT HOLDS THE GENERATED VALUES 
// 7. CALLS RETURNRESULTS TO OUTPUT THE VALUES ONTO THE PAGE

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
        for( var obj of object){
            var dependentValue = currentObj[obj.dependent] || "",
            value   = self.isNested(obj.nested,dependentValue, obj);

            (obj.if)? value = self.ifConditionalsExist(obj, value, dependentValue, currentObj) : '';

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

// IF CONDITIONALS EXIST:
// 1. RUN LOOP UNTIL THE VALUE PASSES ALL CONDITIONS THAT WERE SET
// 2. IF ANY OF THE CONDITIONAL HAS VALUES IT WILL BE PUSH THE RESULT (TRUE/FALSE)
//     INTO AN ARRAY
// 3. IT WILL CHECK IF ALL THE CONDITIONS RETURN TRUE, IF THEY DON'T, THEN IT WILL GENERATE
//      A NEW VALUE

ifConditionalsExist(obj, value, dependentValue, currentObj){
    var 
    self = this,
    checkingCond = false,
    arr = [true];

    while( checkingCond === false){

        obj.between && arr.push(self.between(obj.between,dependentValue));
        obj.not && arr.push(self.not(obj.not,dependentValue));
        obj.equals && arr.push(self.equals(obj.equals,dependentValue));
        obj.lessThan && arr.push(self.lessThan(obj.lessThan,dependentValue,value));
        obj.greaterThan && arr.push(self.greaterThan(obj.greaterThan,dependentValue,value));

        checkingCond = arr.every(function(value){
            return value === true;
        })

        if(!checkingCond){
            value = self.isNested(obj.nested,currentObj[obj.dependent], obj);
            arr = [];
        }

    }//while

    return value;

}// ifConditionalsExist

// IS NESTED:
// 1.CHECKS TO SEE IF THE OBJECT HAS NESTED VALUES INSIDE IT
// 2.THEN IT WILL CHECK IF THE OBJECT HAS A COLLECTION OF VALUES OR A RANGE OF VALUES

isNested(nested, key, obj){
    var self = this;
    if(nested){
        let nestedArray = obj.values[key];
        return self.isRange(obj.range, nestedArray)
    }else{
        return self.isRange(obj.range, obj.values)
    }

}

// IS RANGE:
// CHECKS TO SEE THE OBJECT HAS A RANGE OF VALUES
//     1. IF IT DOES THEN RUN THE RANGE FUNCTION THAT RANDOMIZE THE MAX AND MINIMUM VALUES
//     2. IF IT DOES NOT HAVE A RANGE OF VALUES THEN JUST RUN A NORMAL RANDOMIZE FUNCTION

isRange(rangeExist, arr){
    var self = this;
    var min = 0, max = arr.length - 1;
    if(rangeExist){
        return self.range(arr[0], arr[1] )
    }else{

        return self.random(max,min, arr);
    }

}


// BETWEEN:
// CHECKS TO SEE IF RANDOMIZED VALUE IS BETWEEN THE SPECIFIED VALUES

between( between,  dependentVal){
    if( dependentVal > between[0] && dependentVal < between[1]){
        return true;
    }else{
         return false;
    }

}//between

// NOT:
// CHECKS THE RANDOMIZED VALUE TO SEE IF IT IS NOT SPECIFIED VALUE

not(not , dependentVal){
    if(dependentVal !== not.Argument ){
        return true;
    }else{
         return false;
    }
}

// EQUALS:
// CHECKS TO SEE IF RANDOMIZED VALUE IS EQUAL TO SPECIFIED VALUE

equals(equals , dependentVal){
    if(dependentVal == equals){
        return true;
    }else{
         return false;
    }
}


// LESS THAN:
// CHECKS TO SEE IF RANDOMIZED VALUE IS LESS THAN SPECIFIED VALUE

lessThan(less , dependentVal, value){
    // console.log("inside less than, dependent value is "+dependentVal);
    
    if (dependentVal === "" || dependentVal === null){
        dependentVal = 1;
        less.Argument = 0;
     }

    if( dependentVal < less.Argument || less.Value >= value){
        return true;
    }else{
         return false;
    }
}

// GREATER THAN:
// CHECKS TO SEE IF RANDOMIZED VALUE IS GREATER THAN SPECIFIED VALUE

greaterThan(greater , dependentVal, value){
    
    if(dependentVal < greater.Argument || greater.Value <= value  ){
        return true;
    }else{
         return false;
    }
}

}// class F

var gen = new F(obj, "people", ["sex","first_name","last_name","age","weight"]);
// console.log(gen)
gen.init();
