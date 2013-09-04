define({
    load: function(url){
        var script = document.createElement('script');
        script.src = url;

        document.getElementsByTagName('head')[0].appendChild(script);
        // or document.head.appendChild(script) in modern browsers
    }
});
