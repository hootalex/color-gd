$( document ).ready(function() {

console.log('%c color.gd ', 'background: #f20045; color: #ffffff');
console.log('%c color.gd ', 'background: #ff810a; color: #ffffff');
console.log('%c color.gd ', 'background: #ffd817; color: #ffffff');
console.log('%c color.gd ', 'background: #23bf08; color: #ffffff');
console.log('%c color.gd ', 'background: #24a2f0; color: #ffffff');
console.log('from alex.gd');
  
const initSW = () => {
  if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
      // console.log('registered')
      }).catch((e) => {
        console.log(e);
    });
  }
}
initSW()  

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString;
};
  
  
  $(".colorpicker").addClass("colorpickershow");
  $("#addcolor").addClass("cl");
  $("#addcolor").html("start set");
  $("#inserturl").addClass("showurl")

var el = 0;
var ed = 0;
var a = location.href;
var hostname = $('<a>').prop('href', a).prop('hostname');
var urlstring = ""
var colorList = null;
var colorItems = null;
var rawhtml = ""
var title = null;
var colorpickerwidth = 200

if (a.indexOf("?") > -1) {
  
  $(".colorpicker").removeClass("colorpickershow");
  $("#addcolor").removeClass("cl");
  

    $(".share").addClass("shareshow")

    colorList = a.split("?");
    colorList.shift();

    var colorItems = colorList.map(myFunction);

    function myFunction(value, index, array) {
        return colorList[index].split("-");
    }

    for (var i = 0; i < colorItems.length; i++) {

        colorItems[i].shift()

        $('.listcontainer').append("<ul class='colorlist'>" + colorItems[i] + "</ul>");

    }
  
    //adding the colors after the fact...

    $('ul').html(function(i, text) {
        return $.map(text.split(','), function(word) {
            return '<li style="background-color:#' + word + '"></li>';
        }).join(' ');
    });
}

$(".deskadd").on("click", function() {
    $(".colorpicker").addClass("colorpickershow");
    $("#addcolor").addClass("cl");
    $("#addcolor").removeClass("ed add");
    $("#addcolor").html("start set");
  
  $("#delete").removeClass("deleteshow")
  
    $("#inserturl").addClass("showurl")
});

$("#x").on("click", function() {
    $(".colorpicker").removeClass("colorpickershow");
    $("li").removeAttr("class")
});

$("#addcolor").on("click", function() {
  
  $("#inserturl").removeClass("showurl")
  
    if ($("#addcolor").hasClass("cl")) {
        $(".colorpicker").removeClass("colorpickershow");

        $(".share").addClass("shareshow")

        $("#addcolor").html("add color");

        $(".listcontainer").prepend(
            "<ul class='colorlist'><div class='listadd'>+</div></ul>"
        );

        $(".colorlist")
            .first()
            .append(
                "<li style='background-color:" + colorPicker.color.hexString + ";'></li>"
            );
        $("#addcolor").removeClass("cl");
    }
});

$(".listcontainer").on("click", ".listadd", function() {

    $("#addcolor").addClass("add");
  
    $("#delete").removeClass("deleteshow")

    $("#addcolor").removeClass("ed cl");

    el = $(this);

    $("#addcolor").html("add color");

    $(".colorpicker").addClass("colorpickershow");

    $("#addcolor").on("click", function() {

        if ($("#addcolor").hasClass("add")) {
            $(".colorpicker").removeClass("colorpickershow");

            el.parent("ul").append(
                "<li style='background-color:" + colorPicker.color.hexString + ";'></li>"
            );

            el = 0;
            $("#addcolor").removeClass("add");
        }

    });
});

$(".colorlist").hover(
    function() {
        $(this)
            .children(".listadd")
            .addClass("plusshow");
    },
    function() {
        $(this)
            .children(".listadd")
            .removeClass("plusshow");
    }
);
  
  colorpickerwidth = $(".colorpicker").width()
  
var colorPicker = new iro.ColorPicker("#iro", {
    width: colorpickerwidth,
    color: "#0593ff"
});
  
  // console.log($(".colorpicker").width())
  

