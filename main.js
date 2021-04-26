$(function(){
$("#showNum").hide()
$("#input").hide()

var min = parseInt(prompt("Inserisci un numero(MIN)"))
var max = parseInt(prompt("Inserisci un numero(MAX)"))
//var quantity = parseInt(prompt("Scegli la difficolta'( NUMERO NUMERI DA INDOVINARE"))
//var min =0
//var max =20
var quantity = 5; // QUANTI NUMERI DA INDOVINARE

var generatedArray = [];
var userArray = [];

$("#numGen").click(function(){
  genArray(generatedArray,quantity)
  console.log(generatedArray);
  $("#showNum").show()
  $("#numGen").hide()
})

$("#showNum").click(function(){
  for(var a =0; a<generatedArray.length;a++){
    $("#generated").append(generatedArray[a] +" ")
  }
  setTimeout(function(){
    $("#generated").hide()
    $("#showNum").hide()
    $("#input").show()
  },5000)
})

// USER ACTIONS

  var userNum;
  var tries=0;
  var limit = false;
  $("#input").keyup(function(event){
    if(event.which===13 && (limit=== false)){
      userNum= parseInt($(this).val());
      if(!(userArray.includes(userNum))){ // AVOID DUPLICATES
        userArray.push(userNum)
        console.log(userNum);
        console.log(userArray);
        $(this).val('')
        tries++
      }
      if(tries>quantity-1){
        limit=true;
        $("#input").hide();
        var correct = checkEquals(generatedArray,userArray)
        var displayString = "Ne hai trovati: "+correct
        $("#result").text(displayString)
      }
    }
  })

//FUNCTIONS
function genNum(min,max){ // MIN NON COMPRESO
  return Math.ceil(Math.random()*(max-min)+min)
}

function genArray(array,size){
  
  for(var i=0; i<size;i++){
    var createdNumber = genNum(min,max)
    if(!(generatedArray.includes(createdNumber))){
      generatedArray.push(createdNumber)
    } else i--
  }
}

function checkEquals(arr1,arr2){ // ACCETTA SOLO VETTORI LUNGHI UGUALI
  if(arr1.length !=arr2.length) return "error"
  var trovati =0;
  for(var i=0;i<arr1.length;i++){
    if(arr2.includes(arr1[i])) trovati++
  }
  return trovati
}

})