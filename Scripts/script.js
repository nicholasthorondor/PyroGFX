var count = 1; // Keeps track of gallery page.
var $worksContainer = $(".worksContainer");

var firstTimeLoad = sessionStorage.getItem("firstLoad"); // Session variable so as to not replay preload effects in same session.

// PRELOADER EFFECTS.
// Only activates on first page load. Otherwise hides preloader items.
$("document").ready(function () {
    if(!firstTimeLoad) {
        sessionStorage.setItem("firstLoad","1");
        preloadEffects();
    } else {
        $("#flamePreloader").removeClass("animateFlameBob");
        $("#flamePreloader").addClass("hideMain");
        $("#preLoader1").addClass("hideMain");
        $("#preLoader2").addClass("hideMain");
        $(".counter").addClass("hideMain");
        $(".title").removeClass("hide");
        $("#subTitle").removeClass("hide");
        $(".title").removeClass("animateZoomIn");
        $("#titleColour1").css("color", "#f49a00");
        $("#titleColour2").css("color", "#f49a00");
        $("#titleColour3").css("color", "#f49a00");
        $("#titleColour4").css("color", "#f49a00");
    }

});

function preloadEffects () {
    // Steps through counter 0% to 100%.
    $(".counter").text("0%");
    setTimeout(function () {
        $(".counter").text("10%");
    }, 500);
    setTimeout(function () {
        $(".counter").text("25%");
    }, 1000);
    setTimeout(function () {
        $(".counter").text("50%");
    }, 1500);
    setTimeout(function () {
        $(".counter").text("75%");
    }, 2000);
    setTimeout(function () {
        $(".counter").text("100%");
    }, 2500);
    setTimeout(function () {
        $(".counter").addClass("hideMain");
    }, 3000);
    // Zooms flame out.
    setTimeout(function () {
        $("#flamePreloader").removeClass("animateFlameBob");
        $("#flamePreloader").addClass("animateZoomOut");
    }, 3000);
    // Opens curtain divs.
    setTimeout(function () {
        $("#preLoader1").addClass("animateCurtainOpen");
        $("#preLoader2").addClass("animateCurtainOpen");
    }, 3500);
    // Zooms in title and changes colour of first letters.
    setTimeout(function () {
        $(".title").removeClass("hide");
        $(".title").addClass("animateZoomIn");
        $(".titleColour").css("color", "#f49a00");
    }, 3700);
    setTimeout(function () {
        $("#titleColour1").css("color", "#f49a00");
        $("#titleColour1").css("transition", "color 1s");
    }, 4700);
    setTimeout(function () {
        $("#titleColour2").css("color", "#f49a00");
        $("#titleColour2").css("transition", "color 1s");
    }, 4900);
    setTimeout(function () {
        $("#titleColour3").css("color", "#f49a00");
        $("#titleColour3").css("transition", "color 1s");
    }, 5100);
    setTimeout(function () {
        $("#titleColour4").css("color", "#f49a00");
        $("#titleColour4").css("transition", "color 1s");
    }, 5300);
    // Fades in subtitle.
    setTimeout(function () {
        $("#subTitle").removeClass("hide");
        $("#subTitle").addClass("animateFadeIn");
    }, 6300);
}

// NAVIGATION.
// Link hamburger menu.
$("#hamburger").on("click", function () {
    $("#links").toggleClass("hide");
});

// GALLERY.
// Loads in gallery for both clicking the arrow or view works text.
$("#worksArrow").on("click", function() {
    slideInFirst();
    progressUpdate();
});

$("#viewWorks").on("click", function() {
    slideInFirst();
    progressUpdate();
});

// Slides gallery in for the first time.
function slideInFirst() {
    if($worksContainer.hasClass("hideMain")) {
        $worksContainer.removeClass("hideMain");
        $(".galNext").removeClass("hide");
        $(".galPrev").removeClass("hide");
            // If container has been toggled before, will remove previous class.
        if($worksContainer.hasClass("animateSlideUp")) {
            $worksContainer.removeClass("animateSlideUp");
        }
        $worksContainer.addClass("animateSlideDown");
        hideBackground();
    }
}

