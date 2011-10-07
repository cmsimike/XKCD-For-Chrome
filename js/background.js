$(document).ready(function(){
    // Initialise. If the database doesn't exist, it is created
    var SQL = new localStorageDB("xkcd");

    //Store references to the elements

    var LOADING = $('loading');
    var COMICS  = $('comics');

    var enableLog = true;

    /* Development */
    var URL_BASE = 'http://localhost/~mike/xkcd/'
    var PATH_SEP = '.'
    var FILE_NAME = 'info.0.json'

    /* Deployment
    var URL_BASE = 'http://xkcd.com/'
    var PATH_SEP = '/'
    var FILE_NAME = 'info.0.json' */

    function log(txt)
    {
        if(enableLog)
        {
            console.log(txt);   
        }
    }

    function initDatabase()
    {
        // Check if the database was just created. Useful for initial database setup
        if(SQL.isNew())
        {
            log('Creating database');
            // create the "books" table
            SQL.createTable("comic", ["num", "img", "title", "month", "link", "year", "news", "safe_title", "transcript", "alt", "day", "new"]);
            
            // commit the database to localStorage
            SQL.commit();
            log('Database created.');
        }
        else
        {
            log('Database exists');
        }
    }

    function getJSONUrl(id)
    {
        return URL_BASE  + id + PATH_SEP + FILE_NAME
    }

    function clearDatabase()
    {
        SQL.drop()
    }

    function loadNewComics()
    {
        $.getJSON('http://xkcd.com/info.0.json', function(data) 
        {
            countNew = 0;
            //for(var i = 1; i <= data.num; i++)
            for(var i = 1; i <= 20; i++)
            {
                $.ajax({
                    url: getJSONUrl(i),
                    dataType: 'json',
                    data: data,
                    async: false,
                    success: function(data) 
                    {
                        data.new = true;
                        countNew++;
                        SQL.insert("comic", data);
                        SQL.commit();
                        log(""+ data.num + " added to the database");
                    }
                });
            }
            chrome.browserAction.setBadgeText({text:""+countNew});
        });
    }

    function init()
    {
        //clearDatabase();
        initDatabase();
        loadNewComics();
    }

    init();
});