$(document).ready(function(){
    // Initialise. If the database doesn't exist, it is created
    var SQL = new localStorageDB("xkcd");

    //Store references to the elements

    var LOADING = $('loading');
    var COMICS  = $('comics');
    var COMIC   = $('comic');

    var enableLog = true;

    function log(txt)
    {
        if(enableLog)
        {
            console.log(txt);   
        }
    }

    function load()
    {
        result = SQL.query("comic");
        for(i = 0; i < result.length; i++)
        {
            log("building: " + result[i].num);
            $( "#comicTemplate" ).tmpl( result[i] ).appendTo( "#comics" );    
        }
        LOADING.hide();
        COMICS.show();
    }

    load();
});