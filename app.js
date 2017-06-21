//                                STEP ONE ---design state


//API URL without a query
var GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';


//actual html template for each result
var RESULT_HTML_TEMPLATE = (
  '<div>' +
    '<h2>' +
    '<a class="js-result-name" href="" target="_blank"></a> by <a class="js-user-name" href="" target="_blank"></a></h2>' +
    '<p>Number of watchers: <span class="js-watchers-count"></span></p>' + 
    '<p>Number of open issues: <span class="js-issues-count"></span></p>' +
  '</div>'
);

//


//                              STEP TWO --- state mod

function getDataFromApi(searchTerm, callback) { //watch for callback function
  
  //formats search term into query for the URL
  var query = {
    q: searchTerm + " in:name",//pay attention to names
    per_page: 5
  }

  //adds the query to the URL and searches
  $.getJSON(GITHUB_SEARCH_URL, query, callback);
}



//                                    STEP THREE ---    rendering


function renderResult(result) {
  
  //takes our template
  var template = $(RESULT_HTML_TEMPLATE);

  //alters template to contain data from result array
  template.find(".js-result-name").text(result.name).attr("href", result.html_url);
  template.find(".js-user-name").text(result.owner.login).attr("href", result.owner.html_url);
  template.find(".js-watchers-count").text(result.watchers_count);
  template.find(".js-issues-count").text(result.open_issues);
  return template;
}



function displayGitHubSearchData(data) {
  
  //passes data into an array of results
  var results = data.items.map(function(item, index) {
    //renders html for each result
    return renderResult(item);
  });

  //targetting the place to generate array of results (results)
  $('.js-search-results').html(results);
}


//                                      STEP FOUR - event submission

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    
    //stores target of js-query text
    var queryTarget = $(event.currentTarget).find('.js-query');
    
    //actually stores text in js-query
    var query = queryTarget.val();
    
    // clear out the input
    queryTarget.val("");


    //API data request
    getDataFromApi(query, displayGitHubSearchData);
  });
}

//document ready shortcut?
$(watchSubmit);