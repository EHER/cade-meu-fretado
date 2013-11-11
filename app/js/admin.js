Lungo.init({
    name: 'Cadê o Fretado - Admin',
    history: false
});
var pull = new Lungo.Element.Pull('#home', {
    onPull: "Pull down to refresh",
    onRelease: "Release to get new data",
    onRefresh: "Refreshing...",
    callback: function() {
        require(['updateLocation'], function(update) {
            update();
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

require(['updateLocation'], function(update) {
    update();
    window.setInterval(update, 30000);
});

