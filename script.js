String.prototype.replaceArray = function(find, replace) {
    var replaceString = this;
    for (var i = 0; i < find.length; i++) {
        replaceString = replaceString.replace(find[i], replace[i]);
    }
    return replaceString;
};

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}



var el = 0;
var ed = 0;
var a = location.href;

var hostname = $('<a>').prop('href', a).prop('hostname');


console.log(hostname)

var urlstring = ""

var colorList = null;
var colorItems = null;

var rawhtml = ""

var title = null;

if (a.indexOf("?") > -1) {
    console.log("has a q");

    $(".share").addClass("shareshow")

    colorList = a.split("?");

    // title = a.split('&')[1];

    // console.log(title)

    // $("h1").html(decodeURI(title))

    colorList.shift();

    // console.log(colorList)

    var colorItems = colorList.map(myFunction);

    function myFunction(value, index, array) {
        return colorList[index].split("-");
    }

    console.log(colorItems);

    //this worked, kind of

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
});

$("#x").on("click", function() {
    $(".colorpicker").removeClass("colorpickershow");
    $("li").removeAttr("class")
});

$("#addcolor").on("click", function() {
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

    console.log("add color clicked")
});

$(".listcontainer").on("click", ".listadd", function() {

    $("#addcolor").addClass("add");

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

            console.log(this);

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

//add add to color list 

var colorPicker = new iro.ColorPicker("#iro", {
    // Set the size of the color picker
    width: 200,
    // Set the initial color to pure red
    color: "#0593ff"
});


function onColorChange(color) {
    console.log(colorPicker.color.hexString)
    $("#inserthex").val(colorPicker.color.hexString)
    $("#colorpreview").css("background-color", colorPicker.color.hexString)

}

colorPicker.on('color:change', onColorChange);


$("#inserthex").on("change keyup", function() {

    if ($("#inserthex").val().length == 7) {

        colorPicker.color.hexString = $("#inserthex").val();
        console.log("changed")
        $("#colorpreview").css("background-color", $("#inserthex").val())

    }
});


$(".colorlist").each(function(index) {
    $(this).append("<div class='listadd'>+</div>")
});




$(".listcontainer").on("click", "li", function() {

    $("#addcolor").addClass("ed");

    $("#delete").addClass("deleteshow")

    var thishex = rgb2hex($(this).css("background-color"))

    console.log(thishex)

    ed = $(this)
    $("li").removeClass("min")
    ed.addClass("min")

    $(".colorpicker").addClass("colorpickershow");
    $("#addcolor").html("save changes");
    $("#addcolor").removeClass("cl");

    colorPicker.color.hexString = thishex;

    console.log($(this).css("background-color"))

    $("#addcolor").on("click", function() {




        if ($("#addcolor").hasClass("ed")) {

            $(".colorpicker").removeClass("colorpickershow");


            // ed.css("background-color",colorPicker.color.hexString)

            ed.attr("style", "background-color:" + colorPicker.color.hexString)


            // ed.style.backgroundColor = colorPicker.color.hexString

            ed = 0;

            $("li").removeAttr("class")

            $("#addcolor").removeClass("ed")

        }
    });




    $("#delete").on("click", function() {

        $(".colorpicker").removeClass("colorpickershow");


        if ($("#addcolor").hasClass("ed")) {


            // ed.css("background-color", "black")

            ed.remove()

            ed = 0;

            $("li").removeAttr("class")

            $("#addcolor").removeClass("ed")
            $("#delete").removeClass("deleteshow")
        }


        $("ul").each(function(index) {

            if ($(this).children("li").length == 0) {

                $(this).remove()

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
        console.log("https://" + hostname + "/" + pro9)


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
        $(".sharetext").addClass("success")


        setTimeout(function() {
            $(".sharetext").html("share link")
            $(".sharetext").removeClass("success")
        }, 3000);


    }

    parsehtml()
    rawhtml = ""


});