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
  var duration = false;

  if($(".duration-slider").val() > 1) {
    duration = true;
  }

  var filterCount = $(".filter-option.active").length;
  var textSearchLength = $(".search").val().length;
  $(".popular-topics, .search-results").css("opacity",0);

  setTimeout(function(){
    $(".popular-topics, .search-results").hide();
  },200);


  $(".search-faker").show().css("opacity",0).width($(".search-faker").width());
  $(".search-faker").css("opacity",.95);


  setTimeout(function(){
    $(".activity-count").text(random);
    if(filterCount > 0 || textSearchLength > 0 || duration) {
      $(".search-results").show().css("opacity",0).width($(".search-results").width());
      $(".search-results").css("opacity",1);
    } else {
      $(".popular-topics").show().css("opacity",0).width($(".popular-topics").width());
      $(".popular-topics").css("opacity",1);
    }
  },400);

  setTimeout(function(){
    $(".search-faker").css("opacity", 0);
  },600);

  setTimeout(function(){
    $(".search-faker").hide();
  },800);

}

$(document).ready(function(){

  updateSearchUI();
  showHideClear();

  // Add some search results
  for(var i = 0; i < 10; i++) {
    var clone = $(".result-template-list").clone();
    $(".search-results .insert-here").append(clone);
    clone.removeClass("result-template-list");
    clone.removeClass("template");
  }

  // Add fake popular topics
  for(var i = 0; i < 9; i++) {
    var clone = $(".result-template-column").clone();
    $(".popular-topics .insert-here").append(clone);
    clone.removeClass("result-template-column");
    clone.removeClass("template");
  }


  $(".duration-slider").on("input",function(){
    var val = parseInt($(this).val());
    var label = $("[filter=duration] .value");
    switch(val) {
      case 1: label.text("Any duration");
        break;
      case 2: label.text("About 15 minutes");
        break;
      case 3: label.text("15 minutes to 1 hour");
        break;
      case 4: label.text("1 to 2 hours");
        break;
      case 5: label.text("2 to 4 hours");
        break;
      case 6: label.text("4 hours +");
        break;
      }


      var filterContainer = $(this).closest(".filter");
      var filterToggle = $(".filter-toggle[for=duration]");

      if(val > 1) {
        filterContainer.addClass("filter-active");
        filterToggle.addClass("filter-active");
      } else {
        filterContainer.removeClass("filter-active");
        filterToggle.removeClass("filter-active");
      }

      showHideClear();
      fakeSearch();

  });


  $(".search-ui").on("keyup","input",function(){
    updateSearchUI();
    fakeSearch();
  })

  $(".clear-search").on("click",function(){
    $(".search-ui input").val("");

    $(".active").removeClass("active");
    $(".filter-active").removeClass("filter-active");
    $(".filter").hide();
    $(".filters").removeAttr("show");
    $(".duration-slider").val(1);


    fakeSearch();
    showHideClear();
    closeFilters();
    updateSearchUI();
    return false;
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

    showHideClear();
    fakeSearch();
    return false;
  });

  $(".clear").on("click",function(){
    $(".active").removeClass("active");
    $(".filter-active").removeClass("filter-active");
    $(".filter").hide();
    $(".filters").removeAttr("show");

    $(".duration-slider").val(1);
    $("[filter=duration] .value").text("Any duration");

    showHideClear();
    closeFilters();
    fakeSearch();
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


// Keeps arrow in sync with opened filter

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
  var duration = false;
  if($(".duration-slider").val() > 1) {
    duration = true;
  }
  console.log(duration);

  if(count > 0 || duration){
    $(".clear").css("opacity",1);
  } else {
    $(".clear").css("opacity",0);
  }
}

