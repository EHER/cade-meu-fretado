Lungo.init({
    name: 'Cadê meu fretado',
    version: '0.0.18',
    history: false
});
var pull_example = new Lungo.Element.Pull('#main-article', {
    onPull: "Pull down to refresh",      //Text on pulling
    onRelease: "Release to get new data",//Text on releasing
    onRefresh: "Refreshing...",          //Text on refreshing
    callback: function() {               //Action on refresh
        pull_example.hide();
    }
});
