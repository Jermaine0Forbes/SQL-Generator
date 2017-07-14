var result = document.getElementById("result"),
    input,
    timer,
    num;

function random(max, min){
  max =  max - 1;
 min = min || 0;
return Math.round(Math.random()*(min-max)+max);
}

function randomBinary(max,min){
  return Math.round(Math.random()*(min-max)+max);
}

function selectText(containerid) {
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
        }
    }

var people ={
 race:["white","black","indian","native","mixed","asian"],
 sex:["male","female"],
 age:[18,70],
 firstName : {
   0:['Michael','Tom','Noah','Benjamin','Sebastian','Daniel','David','James',
   'Jacob','Matthew','Samuel','Jonathan','Nathan','Cooper','John','Arthur','Jackson',
   'Aiden','Liam','Lucas','Mason','Ethan',
   'Caden','Jayden','Logan','Elijah','Jermaine'] ,

   1:["Alice","Caitlyn","Jessica","Samantha","Bianca","Chelsea","Amanda",
   "Francesca","Kelly","Jennifer","Olivia","Leah","Zoey","Sophia","Emma","Isabella",
   "Ava","Cadence","Clara","London","Bella","Paisley","Gianna"]
 },


 lastName:["Smith","Johnson","Forbes","Wilson","Brown","Jones","Moore","Anderson",
 "Jackson","Harris","Russel","Sanders","Butler","Kelly","Watson","Bryant",
"Torres", "Parker","Collins" ,"Edwards" ,"Stewart" ,"Flores" ,"Morris" , "Nguyen",
 "Murphy", "Rivera","Cook"],

 state: ["Florida","California","New York","Texas","Georgia","Nevada","South Carolina",
"Tennessee","New Jersey", "Massachusetts" , "Iowa", "Washington","Louisiana", "Kentucky",
"Hawaii", "Alaska", "Illinois","Kansas"],
 weight:[110,300],
 annualIncome:[15000,100000],
 sociable:[true,false],
 married:[true,false],
 happy:[true,false]

}

  /* ---------------------- REDUCE1000 FUNCTION ---------------------------------*/
function reduce1000(val){
   let num =  val/1000;
   return num.toFixed(2);
}// END OF REDUCE1000 FUNCTION

/* ---------------------- GENERATOR FUNCTION ---------------------------------*/
function generate(obj,dataNumber){
  var data = {},
   dataList = [],
   string,
   seconds,
   sex,
   size = 0,
   count = 0,
   stringData = "",
   documents = "";




 for(var a in obj){
    size++;
 }

  // for(let i = 0; i < dataNumber; i++){
  //
  //   for (var prop in obj){
  //     if (prop == "age" || prop == "weight" || prop == "annualIncome"){
  //
  //       data[prop] = randomBinary(obj[prop][1],obj[prop][0]);
  //     }else if (data["sex"] == "male" && prop == "femaleName"){
  //        continue;
  //      }else if (data["sex"] == "female" && prop == "maleName"){
  //        continue;
  //      }else{
  //
  //          data[prop] = obj[prop][random(obj[prop].length)];
  //        }
  //
  //
  //   }
  for(let i = 0; i < dataNumber; i++){

    for (var prop in obj){

        if( count == 0  ){
          stringData += "('"+obj[prop][random(obj[prop].length)]+"',";
          count++;
          continue;
        }
        if((size - 1) == count){
          stringData += "'"+obj[prop][random(obj[prop].length)]+"')";

          continue;
        }

      if (prop == "age" || prop == "weight" || prop == "annualIncome"){

        stringData += `${randomBinary(obj[prop][1],obj[prop][0])},`;
      }else if( prop == "sex"){
         sex = randomBinary(1,0);
         stringData += "'"+obj[prop][sex]+"',";

      }else if (prop == "firstName"){

              var ln = obj[prop][`${sex}`].length;
            stringData +=  "'"+obj[prop][`${sex}`][random(ln)]+"',";
        } else{

           stringData += "'"+obj[prop][random(obj[prop].length)]+"',";
         }

           count++;

    }//for in

    // if (data["sex"] == "male"){
    //   delete data["femaleName"];
    // }else{
    //   delete data["maleName"];
    // }

    //  string = JSON.stringify(data);
     string = stringData;
    dataList.push(string);
    // data = {}
    stringData = "";
    count = 0;

  }//for loop

  for (let i = 0 ; i < dataList.length; i++){
    if ( i == (dataList.length -1)){
      documents += dataList[i];
      continue;
    }
    documents +=  dataList[i]+",<br>";
  }
  result.innerHTML = documents;

  var h1 = document.getElementsByTagName("h1")[0];
  h1.innerHTML = dataNumber+" data documents have been created";
  seconds = Date.now() - num;
  seconds = reduce1000(seconds);
  document.getElementById("time").innerHTML = seconds+" seconds";
}//END OF GENERATOR FUCNTION

/* ---------------------- GENERATOR BUTTON -----------------------------------*/
document.getElementsByTagName("button")[1].onclick = function(){
     num = Date.now();




 input = document.getElementsByTagName("input")[0].value;

  input = (input  == "" || input == undefined )? 1:input;

  generate(people, input);
  clearInterval(timer);
  document.getElementsByTagName("input")[0].value = "";
}; // END OF GENERATOR BUTTON

/* ---------------------- SELECT ALL BUTTON ----------------------------------*/
document.getElementsByTagName("button")[0].onclick = function(){
  selectText("result");
};
