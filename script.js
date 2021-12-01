$(document).ready(function(){
    console.log("done");
})

const translateH = {
    access : "доступ",
    event : "подія",
    customization : "налаштування",
    debugger : "налагоджувач",
    implementation  : "виконання",
    loop : "цикл",
    network : "мережа",
    software : "програмне забезпечення",
    folder : "папка",
    developer : "розробник"
};

const translateL = {
    friend : "друг",
    ball : "м'яч",
    doll : "лялька",
    flower : "цвітка",
    toy  : "іграшка",
    jump : "стрибати",
    go : "ходити",
    work : "працювати",
    family : "сім'я",
    mother : "мати"
};

const translateM = {
    doctor : "лікар",
    actor : "актор",
    teacher : "вчитель",
    driver : "водій",
    university  : "університет",
    cinema : "кінотеатр",
    kitchen : "кухня",
    hospital : "лікарня",
    airport : "аеропорт",
    garden : "сад"
};

var num = 0;
var arrayKeys = [];
var word, current;
var correct = $("#correct").val()
var incorrect = $("#incorrect").val()
var keys;
var chooseObj;


console.log(keys);

$("#low").on("click", function Default(){
    $("input").attr("disabled", false);
    correct=0;
    $("#correct").text(correct);
    incorrect=0;
    $("#incorrect").text(incorrect);
    num=0;
    $("#translated").text(num);
    $("input").attr("disabled", false);
    keys = Object.keys(translateL);
    chooseObj = translateL;
    Generate(keys);
});

$("#medium").on("click", function Default(){
    $("input").attr("disabled", false);
    correct=0;
    $("#correct").text(correct);
    incorrect=0;
    $("#incorrect").text(incorrect);
    num=0;
    $("#translated").text(num);
    $("input").attr("disabled", false);
    keys = Object.keys(translateM);
    chooseObj = translateM;
    Generate(keys);
});

$("#high").on("click", function Default(){
    $("input").attr("disabled", false);
    correct=0;
    $("#correct").text(correct);
    incorrect=0;
    $("#incorrect").text(incorrect);
    num=0;
    $("#translated").text(num);
    $("input").attr("disabled", false);
    keys = Object.keys(translateH);
    chooseObj = translateH;
    Generate(keys);
});

function Generate(keys){
    word = keys[Math.floor(Math.random()*keys.length)];
     keys.splice(keys.indexOf(word),1);
        console.log(keys);
        $("#word").text(word);
}

 function Check(){
    var input = $("#input_word").val();
    console.log(input);
    if(num<10){
    if(chooseObj[word] == $("#input_word").val()){
        console.log("right");
        correct++;
        $("#correct").text(correct);
    }
    else{
        console.log("false");
        incorrect++;
        $("#incorrect").text(incorrect);
    }
}
else{
    if(correct>incorrect){
        $('#win1').removeClass("invisible");
        setTimeout(function(){
          $('#win1').addClass("invisible");}, 2000); 
    }
    else if(correct<incorrect){
        $('#win2').removeClass("invisible");
        setTimeout(function(){
          $('#win2').addClass("invisible");}, 2000); 
    }
    else if(correct==incorrect){
        $('#win3').removeClass("invisible");
        setTimeout(function(){
          $('#win3').addClass("invisible");}, 2000); 
    }
    $("input").attr("disabled", "disabled");
}
 }

$(document).on("keypress", function translate(e){
    if(e.which == 13) {
        if($("#input_word").val()!=""){
        num++;
        $("#translated").text(num);   
        Check();
        Generate(keys);
        $("#input_word").val("");
        }
        else{
            alert("enter translation")
        }
    }
    });







    


  
  
  