// Slides gallery off screen.
$(".closeGallery").on("click", function() {
    showBackground();
    slideUp();
});

function slideUp() {
    $(".galNext").addClass("hide");
    $(".galPrev").addClass("hide");
    $(".worksContainer").addClass("animateSlideUp");
    $(".worksContainer").removeClass("animateSlideDown");
    setTimeout(function() {
             $(".worksContainer").addClass("hideMain");
         }, 1000);
}

// Fades in new page of gallery items on arrow click.
// Will loop back to the start page once at the end.
$(".galNext").on("click", function() {
    // Normal progression.
    if (count < 2) { // Change to higher number if adding a new div gallery page.**********TODO************** Fine for 3, but will need to change below code for 4+.
        count ++;
        fadeOutForward();
        fadeInForward();
        progressUpdate();
        // If at the end gallery page, will cycle back to the beginning page.
    } else if (count == 2) { // Will need to update numbers as more gallery divs are added. Currently made for 2 page gallery.
        count = 1;
        $(".galContainer2").removeClass("animateFadeIn");
        $(".galContainer2").addClass("animateFadeOut");
        $(".galContainer2").css("z-index", -1);
        $(".galContainer1").removeClass("hide");
        $(".galContainer1").removeClass("animateFadeOut");
        $(".galContainer1").addClass("animateFadeIn");
        setTimeout(function () {
            $(".galContainer1").css("z-index", 10);
        }, 1100)
        progressUpdate();
    }
});

$(".galPrev").on("click", function() {
    // Normal progression.
    if (count > 1) {
        fadeOutBack();
        fadeInBack();
        count --;
        progressUpdate();
        // If at the first gallery page, will cycle back to the last page.
    } else if (count == 1) { // Will need to update numbers as more gallery divs are added. Currently made for 2 page gallery.
        count = 2;
        $(".galContainer1").removeClass("animateFadeIn");
        $(".galContainer1").addClass("animateFadeOut"); 
        $(".galContainer2").removeClass("hide");
        $(".galContainer2").removeClass("animateFadeOut");
        $(".galContainer2").addClass("animateFadeIn");
        setTimeout(function () {
            $(".galContainer2").css("z-index", 10);
        }, 1100)
        progressUpdate();
    }
});

// Allows progress circles to be clicked as a means of navigating through gallery pages.
$(".progress1").on("click", function() {
    if (count > 1) {
        count = 1;
        fadeOutBack();
        fadeInBack();
        progressUpdate();
    }
});

$(".progress2").on("click", function() {
    if (count < 2) { // Will need to add new scripts for progress dots as more gallery divs are added.*****************TODO******************
        count ++;
        fadeOutForward();
        fadeInForward();
        progressUpdate();
    } else if (count > 2) {
        count = 2;
        fadeOutBack();
        fadeInBack();
        progressUpdate();
    }
});

// Functions for hiding and showing the background elements behind the view works container that scrolls in from the top of the screen.
function hideBackground () {
        setTimeout(function () {
            $(".titleContainer").addClass("hide");
            $(".worksToggleContainer").addClass("hide");
        }, 1500);
}

function showBackground () {
        $(".titleContainer").removeClass("hide");
        $(".worksToggleContainer").removeClass("hide");
}

// Functions for fading in and out each gallery page.
// If adding more gallery pages than 3, will need to extend the code.
function fadeOutForward() {
    if(count == 2) {
        $(".galContainer1").addClass("animateFadeOut");
        setTimeout(function () {
            $(".galContainer1").css("z-index", -1);
        }, 1000)
    } else if (count == 3) {
        $(".galContainer2").removeClass("animateFadeIn");
        $(".galContainer2").addClass("animateFadeOut");
        setTimeout(function () {
            $(".galContainer2").css("z-index", -1);
        }, 1000)
    }
}

