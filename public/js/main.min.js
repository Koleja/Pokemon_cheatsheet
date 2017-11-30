
var POKEMON = POKEMON || {};

POKEMON.init = function () {
    $.browserDetection(true);
    POKEMON.api.init();
};
POKEMON.api = {
    init: function () {


        var pokeAPI, searchedPokeNAME; 
        var pokeNAME, pokeID, pokeTYPE, pokeSTAT, pokeHP, pokePHOTO; //results of searched data in api


        
        
        $('#searchBtn').on('click', function (event) {

            event.preventDefault();

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
                    var newRow = row.attr('id', [i]);
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

$(document).ready(function () {
    POKEMON.init();    
});
