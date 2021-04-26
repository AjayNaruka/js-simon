$(function(){
$("#showNum").hide()
$("#input").hide()
$("#restart").hide()

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
  $("#generated").text('')
  $("#generated").show()
  for(var a =0; a<generatedArray.length;a++){
    $("#generated").append(generatedArray[a] +" ")
  }
  setTimeout(function(){
    $("#generated").hide()
    $("#showNum").hide()
    $("#input").show()
  },5000)
})

$("#restart").click(function(){
  $(this).hide();
  $("#numGen").show();
  $("#result").hide();
  userArray.length =0;
  tries=0;
  limit = false;
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
        $("#result").text('');
        $("#result").show();
        limit=true;
        $("#input").hide();
        $("#result").text("Calcolo in corso...")
        setTimeout(function(){
          var correct = checkEquals(generatedArray,userArray)
          var displayString = "Ne hai trovati: "+correct
          $("#result").text(displayString)
          $("#restart").show()
        },3000)
        
      }
    }
  })

//FUNCTIONS
function genNum(min,max){ // MIN NON COMPRESO
  return Math.ceil(Math.random()*(max-min)+min)
}

function genArray(array,size){
  array.length = 0; 
  for(var i=0; i<size;i++){
    var createdNumber = genNum(min,max)
    if(!(array.includes(createdNumber))){
      array.push(createdNumber)
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