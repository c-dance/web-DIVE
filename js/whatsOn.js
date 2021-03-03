;(function(){
  
    var main = {
      init:  function(){
        this.header();
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