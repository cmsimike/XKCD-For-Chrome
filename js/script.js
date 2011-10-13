$(document).ready(function(){
    // Initialise. If the database doesn't exist, it is created
    var SQL = new localStorageDB("xkcd");

    //Store references to the elements

    var LOADING = $('#loading');
    var COMICS  = $('#comics');
    var COMIC   = $('#comic');

    var enableLog = true;

    function log(txt)
    {
        if(enableLog)
        {
            console.log(txt);   
        }
    }

    function showComicList()
    {
        LOADING.hide();
        COMIC.hide();
        COMICS.show();
    }

    function showComic()
    {
        LOADING.hide();
        COMIC.hide();
        COMICS.show();
    }

    function clearDatabase()
    {
        log('database row before: ' + SQL.rowCount("comic"));
        SQL.drop();
        log('database row after: ' + SQL.rowCount("comic"));

    }

    function load()
    {
        result = SQL.query("comic");
        for(i = 0; i < result.length; i++)
        {
            log("building: " + result[i].num);
            $( "#comicTemplate" ).tmpl( result[i] ).appendTo( "#comics" );    
        }
        showComicList();
        $('#delete').click(new function(){
            clearDatabase();
        });
    }
    load();
});