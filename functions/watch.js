export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("v");

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
    if (id === "debugger") {
    title = "DEBUGGER";
    desc = "DEBUGGER";
    user = "DEBUGGER";
    }
    if (error === "This helps protect our community. Learn more") {return new Response("invidious error:  Current Instance is blocked by YouTube.", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8"
    }
  })} else {
    return new Response("invidious error: " + data.error, {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8"
    }
  });}
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

    
  <link rel="search" type="application/opensearchdescription+xml" href="http://www.youtube.com/opensearch?locale=en_US" title="YouTube Video Search">

    <link rel="icon" href="http://s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico" type="image/x-icon">
    <link rel="shortcut icon" href="http://s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico" type="image/x-icon"> 
      <meta property="og:type" content="video">
      <meta property="og:image" content="http://i4.ytimg.com/vi/${id}/hqdefault.jpg">
        <meta property="og:video" content="http://www.youtube.com/v/${id}?version=3&amp;autohide=1">
      <meta property="og:video:type" content="application/x-shockwave-flash">
      <meta property="og:video:width" content="398">
      <meta property="og:video:height" content="224">
      <meta property="og:site_name" content="YouTube">



  

      <link id="www-core-css" rel="stylesheet" href="http://s.ytimg.com/yt/cssbin/www-refresh-datauri-vflJkAFPr.css">
      <script>
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
<div id="masthead-nav"><a href="/videos?feature=mh" >Browse</a><span class="masthead-link-separator">|</span><a href="/movies?feature=mh" >Movies</a>              <span class="masthead-link-separator">|</span><a href="http://upload.youtube.com/my_videos_upload" >Upload</a></div>        



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
      <div id="watch-container" itemscope itemtype="http://schema.org/VideoObject">
      <link itemprop="url" href="http://www.youtube.com/watch?v=${id}">
    <meta itemprop="name" content="OU vs Iowa 2011 Skycam Fall (HD)">
    <meta itemprop="description" content="The skycam falls during the final minutes of the OU Iowa game. The camera nearly hits several players before it is slowly dragged off the field. The game had...">
    <link itemprop="thumbnailUrl" href="http://i4.ytimg.com/vi/${id}/hqdefault.jpg">
    <meta itemprop="playerType" content="Flash">
      <link itemprop="embedURL" href="http://www.youtube.com/v/${id}?version=3&amp;autohide=1">
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
        <span class="yt-uix-button-group"><button href="/user/Aleriick?feature=watch" type="button" class="start yt-uix-button" onclick=";window.location.href=this.getAttribute(&#39;href&#39;);return false;"  role="button"><span class="yt-uix-button-content">Aleriick </span></button><div class="yt-subscription-button-hovercard yt-uix-hovercard"><button href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253D${id}%2526feature%253Dg-logo%2526context%253DG2b2f2eeFOAAAAAAAAAA&amp;hl=en_US&amp;ltmpl=sso" type="button" class="yt-subscription-button yt-subscription-button-js-default end  yt-uix-button" onclick=";window.location.href=this.getAttribute(&#39;href&#39;);return false;" data-enable-hovercard="true" data-subscription-value="1DB4EhDXCEMmy4aVuNW7OA" data-force-position="true" data-position="topright" data-subscription-feature="watch" data-subscription-type="" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content">  <span class="subscribe-label">Subscribe</span>
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
            <embed type="application/x-shockwave-flash"     src="http://s.ytimg.com/yt/swfbin/watch_as3-vflMmYdk4.swf"     width="640" id="movie_player" height="390"    flashvars="ttsurl=http%3A%2F%2Fwww.youtube.com%2Fapi%2Ftimedtext%3Fsparams%3Dasr_langs%252Ccaps%252Cexpire%252Cv%26asr_langs%3Den%252Cko%252Cja%26caps%3Dasr%26expire%3D1325401200%26key%3Dyttt1%26signature%3DAC56A7D8C2632773FADE7DF3AF47E34C918C06D4.55D91FAA600B964FBF6E475FC5BC057F765B9EC2%26hl%3Den&amp;fexp=906011&amp;enablecsi=1&amp;allow_embed=1&amp;rvs=view_count%3D334%26author%3Dbrianjuttingii%26length_seconds%3D168%26id%3D2kuZt8urdsM%26title%3DInsight%2BBowl%2BCamera%2BFail%2Cview_count%3D12%252C984%26author%3Dri000002%26length_seconds%3D83%26id%3DXegyu36CA28%26title%3DCamera%2BFalls%2Bduring%2BInsight%2BBowl%2Cview_count%3D314%26author%3DItsSimplyTeddy%26length_seconds%3D475%26id%3D4I0G4jasCno%26title%3DMy%2BStory%2BBullying%2BIts%2BConsequences%2BDont%2BBe%2BDefeated%2B2012%2Bresolutions%2B%252B%2BAdele%2BCover%2B%2523awesome2012%2Cview_count%3D0%26author%3DCameraFall011%26length_seconds%3D121%26id%3DRmlrA_lCGKY%26title%3DCamera%2BFalls%2Bduring%2BInsight%2BBowl.%2Cview_count%3D238%26author%3DCameraFallmatch%26length_seconds%3D118%26id%3D3J7o4v9glZk%26title%3DCamera%2BFalls%2BAt%2BInsight%2BBowl%2BIowa%252C%2BOklahoma%2BPlayers%2BNot%2BHarmed.%2Cview_count%3D711%26author%3Drockyfan42%26length_seconds%3D77%26id%3D3fYBXKltII0%26title%3DSkycam%2Bcrashes%2Bonto%2Bfootball%2Bfield%2Bduring%2BInsight%2BBowl%2Cview_count%3D155%26author%3DKansas1241%26length_seconds%3D24%26id%3DqWLqmz_a6xM%26title%3DSkyCam%2BFalls%2B%2540%2Bthe%2BInsight%2BBowl%2Cview_count%3D0%26author%3Dcamcorder11%26length_seconds%3D50%26id%3DOwLiVoz-yHY%26title%3D2011%2BInsight%2BBowl%2BSky%2BCam%2BCrash%2Cview_count%3D1%252C098%26author%3Dseenett%26length_seconds%3D42%26id%3DKhBJ4WdoEuc%26title%3DESPN%2BInsight%2BBowl%2BCamera%2Bfail%2Cview_count%3D1%26author%3Ddailyepicalert%26length_seconds%3D56%26id%3DkpkIOeL7VUM%26title%3DCamera%2Bfalls%2Bat%2Bcollege%2Bfootball%2Bgame%2Binsight%2Bbowl%2Bdailyepicalert%2Bdea%2Cview_count%3D5%252C419%26author%3Dawesomeguy2788%26length_seconds%3D47%26id%3DWFwIcLDME0k%26title%3DSkycam%2BFalls%2BOn%2BField%2B%2528HD%2529%2Cview_count%3D308%26author%3DSirrenegado%26length_seconds%3D99%26id%3DxU8o6_Chvhg%26title%3DMexico%2BCity%252C%2Ba%2Bmen%2Bwith%2Bfunny%2BMichael%2BJackson%2Bdance.%2BUn%2Bdivertido%2Bbailarin%2Ba%2Blos%2BMichael%2BJackson&amp;vq=auto&amp;account_playback_token=&amp;autohide=2&amp;csi_page_type=watch5&amp;keywords=Oklahoma+Sooners%2COU%2CBoomer+Sooner%2CIowa+University%2CSky%2CCam%2CCamera%2CNCAA%2CCollege%2CFootball%2CInsight+Bowl%2CGame+Delay%2CHigh-definition+Video%2Cskycam&amp;cr=US&amp;cc3_module=http%3A%2F%2Fs.ytimg.com%2Fyt%2Fswfbin%2Fsubtitles3_module-vflNKUm_s.swf&amp;fmt_list=45%2F1280x720%2F99%2F0%2F0%2C22%2F1280x720%2F9%2F0%2F115%2C44%2F854x480%2F99%2F0%2F0%2C35%2F854x480%2F9%2F0%2F115%2C43%2F640x360%2F99%2F0%2F0%2C34%2F640x360%2F9%2F0%2F115%2C18%2F640x360%2F9%2F0%2F115%2C5%2F320x240%2F7%2F0%2F0&amp;watermark=%2Chttp%3A%2F%2Fs.ytimg.com%2Fyt%2Fimg%2Fwatermark%2Fyoutube_watermark-vflHX6b6E.png%2Chttp%3A%2F%2Fs.ytimg.com%2Fyt%2Fimg%2Fwatermark%2Fyoutube_hd_watermark-vflAzLcD6.png&amp;length_seconds=119&amp;feature=g-logo&amp;enablejsapi=1&amp;theme=tlb&amp;plid=AAS1bKNyzQhbZeQD&amp;cc_font=Arial+Unicode+MS%2C+arial%2C+verdana%2C+_sans&amp;sdetail=f%3Ag-logo%2Cp%3A%2F&amp;url_encoded_fmt_stream_map=url%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v14.lscache1.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Cratebypass%25252Ccp%2526fexp%253D906011%2526itag%253D45%2526ip%253D207.0.0.0%2526signature%253D9F30674C9798E0B65BA1CE970B3CF264DC835A2A.C9D5CF2F6FC138C5F617AB2179DF11C8D51B8DAC%2526sver%253D3%2526ratebypass%253Dyes%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dhd720%26fallback_host%3Dtc.v14.cache1.c.youtube.com%26type%3Dvideo%252Fwebm%253B%2Bcodecs%253D%2522vp8.0%252C%2Bvorbis%2522%26itag%3D45%2Curl%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v21.lscache2.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Cratebypass%25252Ccp%2526fexp%253D906011%2526itag%253D22%2526ip%253D207.0.0.0%2526signature%253D3831F9BE67C971DFA2F8D5838FC5C7B4AC96CFB4.11B232C7DEE3012C71C806BBF29EACE7B98CB00E%2526sver%253D3%2526ratebypass%253Dyes%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dhd720%26fallback_host%3Dtc.v21.cache2.c.youtube.com%26type%3Dvideo%252Fmp4%253B%2Bcodecs%253D%2522avc1.64001F%252C%2Bmp4a.40.2%2522%26itag%3D22%2Curl%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v2.lscache7.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Cratebypass%25252Ccp%2526fexp%253D906011%2526itag%253D44%2526ip%253D207.0.0.0%2526signature%253D6B0F7BDF9D056CB21D43878B97D0FDC731816040.0B56FF33A94E4B2AF8735A12B00C30937A4B7DB1%2526sver%253D3%2526ratebypass%253Dyes%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dlarge%26fallback_host%3Dtc.v2.cache7.c.youtube.com%26type%3Dvideo%252Fwebm%253B%2Bcodecs%253D%2522vp8.0%252C%2Bvorbis%2522%26itag%3D44%2Curl%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v10.lscache8.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Calgorithm%25252Cburst%25252Cfactor%25252Ccp%2526fexp%253D906011%2526algorithm%253Dthrottle-factor%2526itag%253D35%2526ip%253D207.0.0.0%2526burst%253D40%2526sver%253D3%2526signature%253DA12735572F60472D1D140FFBA3062BDD8C4EB69C.8818879B995EE22045B19ABBF0BFB7F10A89B3A6%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526factor%253D1.25%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dlarge%26fallback_host%3Dtc.v10.cache8.c.youtube.com%26type%3Dvideo%252Fx-flv%26itag%3D35%2Curl%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v8.lscache7.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Cratebypass%25252Ccp%2526fexp%253D906011%2526itag%253D43%2526ip%253D207.0.0.0%2526signature%253D627E77C6A75F8CF2CC9A4D6E9138DD563C6702AE.5294307AEA23B816C24B4D88CE8097E85A22D9FF%2526sver%253D3%2526ratebypass%253Dyes%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dmedium%26fallback_host%3Dtc.v8.cache7.c.youtube.com%26type%3Dvideo%252Fwebm%253B%2Bcodecs%253D%2522vp8.0%252C%2Bvorbis%2522%26itag%3D43%2Curl%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v20.lscache5.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Calgorithm%25252Cburst%25252Cfactor%25252Ccp%2526fexp%253D906011%2526algorithm%253Dthrottle-factor%2526itag%253D34%2526ip%253D207.0.0.0%2526burst%253D40%2526sver%253D3%2526signature%253D5EB1858C8C186A287DE6B86298D79D7879B83D93.37D5E264A8EC5E9F6C0BE54669E5679B77278EE6%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526factor%253D1.25%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dmedium%26fallback_host%3Dtc.v20.cache5.c.youtube.com%26type%3Dvideo%252Fx-flv%26itag%3D34%2Curl%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v8.lscache6.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Cratebypass%25252Ccp%2526fexp%253D906011%2526itag%253D18%2526ip%253D207.0.0.0%2526signature%253D5072A1FE599584593F0569496A4A3AAC5403DA35.33878823ED8CD855857D871377D55E33AF383C75%2526sver%253D3%2526ratebypass%253Dyes%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dmedium%26fallback_host%3Dtc.v8.cache6.c.youtube.com%26type%3Dvideo%252Fmp4%253B%2Bcodecs%253D%2522avc1.42001E%252C%2Bmp4a.40.2%2522%26itag%3D18%2Curl%3Dhttp%253A%252F%252Fo-o.preferred.sjc07s15.v1.lscache3.c.youtube.com%252Fvideoplayback%253Fsparams%253Did%25252Cexpire%25252Cip%25252Cipbits%25252Citag%25252Csource%25252Calgorithm%25252Cburst%25252Cfactor%25252Ccp%2526fexp%253D906011%2526algorithm%253Dthrottle-factor%2526itag%253D5%2526ip%253D207.0.0.0%2526burst%253D40%2526sver%253D3%2526signature%253D973B9ACC51F1857A0DE009CD1A9AFFA404CF15E3.96DE7140855BA5C354F79798628F870D633C3E42%2526source%253Dyoutube%2526expire%253D1325401357%2526key%253Dyt1%2526ipbits%253D8%2526factor%253D1.25%2526cp%253DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%2526id%253D18f3c9eab83f4d30%26quality%3Dsmall%26fallback_host%3Dtc.v1.cache3.c.youtube.com%26type%3Dvideo%252Fx-flv%26itag%3D5&amp;xmas_module=http%3A%2F%2Fs.ytimg.com%2Fyt%2Fswfbin%2Fxmas-vfl9L1BvN.swf&amp;sourceid=y&amp;timestamp=1325378110&amp;cc_asr=1&amp;showpopout=1&amp;hl=en_US&amp;tmi=1&amp;no_get_video_log=1&amp;cc_module=http%3A%2F%2Fs.ytimg.com%2Fyt%2Fswfbin%2Fsubtitle_module-vfl4373X1.swf&amp;endscreen_module=http%3A%2F%2Fs.ytimg.com%2Fyt%2Fswfbin%2Fendscreen-vfl6o3XZn.swf&amp;supersizefeatured=1&amp;referrer=http%3A%2F%2Fwww.youtube.com%2F&amp;video_id=${id}&amp;sendtmp=1&amp;sk=KlPQD_SfbE-M50ujJJ_R1vOG8UcYPEaKC&amp;t=vjVQa1PpcFMqX7yhNNzmUXvgZE5Apdt9hmI1--SQS3I%3D"     allowscriptaccess="always" allowfullscreen="true" bgcolor="#000000">
  <noembed><div  class="yt-alert yt-alert-error yt-alert-player yt-rounded "><span class="yt-alert-icon"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon"></span><div  class="yt-alert-content">        You need Adobe Flash Player to watch this video. <br> <a href="http://get.adobe.com/flashplayer/">Download it from Adobe.</a>
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
            <div  id="flash10-promo-div" style="display: none;" class="yt-alert yt-alert-warn yt-rounded "><span class="yt-alert-icon"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon"></span><div  class="yt-alert-content">        Upgrade to Flash Player 10 for improved playback performance. <a href="http://www.adobe.com/go/getflashplayer/" onmousedown="urchinTracker('/Events/VideoWatch/GetFlashUpgrade');">Upgrade Now</a> or <a href="http://support.google.com/youtube/bin/answer.py?answer=95402">More Info</a>.
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
        Uploaded by     <a href="/user/Aleriick" class="yt-user-name author" rel="author"  dir="ltr">
      Aleriick
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
      <div id="watch-sidebar">
        
    <div id="watch-context-container" class="watch-sidebar-section">
      <div class="watch-sidebar-body">
        <div id="watch-context">
          <h4 class="context-head">
            <a class="context-link" href="/?feature=context">
                <img class="context-icon context-icon-guide-feed" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
              <strong class="context-title" dir="ltr">More from YouTube</strong>
            </a>
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="context-seeall-icon" alt="">
          </h4>
            <div class="horizontal-rule ">
    <span class="first"></span>
    <span class="second"></span>
    <span class="third"></span>
  </div>

          <div id="watch-context-body" class="context-body">
            <ul id="watch-context-item-list" class="video-list">
                <li class="video-list-item">
                   <li class="video-list-item "><a href="/watch?v=6Zx39v3JUUI&amp;feature=context&amp;context=G2b2f2eeFOAAAAAAAAAA" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-96 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i3.ytimg.com/vi/6Zx39v3JUUI/default.jpg" ></span></span><span class="video-time">0:36</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="6Zx39v3JUUI" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Girl with a funny talent. [original video]">Girl with a funny talent. [original video]</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      theinternetisaweird
    </span>
</span><span class="stat view-count">3,893,689 views
</span></a></li>
                </li>
                <li class="video-list-item">
                   <li class="video-list-item "><a href="/watch?v=Xegyu36CA28&amp;feature=context&amp;context=G2b2f2eeFOAAAAAAAAAA" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-96 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i1.ytimg.com/vi/Xegyu36CA28/default.jpg" ></span></span><span class="video-time">1:23</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="Xegyu36CA28" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Camera Falls during Insight Bowl">Camera Falls during Insight Bowl</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      ri000002
    </span>
</span><span class="stat view-count">314 views
</span></a></li>
                </li>
                <li class="video-list-item">
                   <li class="video-list-item "><a href="/watch?v=hlxKbbMdPKI&amp;feature=context&amp;context=G2b2f2eeFOAAAAAAAAAA" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-96 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i1.ytimg.com/vi/hlxKbbMdPKI/default.jpg" ></span></span><span class="video-time">1:37</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="hlxKbbMdPKI" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Michael Rupp vs Tomas Kopecky Dec 30, 2011">Michael Rupp vs Tomas Kopecky Dec 30, 2011</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      hockeyfightsdotcom
    </span>
</span><span class="stat view-count">310 views
</span></a></li>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>



<div class="watch-sidebar-section "><h4 class="watch-sidebar-head">Suggestions</h4>  <div class="horizontal-rule ">
    <span class="first"></span>
    <span class="second"></span>
    <span class="third"></span>
  </div>
<div id="watch-related-container" class="watch-sidebar-body"><ul id="watch-related" class="video-list">      <li class="video-list-item "><a href="/watch?v=2kuZt8urdsM&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i3.ytimg.com/vi/2kuZt8urdsM/default.jpg" ></span></span><span class="video-time">2:48</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="2kuZt8urdsM" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Insight Bowl Camera Fail">Insight Bowl Camera Fail</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      brianjuttingii
    </span>
</span><span class="stat view-count">334 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=Xegyu36CA28&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i1.ytimg.com/vi/Xegyu36CA28/default.jpg" ></span></span><span class="video-time">1:23</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="Xegyu36CA28" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Camera Falls during Insight Bowl">Camera Falls during Insight Bowl</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      ri000002
    </span>
</span><span class="stat view-count">12,984 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=4I0G4jasCno&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i1.ytimg.com/vi/4I0G4jasCno/default.jpg" ></span></span><span class="video-time">7:55</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="4I0G4jasCno" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="My Story Bullying Its Consequences Dont Be Defeated 2012 resolutions + Adele Cover #awesome2012">My Story Bullying Its Consequences Dont Be Defe...</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      ItsSimplyTeddy
    </span>
</span><span class="stat view-count">314 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=RmlrA_lCGKY&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i3.ytimg.com/vi/RmlrA_lCGKY/default.jpg" ></span></span><span class="video-time">2:01</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="RmlrA_lCGKY" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Camera Falls during Insight Bowl.">Camera Falls during Insight Bowl.</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      CameraFall011
    </span>
</span><span class="stat view-count">0 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=3J7o4v9glZk&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/3J7o4v9glZk/default.jpg" ></span></span><span class="video-time">1:58</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="3J7o4v9glZk" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Camera Falls At Insight Bowl Iowa, Oklahoma Players Not Harmed.">Camera Falls At Insight Bowl Iowa, Oklahoma Pla...</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      CameraFallmatch
    </span>
</span><span class="stat view-count">238 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=3fYBXKltII0&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/3fYBXKltII0/default.jpg" ></span></span><span class="video-time">1:17</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="3fYBXKltII0" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Skycam crashes onto football field during Insight Bowl">Skycam crashes onto football field during Insig...</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      rockyfan42
    </span>
</span><span class="stat view-count">711 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=qWLqmz_a6xM&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i2.ytimg.com/vi/qWLqmz_a6xM/default.jpg" ></span></span><span class="video-time">0:24</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="qWLqmz_a6xM" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="SkyCam Falls @ the Insight Bowl">SkyCam Falls @ the Insight Bowl</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      Kansas1241
    </span>
</span><span class="stat view-count">155 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=OwLiVoz-yHY&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/OwLiVoz-yHY/default.jpg" ></span></span><span class="video-time">0:50</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="OwLiVoz-yHY" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="2011 Insight Bowl Sky Cam Crash">2011 Insight Bowl Sky Cam Crash</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      camcorder11
    </span>
</span><span class="stat view-count">0 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=KhBJ4WdoEuc&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/KhBJ4WdoEuc/default.jpg" ></span></span><span class="video-time">0:42</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="KhBJ4WdoEuc" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="ESPN Insight Bowl Camera fail">ESPN Insight Bowl Camera fail</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      seenett
    </span>
</span><span class="stat view-count">1,098 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=kpkIOeL7VUM&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/kpkIOeL7VUM/default.jpg" ></span></span><span class="video-time">0:56</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="kpkIOeL7VUM" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Camera falls at college football game insight bowl dailyepicalert dea">Camera falls at college football game insight b...</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      dailyepicalert
    </span>
</span><span class="stat view-count">1 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=WFwIcLDME0k&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/WFwIcLDME0k/default.jpg" ></span></span><span class="video-time">0:47</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="WFwIcLDME0k" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Skycam Falls On Field (HD)">Skycam Falls On Field (HD)</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      awesomeguy2788
    </span>
</span><span class="stat view-count">5,419 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=xU8o6_Chvhg&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i1.ytimg.com/vi/xU8o6_Chvhg/default.jpg" ></span></span><span class="video-time">1:39</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="xU8o6_Chvhg" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Mexico City, a men with funny Michael Jackson dance. Un divertido bailarin a los Michael Jackson">Mexico City, a men with funny Michael Jackson d...</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      Sirrenegado
    </span>
</span><span class="stat view-count">308 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=kN4WPreSorw&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/kN4WPreSorw/default.jpg" ></span></span><span class="video-time">5:23</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="kN4WPreSorw" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Asa Akira Goes Deep (Deleted Scenes)">Asa Akira Goes Deep (Deleted Scenes)</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      KassemG
    </span>
</span><span class="stat view-count">35,621 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=e2BP0_pAMGw&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i2.ytimg.com/vi/e2BP0_pAMGw/default.jpg" ></span></span><span class="video-time">2:44</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="e2BP0_pAMGw" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Marvin McNutt narrowly escapes ESPN&#39;s skycam attack 12-30-11 HD">Marvin McNutt narrowly escapes ESPN&#39;s skycam at...</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      crappyshortfilms
    </span>
</span><span class="stat view-count">249 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=Zwo4m18UtsQ&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i3.ytimg.com/vi/Zwo4m18UtsQ/default.jpg" ></span></span><span class="video-time">0:43</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="Zwo4m18UtsQ" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Air Force vs Toledo 2011 (2 Point Attempt)">Air Force vs Toledo 2011 (2 Point Attempt)</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      Aleriick
    </span>
</span><span class="stat view-count">615 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=wfFuzPDu2L8&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i4.ytimg.com/vi/wfFuzPDu2L8/default.jpg" ></span></span><span class="video-time">0:37</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="wfFuzPDu2L8" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Vinsanity and Durant make for classic ending">Vinsanity and Durant make for classic ending</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      NBA
    </span>
</span><span class="stat view-count">317,805 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=P18UrEOa_XY&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i1.ytimg.com/vi/P18UrEOa_XY/default.jpg" ></span></span><span class="video-time">0:17</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="P18UrEOa_XY" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Sooners vs Hawkeyes sky camera fell down on football field must see 12/31/2011">Sooners vs Hawkeyes sky camera fell down on foo...</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      SuperShowtime44
    </span>
</span><span class="stat view-count">136 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=6upGp2oPl4Y&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i3.ytimg.com/vi/6upGp2oPl4Y/default.jpg" ></span></span><span class="video-time">2:48</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="6upGp2oPl4Y" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="stolen hats in mma compilation">stolen hats in mma compilation</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      ironforgesiron
    </span>
</span><span class="stat view-count">7,968 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=TCDbY_lXS5A&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i1.ytimg.com/vi/TCDbY_lXS5A/default.jpg" ></span></span><span class="video-time">3:20</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="TCDbY_lXS5A" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="Portlandia - Whose Dog is This?">Portlandia - Whose Dog is This?</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      206Dawgs
    </span>
</span><span class="stat view-count">57,746 views
</span></a></li>
      <li class="video-list-item "><a href="/watch?v=b7KVaSiCIig&amp;feature=related" class="video-list-item-link "><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Thumbnail
" data-thumb="//i3.ytimg.com/vi/b7KVaSiCIig/default.jpg" ></span></span><span class="video-time">5:20</span><button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" data-button-menu-action="yt.www.lists.addto.toggleMenu" data-button-menu-id="shared-addto-menu" data-video-ids="b7KVaSiCIig" data-feature="thumbnail" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-uix-button-content"><span class="addto-label">Add to</span> </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span><span dir="ltr" class="title" title="We Will ft. Zone (OU Anthem Music Video)">We Will ft. Zone (OU Anthem Music Video)</span><span class="stat">by     <span class="yt-user-name " dir="ltr">
      Aleriick
    </span>
</span><span class="stat view-count">4,322 views
</span></a></li>
</ul><ul id="watch-more-related" class="video-list hid"><li id="watch-more-related-loading">Loading more suggestions...</li></ul><p class="content"></p></div>     <div class="watch-sidebar-foot"><p class="content"><button type="button" id="watch-more-related-button" onclick=";return false;" class=" yt-uix-button" data-button-action="yt.www.watch.watch5.handleLoadMoreRelated" role="button"><span class="yt-uix-button-content">Load more suggestions </span></button></p></div></div> 
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
          <li><a href="http://www.google.com/support/youtube/bin/static.py?p=watch&amp;page=start.cs&amp;hl=en_US" onmousedown="yt.analytics.trackEvent('Footer', 'link', 'Help');">Help</a></li>
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
      <li><span class="yt-uix-button-menu-item" onclick="window.location.href=&#39;http://www.google.com/support/youtube/bin/answer.py?answer=146749&#39;">Learn more</span></li>
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
      'VIDEO_USERNAME': "Aleriick"    });
    yt.net.ajax.setToken('watch_actions_ajax', "");

    if (window['gYouTubePlayerReady']) {
      onYouTubePlayerReady();
      yt.registerGlobal('gYouTubePlayerReady');
    }
  </script>

        <script>
      yt.setMsg('FLASH_UPGRADE', "\u003cdiv  class=\"yt-alert yt-alert-error yt-alert-player yt-rounded \"\u003e\u003cspan class=\"yt-alert-icon\"\u003e\u003cimg s\u0072c=\"\/\/s.ytimg.com\/yt\/img\/pixel-vfl3z5WfW.gif\" class=\"icon master-sprite\" alt=\"Alert icon\"\u003e\u003c\/span\u003e\u003cdiv  class=\"yt-alert-content\"\u003e        You need to upgrade your Adobe Flash Player to watch this video. \u003cbr\u003e \u003ca href=\"http:\/\/get.adobe.com\/flashplayer\/\"\u003eDownload it from Adobe.\u003c\/a\u003e\n\u003c\/div\u003e\u003c\/div\u003e");
  yt.setConfig({
    'PLAYER_CONFIG': {"assets": {"html": "\/html5_player_template", "css": "http:\/\/s.ytimg.com\/yt\/cssbin\/www-player-vflNqr0jJ.css"}, "min_version": "8.0.0", "args": {"ttsurl": "http:\/\/www.youtube.com\/api\/timedtext?sparams=asr_langs%2Ccaps%2Cexpire%2Cv\u0026asr_langs=en%2Cko%2Cja\u0026caps=asr\u0026expire=1325401200\u0026key=yttt1\u0026signature=AC56A7D8C2632773FADE7DF3AF47E34C918C06D4.55D91FAA600B964FBF6E475FC5BC057F765B9EC2\u0026hl=en", "fexp": "906011", "enablecsi": "1", "allow_embed": 1, "rvs": "view_count=334\u0026author=brianjuttingii\u0026length_seconds=168\u0026id=2kuZt8urdsM\u0026title=Insight+Bowl+Camera+Fail,view_count=12%2C984\u0026author=ri000002\u0026length_seconds=83\u0026id=Xegyu36CA28\u0026title=Camera+Falls+during+Insight+Bowl,view_count=314\u0026author=ItsSimplyTeddy\u0026length_seconds=475\u0026id=4I0G4jasCno\u0026title=My+Story+Bullying+Its+Consequences+Dont+Be+Defeated+2012+resolutions+%2B+Adele+Cover+%23awesome2012,view_count=0\u0026author=CameraFall011\u0026length_seconds=121\u0026id=RmlrA_lCGKY\u0026title=Camera+Falls+during+Insight+Bowl.,view_count=238\u0026author=CameraFallmatch\u0026length_seconds=118\u0026id=3J7o4v9glZk\u0026title=Camera+Falls+At+Insight+Bowl+Iowa%2C+Oklahoma+Players+Not+Harmed.,view_count=711\u0026author=rockyfan42\u0026length_seconds=77\u0026id=3fYBXKltII0\u0026title=Skycam+crashes+onto+football+field+during+Insight+Bowl,view_count=155\u0026author=Kansas1241\u0026length_seconds=24\u0026id=qWLqmz_a6xM\u0026title=SkyCam+Falls+%40+the+Insight+Bowl,view_count=0\u0026author=camcorder11\u0026length_seconds=50\u0026id=OwLiVoz-yHY\u0026title=2011+Insight+Bowl+Sky+Cam+Crash,view_count=1%2C098\u0026author=seenett\u0026length_seconds=42\u0026id=KhBJ4WdoEuc\u0026title=ESPN+Insight+Bowl+Camera+fail,view_count=1\u0026author=dailyepicalert\u0026length_seconds=56\u0026id=kpkIOeL7VUM\u0026title=Camera+falls+at+college+football+game+insight+bowl+dailyepicalert+dea,view_count=5%2C419\u0026author=awesomeguy2788\u0026length_seconds=47\u0026id=WFwIcLDME0k\u0026title=Skycam+Falls+On+Field+%28HD%29,view_count=308\u0026author=Sirrenegado\u0026length_seconds=99\u0026id=xU8o6_Chvhg\u0026title=Mexico+City%2C+a+men+with+funny+Michael+Jackson+dance.+Un+divertido+bailarin+a+los+Michael+Jackson", "vq": "auto", "account_playback_token": "", "autohide": "2", "csi_page_type": "watch5", "keywords": "Oklahoma Sooners,OU,Boomer Sooner,Iowa University,Sky,Cam,Camera,NCAA,College,Football,Insight Bowl,Game Delay,High-definition Video,skycam", "cr": "US", "cc3_module": "http:\/\/s.ytimg.com\/yt\/swfbin\/subtitles3_module-vflNKUm_s.swf", "fmt_list": "45\/1280x720\/99\/0\/0,22\/1280x720\/9\/0\/115,44\/854x480\/99\/0\/0,35\/854x480\/9\/0\/115,43\/640x360\/99\/0\/0,34\/640x360\/9\/0\/115,18\/640x360\/9\/0\/115,5\/320x240\/7\/0\/0", "watermark": ",http:\/\/s.ytimg.com\/yt\/img\/watermark\/youtube_watermark-vflHX6b6E.png,http:\/\/s.ytimg.com\/yt\/img\/watermark\/youtube_hd_watermark-vflAzLcD6.png", "length_seconds": 119, "feature": "g-logo", "enablejsapi": 1, "theme": "tlb", "plid": "AAS1bKNyzQhbZeQD", "cc_font": "Arial Unicode MS, arial, verdana, _sans", "sdetail": "f:g-logo,p:\/", "url_encoded_fmt_stream_map": "url=http%3A%2F%2Fo-o.preferred.sjc07s15.v14.lscache1.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D45%26ip%3D207.0.0.0%26signature%3D9F30674C9798E0B65BA1CE970B3CF264DC835A2A.C9D5CF2F6FC138C5F617AB2179DF11C8D51B8DAC%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=hd720\u0026fallback_host=tc.v14.cache1.c.youtube.com\u0026type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22\u0026itag=45,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v21.lscache2.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D22%26ip%3D207.0.0.0%26signature%3D3831F9BE67C971DFA2F8D5838FC5C7B4AC96CFB4.11B232C7DEE3012C71C806BBF29EACE7B98CB00E%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=hd720\u0026fallback_host=tc.v21.cache2.c.youtube.com\u0026type=video%2Fmp4%3B+codecs%3D%22avc1.64001F%2C+mp4a.40.2%22\u0026itag=22,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v2.lscache7.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D44%26ip%3D207.0.0.0%26signature%3D6B0F7BDF9D056CB21D43878B97D0FDC731816040.0B56FF33A94E4B2AF8735A12B00C30937A4B7DB1%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=large\u0026fallback_host=tc.v2.cache7.c.youtube.com\u0026type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22\u0026itag=44,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v10.lscache8.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Calgorithm%252Cburst%252Cfactor%252Ccp%26fexp%3D906011%26algorithm%3Dthrottle-factor%26itag%3D35%26ip%3D207.0.0.0%26burst%3D40%26sver%3D3%26signature%3DA12735572F60472D1D140FFBA3062BDD8C4EB69C.8818879B995EE22045B19ABBF0BFB7F10A89B3A6%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26factor%3D1.25%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=large\u0026fallback_host=tc.v10.cache8.c.youtube.com\u0026type=video%2Fx-flv\u0026itag=35,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v8.lscache7.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D43%26ip%3D207.0.0.0%26signature%3D627E77C6A75F8CF2CC9A4D6E9138DD563C6702AE.5294307AEA23B816C24B4D88CE8097E85A22D9FF%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=medium\u0026fallback_host=tc.v8.cache7.c.youtube.com\u0026type=video%2Fwebm%3B+codecs%3D%22vp8.0%2C+vorbis%22\u0026itag=43,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v20.lscache5.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Calgorithm%252Cburst%252Cfactor%252Ccp%26fexp%3D906011%26algorithm%3Dthrottle-factor%26itag%3D34%26ip%3D207.0.0.0%26burst%3D40%26sver%3D3%26signature%3D5EB1858C8C186A287DE6B86298D79D7879B83D93.37D5E264A8EC5E9F6C0BE54669E5679B77278EE6%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26factor%3D1.25%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=medium\u0026fallback_host=tc.v20.cache5.c.youtube.com\u0026type=video%2Fx-flv\u0026itag=34,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v8.lscache6.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Cratebypass%252Ccp%26fexp%3D906011%26itag%3D18%26ip%3D207.0.0.0%26signature%3D5072A1FE599584593F0569496A4A3AAC5403DA35.33878823ED8CD855857D871377D55E33AF383C75%26sver%3D3%26ratebypass%3Dyes%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=medium\u0026fallback_host=tc.v8.cache6.c.youtube.com\u0026type=video%2Fmp4%3B+codecs%3D%22avc1.42001E%2C+mp4a.40.2%22\u0026itag=18,url=http%3A%2F%2Fo-o.preferred.sjc07s15.v1.lscache3.c.youtube.com%2Fvideoplayback%3Fsparams%3Did%252Cexpire%252Cip%252Cipbits%252Citag%252Csource%252Calgorithm%252Cburst%252Cfactor%252Ccp%26fexp%3D906011%26algorithm%3Dthrottle-factor%26itag%3D5%26ip%3D207.0.0.0%26burst%3D40%26sver%3D3%26signature%3D973B9ACC51F1857A0DE009CD1A9AFFA404CF15E3.96DE7140855BA5C354F79798628F870D633C3E42%26source%3Dyoutube%26expire%3D1325401357%26key%3Dyt1%26ipbits%3D8%26factor%3D1.25%26cp%3DU0hRSlRLT19KUUNOMV9MRVNEOjJsOEZ0V3RnWWdY%26id%3D18f3c9eab83f4d30\u0026quality=small\u0026fallback_host=tc.v1.cache3.c.youtube.com\u0026type=video%2Fx-flv\u0026itag=5", "xmas_module": "http:\/\/s.ytimg.com\/yt\/swfbin\/xmas-vfl9L1BvN.swf", "sourceid": "y", "timestamp": 1325378110, "cc_asr": 1, "showpopout": 1, "hl": "en_US", "tmi": "1", "no_get_video_log": "1", "cc_module": "http:\/\/s.ytimg.com\/yt\/swfbin\/subtitle_module-vfl4373X1.swf", "endscreen_module": "http:\/\/s.ytimg.com\/yt\/swfbin\/endscreen-vfl6o3XZn.swf", "supersizefeatured": "1", "referrer": "http:\/\/www.youtube.com\/", "video_id": "${id}", "sendtmp": "1", "sk": "KlPQD_SfbE-M50ujJJ_R1vOG8UcYPEaKC", "t": "vjVQa1PpcFMqX7yhNNzmUXvgZE5Apdt9hmI1--SQS3I="}, "url_v9as2": "http:\/\/s.ytimg.com\/yt\/swfbin\/cps-vflRmaEsw.swf", "params": {"allowscriptaccess": "always", "allowfullscreen": "true", "bgcolor": "#000000"}, "attrs": {"width": "640", "id": "movie_player", "height": "390"}, "url_v8": "http:\/\/s.ytimg.com\/yt\/swfbin\/cps-vflRmaEsw.swf", "html5": false}
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
      'COMMENT_SHARE_URL': "http:\/\/www.youtube.com\/comment?lc=_COMMENT_ID_",
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

        'TTS_URL': "http:\/\/www.youtube.com\/api\/timedtext?sparams=asr_langs%2Ccaps%2Cexpire%2Cv\u0026asr_langs=en%2Cko%2Cja\u0026caps=asr\u0026expire=1325401200\u0026key=yttt1\u0026signature=AC56A7D8C2632773FADE7DF3AF47E34C918C06D4.55D91FAA600B964FBF6E475FC5BC057F765B9EC2\u0026hl=en",

        'SHOW_SUBSCRIBE_UPSELL': true,



        'USE_CHIPS_UI': false,




      'CONVERSION_URLS_DICT': {},
      'PLAYBACK_ID': "AAS1bKNyzQhbZeQD",
      'PLAY_ALL_MAX': 480    });

    yt.setMsg({
        'SUBSCRIBE_UPSELL_MESSAGE': "If you like Aleriick's videos, subscribe!\n",
      'LOADING': "Loading...",
      'WATCH_ERROR_MESSAGE': "This feature is not available right now. Please try again later."    });



    
  yt.setMsg({
    'UNBLOCK_USER': "Are you sure you want to unblock this user?",
    'BLOCK_USER': "Are you sure you want to block this user?"
  });
  yt.setConfig('BLOCK_USER_XSRF', '');
  yt.setConfig('BLOCK_USER_AJAX_XSRF', '');


      yt.setConfig({
    'COMMENT_SHARE_URL': "http:\/\/www.youtube.com\/comment?lc=_COMMENT_ID_",
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

      var iframeContents = "\n  \u003cscript\u003e\n    var google_max_num_ads = '1';\n    var google_ad_output = 'js';\n    var google_ad_type = 'text';\n    var google_only_pyv_ads = true;\n    var google_video_doc_id = 'yt_${id}';\n    var google_ad_request_done = parent.yt.www.ads.pyv.pyvWatchAfcCallback;\n    var google_ad_client = 'ca-pub-6219811747049371';\n    var google_ad_block = '3';\n      var google_page_url = 'http:\/\/www.youtube.com\/video\/${id}';\n      var google_ad_channel = 'PyvWatchInRelated+PyvYTWatch+PyvWatchNoAdX+lpw+afv_ugc+yt_mpvid_AAS1bKN0-Gw3CEyS+ytexp_906011+Vertical_Banner_20+Vertical_Banner_258+Vertical_Banner_1001+Vertical_Banner_1073+VidVert20+VidVert258+VidVert1001+VidVert1073+Vertical_20+Vertical_258+Vertical_1001+Vertical_1073';\n      var google_language = \"en\";\n  \u003c\/script\u003e\n\n  \u003cscript s\u0072c=\"http:\/\/pagead2.googlesyndication.com\/pagead\/show_ads.js\"\u003e\u003c\/script\u003e\n";
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
}