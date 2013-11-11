Lungo.init({
    name: 'Cadê o Fretado',
    history: false
});

var pull = new Lungo.Element.Pull('#home', {
    onPull: "Pull down to refresh",
    onRelease: "Release to get new data",
    onRefresh: "Refreshing...",
    callback: function() {
        require(['refreshLocation'], function(refresh) {
            refresh();
        });
        pull.hide();
    }
});

Lungo.dom('#map').on('load', function(event){
    require(['refreshMap'], function (refresh) {
        refresh();
        window.setInterval(refresh, 30000);
    });
});

require(['refreshLocation'], function(refresh) {
    refresh();
    window.setInterval(refresh, 30000);
});

require(['jquery.timeago.pt-br'], function () {
    $(".timeago").timeago();
});
