
var POKEMON = POKEMON || {};

POKEMON.init = function () {
    $.browserDetection(true);
    POKEMON.searched.init();
    POKEMON.chosen.init();
    POKEMON.exit.init();
};

POKEMON.searched = {
    init: function () {

        var pokeAPI, searchedPokeNAME; 
        var pokeNAME, pokeID, pokeTYPE, pokeSTAT, pokeHP, pokePHOTO; //results of searched data in api
        
        $('#searchBtn').on('click', function (event) {

            event.preventDefault();

            $('.l-description').css('display', 'none');
            $('.l-hero__result').css('display', 'block');
            $('.l-app').css('height', 'auto');
            $('#2').css('display', 'table-row');
            $('#2').siblings().remove();

            searchedPokeNAME = $('#pokeName').val();
            pokeAPI = 'https://pokeapi.co/api/v2/pokemon/' + searchedPokeNAME;

            var row;

            /* $.ajax({ 
                type: 'GET',
                url: pokeAPI,
                async: true,
                crossDomain: true,
                dataType: 'jsonp',
                headers: {},
                jsonpCallback: 'result',
                success: function(data){       
                    
            
                    var response = JSON.parse(data);
                    pokeID = response.id;
                    alert(pokeID);
                }
            });  */

            $.getJSON(pokeAPI, function (data) {

                pokeID = data.id;
                var maxPoke = data.id+9;
                

                // search for 10 pokemons
                for (var i = data.id; i < maxPoke; i++) {

                    pokeAPI = 'https://pokeapi.co/api/v2/pokemon/' + i;

                    //cloning row, changing it's id for individual for each pokemon and adding it at the end of table
                    row = $('#2').clone();
                    var newRow = row.attr('id', [i]).addClass('dynamic');
                    $('tbody:last-child').append(row);
                    

                    $.getJSON(pokeAPI, function(data){

                        $('tr').each(function (index){
                            
                            if  ( $(this).attr('id') == data.id ) {

                                $(this).children('.pokemon_name').text(data.name);
                                $(this).find('img').attr('src', data.sprites.front_default);
                                $(this).children('.pokemon_type').text(data.types[0].type.name);

                                //loop for getting hp stats for exact pokemon
                                for (var j = 0; j < data.stats.length; j++){

                                    pokeSTAT = data.stats[j];
                                    if ( pokeSTAT.stat.name === 'hp'){

                                        var pokeHP = pokeSTAT.base_stat;
                                        $(this).children('.pokemon_point').text(pokeHP + ' HP');
                                    }
                                }
                            }
                        });
                    });
                }
                $('#2').css('display', 'none');

             /* pokeNAME = data.name;
                pokePHOTO = data.sprites.front_default;
                pokeTYPE = data.types[0].type.name;
                console.log('szukamy ' + searchedPokeNAME + ' ,jego id: ' + pokeID);

                $('.pokemon_name').text(pokeNAME);
                $('.pokemon_photo').attr('src', pokePHOTO);
                $('.pokemon_type').text(pokeTYPE);

                for (var j = 0; j < data.stats.length; j++){

                    pokeSTAT = data.stats[j];
                    if ( pokeSTAT.stat.name === 'hp'){

                        var pokeHP = pokeSTAT.base_stat;
                        $('.pokemon_point').text(pokeHP + ' HP');
                    }
                } */

            });
            
        });

    }
};

POKEMON.chosen = {
    init: function () {

        var pokeNAME, 
            pokeID,
            pokeAPI,
            pokeAPI2,
            pokeTYPE,
            pokePOINT,
            pokePHOTO,
            pokeDESCRIPTION,
            pokeSTATS,
            pokeDEFENSE,
            pokeATTACK,
            pokeSPEED;


        $('table').on('click', 'tr', function () {

            $('.l-description').css('display', 'block');

            var descriptionPlace = $('.l-description').offset().top;
            $('html, body').animate({
                scrollTop: descriptionPlace
            }, 1000);

            pokeNAME = $(this).find('.pokemon_name').text();
            pokeTYPE = $(this).find('.pokemon_type').text();
            pokePOINT = $(this).find('.pokemon_point').text();
            pokePHOTO = $(this).find('img').attr('src');
            pokeID = $(this).attr('id');

            $('.js-name').text(pokeNAME);
            $('.js-type').text(pokeTYPE);
            $('.js-point').text(pokePOINT);
            $('.js-img').attr('src', pokePHOTO);
            
            pokeAPI = 'https://pokeapi.co/api/v2/pokemon/' + pokeNAME;

            $.getJSON(pokeAPI, function (data) {

                for (var i = 0; i < data.stats.length; i++){
                    
                    pokeSTATS = data.stats[i];
                            
                    if ( pokeSTATS.stat.name === 'speed'){
                        pokeSPEED = pokeSTATS.base_stat;
                        $('.js-speed').text(pokeSPEED);
                    }
                    if ( pokeSTATS.stat.name === 'attack'){
                        pokeATTACK = pokeSTATS.base_stat;
                        $('.js-attack').text(pokeATTACK);
                    }
                    if ( pokeSTATS.stat.name === 'defense'){
                        pokeDEFENSE = pokeSTATS.base_stat;
                        $('.js-defense').text(pokeDEFENSE);
                    }
                }
            });

            pokeAPI2 = 'https://pokeapi.co/api/v2/ability/' + pokeID;

            $.getJSON(pokeAPI2, function (data) {

                pokeDESCRIPTION = data.effect_entries[0].effect;
                $('.js-description').text(pokeDESCRIPTION);
            });
        });

    }
};

POKEMON.exit = {
    init: function () {

        $('.close').on('click', function () {

            var top = $('.l-app').offset().top;

            
            
            $('.l-description').css('display', 'none'); 
            $('html, body').animate({
                scrollTop: top,
            }, 1000);
                  
        });
    }
};

$(document).ready(function () {
    POKEMON.init();    
});
