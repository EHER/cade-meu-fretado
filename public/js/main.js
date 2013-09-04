require.config({
    paths: {
        jquery: 'vendor/jquery/jquery.min'
    }
});

function getUpdatedLocation () {
    require(["jquery"], function($) {
        $.get("/location", function (data) {
            console.log(data);
            document.getElementById("content").innerText = JSON.stringify(data);
        });
    });
};

getUpdatedLocation();
window.setInterval(getUpdatedLocation, 30000);
