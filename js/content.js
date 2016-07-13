//Create page content with Ajax 

var images = [];

var dir = "gallery/";
var fileExt = ".png";
    

$.ajax({

    url: dir,
    success: function( data ){
        $(data).find("a:contains(" + fileExt + ")").each(function (){
            
            //create fileName
           var filename = this.href.replace(window.location.host, "").replace("http://", "");
            
            //create 'div' element and appen the 'img' 
            images.push("<img style='max-height: 50px;'  class='gallery-img' src='" +  filename + "'>");
            var div = $("<div class='row' id='img-div'>")
            var img = $("<img class='img-responsive' src='" +  filename + "'>");
            var title = $("<h1>Title of image</h1>")
            div.append(title);
            div.append(img);
            $("#images").append(div);
            
        });
    }
        
});


