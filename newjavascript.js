$(document).ready(function(){
    
    var pokemonNAME, pokePHOTOurl, pokeTYPE, i, j;
    var pokeAPI = "http://pokeapi.co/api/v2/pokemon/";
    
    $.ajaxSetup({
            error: function(x, e) {

                if (x.status == 404) {
                    $('.error_sign').css('display', 'block');
                } 
                 else {
                    alert('Unknow Error.\n' + x.responseText);
                }
            }
        });

    //searching pokemon by user search
    $('#searchBtn').on('click', function(){
        
        $('.error_sign').css('display', 'none');
        $('tbody tr').empty();
       
        var searchPoke = $('#pokeSearch').val();
        console.log(searchPoke);
        pokeAPI = "http://pokeapi.co/api/v2/pokemon/"+searchPoke;
        console.log(pokeAPI);
        
        $.getJSON(pokeAPI, function(data){
            
            var searchPokeId = data.id;
            var maxSearch = searchPokeId+10;
            console.log(maxSearch);
            
            for (i = searchPokeId; i<=maxSearch; ++i){
         
        var pokeAPI = "http://pokeapi.co/api/v2/pokemon/"+i;
        
        $.getJSON(pokeAPI, function(data){
            
            pokemonNAME = data.name;
            pokePHOTOurl = data.sprites.front_default;
            pokeTYPE = data.types[0].type.name;
            var pokeID = data.id;

            
            $('.pokemon_name').append('<th id="pokemon-name'+pokeID+'">'+pokemonNAME+'</th>');
            $('.pokemon_photo').append('<td id="pokemon-photo'+pokeID+'"><img alt="photo'+pokeID+'" src="'+pokePHOTOurl+'"/></td>');  
            $('.pokemon_type').append('<td id="pokemon-type'+pokeID+'">'+pokeTYPE+'</br></td>');

            
            for (j = 0; j < data.stats.length; j++){
                var pokeHP = data.stats[j];
                        //console.log(pokeHP);
                if ( pokeHP.stat.name === 'hp'){
                    //console.log(pokeHP.base_stat+' '+pokeHP.stat.name);
                    var hp = pokeHP.base_stat;
                    //$('#pokemon-hp1').html(hp+' HP');
                    $('.pokemon_hp').append('<td id="pokemon-hp'+pokeID+'">'+hp+' HP</td>');
                }
            }
        });  
      }
        });
        
    

    });
    
     
      
        for (i = 1; i<=10; ++i){
         
        var pokeAPI = "http://pokeapi.co/api/v2/pokemon/"+i;
        
        $.getJSON(pokeAPI, function(data){
            
            pokemonNAME = data.name;
            pokePHOTOurl = data.sprites.front_default;
            pokeTYPE = data.types[0].type.name;
            var pokeID = data.id;

            
            $('.pokemon_name').append('<th id="pokemon-name'+pokeID+'">'+pokemonNAME+'</th>');
            $('.pokemon_photo').append('<td id="pokemon-photo'+pokeID+'"><img alt="photo'+pokeID+'" src="'+pokePHOTOurl+'"/></td>');  
            $('.pokemon_type').append('<td id="pokemon-type'+pokeID+'">'+pokeTYPE+'</br></td>');

            
            for (j = 0; j < data.stats.length; j++){
                var pokeHP = data.stats[j];
                        //console.log(pokeHP);
                if ( pokeHP.stat.name === 'hp'){
                    //console.log(pokeHP.base_stat+' '+pokeHP.stat.name);
                    var hp = pokeHP.base_stat;
                    //$('#pokemon-hp1').html(hp+' HP');
                    $('.pokemon_hp').append('<td id="pokemon-hp'+pokeID+'">'+hp+' HP</td>');
                }
            }
        });  
      }
    
    var marginSTART = parseInt($('table').css('margin-left'), 10);
    var margin = 0;

    $('.forward').on('click', function(){
        
        var tableWIDTH = $('table').css('width');
        var ONEmargin = parseInt(tableWIDTH, 10)/10;
        var marginMAX = -6*ONEmargin;
        var marginMOVE = '-='+ONEmargin+'px';
        
        if (margin > marginMAX-10){
            $('table').css('margin-left', marginMOVE);
            margin = parseInt($('table').css('margin-left'), 10);
        }
        else{
            $('table').css('margin-left', marginMAX);
            console.log('err');
        }
    });
    $('.back').on('click', function(){
        
        var tableWIDTH = $('table').css('width');
        var ONEmargin = parseInt(tableWIDTH, 10)/10;
        var marginMOVE = '+='+ONEmargin+'px';
        
        if ( margin < marginSTART ){
            $('table').css('margin-left', marginMOVE);
            margin = parseInt($('table').css('margin-left'), 10);
        }
        else {
            $('table').css('margin-left', '0px');
        }
    });
    $('tr').on('click', 'th', function(){
        
        $('.page').css('display', 'block');
        $('.poke_name').html($(this).text());
                
        var moveTo = $('#page').offset();
        $('html, body').animate({scrollTop: moveTo.top}, "slow");
                
        var id = $(this).attr('id');
        //id.split('');
        //var length = id.length;
        var nr = id.match(/\d+/);
                
        var hp = $('#pokemon-hp'+nr).html();
        $('#hp').html(hp);
                
        var type = $('#pokemon-type'+nr).html();
        $('#type').html('1 type: '+type);
                
        pokeAPI = "http://pokeapi.co/api/v2/pokemon/"+nr;
        var pokeAPI2 = "http://pokeapi.co/api/v2/ability/"+nr;
                
        $.getJSON(pokeAPI, function(data){
            var img = data.sprites.front_default;
            $('.poke_photo').html('<img alt="photo'+nr+'" src="'+img+'"/>');
                    
            var stats = data.stats;
                    
            for (i = 0; i < data.stats.length; i++){
                
                stats = data.stats[i];
                        
                if ( stats.stat.name === 'speed'){
                    var speed = stats.base_stat;
                    $('#speed').html('speed: '+speed);
                }
                if ( stats.stat.name === 'attack'){
                    var attack = stats.base_stat;
                    $('#attack').html('attack: '+attack);
                }
                if ( stats.stat.name === 'defense'){
                    var defense = stats.base_stat;
                    $('#defense').html('defense: '+defense);
                }
            }
        });
        $.getJSON(pokeAPI2, function(data){
                    
            var description = data.effect_entries[0].effect;
            $('#description').html(description);
                    
        });
    }); 
});


