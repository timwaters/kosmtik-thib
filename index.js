exports.Plugin = function (config) {
    //AddFront
    config.addJS('/node_modules/kosmtik-thib/front.js');
    config.addCSS('/node_modules/kosmtik-thib/front.css');
    config.on('project:tofront', patchConfig);
    //Declaring route for the Exportpdf button to call the buttonAction function
    config.on('server:init', function () {
                                            config.server.addProjectRoute('/exportPdf', buttonAction);});
    };

var patchConfig = function (e) {
    e.options.compareUrl = e.project.mml.compareUrl ||this.userConfig.compareUrl || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
};

buttonAction = function  (req, res, project) {
    //Generating the basic new page
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('The on-click function is ready');

    var overpassRequest = "area[name='Montbrun-Bocage'];out body";







    //Pdf generation, we use Phantom
    var phantom = require('phantom');
    //HTML content to be printed into a pdf
    var content = '<div><h1>Content of the printed pdf</h1><h2>Un peu de trucs en sous-titre</h2<p>Plein de teste bien cooolos</p></div>'
    //function to generate pdf
    phantom.create(function(ph){
        ph.createPage(function(page) {
            //page settings
            page.set("paperSize", { format: "A4", orientation: 'portrait', margin: '1cm' });
            //include HTML content
            page.set('content', content);
            page.render("printedPdf.pdf", function(){
                    //success message in console
                    console.log("page rendered");
                    ph.exit();
                    })
        })
    });
    res.end();
};