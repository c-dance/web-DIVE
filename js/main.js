;(function(){
  
  var main = {
    init:  function(){
      this.header();
      this.section01();
      this.sectionWhatsOn();
      this.sectionCulture();
      this.sectionPost();
      this.sectionEvent();
      this.sectionNotice();
      this.sectionApps();
      this.footer();
    },
    header: function(){

      var $window = $(window);
      var $windowWidth = $window.innerWidth();
      var $windowHeight = $window.innerHeight();

      var isMobile = false;
      var isOpenMenu = false;
      var $mobileMenu = $('.mobile-gnb-menu')
      var $mobileTrigger = $('.mobile-trigger-wrap');
      var $mobileBtn = $('.mobile-menu-btn');

      var $gnb = $('.gnb');
      var $gnbItem = $('.gnb-item a');
      var $gnbBar = $('.gnb-bar');
      var $gnbMenuItems = $('#gnb-item-space, #gnb-item-culture');

      var $target;
      var gnbArea = {start_x: 0, end_x: 0, start_y: 0, end_y: 0};
      var gnbBarCss = {start_x: 0, width: 0};
      

      var initHeaderEvent = function(){
        if($windowWidth<980){/*mobile*/
          isMobile = true;
          setMobileGnb(isMobile);
          setMobileMenuArea();
        }else{/*PC*/
          handleGnbBar();
        }
        handleGnbMenu();
        setMobileMenu();
        setSearchArea();
        resizeHeaderEvent();
      };

      /*handle depth menu */
      var handleGnbMenu = function(){
        $gnbMenuItems.each(function(){
          $(this).hover(function(){
            $(this).next().removeClass('hide');
          },function(){
            $(this).next().addClass('hide');
          });
        })
      };

      /*handel shifting gnb-bar */
      var handleGnbBar = function(){
        resetGnbBar();
        $gnbItem.on({
          mouseenter: function(event){
            event.preventDefault();
            $target = $(event.target);
            gnbBarCss.start_x = $target.offset().left-gnbArea.start_x;
            gnbBarCss.width = $target.css('width');
            $gnbBar.css({width: gnbBarCss.width, left: gnbBarCss.start_x});
            $gnbBar.removeClass('hide');
          }
        }),
        $gnb.on({
          mouseleave: function(){
            $gnbBar.addClass('hide');
            isTarget = false;
            gnbBarCss.start_x = 0;
            gnbBarCss.width = 0;
          }
        })
      };

      var resetGnbBar = function(){
        var $gnbOffset = $gnb.offset();
        gnbArea.start_y = (Number($gnbOffset.top));
        gnbArea.start_x = (Number($gnbOffset.left));
        gnbArea.end_y = (Number($gnbOffset.top)+Number($gnb.innerHeight()));
        gnbArea.end_x = (Number($gnbOffset.left)+Number($gnb.innerWidth()));
        isTarget = false;
        targetArea = [];
        $gnbBar.addClass('hide');
      };

      var setMobileGnb = function(isMobile){
        if(isMobile){
          $gnb.css('display', 'none');/*gnb hide */
          $mobileTrigger.css('display', 'inline-block');/*mobile gnb(trigger, menu) inline-block */
        }else{
          $mobileTrigger.css('display', 'none');
          $gnb.css('display', 'inline-block');
          if(isOpenMenu) $mobileMenu.addClass('hide');
          isOpenMenu = false;
        }
      };

      var setMobileMenu = function(){
        setMobileMenuArea();
        $mobileTrigger.click(function(event){
          event.preventDefault();
          isOpenMenu = true;
          $mobileMenu.removeClass('hide');
        });
        $mobileBtn.click(function(event){
          event.preventDefault();
          isOpenMenu = false;
          $mobileMenu.addClass('hide');
        });
      };

      var setMobileMenuArea = function(){
        $mobileMenu.css({height: $windowHeight});
      };

      var setSearchArea = function(){
        var $searchBtn = $('.search-btn ');
        var $closeBtn = $('.search-closeBtn');
        var $searchArea = $('.search-area');
        $searchBtn.click(function(event){
          event.preventDefault();
          $searchArea.removeClass('hide');
        });
        $closeBtn.click(function(event){
          event.preventDefault();
          $searchArea.addClass('hide');
        })
      };

      /*window resize*/
      var resizeHeaderEvent = function(){
        $window.resize(function(){
          $windowWidth = $window.innerWidth();
          $windowHeight = $window.innerHeight();
          if($windowWidth>=980){
            if(isMobile){
              isMobile = false;
              setMobileGnb(isMobile);
            }else{
              handleGnbBar();
            }
          }else{
            if(!isMobile){
              isMobile = true;
              setMobileGnb(isMobile);
            }
            setMobileMenuArea();
          }
        })
      };

      initHeaderEvent();


    },
    section01: function(){

    },
    sectionWhatsOn: function(){

    },
    sectionCulture: function(){
      
      var $window = $(window);
      var $windowWidth = $window.innerWidth();
      var $windowHeight = $window.innerHeight();

      var $culture = $('.culture');
      var $mobileBtnWrap = $('.mobile-cultureBtn-wrap');
      var $mobileBtn = $('.mobile-cultureBtn');
      var $mobileCulture = $('.mobile-culture');
      var $mobileCultureRows = $('.mobile-culture-rows');
      var $closeBtn = $('.closeBtn-wrap');
      var isSlideUp = false;

      var $linkItem = $('.link-list .link-item');
      var hoveredImg = null;
      var hoveredBg='';
      var bg_y = '-72px'; 
      
      
      var initSectionCulture = function(){
        if($windowWidth<980){
          setMobileCulture(true);
        }else{
          setMobileCulture(false);
        }
        setLinkItemEvent();//setSVGimg
        handleMobileBtn();
        resizeEvent();
      };

      var setLinkItemEvent = function(){
        $linkItem.each(function(){
          var newPos = '';
          $(this).hover(
            function(event){
              event.preventDefault();
              hoveredImg = $(this).find('.link-img');
              hoveredBg = hoveredImg.css('background-position');
              newPos = hoveredBg.substring(0, hoveredBg.length-3) + bg_y;
              hoveredImg.css('background-position', newPos);
              $(this).css({'transform':'scale(1.02)', 'background':'#000', 'box-shadow':'0 0 2px #000'});
            },
            function(event){
              event.preventDefault();
              hoveredImg.css('background-position', hoveredBg);
              $(this).css({'transform':'scale(1.0)', 'background':'#f8f8f8', 'box-shadow':'0 0 2px #f8f8f8'});
              hoveredImg = null;
              hoveredBg = '';
            },
          )
        })
      };

      var resizeEvent = function(){
        $window.resize(function(){
          $windowWidth = $window.innerWidth();
          $windowHeight = $window.innerHeight();
          if($windowWidth<980){
            setMobileCulture(true);
          }else{            
            setMobileCulture(false);
          }
        })
      };

      var setMobileCulture = function(isMobile){
        var wrapTop= 0;
        var wrapHeight = 92;
        if(isMobile){
          $culture.addClass('hide');
          $mobileBtnWrap.removeClass('hide');
          wrapTop = $windowHeight-wrapHeight;
          $mobileBtnWrap.css('top', wrapTop+'px');
        }else{
          $culture.removeClass('hide');
          $mobileBtnWrap.addClass('hide');
          if(isSlideUp) $mobileCulture.addClass('hide');
        }
        scrollHideEvent(isMobile);
      }

      var handleMobileBtn = function(){
        $mobileBtn.click(function(event){
          event.preventDefault();
          $mobileCulture.removeClass('hide');
          $mobileCultureRows.animate({
            top: 0
          },500, 'swing');
          isSlideUp = true;
        });
        $closeBtn.click(function(event){
          event.preventDefault();
          $mobileCultureRows.animate({
            top: '100%'
          },200);
          setTimeout(function(){
            $mobileCulture.addClass('hide');
          },200);
          isSlideUp = false;
        });
      };

      var scrollHideEvent = function(isMobile){
        var hideTop = 0;
        if(isMobile){
          $window.scroll(function(event){
            event.preventDefault();
            hideTop = $('footer').offset().top - $windowHeight;
            if($(this).scrollTop()>hideTop) $mobileBtnWrap.addClass('hide');
            else $mobileBtnWrap.removeClass('hide');
          });
        }else{
          $window.off('scroll');
        }
      };

      
      initSectionCulture();
    },
    sectionPost: function(){

    },
    sectionEvent: function(){

    },
    sectionNotice: function(){

    },
    sectionApps: function(){

    },
    footer: function(){

    }
    
  };

  main.init();
  
})();