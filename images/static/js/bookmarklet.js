(function () {
    let jquery_version = '3.3.1';
    let site_url = 'http://127.0.0.1:8000/';
    let static_url = site_url + 'static/';
    let min_width = 100;
    let min_height = 100;


    function bookmarklet(msg) {
        // Here goes bookmarklet code
        let css = jQuery('<link>');
        css.attr({
            rel: 'stylesheet',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' +
            Math.floor(Math.random()*99999999999999999999)
        });
        jQuery('head').append(css);

        // load HTML
        box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a>' +
            '<h1>Select an image to bookmark:</h1><div class="images"></div></div>';

        jQuery('body').append(box_html);

        // close event
        jQuery('#bookmarklet #close').click(function(){
            jQuery('#bookmarklet').remove();
        });

        // find images and display them
        jQuery.each(jQuery('img[src$="jpg"]'), function(index, image) {
            if (jQuery(image).width() >= min_width && jQuery(image).height()
                >= min_height)
            {
                image_url = jQuery(image).attr('src');
                jQuery('#bookmarklet .images').append('<a href="#"><img src="'+
                    image_url +'" /></a>');
            }
        });
    }

    if(typeof window.jQuery != 'undefined') {
        bookmarklet();
    } else {
        // check for conflicts
        let conflict = typeof window.$ != 'undefined';
        let script = document.createElement('script');
        script.src = '//ajax.googleapis.com/ajax/libs/jquery/' +
            jquery_version + '/jquery.min.js';
        document.head.appendChild(script);
        let attempts = 15;
        (function () {
            if (typeof window.jQuery == 'undefined') {
                if(--attempts > 0) {
                    window.setTimeout(arguments.callee, 250)
                } else {
                    alert('An error occured while loading jQuery')
                }
            } else {
                bookmarklet();
            }
        })()
    }
})();
