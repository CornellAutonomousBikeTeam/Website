//http://stackoverflow.com/questions/19097437/how-to-rotate-an-html-element-with-jquery-on-scroll-percentage

//rotate bike wheel on scroll

var membersView = {
  init: function(){
    this.populatePage()
    this.wheelAnimation()
  },

  populatePage: function(){
    $.getJSON("data/team.json", function(json) {

    var outputHTML = ''
    $.each(json["members"], function (index, value) {

      outputHTML += '<div class="member row shadow">\
        <div class="col-sm-5">\
          <div class="circular--landscape"><img src="'+value.imgSrc+'" class="img-responsive avatar"></div>\
          <img src="/images/bikewheel.png" class="img-responsive wheel">\
        </div>\
        <div class="col-sm-7">\
          <h2>'+value.name+'<br><b>'+value.position+'</b></h2>\
          <p><b>Major: </b>'+value.major+'</p>\
          <p><b>Year: </b>'+value.year+'</p>\
          <p>'+value.desc+'</p>\
        </div>\
      </div>';

    });

    $('#member').html(outputHTML);
    });
  },

  wheelAnimation: function(){
    $(document).ready(function(){
       var bodyHeight = $("body").height()-$(window).height();
       window.onscroll = function() {
          //Determine the amount to rotate by.
          var factor = 4;
          var deg = -window.scrollY*(360/bodyHeight)/factor;

          $(".wheel").css({
            "transform": "rotate("+deg+"deg)",
          });

       };
    });
  }
}

membersView.init()

