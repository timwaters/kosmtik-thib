exports.Plugin = function (config) {
    config.addJS('/node_modules/kosmtik-thib/front.js');
    config.addJS('handlebar.js');
    config.addCSS('/node_modules/kosmtik-thib/front.css');
    config.on('project:tofront', patchConfig);
    config.on('server:init', function () {
                                            config.server.addProjectRoute('/exportPdf', buttonAction);});


};

var patchConfig = function (e) {
    e.options.compareUrl = e.project.mml.compareUrl ||this.userConfig.compareUrl || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
};



buttonAction = function  (req, res, project) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.write('The on-click function is ready');

    var phantom = require('phantom');
    var content = '<div>Content of the printed pdf</div>'

    phantom.create(function(ph){
        ph.createPage(function(page) {
            page.set("paperSize", { format: "A4", orientation: 'portrait', margin: '1cm' });
            page.set('content', content);
            page.render("printedPdf.pdf", function(){
                    console.log("page rendered");
                    ph.exit();
                    })
        })
    });

    res.end();
};