function fadeInForward() {
    if(count == 2) {
        $(".galContainer2").removeClass("hide");
        $(".galContainer2").css("z-index", 10);
        $(".galContainer2").addClass("animateFadeIn");
    } else if(count == 3) {
        $(".galContainer3").removeClass("hide");
        $(".galContainer3").css("z-index", 10);
        $(".galContainer3").addClass("animateFadeIn");
    }
}

function fadeOutBack() {
    if(count <= 2) {
        $(".galContainer2").removeClass("animateFadeIn");
        $(".galContainer2").addClass("animateFadeOut");
        setTimeout(function() { // Needed to enable mouseover of images to function properly.
             $(".galContainer2").css("z-index", -1);
         }, 1000);       
    } else if (count == 3) {
        $(".galContainer3").removeClass("animateFadeIn");
        setTimeout(function() { // Needed to enable mouseover of images to function properly.
             $(".galContainer3").css("z-index", -1);
         }, 1000);  
        $(".galContainer3").addClass("animateFadeOut");
    }
}

function fadeInBack() {
    if(count <= 2) {
        $(".galContainer1").css("z-index", 10);
        $(".galContainer1").removeClass("animateFadeOut");
        $(".galContainer1").addClass("animateFadeIn");
    } else if(count == 3) {
        $(".galContainer2").css("z-index", 10);
        $(".galContainer2").removeClass("animateFadeOut");
        $(".galContainer2").addClass("animateFadeIn");
    }
}

// Displays image caption on hover of the image.
$(".masonryItem").hover(function() {
    var $localImg = $(this).find(".imgCaption");
    $localImg.toggleClass("hide");
    $localImg.toggleClass("animateSlideIn"); // Applies slide in animation to caption.
});

// Progress bar for gallery. Will change colour according to gallery page currently on.
function progressUpdate() {
    if (count == 1) {
        $(".progress1").css("background-color", "orange");
        $(".progress2").css("background-color", "transparent");
        $(".progress3").css("background-color", "transparent");
    } else if(count == 2) {
        $(".progress1").css("background-color", "transparent");
        $(".progress2").css("background-color", "orange");
        $(".progress3").css("background-color", "transparent");
    } else if (count == 3) {
        $(".progress1").css("background-color", "transparent");
        $(".progress2").css("background-color", "transparent");
        $(".progress3").css("background-color", "orange");
    }
}

// Zoom gallery image.
$(".masonryItem").on("click", function () {
    var $localImg = $(this).find(".masonryImg"); // Stores this image.
    if ($localImg.length) { // Only carry out zoom if image exists. ie. accounts for black empty panels of gallery page.
        var imgSource = $localImg.attr("src"); // Gets image source.
        var buySrc = $localImg.attr("data-src"); // Gets data source leading to etsy item. aka the url.
        zoomImg(imgSource, buySrc); // Sends variables to function.
    }
});

// Functions for reseting image scale and pointer style on cross interaction within the zoomed image container.
$(".cross").on("click", function () {
    zoomOut();
    $(".photo").removeClass("toggleDoubleZoom"); // Removes double zoom if active.
});

$(".cross").on("mouseover", function () {
    $("#zoomImg").css("cursor", "pointer");
});

// Changes cursor style for zoom in/out as required.
$(".cross").on("mouseout", function () {
    if ($(".photo").hasClass("toggleDoubleZoom")) {
        $("#zoomImg").css("cursor", "zoom-out");
    } else {
        $("#zoomImg").css("cursor", "zoom-in");
    }
});

// For allowing zooming of the zoomed in focused image. aka double zoom.
$(".photo").on("click", function () {
$(".photo").toggleClass("toggleDoubleZoom"); // Activates css class on element, used like a bool to see which element is being zoomed.
    if ($(".photo").hasClass("toggleDoubleZoom")) {
        $("#zoomImg").on("mousemove", function (e) {
            doubleZoom(e);
        });
        $("#zoomImg").css("cursor", "zoom-out");
    } else {
        $("#zoomImg").css("cursor", "zoom-in");
    }
});

