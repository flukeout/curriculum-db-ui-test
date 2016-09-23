function updateSearchUI(){
  var inputLength = $(".search-ui input").val().length;
  if(inputLength > 0) {
    $(".search-ui a").show();
    $(".search-ui").attr("active",true);
  } else {
    $(".search-ui a").hide();
    $(".search-ui").removeAttr("active");
  }
}

function getRandom(min, max){
  return Math.round(min + Math.random() * (max-min));
}

function fakeSearch(){
  // this is where we search, boys
  var random = getRandom(10,50);

  var filterCount = $(".filter-option.active").length;
  var textSearchLength = $(".search").val().length;
  $(".popular-topics, .search-results").css("opacity",0);

  setTimeout(function(){
    $(".activity-count").text(random);
    if(filterCount > 0 || textSearchLength > 0) {
      $(".search-results").css("opacity",1);
    } else {
      $(".popular-topics").css("opacity",1);
    }
  },250)

  $(".search-faker").css("opacity",.95);

  setTimeout(function(){
    $(".search-faker").css("opacity",0);
  },500)
}

$(document).ready(function(){

  updateSearchUI();
  showHideClear();
  fakeSearch();

  // Add some search results
  for(var i = 0; i < 10; i++) {
    var clone = $(".result-template-list").clone();
    $(".search-results .insert-here").append(clone);
    clone.removeClass("result-template-list");
    clone.removeClass("template");
  }

  // Add fake popular topics
  for(var i = 0; i < 10; i++) {
    var clone = $(".result-template-column").clone();
    $(".popular-topics .insert-here").append(clone);
    clone.removeClass("result-template-column");
    clone.removeClass("template");
  }


  $(".search-ui").on("keyup","input",function(){
    updateSearchUI();
    fakeSearch();
  })

  $(".search-ui").on("click","a",function(){
    $(".search-ui input").val("");
    fakeSearch();
    updateSearchUI();
    return false;
  })

  // Click on a filter
  $(".filters").on("click",".filter-option",function(){

    var filterContainer = $(this).closest(".filter");
    var type = filterContainer.attr("filter");
    var filterToggle = $(".filter-toggle[for="+type+"]");

    $(this).toggleClass("active");

    if(filterContainer.find(".active").length > 0) {
      filterContainer.addClass("filter-active");
      filterToggle.addClass("filter-active");
    } else {
      filterContainer.removeClass("filter-active");
      filterToggle.removeClass("filter-active");
    }

    countSkills();
    showHideClear();
    fakeSearch();
    return false;
  });

  $(".clear").on("click",function(){
    $(".active").removeClass("active");
    $(".filter-active").removeClass("filter-active");
    $(".filter").hide();
    $(".filters").removeAttr("show");
    fakeSearch();
    countSkills();
    showHideClear();
    closeFilters();
    return false;
  })


  // Shows and hides each filter menu
  $(".filter-toggles").on("click",".filter-toggle",function(){


    var type = $(this).attr("for");

    if($(this).hasClass("active")){
      $(this).removeClass("active");
      closeFilter(type);

      closeFilters();
    } else {
      $(".filters").attr("show",type);
      $(".filter-toggle").removeClass("active");
      $(".arrow-wrapper").css("opacity",1);
      $(this).addClass("active");
      openFilter(type);
      var height = $("[filter="+type+"]").height();
      $(".filters").height(height);
      moveArrow();
    }
    return false;
  });
});

// CLoses all filters
function closeFilters(){
  $(".filters").removeAttr("show");
  $(".filters").height(0);
  $(".arrow-wrapper").css("opacity",0);

}

function moveArrow(){

  var activePill = $(".filter-toggle.active");
  var position = activePill.position();
  var width = activePill.outerWidth();
  $(".arrow-wrapper .arrow").css("left",position.left + 20 + width/2);

}

function openFilter(type){
  $("[filter]").hide();
  $("[filter="+type+"]").show();
}

function closeFilter(type){
  $("[filter="+type+"]").hide();
}

//Check if any filters are on...
function showHideClear(){
  var count = $(".filter-option.active").length;
  if(count > 0){
    $(".clear").css("opacity",1);
  } else {
    $(".clear").css("opacity",0);
  }
}


function countSkills(){
  var numActive = $("[filter=skills] .filter-option.active").length;

  $(".skill-count").text(numActive);
  if(numActive == 0) {
    $(".skill-count").text("");
  }

  if(numActive == 1) {
    $(".plural").hide();
  } else {
    $(".plural").show();
  }
}