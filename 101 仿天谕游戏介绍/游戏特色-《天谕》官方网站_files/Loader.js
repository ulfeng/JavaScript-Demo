define([
    'jquery'
    ],function($){

    function Loader(module){
        var percent=Math.random();
        var module=module;
        var items = new Array();
        var errors = new Array();
        var onComplete = function() {};
        var current = 0;
        this.startLoad=function(fn){
            onComplete=fn;
            getImages();
            preloading();
            module.imgLoadStatus="start";
        }
        var preloading = function() {
            for (var i = 0; i < items.length; i++) {
                if(loadImg(items[i]));
            }
        }

        var loadImg = function(url) {
            var imgLoad = new Image();
            $(imgLoad)
            .load(function() {
                completeLoading();
            })
            .error(function() {
                errors.push($(this).attr('src'));
                completeLoading();
            })
            .attr('src', url);
        }

        var getImages = function() {
            var id='#' + module.name + 'Template';
            var html = $(id).html();
            $('#js-img-loader').html(html);
            $('#js-img-loader').find('*:not(script)').each(function() {
                var url = "";

                if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
                    url = $(this).css('background-image');
                    if(url.indexOf('url') != -1) {
                        var temp = url.match(/url\((.*?)\)/);
                        url = temp[1].replace(/\"/g, '');
                    }
                } else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
                    url = $(this).attr('src');
                }
                
                if (url.length > 0) {
                    items.push(url);
                }
            });
            if(module.name=="fly"){
                items=items.concat(module.imagesList);
            }
        }

        var completeLoading = function() {
            current++;
            var per = Math.round((current / items.length) * 100);
            $(".m-page-"+module.name).next().find(".percent").html(per+"%");
            if(current >= items.length) {
                current = items.length;
                loadComplete();
                module.imgLoadStatus="complete";
            }   
        }

        var loadComplete = function() {
            // $(jOverlay).fadeOut(800, function() {
            //     $(jOverlay).remove();
            onComplete(); 
            // });
        }



    }

    
    return Loader;
})