// Opens zoom container and applies background image as specified by the supplied source.
function zoomImg (imgSrc, buySrc) {
    $(".photo").css("background-image", "url(" + imgSrc + ")"); // Dynamically applies background image to zoom container.
    $(".buyBtn").attr("href", buySrc) // Dynamically applies url to the buy button, according to data-src attribute of image.
    $("#zoomImg").removeClass("hide");
    $("#zoomContainer").removeClass("hide");
    $("#zoomImg").removeClass("animateZoomOut");
    $("#zoomImg").addClass("animateZoomIn");
}

// Zooms out by closing the zoom container.
function zoomOut () {
    $("#zoomImg").removeClass("animateZoomIn");
    $("#zoomImg").addClass("animateZoomOut");
    setTimeout(function () {
        $("#zoomContainer").addClass("hide");
    }, 750);
}

// Zooms in doubly. Allows mouse movement to traverse the image.
function doubleZoom (e) {
    $(".photo").css({"transform-origin": ((e.pageX - $("#zoomImg").offset().left) / $("#zoomImg").width()) * 100 + "% "
        + ((e.pageY - $("#zoomImg").offset().top) / $("#zoomImg").height()) * 100 + "%"});
}

// Navigation of the gallery via arrow keyboard keys.
$("html").keydown(function (e) {
    // Gets info relating to current zoomed image.
    if ($(".photo").length) { // Only carries out instructions on the main page where the product images are present.
        var zoomImgSrc = $(".photo").css("background-image"); // Retrieves image source.
        var length = zoomImgSrc.length; // Gets length of source url.
        // Positions before the final number of the image source, eg images/img01.jpg = 01
        var numLoc = zoomImgSrc.length - 8; // Will need to change depending on the length of the uploaded image sources.
        // Gets the number, eg 01, and converts to int.
        var number = parseInt(zoomImgSrc.substring(numLoc,numLoc + 2)); // Includes the leading 0 if there is one, allowing digits up to 99.

        // Left arrow key.
        // Removes double zoom if active, and uses above number to change the background image source of the zoom container on key press.
        if (e.keyCode == 37 && $("#zoomImg").hasClass("animateZoomIn")) {
            $(".photo").removeClass("toggleDoubleZoom");
            if (number > 1 && number < 10) {
                $(".photo").css("background-image", "url(Images/img0" + (number - 1) + ".jpg)"); // Handles leading 0.
            } else if (number > 1 && number == 10) {
                $(".photo").css("background-image", "url(Images/img0" + (number - 1) + ".jpg)"); // Handles changing from leading 0 to double digit numbers.
            } else if (number > 1 && number > 10) {
                $(".photo").css("background-image", "url(Images/img" + (number - 1) + ".jpg)"); // For images number 10 and above.
            }
        }

        // Right arrow key.
        // Removes double zoom if active, and uses above number to change the background image source of the zoom container on key press.
        if (e.keyCode == 39 && $("#zoomImg").hasClass("animateZoomIn")) {
            $(".photo").removeClass("toggleDoubleZoom");
            if (number < 17 && number < 9) { // Change number as you add more images to the gallery.
                $(".photo").css("background-image", "url(Images/img0" + (number + 1) + ".jpg)"); // Handles leading 0.
            } else if (number < 17 && number == 9) {
                $(".photo").css("background-image", "url(Images/img" + (number + 1) + ".jpg)"); // Handles changing from leading 0 to double digit numbers.
            } else if (number < 17 && number > 9) {
                $(".photo").css("background-image", "url(Images/img" + (number + 1) + ".jpg)"); // For images number 10 and above.
            }
        }

        // Closes open images or gallery pane on push of escape key.
        if (e.keyCode == 27) {
            $(".photo").removeClass("toggleDoubleZoom");
            if ($("#zoomImg").hasClass("animateZoomIn")) {
                zoomOut();
            } else {
                showBackground();
                slideUp();
            }
        }
    }
});

// -----CURRENTLY NOT IN USE AS CONTACT PAGE NEEDS PHP WORK-----
// For keeping track of how many characters a user has entered into the text area on the contact page.
// var maxLength = 500;
// $("textarea").keyup(function() {
//   var length = $(this).val().length;
//   var length = maxLength-length;
//   $("#charsLeft").text(length);
// });


