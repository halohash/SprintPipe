export async function onRequest(context) {
  try {
    
  const url = new URL(context.request.url);
  const id = url.searchParams.get("v");
  const next_video_title = "sprintpipe"
  if (!id) {
    return Response.redirect(new URL("/", context.request.url).toString(), 301);
  }

  const apiUrl = `https://inv.truehosting.net/api/v1/videos/${encodeURIComponent(id)}?alt=json`;

    let title ="Untitled video";
    let desc ="No Description";
    let user ="No Author";

  try {
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      title =
        data.title ||
        "Untitled video";
    desc =
        data.description ||
        "No Description";
    user =
        data.author ||
        "No Author";

    } else {

    const data = await res.json();
    const error = data.error;

    if (error === "This helps protect our community. Learn more") {
      title = "invidious instance unexpectedly blocked by youtube"
      desc = "invidious instance unexpectedly blocked by youtube"
      user = "invidious instance unexpectedly blocked by youtube"
    } else {
    title = "invidious error: " + data.error;
    desc = "invidious error: " + data.error;
    user = data.error;}

  }
} catch (e) {
    
    return new Response("page error: " + e, {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8"
    }
  });
  }


  const html = `
  
<!DOCTYPE html>
  <html lang="en" dir="ltr" >

<!-- machid: pakU5RHluYkJkTUdKSjJOQW5Yd25lZ19uZzVvQTZGSnJCWHczaFVRRUFvZDZMOHVHNERvZHVB -->
<head>
  

    <title>
        ${title}
      - YouTube
  </title>

    
  <link rel="search" type="application/opensearchdescription+xml" href="https://www.youtube.com/opensearch?locale=en_US" title="YouTube Video Search">

    <link rel="icon" href="https://s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico" type="image/x-icon">
    <link rel="shortcut icon" href="https://s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico" type="image/x-icon"> 
      <meta property="og:type" content="video">
      <meta property="og:image" content="https://i4.ytimg.com/vi/${id}/hqdefault.jpg">
        <meta property="og:video" content="https://www.youtube.com/v/${id}?version=3&amp;autohide=1">
      <meta property="og:video:type" content="application/x-shockwave-flash">
      <meta property="og:video:width" content="398">
      <meta property="og:video:height" content="224">
      <meta property="og:site_name" content="YouTube">



  

      <link id="www-core-css" rel="stylesheet" href="https://s.ytimg.com/yt/cssbin/www-refresh-datauri-vflJkAFPr.css">
</head>
  <body id="" class="date-20111216 en_US ltr" dir="ltr">
  <form name="logoutForm" method="POST" action="/">
    <input type="hidden" name="action_logout" value="1">
  </form>
  <!-- begin page -->
  <div id="page" class="  watch ">
  <div id="masthead-container">
    <!-- begin masthead -->
        <div id="masthead" class="" dir="ltr">
          <a id="logo-container" href="/" title="YouTube home">
    <img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
  </a>


      <div id="masthead-user-bar-container" >
        <div id="masthead-user-bar">
          <div id="masthead-user">
              <a class="start" href="/signup?next=%2Fwatch%3Fv%3D${id}%26feature%3Dg-logo%26context%3DG2b2f2eeFOAAAAAAAAAA">Create Account</a>    <span class="masthead-link-separator">|</span>  <a class="end" href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253D${id}%2526feature%253Dg-logo%2526context%253DG2b2f2eeFOAAAAAAAAAA&amp;hl=en_US&amp;ltmpl=sso">Sign In</a>
          </div>
        </div>
      </div>
    <div id="masthead-search-bar-container" >
      <div id="masthead-search-bar">
<div id="masthead-nav"><a href="/videos?feature=mh" >Browse</a><span class="masthead-link-separator">|</span><a href="/movies?feature=mh" >Movies</a>              <span class="masthead-link-separator">|</span><a href="https://upload.youtube.com/my_videos_upload" >Upload</a></div>        



  <form id="masthead-search" class="search-form consolidated-form" autocomplete="off" action="/results" onsubmit="if (_gel(&#39;masthead-search-term&#39;).value == &#39;&#39;) return false;">
<button class="search-btn-compontent search-button yt-uix-button" onclick="if (_gel(&#39;masthead-search-term&#39;).value == &#39;&#39;) return false; _gel(&#39;masthead-search&#39;).submit(); return false;;return true;" type="submit" id="search-btn" dir="ltr" tabindex="2"  role="button"><span class="yt-uix-button-content">Search </span></button><div id="masthead-search-terms" dir="ltr"><label><input id="masthead-search-term" onfocus="_addclass(_gel(&#39;masthead-search&#39;), &#39;focused&#39;); " onblur="_removeclass(_gel(&#39;masthead-search&#39;), &#39;focused&#39;);" class="search-term " name="search_query" value="" type="text" tabindex="1" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)"  title="Search"></label></div>  </form>

      </div>
    </div>
  </div>
  

      <div id="alerts"></div>
    <!-- end masthead -->
  </div>
  <div id="content-container">
    <!-- begin content -->
    <div id="content" class="">
      <div id="watch-container" itemscope itemtype="https://schema.org/VideoObject">
      <link itemprop="url" href="https://www.youtube.com/watch?v=${id}">
    <meta itemprop="name" content="OU vs Iowa 2011 Skycam Fall (HD)">
    <meta itemprop="description" content="The skycam falls during the final minutes of the OU Iowa game. The camera nearly hits several players before it is slowly dragged off the field. The game had...">
    <link itemprop="thumbnailUrl" href="https://i4.ytimg.com/vi/${id}/hqdefault.jpg">
    <meta itemprop="playerType" content="Flash">
      <link itemprop="embedURL" href="https://www.youtube.com/v/${id}?version=3&amp;autohide=1">
    <meta itemprop="width" content="1280">
    <meta itemprop="height" content="720">


  <!-- begin watch-headline-container -->
  <div id="watch-headline-container">
      <div id="watch-headline" class="watch-headline">
      



    <h1 id="watch-headline-title">
      


  <span id="eow-title" class="" dir="ltr" title="${title}">
    ${title}
  </span>

    </h1>

    <div id="watch-headline-user-info">
        <span class="yt-uix-button-group"><button href="/user/${user}?feature=watch" type="button" class="start yt-uix-button" onclick=";window.location.href=this.getAttribute(&#39;href&#39;);return false;"  role="button"><span class="yt-uix-button-content">${user} </span></button><div class="yt-subscription-button-hovercard yt-uix-hovercard"><button href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253D${id}%2526feature%253Dg-logo%2526context%253DG2b2f2eeFOAAAAAAAAAA&amp;hl=en_US&amp;ltmpl=sso" type="button" class="yt-subscription-button yt-subscription-button-js-default end  yt-uix-button" onclick=";window.location.href=this.getAttribute(&#39;href&#39;);return false;" data-enable-hovercard="true" data-subscription-value="1DB4EhDXCEMmy4aVuNW7OA" data-force-position="true" data-position="topright" data-subscription-feature="watch" data-subscription-type="" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content">  <span class="subscribe-label">Subscribe</span>
  <span class="subscribed-label">Subscribed</span>
  <span class="unsubscribe-label">Unsubscribe</span>
 </span></button><div class="yt-uix-hovercard-content hid">  <p class="loading-spinner">
    <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
Loading...
  </p>
</div></div></span><button onclick="_toggleclass(this,&#39;yt-uix-expander-collapsed&#39;);return false;" type="button" id="watch-mfu-button" class="yt-uix-expander-collapsed yt-uix-button yt-uix-button-toggle" data-video-user-id="1DB4EhDXCEMmy4aVuNW7OA" data-button-menu-id="some-nonexistent-menu" data-video-id="${id}" data-button-action="yt.www.watch.watch5.handleToggleMoreFromUser" role="button"><span class="yt-uix-button-content">16 videos
 </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
    </div>

        <div id="subscription-button-module-menu" class="hid subscription-menu-expandable subscription-menu">
      <div class="subscription-menu-not-logged-in">
          <strong><a href="https://accounts.google.com/ServiceLogin?uilel=3&service=youtube&passive=true&continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253D${id}%2526feature%253Dg-logo%2526context%253DG2b2f2eeFOAAAAAAAAAA&hl=en_US&ltmpl=sso">Sign In</a> or <a href="/signup?next=%2Fwatch%3Fv%3D${id}%26feature%3Dg-logo%26context%3DG2b2f2eeFOAAAAAAAAAA">Sign Up</a> now!
</strong>

      </div>
  </div>


    <div id="watch-more-from-user" class="collapsed">
      <div id="watch-channel-discoverbox" class="yt-rounded">
        <span id="watch-channel-loading">Loading...</span>
      </div>
    </div>
  </div>

  </div>
  <!-- end watch-headline-container -->
  <div id="watch-video-container">
    <div id="watch-video" >
          <script>
      if (window.yt.timing) {
        yt.timing.tick('bf');
      }
    </script>

          <div id="watch-player" class="flash-player">
  <noembed><div  class="yt-alert yt-alert-error yt-alert-player yt-rounded "><span class="yt-alert-icon"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon"></span><div  class="yt-alert-content">        You need Adobe Flash Player to watch this video. <br> <a href="https://get.adobe.com/flashplayer/">Download it from Adobe.</a>
</div></div></noembed>


    </div>

      <!-- begin watch-video-extra -->
      <div id="watch-video-extra">
        
        
      </div>
      <!-- end watch-video-extra -->
    </div>
  </div>
  <!-- begin watch-main-container -->
  <div id="watch-main-container">
    <div id="watch-main">
      <div id="watch-panel">
            <div  id="flash10-promo-div" style="display: none;" class="yt-alert yt-alert-warn yt-rounded "><span class="yt-alert-icon"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon"></span><div  class="yt-alert-content">        Upgrade to Flash Player 10 for improved playback performance. <a href="https://www.adobe.com/go/getflashplayer/" onmousedown="urchinTracker('/Events/VideoWatch/GetFlashUpgrade');">Upgrade Now</a> or <a href="https://support.google.com/youtube/bin/answer.py?answer=95402">More Info</a>.
</div><button type="button" onclick="_hidediv(this.parentNode);" class="close master-sprite">close</button></div>


  <div id="watch-actions">
      <div id="watch-actions-right">
          <span class="watch-view-count">
    <strong>???</strong>
views
  </span>
  <button onclick=";return false;" title="Show video statistics" type="button" id="watch-insight-button" class="yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" data-button-action="yt.www.watch.actions.stats" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-watch-insight" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show video statistics"></button>

      </div>
      <span id="watch-like-unlike" class="yt-uix-button-group " data-button-toggle-group="true"><button onclick=";return false;" title="I like this" type="button" class="start yt-uix-tooltip-reverse  yt-uix-button yt-uix-button-toggle yt-uix-tooltip" id="watch-like" data-button-action="yt.www.watch.actions.like" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I like this"><span class="yt-uix-button-content">Like </span></button><button onclick=";return false;" title="I dislike this" type="button" class="end yt-uix-tooltip-reverse  yt-uix-button yt-uix-button-toggle yt-uix-tooltip yt-uix-button-empty" id="watch-unlike" data-button-action="yt.www.watch.actions.unlike" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I dislike this"></button></span>
  <button onclick=";return false;" title="Add to favorites or playlist" type="button" class="addto-button watch show-label yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" id="watch-addto-button" data-button-menu-id="some-nonexistent-id" data-video-ids="${id}" data-button-action="yt.www.watch.actions.showSigninOrCreateChannelWarning" data-feature="watch" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Add to favorites or playlist"><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>

  <button onclick=";return false;" title="Share or embed this video" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" id="watch-share" data-button-action="yt.www.watch.actions.share" role="button"><span class="yt-uix-button-content">Share </span></button>

  <button onclick=";return false;" title="Flag as inappropriate" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" id="watch-flag" data-button-action="yt.www.watch.actions.flag" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-watch-flag" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Flag as inappropriate"></button>


  </div>

  <div id="watch-actions-area-container" class="hid">
    <div id="watch-actions-area" class="yt-rounded">
        <div id="watch-actions-loading" class="watch-actions-panel hid">
Loading...
  </div>
  <div id="watch-actions-logged-out" class="watch-actions-panel hid">
      <div  class="yt-alert yt-alert-warn yt-alert-small yt-alert-naked yt-rounded "><span class="yt-alert-icon"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon"></span><div  class="yt-alert-content">          <strong><a href="https://accounts.google.com/ServiceLogin?uilel=3&service=youtube&passive=true&continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253D${id}%2526feature%253Dg-logo%2526context%253DG2b2f2eeFOAAAAAAAAAA&hl=en_US&ltmpl=sso">Sign In</a> or <a href="/signup?next=%2Fwatch%3Fv%3D${id}%26feature%3Dg-logo%26context%3DG2b2f2eeFOAAAAAAAAAA">Sign Up</a> now!
</strong>

</div></div>
  </div>
  <div id="watch-actions-error" class="watch-actions-panel hid">
    <div  class="yt-alert yt-alert-error yt-alert-small yt-alert-naked yt-rounded "><span class="yt-alert-icon"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon"></span><div id="watch-error-string" class="yt-alert-content"></div></div>
  </div>
  <div id="watch-actions-share" class="watch-actions-panel hid"></div>

  <div id="watch-actions-ajax" class="watch-actions-panel hid"></div>

  <div class="close">
    <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="yt.www.watch.actions.hide();">
  </div>

    </div>
  </div>
  <div id="watch-info">
    
  <div id="watch-description" class="watch-expander yt-uix-expander  yt-uix-expander-collapsed" data-expander-action="yt.www.watch.watch5.handleToggleDescription">
    <div id="watch-description-clip">
      <p id="watch-uploader-info">
        Uploaded by     <a href="/user/${user}" class="yt-user-name author" rel="author"  dir="ltr">
      ${user}
    </a>
 on <span id="eow-date" class="watch-video-date" >Dec 31, 1969</span>

      </p>
      <div id="watch-description-text">
        <p id="eow-description" >${desc.replace("\n","<br>")}</p>
      </div>
        <div id="watch-description-extras">
    <h4>Category:</h4>
        <p id="eow-category"><a href="/music">Music</a></p>



      <h4>Tags:</h4>
        <ul id="eow-tags" class="watch-info-tag-list">
    <li><a href="/results?search_query=Oklahoma%20Sooners&amp;search=tag">Oklahoma Sooners</a></li>
    <li><a href="/results?search_query=OU&amp;search=tag">OU</a></li>
    <li><a href="/results?search_query=Boomer%20Sooner&amp;search=tag">Boomer Sooner</a></li>
    <li><a href="/results?search_query=Iowa%20University&amp;search=tag">Iowa University</a></li>
    <li><a href="/results?search_query=Sky&amp;search=tag">Sky</a></li>
    <li><a href="/results?search_query=Cam&amp;search=tag">Cam</a></li>
    <li><a href="/results?search_query=Camera&amp;search=tag">Camera</a></li>
    <li><a href="/results?search_query=NCAA&amp;search=tag">NCAA</a></li>
    <li><a href="/results?search_query=College&amp;search=tag">College</a></li>
    <li><a href="/results?search_query=Football&amp;search=tag">Football</a></li>
    <li><a href="/results?search_query=Insight%20Bowl&amp;search=tag">Insight Bowl</a></li>
    <li><a href="/results?search_query=Game%20Delay&amp;search=tag">Game Delay</a></li>
    <li><a href="/results?search_query=High-definition%20Video&amp;search=tag">High-definition Video</a></li>
    <li><a href="/results?search_query=skycam&amp;search=tag">skycam</a></li>
  </ul>


      <h4>License:</h4>
        <p id="eow-reuse">
Standard YouTube License
  </p>


  </div>

    </div>
    <div id="watch-description-fadeout"></div>

      <ul id="watch-description-extra-info">

      <li>
        <div class="watch-sparkbars">
          <div class="watch-sparkbar-likes" style="width: 95.7230142566%"></div>
          <div class="watch-sparkbar-dislikes" style="width: 4.27698574338%"></div>
        </div>
        <span class="watch-likes-dislikes">
<span class="likes">470</span> likes, <span class="dislikes">21</span> dislikes
        </span>
      </li>























  </ul>


            <div class="horizontal-rule ">
    <span class="first"></span>
    <span class="second"></span>
    <span class="third"></span>
  </div>

  <div id="watch-description-toggle" class="yt-uix-expander-head">
    <div id="watch-description-expand" class="expand">
        <button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick=";return false;"  role="button"><span class="yt-uix-button-content">Show more <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show more">
 </span></button>
    </div>
    <div id="watch-description-collapse" class="collapse">
        <button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick=";return false;"  role="button"><span class="yt-uix-button-content">Show less <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show less">
 </span></button>
    </div>
  </div>



  </div> 

  </div>
            <span class="vertical-rule-main"></span>
  <span class="vertical-rule-corner-top"></span>
  <span class="vertical-rule-corner-bottom"></span>

      </div>
      <div class="clear"></div>
    </div>
    <div style="visibility: hidden; height: 0px; padding: 0px; overflow: hidden;">
      


  <div id="baseDiv"></div>

    </div>
  </div>
  <!-- end watch-main-container -->
</div>

    </div>
    <!-- end content -->
  </div>
  <div id="footer-container">
    <!-- begin footer -->
      
  <div id="footer">
      <div class="horizontal-rule ">
    <span class="first"></span>
    <span class="second"></span>
    <span class="third"></span>
  </div>

    <div id="footer-logo">
      <a href="/" title="YouTube home">
        <img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
      </a>
      
      <span id="footer-divider"></span>
    </div>
    <div id="footer-main">
      <ul id="footer-links-primary">
          <li><a href="https://www.google.com/support/youtube/bin/static.py?p=watch&amp;page=start.cs&amp;hl=en_US" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Help');">Help</a></li>
        <li><a href="/t/about_youtube" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'About');">About</a></li>
        <li><a href="/t/press" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Press');">Press &amp; Blogs</a></li>
        <li><a href="/t/copyright_center" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Copyright');">Copyright</a></li>
        <li><a href="/creators" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Creators');">Creators &amp; Partners</a></li>
        <li><a href="/t/advertising_overview" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Advertising');">Advertising</a></li>
        <li><a href="/dev">Developers</a></li>
      </ul>

      <ul id="footer-links-secondary">
        <li><a href="/t/terms" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Terms');">Terms</a></li>
        <li><a href="/t/privacy_at_youtube" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Privacy');">Privacy</a></li>
        <li><a href="//www.google.com/support/youtube/bin/request.py?contact_type=abuse&amp;hl=en_US" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Safety');">Safety</a></li>
        <li><a href="//www.google.com/tools/feedback/intl/en/error.html" onclick="return yt.www.feedback.start(yt.getConfig('FEEDBACK_LOCALE_LANGUAGE'), yt.getConfig('FEEDBACK_LOCALE_EXTRAS'));" id="reportbug">Report a bug</a></li>
        <li><a href="/testtube">Try something new!</a></li>
      </ul>
          <ul class="pickers yt-uix-button-group" data-button-toggle-group="true">
      <li>    <button type="button" class=" yt-uix-button yt-uix-button-text yt-uix-button-toggle" onclick="yt.www.masthead.loadPicker(&#39;language-picker&#39;, &quot;&quot;); return false;;return false;" data-button-menu-id="arrow" role="button"><span class="yt-uix-button-content">English </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</li>
      <li>    <button type="button" class=" yt-uix-button yt-uix-button-text yt-uix-button-toggle" onclick="yt.www.masthead.loadPicker(&#39;region-picker&#39;, &quot;&quot;); return false;;return false;" data-button-menu-id="arrow" role="button"><span class="yt-uix-button-content">Worldwide </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</li>
      <li>    <button type="button" class=" yt-uix-button yt-uix-button-text yt-uix-button-toggle" onclick="yt.www.masthead.loadPicker(&#39;safetymode-picker&#39;, &quot;&quot;);return false;" data-button-menu-id="arrow" role="button"><span class="yt-uix-button-content">Safety:
  <span class="yt-footer-safety-value">
Off
  </span>
 </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</li>
  </ul>
    <div id="picker-container"></div>
  <div id="picker-loading" style="display: none">Loading...</div>


    </div>
  </div>

    <!-- end footer -->
  </div>
    



  <div id="playlist-bar" class="hid passive editable" data-video-url="/watch?v=&amp;feature=BFql&amp;playnext=1&amp;list=QL" data-list-id="" data-list-type="QL">
    <div id="playlist-bar-bar-container">
      <div id="playlist-bar-bar">
        <div  id="playlist-bar-notifications" style="display: none;" class="yt-alert yt-alert-success yt-alert-small yt-alert-naked yt-rounded "><span class="yt-alert-icon"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon"></span><div  class="yt-alert-content"></div></div>
<span id="playlist-bar-info"><span class="playlist-bar-active playlist-bar-group"><button onclick=";return false;" title="Previous video" type="button" id="playlist-bar-prev-button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-tooltip yt-uix-button-empty"  role="button"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"></button><span class="playlist-bar-count">0 / <span class="item-count">0</span></span><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-empty" onclick=";return false;" id="playlist-bar-next-button"  role="button"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span class="playlist-bar-active playlist-bar-group"><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-toggle yt-uix-button-empty" onclick=";return false;" id="playlist-bar-autoplay-button"  role="button"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-toggle yt-uix-button-empty" onclick=";return false;" id="playlist-bar-shuffle-button"  role="button"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span class="playlist-bar-passive playlist-bar-group"><button onclick=";return false;" title="Play videos" type="button" id="playlist-bar-play-button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-tooltip yt-uix-button-empty"  role="button"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-play" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Play videos"></button><span class="playlist-bar-count"><span class="item-count">0</span></span></span><span id="playlist-bar-title" class="yt-uix-button-group"><span class="playlist-title">Unsaved Playlist</span></span></span>
        <a id="playlist-bar-lists-back" href="#">
Return to active list
        </a>

<span id="playlist-bar-controls"><span class="playlist-bar-group"><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-text yt-uix-button-empty" onclick=";return false;" id="playlist-bar-toggle-button"  role="button"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span class="playlist-bar-group"><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-reverse flip yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="playlist-bar-options-menu" data-button-has-sibling-menu="true" role="button"><span class="yt-uix-button-content">Options </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span></span>      </div>
    </div>

<div id="playlist-bar-tray-container"><div id="playlist-bar-tray" class="yt-uix-slider yt-uix-slider-fluid"><button class="yt-uix-button playlist-bar-tray-button yt-uix-slider-prev" onclick="return false;"><img class="yt-uix-slider-prev-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous"></button><button class="yt-uix-button playlist-bar-tray-button yt-uix-slider-next" onclick="return false;"><img class="yt-uix-slider-next-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Next"></button><div class="yt-uix-slider-body"><div id="playlist-bar-tray-content" class="yt-uix-slider-slide"><ol class="video-list"></ol><ol id="playlist-bar-help"><li class="empty playlist-bar-help-message">Your queue is empty. Add videos to your queue using this button: <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="addto-button-help"><br> or <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253D${id}%2526feature%253Dg-logo%2526context%253DG2b2f2eeFOAAAAAAAAAA&amp;hl=en_US&amp;ltmpl=sso">sign in</a> to load a different list.</li></ol></div><div class="yt-uix-slider-shade-left"></div><div class="yt-uix-slider-shade-right"></div></div></div><div id="playlist-bar-save"></div><div id="playlist-bar-lists" class="dark-lolz"></div><div id="playlist-bar-loading"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Loading..."><span id="playlist-bar-loading-message">Loading...</span><span id="playlist-bar-saving-message" class="hid">Saving...</span></div><div id="playlist-bar-template" style="display: none;" data-video-thumb-url="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg"><!--<li class="playlist-bar-item yt-uix-slider-slide-unit __classes__" data-video-id="__video_encrypted_id__"><a href="__video_url__" title="__video_title__"><span class="video-thumb ux-thumb ux-thumb-96 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="__video_title__" data-thumb-manual="true" data-thumb="__video_thumb_url__" ></span></span><span class="screen"></span><span class="count"><strong>__list_position__</strong></span><span class="play"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span><span class="yt-uix-button delete"><img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Delete"></span><span class="now-playing">Now playing</span><span dir="ltr" class="title"><span>__video_title__  <span class="uploader">by __video_username__</span>
</span></span><span class="dragger"></span></a></li>--></div><div id="playlist-bar-next-up-template" style="display: none;"><!--<div class="playlist-bar-next-thumb"><span class="video-thumb ux-thumb ux-thumb-64 "><span class="clip"><img src="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg" alt="Thumbnail
" ></span></span></div>--></div></div>      <div id="playlist-bar-options-menu" class="hid">

    <div id="playlist-bar-extras-menu">
        <ul>
      <li><span class="yt-uix-button-menu-item" data-action="clear">
Clear all videos from this list
      </span></li>
  </ul>

    </div>

    <ul>
      <li><span class="yt-uix-button-menu-item" onclick="window.location.href=&#39;https://www.google.com/support/youtube/bin/answer.py?answer=146749&#39;">Learn more</span></li>
    </ul>
  </div>

  </div>


    <div id="shared-addto-menu" style="display: none;" class="hid sign-in">
      <div class="addto-menu">
        <div id="addto-list-panel" class="menu-panel active-panel">
        <span class="yt-uix-button-menu-item yt-uix-tooltip sign-in" data-possible-tooltip="" data-tooltip-show-delay="750"><a class="sign-in-link">Sign in</a> to add this to a playlist
</span>

  </div>
  <div id="addto-list-error-panel" class="menu-panel">
    <div class="panel-content">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
      <span class="error-details"></span>
        <a class="show-menu-link">Back to list</a>
    </div>
  </div>

        <div id="addto-note-input-panel" class="menu-panel">
    <div class="panel-content">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
        <span class="message">Added to playlist:</span>
      <span class="addto-note-title yt-uix-tooltip" title="More information about this playlist" data-tooltip-show-delay="750"></span>
    </div>
<div class="yt-uix-char-counter" data-char-limit="150"><div class="addto-note-box addto-text-box"><textarea id="addto-note" class="addto-note yt-uix-char-counter-input" maxlength="150"></textarea><label for="addto-note" class="addto-note-label">Add an optional note</label></div><span class="yt-uix-char-counter-remaining">150</span></div>    <button disabled="disabled" type="button" class="playlist-save-note yt-uix-button" onclick=";return false;"  role="button"><span class="yt-uix-button-content">Add note </span></button>
  </div>
  <div id="addto-note-saving-panel" class="menu-panel">
    <div class="panel-content loading-content">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
        <span>Saving note...</span>
    </div>
  </div>
  <div id="addto-note-saved-panel" class="menu-panel">
    <div class="panel-content">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
        <span class="message">Note added to:</span>
    </div>
  </div>
  <div id="addto-note-error-panel" class="menu-panel">
    <div class="panel-content">
      <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
        <span class="message">Error adding note:</span>
      <ul class="error-details"></ul>
        <a class="add-note-link">Click to add a new note</a>
    </div>
  </div>
  <div class="close-note hid">
    <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button">
  </div>

  </div>

  </div>




  </div>
  <!-- end page -->
    
    
    <script id="www-core-js" src="//s.ytimg.com/yt/jsbin/www-core-vflhGADTg.js"></script>



  <script>
        yt.setConfig({
      'XSRF_TOKEN': '-Rm04dXYFtiIhWmyHDx5PehdApN8MTMyNTQ2NDUxMEAxMzI1Mzc4MTEw',
      'XSRF_FIELD_NAME': 'session_token'
    });
    yt.pubsub.subscribe('init', yt.www.xsrf.populateSessionToken);

    yt.setConfig('XSRF_REDIRECT_TOKEN', 's4Pr3c6PWrmWtBW491IuhdBSB6R8MTMyNTQ2NDUxMEAxMzI1Mzc4MTEw');

    yt.setConfig('LOGGED_IN', false);
    yt.setConfig('SESSION_INDEX', null);

    yt.setConfig('FEEDBACK_LOCALE_LANGUAGE', "en");
    yt.setConfig('FEEDBACK_LOCALE_EXTRAS', {"experiments": "906011", "accept_language": null});
  </script>

        <script>
    yt.net.ajax.setToken('subscription_ajax', "");
    yt.pubsub.subscribe('init', yt.www.subscriptions.SubscriptionButton.init);
  </script>


  <script>
    yt.setConfig({
      'VIDEO_ID': "${id}",
      'VIDEO_USERNAME': "${user}"    });
    yt.net.ajax.setToken('watch_actions_ajax', "");

    if (window['gYouTubePlayerReady']) {
      onYouTubePlayerReady();
      yt.registerGlobal('gYouTubePlayerReady');
    }
  </script>

        <script>
      yt.setMsg('FLASH_UPGRADE', '\u003cdiv  class=\"yt-alert yt-alert-error yt-alert-player yt-rounded \"\u003e\u003cspan class=\"yt-alert-icon\"\u003e\u003cimg s\u0072c=\"\/\/s.ytimg.com\/yt\/img\/pixel-vfl3z5WfW.gif\" class=\"icon master-sprite\" alt=\"Alert icon\"\u003e\u003c\/span\u003e\u003cdiv  class=\"yt-alert-content\"\u003e        You need to upgrade your Adobe Flash Player to watch this video. \u003cbr\u003e \u003ca href=\"https:\/\/get.adobe.com\/flashplayer\/\"\u003eDownload it from Adobe.\u003c\/a\u003e\n\u003c\/div\u003e\u003c\/div\u003e');
  yt.setConfig({
    'PLAYER_CONFIG': {"assets": {"html": "\/html5_player_template", "css": "https:\/\/s.ytimg.com\/yt\/cssbin\/www-player-vflNqr0jJ.css"}, "min_version": "8.0.0", "args": {"ttsurl": "https:\/\/www.youtube.com\/api\/timedtext?sparams=asr_langs%2Ccaps%2Cexpire%2Cv\u0026asr_langs=en%2Cko%2Cja\u0026caps=asr\u0026expire=1325401200\u0026key=yttt1\u0026signature=AC56A7D8C2632773FADE7DF3AF47E34C918C06D4.55D91FAA600B964FBF6E475FC5BC057F765B9EC2\u0026hl=en", "fexp": "906011", "enablecsi": "1", "allow_embed": 1, "vq": "auto", "account_playback_token": "", "autohide": "2", "csi_page_type": "watch5", "keywords": "sprintpipe", "cr": "US", "cc3_module": "https:\/\/s.ytimg.com\/yt\/swfbin\/subtitles3_module-vflNKUm_s.swf", "fmt_list": "45\/1280x720\/99\/0\/0,22\/1280x720\/9\/0\/115,44\/854x480\/99\/0\/0,35\/854x480\/9\/0\/115,43\/640x360\/99\/0\/0,34\/640x360\/9\/0\/115,18\/640x360\/9\/0\/115,5\/320x240\/7\/0\/0", "watermark": ",https:\/\/s.ytimg.com\/yt\/img\/watermark\/youtube_watermark-vflHX6b6E.png,https:\/\/s.ytimg.com\/yt\/img\/watermark\/youtube_hd_watermark-vflAzLcD6.png", "length_seconds": 119, "feature": "g-logo", "enablejsapi": 1, "theme": "tlb", "plid": "AAS1bKNyzQhbZeQD", "cc_font": "Arial Unicode MS, arial, verdana, _sans", "sdetail": "f:g-logo,p:\/", "url_encoded_fmt_stream_map": "url=http%3A%2F%2Fo-o.preferred.sjc07s15.v14.lscache1.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D45%26ip%3D207.0.0.0%26signature%3D9F30674C9798E0B65BA1CE970B3CF264DC835A2A.C9D5CF2F6FC138C5F617AB2179DF11C8D51B8DAC%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=hd720\u0026fallback_host=tc.v14.cache1.c.youtube.com\u0026type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22\u0026itag=45,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v21.lscache2.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D22%26ip%3D207.0.0.0%26signature%3D3831F9BE67C971DFA2F8D5838FC5C7B4AC96CFB4.11B232C7DEE3012C71C806BBF29EACE7B98CB00E%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=hd720\u0026fallback_host=tc.v21.cache2.c.youtube.com\u0026type=video%2Fmp4%3B+codecs%3D%22avc1.64001F%2C+mp4a.40.2%22\u0026itag=22,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v2.lscache7.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D44%26ip%3D207.0.0.0%26signature%3D6B0F7BDF9D056CB21D43878B97D0FDC731816040.0B56FF33A94E4B2AF8735A12B00C30937A4B7DB1%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=large\u0026fallback_host=tc.v2.cache7.c.youtube.com\u0026type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22\u0026itag=44,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v10.lscache8.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Calgorithm%252Cburst%252Cfactor%252Ccp%26fexp%3D906011%26algorithm%3Dthrottle-factor%26itag%3D35%26ip%3D207.0.0.0%26burst%3D40%26sver%3D3%26signature%3DA12735572F60472D1D140FFBA3062BDD8C4EB69C.8818879B995EE22045B19ABBF0BFB7F10A89B3A6%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26factor%3D1.25%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=large\u0026fallback_host=tc.v10.cache8.c.youtube.com\u0026type=video%2Fx-flv\u0026itag=35,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v8.lscache7.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D43%26ip%3D207.0.0.0%26signature%3D627E77C6A75F8CF2CC9A4D6E9138DD563C6702AE.5294307AEA23B816C24B4D88CE8097E85A22D9FF%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=medium\u0026fallback_host=tc.v8.cache7.c.youtube.com\u0026type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22\u0026itag=43,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v20.lscache5.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Calgorithm%252Cburst%252Cfactor%252Ccp%26fexp%3D906011%26algorithm%3Dthrottle-factor%26itag%3D34%26ip%3D207.0.0.0%26burst%3D40%26sver%3D3%26signature%3D5EB1858C8C186A287DE6B86298D79D7879B83D93.37D5E264A8EC5E9F6C0BE54669E5679B77278EE6%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26factor%3D1.25%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=medium\u0026fallback_host=tc.v20.cache5.c.youtube.com\u0026type=video%2Fx-flv\u0026itag=34,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v8.lscache6.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D18%26ip%3D207.0.0.0%26signature%3D5072A1FE599584593F0569496A4A3AAC5403DA35.33878823ED8CD855857D871377D55E33AF383C75%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=medium\u0026fallback_host=tc.v8.cache6.c.youtube.com\u0026type=video%2Fmp4%3B+codecs%3D%22avc1.42001E%2C+mp4a.40.2%22\u0026itag=18,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v1.lscache3.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Calgorithm%252Cburst%252Cfactor%252Ccp%26fexp%3D906011%26algorithm%3Dthrottle-factor%26itag%3D5%26ip%3D207.0.0.0%26burst%3D40%26sver%3D3%26signature%3D973B9ACC51F1857A0DE009CD1A9AFFA404CF15E3.96DE7140855BA5C354F79798628F870D633C3E42%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26factor%3D1.25%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=small\u0026fallback_host=tc.v1.cache3.c.youtube.com\u0026type=video%2Fx-flv\u0026itag=5", "xmas_module": "https:\/\/s.ytimg.com\/yt\/swfbin\/xmas-vfl9L1BvN.swf", "sourceid": "y", "timestamp": 1325378110, "cc_asr": 1, "showpopout": 1, "hl": "en_US", "tmi": "1", "no_get_video_log": "1", "cc_module": "https:\/\/s.ytimg.com\/yt\/swfbin\/subtitle_module-vfl4373X1.swf", "endscreen_module": "https:\/\/s.ytimg.com\/yt\/swfbin\/endscreen-vfl6o3XZn.swf", "supersizefeatured": "1", "referrer": "https:\/\/www.youtube.com\/", "video_id": "${id}", "sendtmp": "1", "sk": "KlPQD_SfbE-M50ujJJ_R1vOG8UcYPEaKC", "t": "vjVQa1PpcFMqX7yhNNzmUXvgZE5Apdt9hmI1--SQS3I="}, "url_v9as2": "https:\/\/s.ytimg.com\/yt\/swfbin\/cps-vflRmaEsw.swf", "params": {"allowscriptaccess": "always", "allowfullscreen": "true", "bgcolor": "#000000"}, "attrs": {"width": "640", "id": "movie_player", "height": "390"}, "url_v8": "https:\/\/s.ytimg.com\/yt\/swfbin\/cps-vflRmaEsw.swf", "html5": false}
  });

      (function() {
        var config = yt.getConfig('PLAYER_CONFIG');
        var forceUpdate = yt.www.watch.player.updateConfig(config) ||
            false;
        yt.flash.update(config, forceUpdate);
      })();
  </script>


    
    <script id="www-livecomments" src="//s.ytimg.com/yt/jsbin/www-livecomments-vflhaEMf4.js"></script>




  <script>
    yt.setConfig({
      'BLOCK_USER_XSRF': "",
      'SUBSCRIBE_AXC': "",

      'IS_OWNER_VIEWING': null,
      'IS_WIDESCREEN': true,
      'IS_HD_AVAILABLE': true,
      'PREFER_LOW_QUALITY': false,
      'WIDE_PLAYER_STYLES': ["watch-wide-mode"],
      'COMMENT_SHARE_URL': "https:\/\/www.youtube.com\/comment?lc=_COMMENT_ID_",
      'ALLOW_EMBED': true,
      'ALLOW_RATINGS': true,
      'AJAX_MODE': false,

      'LIST_AUTO_PLAY_ON': false,
      'LIST_AUTO_PLAY_VALUE': 1,
      'SHUFFLE_VALUE': 0,
      'SHUFFLE_ENABLED': false,
      'YPC_CAN_RATE_VIDEO': true,
      'YPC_SHOW_VPPA_CONFIRM_RATING': false,

        'MORE_RELATED_SERVLET': '/watch_ajax',

        'TTS_URL': "https:\/\/www.youtube.com\/api\/timedtext?sparams=asr_langs%2Ccaps%2Cexpire%2Cv\u0026asr_langs=en%2Cko%2Cja\u0026caps=asr\u0026expire=1325401200\u0026key=yttt1\u0026signature=AC56A7D8C2632773FADE7DF3AF47E34C918C06D4.55D91FAA600B964FBF6E475FC5BC057F765B9EC2\u0026hl=en",

        'SHOW_SUBSCRIBE_UPSELL': true,



        'USE_CHIPS_UI': false,




      'CONVERSION_URLS_DICT': {},
      'PLAYBACK_ID': "AAS1bKNyzQhbZeQD",
      'PLAY_ALL_MAX': 480    });

    yt.setMsg({
        'SUBSCRIBE_UPSELL_MESSAGE': "If you like ${user}'s videos, subscribe!\n",
      'LOADING': "Loading...",
      'WATCH_ERROR_MESSAGE': "This feature is not available right now. Please try again later."    });



    
  yt.setMsg({
    'UNBLOCK_USER': "Are you sure you want to unblock this user?",
    'BLOCK_USER': "Are you sure you want to block this user?"
  });
  yt.setConfig('BLOCK_USER_XSRF', '');
  yt.setConfig('BLOCK_USER_AJAX_XSRF', '');


      yt.setConfig({
    'COMMENT_SHARE_URL': "https:\/\/www.youtube.com\/comment?lc=_COMMENT_ID_",
    'COMMENTS_SIGNIN_URL': "https:\/\/accounts.google.com\/ServiceLogin?uilel=3\u0026service=youtube\u0026passive=true\u0026continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253D${id}%2526feature%253Dg-logo%2526context%253DG2b2f2eeFOAAAAAAAAAA\u0026hl=en_US\u0026ltmpl=sso",
    'COMMENTS_THRESHHOLD': -5,
    'COMMENTS_FILTER': 0,
    'COMMENTS_PAGE_SIZE': 10,
    'COMMENTS_COUNT': 478,
    'COMMENTS_YPC_CAN_POST_OR_REACT_TO_COMMENT': true,
    'COMMENT_VOTE_XSRF' : '',
    'COMMENT_ACTIONS_XSRF' : '',
    'COMMENT_SOURCE': "w",
    'ENABLE_LIVE_COMMENTS': true  });

  yt.net.ajax.setToken('reactions_ajax', "");
  yt.net.ajax.setToken('link_servlet', "");
  yt.net.ajax.setToken('comment_servlet', "");
  yt.net.ajax.setToken('comment_voting', "");

  yt.setMsg({
    'COMMENT_OK': "OK",
    'COMMENT_BLOCKED': "You have been blocked by the owner of this video.",
    'COMMENT_CAPTCHAFAIL': "The response to the letters on the image was not correct, please try again.",
    'COMMENT_PENDING': "Comment Pending Approval!",
    'COMMENT_ERROR_EMAIL': "Error, account unverified (see email)",
    'COMMENT_ERROR': "Error, try again",
    'REACTION_NONE_SELECTED': "Your reaction?"
  });

    yt.pubsub.subscribe('init', yt.www.comments.init);

      yt.setConfig('COMMENTS_POPUP_URL', "\/comments_popup?v=${id}");

  yt.setMsg({
    'LC_COUNT_NEW_COMMENTS': '$count more comments since you started viewing. <a href=\"#\" onclick=\"yt.www.watch.livecomments.showNewComments(); return false;\">Show them.<\/a>'
  });

  yt.pubsub.subscribe('init', function() {
    var enableScrolling = !!yt.UserPrefs.getFlag3(yt.UserPrefs.Flags.FLAG3_LIVE_COMMENTS_SCROLL);
    yt.www.watch.livecomments.init('${id}', '1325378057', 15000, enableScrolling, 'live_comments', 'live-comments-setting-scroll', 'live-comments-setting-no-scroll', 'live-comments-count', 10);
  });

  yt.www.comments.watch5.subscribeToPageChange(function(element, enableElement, page) {
    yt.www.watch.livecomments.setCommentsElements(element, enableElement);
    if (page == 1) {
      yt.www.watch.livecomments.setScroll(true);
    }
  });




    yt.pubsub.subscribe('init', yt.www.watch.activity.init);
    yt.pubsub.subscribe('init', yt.www.watch.player.init);
    yt.pubsub.subscribe('init', yt.www.watch.actions.init);


    yt.pubsub.subscribe('init', function() {
      var description = _gel('watch-description');
      if (!_hasclass(description, 'yt-uix-expander-collapsed')) {
        yt.www.watch.watch5.handleToggleDescription(description);
      }
    });



      yt.pubsub.subscribe('init', function() {
        yt.www.watch.watch5.showFlashUpgradePromo('flash10-promo-div', [9,0,115]);
      });

  </script>

  
  <script>
  yt.pubsub.subscribe('init', function() {
    yt.setConfig('PYV_GOOGLE_AD_SV_LABEL', "Promoted Video");
      yt.setMsg({
    'RENTAL': "Rental",
    'VIEWS': "views"
  });

      var iframeContents = "\n  \u003cscript\u003e\n    var google_max_num_ads = '1';\n    var google_ad_output = 'js';\n    var google_ad_type = 'text';\n    var google_only_pyv_ads = true;\n    var google_video_doc_id = 'yt_${id}';\n    var google_ad_request_done = parent.yt.www.ads.pyv.pyvWatchAfcCallback;\n    var google_ad_client = 'ca-pub-6219811747049371';\n    var google_ad_block = '3';\n      var google_page_url = 'https:\/\/www.youtube.com\/video\/${id}';\n      var google_ad_channel = 'PyvWatchInRelated+PyvYTWatch+PyvWatchNoAdX+lpw+afv_ugc+yt_mpvid_AAS1bKN0-Gw3CEyS+ytexp_906011+Vertical_Banner_20+Vertical_Banner_258+Vertical_Banner_1001+Vertical_Banner_1073+VidVert20+VidVert258+VidVert1001+VidVert1073+Vertical_20+Vertical_258+Vertical_1001+Vertical_1073';\n      var google_language = \"en\";\n  \u003c\/script\u003e\n\n  \u003cscript s\u0072c=\"https:\/\/pagead2.googlesyndication.com\/pagead\/show_ads.js\"\u003e\u003c\/script\u003e\n";
      yt.www.ads.pyv.loadPyvIframe(iframeContents);
  });
  </script>







  

  

        <script>
      yt.setConfig('TIMING_ACTION', 'watch5');
    </script>



  <script>
    


  yt.setMsg({
    'LIST_CLEARED': "List cleared",
    'PLAYLIST_VIDEO_DELETED': "Video deleted.",
    'ERROR_OCCURRED': "Sorry, an error occurred.",
    'NEXT_VIDEO_TOOLTIP': "Next video:\u003cbr\u003e \u0026#8220;${next_video_title}\u0026#8221;",
    'NEXT_VIDEO_NOTHUMB_TOOLTIP': "Next video",
    'SHOW_PLAYLIST_TOOLTIP': "Show playlist",
    'HIDE_PLAYLIST_TOOLTIP': "Hide playlist",
    'AUTOPLAY_ON_TOOLTIP': "Turn autoplay off",
    'AUTOPLAY_OFF_TOOLTIP': "Turn autoplay on",
    'SHUFFLE_ON_TOOLTIP': "Turn shuffle off",
    'SHUFFLE_OFF_TOOLTIP': "Turn shuffle on",
    'PLAYLIST_BAR_PLAYLIST_SAVED': "Playlist saved!",
    'PLAYLIST_BAR_ADDED_TO_FAVORITES': "Added to favorites",
    'PLAYLIST_BAR_ADDED_TO_PLAYLIST': "Added to playlist",
    'PLAYLIST_BAR_ADDED_TO_QUEUE': "Added to queue",
    'AUTOPLAY_WARNING1': "Next video starts in 1 second...",
    'AUTOPLAY_WARNING2': "Next video starts in 2 seconds...",
    'AUTOPLAY_WARNING3': "Next video starts in 3 seconds...",
    'AUTOPLAY_WARNING4': "Next video starts in 4 seconds...",
    'AUTOPLAY_WARNING5': "Next video starts in 5 seconds...",
    'UNDO_LINK': "Undo"  });


  yt.setConfig({
    'DRAGDROP_BINARY_URL': "\/\/s.ytimg.com\/yt\/jsbin\/www-dragdrop-vflq8ZM-B.js",
    'PLAYLIST_BAR_PLAYING_INDEX': -1,
    'LIST_COPY_ON_EDIT_ENABLED': false  });

    yt.net.ajax.setToken('addto_ajax_logged_out', "mzNV-_5K9-BBZSKowlva13uGwZx8MEAxMzI1Mzc4MTEw");

    yt.www.lists.init();





        yt.pubsub.subscribe('init', function() {
      yt.www.thumbnaildelayload.init();
    });






      yt.pubsub.subscribe('init', function() {
        yt.net.scriptloader.load("\/\/s.ytimg.com\/yt\/jsbin\/www-searchbox-vfl9OT488.js", function() {
          
      if (_gel('masthead-search')) {
          yt.setTimeout(function() {
            searchbox.yt.install(_gel('masthead-search'),
                _gel('masthead-search')["search_query"],
                "en",
                "us",
                "close",
                false,
                '',
                '',
                -1,
                null);
          }, 100);
      }

        });
      });



  </script>

  


  
</body>
</html>
  `;

try {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  });
} catch (e) {
  return new Response(e?.stack || e?.message || String(e), {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8"
    }
  });
}
  } catch (error) {
      return new Response(error?.stack || error?.message || String(error), {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8"
    }
  });
  }
}
