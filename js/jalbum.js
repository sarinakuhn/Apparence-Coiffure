$(function() {
			$("#thumbnails_container").imageScroller({
				onBeforeScroll: function() { $.galleria.stop() },
				onScroll: function() { $.galleria.start() }, 
				duration: 120, 
				imageWidth: 106, 
				size: 6,
				fastSteps: 5
			});
			
			var formattedThumbnailOpacity = 67/100;
			
			$(".thumbnails_unstyled").addClass("thumbnails");
			$("ul.thumbnails").galleria({
				history: true,
				clickNext: true,
				insert: "#main_image",
				onImage: function(image, caption, thumb) {
					var extras = $("#extras").css("display", "none").empty();
					image.css("display", "none").fadeIn(500);
					caption.css("display", "none").fadeIn(500);
					
					if (false) {
						var extrasList = $("<ul></ul>");
						extrasList.addMetadata("Date", thumb.data("originalDate"));
						extrasList.addMetadata("Camera", thumb.data("cameraModel"));
						extrasList.addMetadata("Exposure time", thumb.data("exposureTime"));
						extrasList.addMetadata("ISO", thumb.data("isoEquivalent"));
						extrasList.addMetadata("Aperture", thumb.data("aperture"));
						extrasList.addMetadata("Focus distance", thumb.data("focusDistance"));
						extrasList.addMetadata("Focal length", thumb.data("focalLength35mm"));
						extrasList.addMetadata("Keywords", thumb.data("keywords"));
						if (extrasList.children().length > 0) {
							extras.append(extrasList);						
							extrasList.find(":first-child").addClass("first");
							extras.css({ 
								width : (image.outerWidth() - (5 * 2) + 100) + "px" 
							}).fadeIn(500);
						}
					}
					
					var li = thumb.parents("li");
					li.siblings().children("img.selected").fadeTo(500, formattedThumbnailOpacity);
					thumb.fadeTo("fast", 1).addClass("selected");
					image.attr("title", "Next image");
					
					var original = thumb.data("original");
					if (original) {
						var originalLink = $("<a></a>").attr("href", original).text("Download original");
						caption.append(" (").append(originalLink).append(")");
					}
				},
				onThumb: function(thumb) {
					var li = thumb.parents("li");
					var fadeTo = li.is(".active") ? "1" : formattedThumbnailOpacity;
					thumb.css({display: "none", opacity: fadeTo}).fadeIn(1500);
					thumb.hover(
						function() { 
							thumb.fadeTo("fast", 1);		
						},
						function() {
							li.not(".active").children("img").fadeTo("fast", formattedThumbnailOpacity);
						}
					)
				},
				preloads: 3,
				fastSteps: 5,
				onPrev: function() {
					$.imageScroller.scrollLeft();
				},
				onNext: function() {
					$.imageScroller.scrollRight();
				},
				onPrevFast: function() {
					$.imageScroller.fastScrollLeft();
				},
				onNextFast: function() {
					$.imageScroller.fastScrollRight();
				}
			});
			
			$.galleria.loader = $("<div></div>").addClass("loader").append($(new Image()).attr("src","res/loader.gif").attr("title","Loading..."));
			
			prepareArrow = function(arrow) {
				arrow.css({display: "none", opacity: 0.5, "padding-top": "28px"}).fadeIn( 1000);			
				arrow.hover(
					function() {
						arrow.fadeTo("fast", 1);
					},
					function() {
						arrow.fadeTo("fast", 0.5);			
					}
				);	
			}
			
			var leftArrow = $("#left_arrow");
			prepareArrow(leftArrow);
			leftArrow.click(function() {
				$.galleria.prev();	
			});
			
			var rightArrow = $("#right_arrow");
			prepareArrow(rightArrow);
			rightArrow.click(function() {
				$.galleria.next();
			});
			
			if (false) {
				var leftFastArrow = $("#left_fast_arrow");
				prepareArrow(leftFastArrow);
				leftFastArrow.click(function() {
					$.galleria.prevFast();
				});
				
				var rightFastArrow = $("#right_fast_arrow");
				prepareArrow(rightFastArrow);
				rightFastArrow.click(function() {
					$.galleria.nextFast();
				});
			}
		});

		$(document).bind("keydown", "left", function() {
			if (!KeyboardNavigation.widgetHasFocus()) {
				$.galleria.prev();
			}
		});
		$(document).bind("keydown", "right", function() {
			if (!KeyboardNavigation.widgetHasFocus()) {
				$.galleria.next();
			}
		});

		var KeyboardNavigation = {
			widgetHasFocus: function() {
				if(typeof _jaWidgetFocus != 'undefined' && _jaWidgetFocus) {
					return true;
				}
				return false;
			}
		}