// Validation for the contact form.
// var fName = $("#fName");
// var email = $("#email");
// var submitBtn = $("#submitBtn");
// var message = $("#message");
// var nameExpr = /^[a-zA-Z\s]*$/;
// var emailExpr = /\S+@\S+\.\S+/;

// fName.blur(function () {
//     if (!nameExpr.test(fName.val()) && fName.val() != "") {
//         $(".errorName").text("Only letters please.");
//         $(".errorName").removeClass("hide");
//     } else {
//         $(".errorName").addClass("hide");
//     }
// });

// email.blur(function () {
//     if (!emailExpr.test(email.val()) && email.val() != "") {
//         $(".errorEmail").text("Email address format is incorrect.");
//         $(".errorEmail").removeClass("hide");
//     } else {
//         $(".errorEmail").addClass("hide");
//     }
// });

// message.blur(function () {
//     if (message.val() != "") {
//         $(".errorMessage").addClass("hide");
//     }
// });

// submitBtn.on("click", function (e) {
//     if (fName.val() == "") {
//         e.preventDefault();
//         $(".errorName").text("Required Field");
//         $(".errorName").removeClass("hide");
//     } else {
//         if (!nameExpr.test(fName.val()) && fName.val() != "") {
//             $(".errorName").text("Only letters please.");
//             $(".errorName").removeClass("hide");
//         } else {
//             $(".errorName").addClass("hide");
//         }
//     }

//     if (email.val() == "") {
//         e.preventDefault();
//         $(".errorEmail").text("Required Field");
//         $(".errorEmail").removeClass("hide");
//     } else {
//          if (!emailExpr.test(email.val()) && email.val() != "") {
//             $(".errorEmail").text("Email address format is incorrect.");
//             $(".errorEmail").removeClass("hide");
//         } else {
//             $(".errorEmail").addClass("hide");
//         }
//     }

//     if (message.val() == "") {
//         e.preventDefault();
//         $(".errorMessage").text("Required Field");
//         $(".errorMessage").removeClass("hide");
//     } else {    
//         $(".errorMessage").addClass("hide");
//     }
// });

// ABOUT PAGE
var aboutCount = 1; // Keeps track of bg img on about page.

// Cycles between the two about images and their associated text entries on click of the arrows.
$(".aboutNext, .aboutPrev").on("click", function () {
    // Normal progression.
    if (aboutCount == 1) {
        $(".aboutBgImg").fadeOut(750);
        setTimeout (function () { // Prevents jolting on image change.
            $(".aboutBgImg").css("background-image", "url('../images/mtb.jpg')"); // Change to second image.
        }, 750);
        $(".aboutBgImg").fadeIn(750);
        $(".leftText").removeClass("animateFadeOut animateFadeIn");
        $(".rightText").removeClass("animateFadeIn animateFadeOut");
        $(".leftText").addClass("hide animateFadeOut"); // Hide first text.
        $(".rightText").removeClass("hide");
        $(".rightText").addClass("animateFadeIn"); // Change to second text.
        aboutCount = 2;
        // Works for going back and cycling back to start image if clicking next arrow again.
        // Only possible due to having 2 images, if another added, will need to update.
    } else if (aboutCount == 2) {
        $(".aboutBgImg").fadeOut(750);
        setTimeout (function () { // Prevents jolting on image change.
            $(".aboutBgImg").css("background-image", "url('../images/working.jpg')"); // Change to first image.
        }, 750);
        $(".aboutBgImg").fadeIn(750);
        $(".leftText").removeClass("animateFadeOut animateFadeIn");
        $(".rightText").removeClass("animateFadeIn animateFadeOut");
        $(".leftText").removeClass("hide");
        $(".leftText").addClass("animateFadeIn"); // Change to first text.
        $(".rightText").addClass("hide animateFadeOut"); // Hide second text.
        aboutCount = 1;
    }
});
