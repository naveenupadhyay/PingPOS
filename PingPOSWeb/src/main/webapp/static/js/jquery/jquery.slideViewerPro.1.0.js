/*!
 * slideViewerPro 1.0
 * Examples and documentation at: 
 * http://www.gcmingati.net/wordpress/wp-content/lab/jquery/svwt/
 * 2009-2010 Gian Carlo Mingati
 * Version: 1.0.5 (26-JULY-2009)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires:
 * jQuery v1.3.2 or later
 * Option:
 * jQuery Timers plugin | plugins.jquery.com/project/timers (for autoslide mode)
 * 
 */
jQuery.extend( jQuery.easing, // from the jquery.easing plugin
{
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});
jQuery(function(){
   jQuery("div.svwp").prepend("<img src='/img/svwloader.gif' class='ldrgif' alt='loading...'/ >"); //change with YOUR loader image path   
});
var j = 0;
jQuery.fn.slideViewerPro = function(settings) {
	  settings = jQuery.extend({
		  galBorderWidth: 1,  // the border width around the main images
		  thumbsTopMargin: 8, // the distance that separates the thumbnails and the buttons from the main images
		  thumbsRightMargin: 8, // the distance of each thumnail respect to the next one
		  thumbsBorderWidth: 2, // the border width of each thumbnail. Note that the border in reality is above, not around
		  buttonsWidth: 20, // the width of the prev/next buttons that commands the thumbnails
		  galBorderColor: "#d5d5d5", // the border color around the main images
		  thumbsBorderColor: "#d5d5d5", // the border color of the thumbnails but not the current one
		  thumbsActiveBorderColor: "#3f3f40", // the border color of the current thumbnail
		  buttonsTextColor: "#3f3f40", //the color of the optional text in leftButtonInner/rightButtonInner
		  thumbsBorderOpacity: 1.0, // could be 0, 0.1 up to 1.0
		  thumbsActiveBorderOpacity: 1.0, // could be 0, 0.1 up to 1.0
		  easeTime: 750, // the time it takes a slide to move to its position
		  asTimer: 3500, // if autoslide is true, this is the interval between each slide
		  thumbs: 4, // the number of visible thumbnails
		  thumbsPercentReduction: 20, // the percentual reduction of the thumbnails in relation to the original
		  thumbsVis: true, // with this option set to false, the whole UI (thumbs and buttons) are not visible
		  leftButtonInner: "-", //could be an image "<img src='images/larw.gif' />" or an escaped char as "&larr";
		  rightButtonInner: "+", //could be an image or an escaped char as "&rarr";
		  autoslide: true, // by default the slider do not slides automatically. When set to true REQUIRES the jquery.timers plugin
		  typo: false, // the typographic info of each slide. When set to true, the ALT tag content is displayed
		  typoFullOpacity: 0.9, // the opacity for typographic info. 1 means fully visible.
		  shuffle: true // the LI items can be shuffled (randomly mixed) when shuffle is true
		}, settings);
		
	return this.each(function(){
		function shuffle(a) {
	    var i = a.size();
	    while (--i) {
	        var j = Math.floor(Math.random() * (i));
	        var tmp = a.slice(i, i+1);
	        a.slice(j, j+1).insertAfter(tmp);
	    }
		} 
		var container = jQuery(this);
		(!settings.shuffle) ? null : shuffle(container.find("li"));
		container.find("img.ldrgif").remove();
		container.removeClass("svwp").addClass("slideViewer");	
		container.attr("id", "svwp"+j);
		var pictWidth = container.find("img").attr("width");
		var pictHeight = container.find("img").attr("height");
		var pictEls = container.find("li").size();
		(pictEls >= settings.thumbs) ? null : settings.thumbs = pictEls;
		var slideViewerWidth = pictWidth*pictEls;
		var thumbsWidth = Math.round(pictWidth*settings.thumbsPercentReduction/100);
		var thumbsHeight =  Math.round(pictHeight*settings.thumbsPercentReduction/100);
		var pos = 0;
		var r_enabled = true;
		var l_enabled = true;
    container.find("ul").css("width" , slideViewerWidth)
    .wrap(jQuery("<div style='width:"+ pictWidth +"px; overflow: hidden; position: relative; top: 0; left: 0'>"));
		container.css("width" , pictWidth);
		container.css("height" , pictHeight);
		container.each(function(i) {
			if(settings.typo)
			{
			jQuery(this).find("img").each(function(z) {
				jQuery(this).after("<span class='typo' style='position: absolute; width:"+(pictWidth-12)+"px; margin: 0 0 0 -"+pictWidth+"px'>"+jQuery(this).attr("alt")+"<\/span>");
			});
			}
			jQuery(this).after("<div class='thumbSlider' id='thumbSlider" + j + "'><ul><\/ul><\/div>");
			jQuery(this).next().after("<a href='#' class='left' id='left" + j + "'><span>"+settings.leftButtonInner+"</span><\/a><a href='#' class='right' id='right" + j + "'><span>"+settings.rightButtonInner+"<\/span><\/a>");
			
			jQuery(this).find("li").each(function(n) { 
						jQuery("div#thumbSlider" + j + " ul").append("<li><a title='" + jQuery(this).find("img").attr("alt") + "' href='#'><img width='"+ thumbsWidth +"' height='"+ thumbsHeight +"' src='" + jQuery(this).find("img").attr("src") + "' /><p class='tmbrdr'>&nbsp;<\/p><\/a><\/li>");						
			});
    
			jQuery("div#thumbSlider" + j + " a").each(function(z) {			
				jQuery(this).bind("click", function(){
					jQuery(this).find("p.tmbrdr").css({borderColor: settings.thumbsActiveBorderColor, opacity: settings.thumbsActiveBorderOpacity});
					jQuery(this).parent().parent().find("p.tmbrdr").not(jQuery(this).find("p.tmbrdr")).css({borderColor: settings.thumbsBorderColor, opacity: settings.thumbsBorderOpacity});
					var cnt = -(pictWidth*z);
					(cnt != container.find("ul").css("left").replace(/px/, "")) ? container.find("span.typo").animate({"opacity": 0}, 250) : null ;
					container.find("ul").animate({ left: cnt}, settings.easeTime, settings.easeFunc, function(){container.find("span.typo").animate({"opacity": settings.typoFullOpacity}, 250)});					
					return false;
				});
			});
			// shortcuts to +/- buttons
			var jQuerybtl = jQuery("a#left" + j);	
			var jQuerybtr = jQuery("a#right" + j);	
			
			// right/left 			
			jQuerybtr.bind("click", function(){
					if (r_enabled) (pictEls-pos > settings.thumbs*2 || pictEls%settings.thumbs == 0)? pos += settings.thumbs : pos += pictEls % settings.thumbs;
					r_enabled = false;
					jQuery(this).prev().prev().find("ul:not(:animated)").animate({ left: -(thumbsWidth+settings.thumbsRightMargin)*pos}, 500, settings.easeFunc, function(){authorityMixing();});					
					return false;
			});
			jQuerybtl.bind("click", function(){	
					if (l_enabled && pos!=0) (pictEls-pos > settings.thumbs || pictEls%settings.thumbs == 0)? pos -= settings.thumbs : pos -= pictEls % settings.thumbs;
					l_enabled = false;
					jQuery(this).prev().find("ul:not(:animated)").animate({ left: -(thumbsWidth+settings.thumbsRightMargin)*pos}, 500, settings.easeFunc, function(){authorityMixing();});			
					return false;
			});						
			
			function authorityMixing()
			{				
				
				//right btt
				(pos == pictEls-settings.thumbs) ? jQuerybtr.addClass("r_dis") : jQuerybtr.removeClass("r_dis");
				(pos == pictEls-settings.thumbs) ? r_enabled = false : r_enabled = true;
				//left btt
				(pos == 0) ? jQuerybtl.addClass("l_dis") : jQuerybtl.removeClass("l_dis");
				(pos == 0) ? l_enabled = false : l_enabled = true;
			}
			
			//CSS	defs @ runtime
			var tBorder = settings.thumbsBorderWidth;
			var contBorder = settings.galBorderWidth
			
			jQuery(".slideViewer a img").css({border: "0"});
			if(settings.typo)
					{
						jQuery(this).find("span.typo").each(function(z) {
							jQuery(this).css({marginTop: (pictHeight-jQuery(this).innerHeight()), opacity: settings.typoFullOpacity});
						});
					}
			jQuery("div#svwp"+ j).css({border: settings.galBorderWidth +"px solid "+settings.galBorderColor});
			
			jQuery("div#thumbSlider" + j).css({position: "relative", left: contBorder, top: settings.thumbsTopMargin+"px", width: settings.thumbs*thumbsWidth+((settings.thumbsRightMargin*settings.thumbs)-settings.thumbsRightMargin), height: thumbsHeight, textAlign: "center", overflow: "hidden", margin: "0 auto"});
			jQuery("div#thumbSlider" + j + " ul").css({width: (thumbsWidth*pictEls)+settings.thumbsRightMargin*pictEls, position: "relative", left: "0", top: "0"});
			jQuery("div#thumbSlider" + j + " ul li").css({marginRight: settings.thumbsRightMargin});
					
			jQuery("div#thumbSlider" + j).find("p.tmbrdr").css({width: (thumbsWidth-tBorder*2)+"px", height: (thumbsHeight-tBorder*2) +"px", top: -(thumbsHeight) +"px", border: settings.thumbsBorderWidth +"px solid "+settings.thumbsBorderColor, opacity: settings.thumbsBorderOpacity});			
			jQuery("div#thumbSlider" + j + " a:first p.tmbrdr").css({borderColor: settings.thumbsActiveBorderColor, opacity: settings.thumbsActiveBorderOpacity});
			
			var rbttLeftMargin = (pictWidth/2) + (jQuery("div#thumbSlider" + j).width()/2) + settings.thumbsRightMargin + contBorder;
			var lbttLeftMargin = (pictWidth/2) - (jQuery("div#thumbSlider" + j).width()/2) - (settings.buttonsWidth + settings.thumbsRightMargin) + contBorder;			

			
			var innerLeftImg = jQuerybtl.find("img");
			var innerRightImg = jQuerybtr.find("img");
			if(innerLeftImg.length != 0 && innerRightImg.length != 0)
			{		
				jQuery(innerLeftImg).load(function() {
					jQuery(this).css({margin: Math.round((thumbsHeight/2)-(jQuery(this).height()/2))+"px 0 0 0"});
				});				
				jQuery(innerRightImg).load(function() {
					jQuery(this).css({margin: Math.round((thumbsHeight/2)-(jQuery(this).height()/2))+"px 0 0 0"});
				});			
			}

			
			jQuery("a#left" + j).css({display: "block", textAlign: "center", width: settings.buttonsWidth + "px" , height: thumbsHeight+"px",  margin: -(thumbsHeight-settings.thumbsTopMargin) +"px 0 0 "+lbttLeftMargin+"px", textDecoration: "none", lineHeight: thumbsHeight+"px", color: settings.buttonsTextColor});
			jQuery("a#right" + j).css({display: "block", textAlign: "center", width: settings.buttonsWidth + "px", height: thumbsHeight+"px" , margin: -(thumbsHeight) +"px 0 0 "+rbttLeftMargin+"px", textDecoration: "none", lineHeight: thumbsHeight+"px", color: settings.buttonsTextColor});			


			authorityMixing();
	
			if(settings.autoslide){					
					var i = 1;
					
					jQuery("div#thumbSlider" + j).everyTime(settings.asTimer, "asld", function() {			
		  			jQuery(this).find("a").eq(i).trigger("click");
		  			if(i == 0)
		  			{
						pos = 0;
						l_enabled = false;
						jQuery("div#thumbSlider" + j).find("ul:not(:animated)").animate({ left: -(thumbsWidth+settings.thumbsRightMargin)*pos}, 500, settings.easeFunc, function(){authorityMixing();});
		  			}
		  			else l_enabled = true;
		  			
						(i%settings.thumbs == 0)? jQuery(this).next().next().trigger("click") : null;
						(i < pictEls-1)?	i++ : i=0;		  			
					});		
					
					//stops autoslidemode	
					jQuery("a#right" + j).bind("mouseup", function(){
						jQuery(this).prev().prev().stopTime("asld");
		    	});
					jQuery("a#left" + j).bind("mouseup", function(){
						jQuery(this).prev().stopTime("asld");	
					});
					jQuery("div#thumbSlider" + j + " a").bind("mouseup", function(){
						jQuery(this).parent().parent().parent().stopTime("asld");
					});
			}
			var uiDisplay = (settings.thumbsVis)? "block":"none";
			jQuery("div#thumbSlider" + j + ", a#left" + j + ", a#right" + j).wrapAll("<div style='width:"+ pictWidth +"px; display: "+uiDisplay+"' id='ui"+j+"'><\/div>");			
			jQuery("div#svwp"+ j + ", div#ui" + j).wrapAll("<div style='width:"+ pictWidth +"px'><\/div>");
			});
			(jQuery("div#thumbSlider" + j).width()+(settings.buttonsWidth*2) >= pictWidth)? alert("ALERT: THE THUMBNAILS SLIDER IS TOO WIDE! \nthumbsPercentReduction and/or buttonsWidth needs to be scaled down!") : null;
		j++;
  });	
};