function onColorChange(color) {
    $("#inserthex").val(colorPicker.color.hexString)
    $("#colorpreview").css("background-color", colorPicker.color.hexString)
    // $("#addcolor").css("border", "1px solid "+colorPicker.color.hexString)

}

colorPicker.on('color:change', onColorChange);

$("#inserthex").on("change keyup", function() {

    if ($("#inserthex").val().length == 7) {
        colorPicker.color.hexString = $("#inserthex").val();
        $("#colorpreview").css("background-color", $("#inserthex").val())
    }
});

$(".colorlist").each(function(index) {
    $(this).append("<div class='listadd'>+</div>")
});

$(".listcontainer").on("click", "li", function() {

    $("#addcolor").addClass("ed");
  
  $("#inserturl").removeClass("showurl")

    $("#delete").addClass("deleteshow")

    var thishex = rgb2hex($(this).css("background-color"))

    ed = $(this)
    $("li").removeClass("min")
    ed.addClass("min")

    $(".colorpicker").addClass("colorpickershow");
    $("#addcolor").html("save changes");
    $("#addcolor").removeClass("cl");

    colorPicker.color.hexString = thishex;

    $("#addcolor").on("click", function() {

        if ($("#addcolor").hasClass("ed")) {

            $(".colorpicker").removeClass("colorpickershow");
            ed.attr("style", "background-color:" + colorPicker.color.hexString)
            ed = 0;
            $("li").removeAttr("class")
            $("#addcolor").removeClass("ed")
        }
    });

    $("#delete").on("click", function() {
        $(".colorpicker").removeClass("colorpickershow");

        if ($("#addcolor").hasClass("ed")) {
  
            ed.remove()

            ed = 0;
            $("li").removeAttr("class")
            $("#addcolor").removeClass("ed")
            $("#delete").removeClass("deleteshow")
        }


        $("ul").each(function(index) {
            if ($(this).children("li").length == 0) {
              
//                 $(this).addClass("removerow")
              
//                 setTimeout(() => { this.remove(); }, 500);

                this.remove();
              
            }
        })
    });
});

$(".share").on("click", function() {

    $(".colorlist").each(function() {
        rawhtml += this.outerHTML
        rawhtml = rawhtml.toString()
    });

    function parsehtml() {

        var pro1 = rawhtml.replaceAll('<ul class="colorlist">', '?');
        var pro2 = pro1.replaceAll('<div class="listadd">+</div>', '');
        var pro3 = pro2.replaceAll('<li style="background-color:#', '-');
        var pro4 = pro3.replaceAll(';"></li></ul>', '');
        var pro5 = pro4.replaceAll(';"></li>', '')
        var pro6 = pro5.replaceAll('"></li></ul>', '')
        var pro7 = pro6.replaceAll('"></li> ', '')
        var pro8 = pro7.replaceAll('"></li>', '')
        var pro9 = pro8.replaceAll(' ', '')

        var copyme = $("#hidden")

        copyme.html("https://" + hostname + "/" + pro9)

        function copyToClipboard(copyme) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val($(copyme).html()).select();
            document.execCommand("copy");
            $temp.remove();
        }

        copyToClipboard(copyme)

        $(".sharetext").html("copied to clipboard!")
        $(".share").addClass("success")

        setTimeout(function() {
            $(".sharetext").html("share link")
            $(".share").removeClass("success")
        }, 5000);
    }

    parsehtml()
    rawhtml = ""
});
  
  function changetheme() {
        if($("body").css("background-color")=="rgb(255, 255, 255)") {
     
        $("meta[name='theme-color']").attr("content", "#ffffff");

      
    console.log("background is white")
  } else {
     
    $("meta[name='theme-color']").attr("content", "#000000");
    
    console.log("background is black")
  }
    
  }


$( ".theme" ).on( "click", function() {
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $("body").toggleClass("light")
    
} else {
  
  $("body").toggleClass("dark")
}
  
});
  
  
  $( "#inserturl" ).on( "keyup change", function() {
    
    window.location.href = $("#inserturl").val();

});
 
  
  
});