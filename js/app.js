$(document).ready(function(){

  showHideClear();


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
  });

  $(".clear").on("click",function(){
    $(".active").removeClass("active");
    $(".filter-active").removeClass("filter-active");
    $(".filter").hide();
    $(".filters").removeAttr("show");
    countSkills();
    showHideClear();
  })


  // Shows and hides each filter menu
  $(".filter-toggles").on("click",".filter-toggle",function(){

    var type = $(this).attr("for");

    if($(this).hasClass("active")){

      $(this).removeClass("active");
      closeFilter(type);
      $(".filters").removeAttr("show");
    } else {
      $(".filters").attr("show",type);
      $(".filter-toggle").removeClass("active");
      $(this).addClass("active");
      openFilter(type);
    }
    return false;
  });
});

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
  console.log(count);
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