//= require ../lib/_jquery
//= require ../lib/_jquery_ui
//= require ../lib/_jquery.tocify
//= require ../lib/_imagesloaded.min
(function (global) {
  'use strict';

  var closeToc = function() {
    $(".tocify-wrapper").removeClass('open');
    $("#nav-button").removeClass('open');
  };

  var makeToc = function() {
    global.toc = $("#toc").tocify({
      selectors: 'h1, h2',
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 60,
      scrollTo: -1,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');

    $("#nav-button").click(function() {
      $(".tocify-wrapper").toggleClass('open');
      $("#nav-button").toggleClass('open');
      return false;
    });

    $("#sign-up").click(function() {
      console.log("Hello, world");

      // swal({
      //       title: "Ajax request example",
      //       text: "Submit to run ajax request",
      //       type: "info",
      //       showCancelButton: true,
      //       closeOnConfirm: false,
      //       showLoaderOnConfirm: true,
      //     },
      //     function(){
      //       setTimeout(function(){
      //         swal("Ajax request finished!");
      //       }, 2000);
      //     });
      swal({
            title: "Get an API key",
            text: "Input your email address to get a valid api key",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "Enter your email"
          },

          function(inputValue){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (inputValue === false) return false;

            if (inputValue === "") {
              swal.showInputError("You need to write something!");
              return false
            }
            if(!re.test(inputValue)){
              swal.showInputError("Please enter a valid email format!");
              return false;
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                var devKey = JSON.parse(this.responseText);
                console.log(devKey);
                if(devKey.is_new){
                  swal("Nice!", "We are glad to have you on board. Here's your api key: " + devKey.api_key, "success");
                }
                else {
                  swal("You're already in our system... But that's OK!", "Here is your api key: " + devKey.api_key, "success");
                }
              }
            };
            xhttp.open("GET", "http://api.madisonehlers.com/bible/developerkey/" + inputValue, true);
            xhttp.send();
            // setTimeout(function(){
            //   swal("Nice!", "You wrote: " + inputValue, "success");
            // }, 100);
           // swal("Nice!", "You wrote: " + inputValue, "success");
            });
    });


    $(".page-wrapper").click(closeToc);
    $(".tocify-item").click(closeToc);
  };

  // Hack to make already open sections to start opened,
  // instead of displaying an ugly animation
  function animate() {
    setTimeout(function() {
      toc.setOption('showEffectSpeed', 180);
    }, 50);
  }

  $(function() {
    makeToc();
    animate();
    setupLanguages($('body').data('languages'));
    $('.content').imagesLoaded( function() {
      global.toc.calculateHeights();
    });
  });
})(window);

