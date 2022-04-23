//functie om alle boeken uit te lezen
function boekenUitlees() {
    $.ajax({
        type:    "GET",
        url:     "php/uitlees.php",
        success: function (table) {
            $("#dataDiv").html(table);
    
        },
        error: function (request, error) {
            console.log ("FOUT:" + error);
        }
    });
}



//Functie om boek toe te voegen
function voegtoe() {
    let gegevens = $("#boekForm").serialize();
    $.ajax({
        type:   "POST",
        url:    "php/add.php",
        data:   gegevens,
        success: function(tekst) {
            $("#form-modal").css('display', 'none');
            $("#boekForm")[0].reset();
            alert(tekst);
            boekenUitlees();
        },
        error: function(request, error) {
            console.log("FOUT: " + error);
        }
    });
}

//Functie om boek aan te passen
function update() {
    let gegevens = $("#boekForm").serialize();
    $.ajax({
        type:   "POST",
        url:    "php/pasaan.php",
        data:   gegevens,
        success: function(tekst) {
            $("#form-modal").css('display', 'none');
            $("#boekForm")[0].reset();
            alert(tekst);
            boekenUitlees();
        },
        error: function(request, error) {
            console.log("FOUT: " + error);
        }
    });
}


window.addEventListener('load', (event) => {
    boekenUitlees();
});


//Wanneer er wordt getyped in de zoek input
$("#zoekTitel").keyup(function() {
    let title = $('#zoekTitel').val();
    $.ajax({
        type:   "POST",
        url:    "php/uitlees.php",
        data:   {"Titel": title},
        success: function (table) {
            $("#dataDiv").html(table);
        },
        error: function (request, error) {
            console.log ("FOUT:" + error);
        }
    });
    return false;
});


//Wanneer er op de toevoeg knop wordt gedrukt verander dan paar elementen in het form
$(document).on('click', '#toevoegen', function(){
    $("#boekForm")[0].reset();
    $("#form-modal").css('display', 'block');
    $("#formH1").html("Boek toevoegen");
    $("#submit").val("voegtoe");
});


//Wanneer er op de toevoeg knop wordt gedrukt verander dan paar elementen in het form en laat de juiste gegevens zien
$(document).on('click', '#pasaan', function(){
    let id = $(this).data('id');
    $.ajax({
        type:   "GET",
        url:    "php/pasaan.php",
        data:   {"id": id},
        dataType: "JSON",
        success: function(data) {
            $("input[name='id']").val(data[0]);
            $("input[name='titel']").val(data[1]);
            $("input[name='schrijver']").val(data[2]);
            $("input[name='isbn']").val(data[3]);

            $("#submit").val("pas aan");
            $("#formH1").html("Boek aanpassen");
            $("#form-modal").css('display', 'block');
        },
        error: function (request, error) {
            console.log ("FOUT:" + error);
        }
    });
});



//Als de form verzonden wordt kijk dan eesrt of het voegtoe of update is en voer dan de juiste functie uit
$("#boekForm").submit(function (event){
    event.preventDefault();
    if($("#submit").val() == "pas aan") {
        update();
    }
    else if ($("#submit").val() == "voegtoe") {
        voegtoe();
    }
});


//laat een bevesteging venster zien als er op de verwijder knop wordt geclicked
$(document).on('click', '#verwijder', function(){
    let id = $(this).data('id');
    document.getElementById('confirm').dataset.id = id;
    $("#delete-confirm").css('display', 'block');
});



//verwijder het boek
$(document).on('click', '#confirm', function(){
    let id = $(this).data('id');
    $.ajax({
        type:   "GET",
        url:    "php/delete.php",
        data:   {"deleteId": id},
        success: function(tekst) {
            $("#delete-confirm").css('display', 'none');
            boekenUitlees();
            alert(tekst);
        },
        error: function (request, error) {
            console.log ("FOUT:" + error);
        }
    });
});


//Close button om het delete venster te sluiten
$(document).on('click', '#cancel', function(){
    $("#delete-confirm").css('display', 'none');
});



//Close button om de pop-up modal te sluiten
$(document).on('click', '#closeBtn', function(){
    $("#form-modal").css('display', 'none');
});