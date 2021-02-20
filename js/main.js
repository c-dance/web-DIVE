;(function(){
  
  var main = {
    init:  function(){
      this.header();
      this.section01();
      this.sectionWhatsOn();
      this.sectionCulture();
      this.sectionPost();
      this.sectionNotice();
      this.footer();
    },
    header: function(){
      var $window = $(window);
      var $windowWidth = $window.innerWidth();

      var isMobile = false;/*max-width:980*/
      var isOpenMenu = false;
      var $mobileMenu = $('.mobile-gnb-menu')
      var $mobileTrigger = $('.mobile-trigger-wrap');
      var $mobileBtn = $('.mobile-menu-btn');

      var $header = $('#header');
      var $headerHeight = $header.height();
      var $gnb = $('.gnb');
      
      var initHeaderEvent = function(){
        if($windowWidth<980){/*mobile*/
          isMobile = true;
          setMobileGnb();
        }else{/*PC*/
          handleGnbMenu();
          scrollEvent();
        }
        setMobileMenu();
        setSearchArea();
        setSearchTag();
        setMobileSearchArea();
        resizeHeaderEvent();
      };

      /*handel shifting gnb-bar */
      var handleGnbMenu = function(){
        var $gnbItem = $('.gnb-item');
        // var $gnbItem = $('.gnb-item');
        var $gnbBar = $('.gnb-bar');
        var $target;
        var gnbBarCss = {start_x: 0, width: 0};
        var gnbOffsetX = $('#header .container').offset().left;

        $gnbBar.addClass('hide');

        $gnbItem.on({
          mouseenter: function(event){
            event.preventDefault();
            $target = $(this).children('.gnb-item-link');
            gnbBarCss.start_x = $target.offset().left-gnbOffsetX;
            gnbBarCss.width = $target.css('width');
            $gnbBar.css({width: gnbBarCss.width, left: gnbBarCss.start_x});
            $gnbBar.removeClass('hide');
            $(this).children('.gnb-menu-wrap').removeClass('hide');
          },
          mouseleave: function(event){
            event.preventDefault();
            $(this).children('.gnb-menu-wrap').stop().addClass('hide');
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

      var setMobileGnb = function(){
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

      var setSearchArea = function(){
        var $searchBtn = $('.search-btn');
        var $searchArea = $('.search-area');
        var $mSearchArea = $('.m-search-area');
        var $closeBtn = $('.search-closeBtn');
        var $mCloseBtn = $('.m-search-closeBtn');
        
        $searchBtn.click(function(event){
          event.preventDefault();
          if(isMobile) $mSearchArea.removeClass('hide');
          else $searchArea.removeClass('hide');
        });
        $closeBtn.click(function(event){
          event.preventDefault();
          $searchArea.addClass('hide');
        });
        $mCloseBtn.click(function(event){
          event.preventDefault();
          $mSearchArea.addClass('hide');
        });

        setSearchEvent();

      };

      var setSearchEvent = function(){
        var $searchInput = $('.search-input');
        var $cleanBtn = $('.search-cleanBtn');

        $searchInput.focus(function(event){
          event.preventDefault();
          $(this).next().addClass('clean');
        });
        $searchInput.blur(function(event){
          event.preventDefault();
          $cleanBtn.removeClass('clean');
          $(this).val('');
        });
        $cleanBtn.click(function(event){
          event.preventDefault();
          $(this).prev().val('');
        });
      };

      var setMobileSearchArea = function(){
        var $searchLinks = $('.m-search-row02 a');
        var $searchTabs = $('.m-search-row03 ul');

        $searchLinks.eq(0).addClass('selected');
        $searchTabs.eq(0).addClass('selected');

        $searchLinks.each(function(idx){
          $(this).click(function(event){
            event.preventDefault();
            $searchLinks.removeClass('selected');
            $searchTabs.removeClass('selected');
            $searchLinks.eq(idx).addClass('selected');
            $searchTabs.eq(idx).addClass('selected');
          });
        });
      };

      var setSearchTag = function(){
        var $searchTags = $('.search-tags');
        var tagData = ['오버 더 레코드', '바이닐앤플라스틱', '래플', '제주', '성수', '부산', '애플뮤직', '쿠킹 라이브러리', '카더가든', '팬메이프로젝트'];
        var tagTxt = '';
        var htmlTxt = '';
        var parentTag = null;

        $searchTags.each(function(){
          parentTag = $(this);
          tagData.forEach(function(el){
            tagTxt = el;
            htmlTxt = `<li class="tag"><a href="javascript:void(0)" alt="tag">${tagTxt}</a></li>`;
            parentTag.append(htmlTxt);
          }); 
        });
      };

      var hideBorderEvent = function(isTop){
        if(isTop) $header.removeClass('scroll-border');
        else $header.addClass('scroll-border');
      };

      var scrollEvent = function(){
        if(isMobile){
          $window.off('scroll.header');
          hideBorderEvent(true);
        }else{
          $window.on('scroll.header',function(event){
            event.preventDefault();
            if($window.scrollTop()>$headerHeight){
              hideBorderEvent(false);
            }else{
              hideBorderEvent(true);
            }
          });
        }
      };

      /*window resize*/
      var resizeHeaderEvent = function(){
        $window.resize(function(){
          $windowWidth = $window.innerWidth();
          $windowHeight = $window.innerHeight();
          if($windowWidth>=980){
            if(isMobile){
              isMobile = false;
              setMobileGnb();
            }else{
              handleGnbMenu();
            }
          }else{
            if(!isMobile){
              isMobile = true;
              setMobileGnb(); 
            }
          }
          scrollEvent();
        })
      };

      initHeaderEvent();

    },
    section01: function(){

    },
    sectionWhatsOn: function(){

      var $window = $(window);
      var $windowWidth = $window.innerWidth();

      var $boxWrap = $('#section01 .img-wrap > a');
      var boxCnt = $boxWrap.length;
      var $moreBtnWrap = $('.moreBtn-wrap');
      var $moreBtn = $('.whatsOn-moreBtn');

    
      var initWhatsOn = function(){
        if($windowWidth<=980) setMobileWhatsOn();
        else setPcWhatsOn();
        resizeEvent();
      };


      var setMobileWhatsOn = function(){

        var showCnt = 4;

        var cnt = 0;
        $boxWrap.each(function(){
          if(cnt>3) $(this).css('display', 'none');
          cnt++;
        });

        $moreBtnWrap.css('display', 'block');

        $moreBtn.click(function(e){
          e.preventDefault();
          if(showCnt>=boxCnt) return;
          else if((boxCnt-showCnt)/4>=1){
            for(var i = showCnt-1; i<showCnt+3; i++){
              $boxWrap.eq(i).css('display', 'block');
            }
            showCnt += 4;
            console.log(showCnt);
          }
          else {
            for(var i = showCnt-1; i<boxCnt; i++){
              $boxWrap.eq(i).css('display', 'block');
            }
            showCnt = boxCnt;
            console.log(showCnt);
          }
        })
      };

      var setPcWhatsOn = function(){
        $moreBtnWrap.css('display', 'none');

        $boxWrap.each(function(){
          $(this).css('display', 'block');
        });

      };

      var resizeEvent = function(){
        $window.resize(function(e){
          e.preventDefault();
          $windowWidth = $window.innerWidth();
          if($windowWidth<=980) setMobileWhatsOn();
          else setPcWhatsOn();
        });
      }


      initWhatsOn();

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
        if($windowWidth<=980){
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
          if($windowWidth<=980){
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

      // var scrollHideEvent = function(isMobile){
      //   var hideTop = 0;
      //   if(isMobile){
      //     $window.scroll(function(event){
      //       event.preventDefault();
      //       hideTop = $('footer').offset().top - $windowHeight;
      //       if($(this).scrollTop()>hideTop) $mobileBtnWrap.addClass('hide');
      //       else $mobileBtnWrap.removeClass('hide');
      //     });
      //   }else{
      //     $window.off('scroll');
      //   }
      // };

      var scrollHideEvent = function(isMobile){
        var hideTop = 0;
        if(isMobile){
          $window.on('scroll.culture',function(event){
            event.preventDefault();
            hideTop = $('footer').offset().top - $windowHeight;
            if($(this).scrollTop()>hideTop) $mobileBtnWrap.addClass('hide');
            else $mobileBtnWrap.removeClass('hide');
          });
        }else{
          $window.off('scroll.culture');
        }
      };
      
      initSectionCulture();
    },
    sectionPost: function(){
      var $window = $(window);
      var $windowWidth = $window.innerWidth();
      var $img = $('#section02 .img-box img');

      var initSectionPost = function(){
        setImgSrc($windowWidth);
        resizeEvent();
      };

      var setImgSrc = function(width){
        var imgPath = './img/main/';
        if(width<=980) imgPath+='mpost0';
        else imgPath+='post0';
        for(var i = 0; i<$img.length; i++){
          $img.eq(i).attr('src', imgPath+(i+1)+'.jpg');
        }
      };

      var resizeEvent = function(){
        $window.resize(function(e){
          e.preventDefault();
          $windowWidth = $window.innerWidth();
          setImgSrc($windowWidth);
        })
      };

      initSectionPost();

    },
    sectionNotice: function(){

      var initSectionNotice = function(){
        setMobileAcc();
      };  

      var setMobileAcc = function(){

        var $accItem = $('.m-notice-acc a');
        var activAcc = 'activ-acc';

        $accItem.on('click', function(e){
          e.preventDefault();
          if($(this).attr('class') === activAcc){
            $(this).next().slideUp();
            $(this).removeClass(activAcc);
          }else{
            $accItem.removeClass(activAcc);
            $accItem.next().slideUp();
            $(this).addClass(activAcc);
            $(this).next().slideDown();
          }
        })
      };

      initSectionNotice();

    },
    footer: function(){

      var footerInit = function(){
        setScrollTop();
      }

      var setScrollTop = function(){
        var $scrollTop = $('.scroll-top-btn ');
        var $body = $('html, body');
        $scrollTop.click(function(e){
          e.preventDefault();
          $body.animate({scrollTop: 0}, 400);
        });
      };
      
      footerInit();
    }
    
  };

  main.init();
  
})();