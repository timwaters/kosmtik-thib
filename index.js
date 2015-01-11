exports.Plugin = function (config) {
    config.addJS('/node_modules/kosmtik-thib/front.js');
    config.addCSS('/node_modules/kosmtik-thib/front.css');
    config.on('project:tofront', patchConfig);
    config.on('server:init', function () {
                                            config.server.addProjectRoute('/exportPdf', buttonAction);});
    console.log("PouetPouet");
/*
    config.commands.export = config.opts.command('exportPdf').help('Export a project');
    config.on('command:exportPdf', this.buttonAction);*/


};

var patchConfig = function (e) {
    e.options.compareUrl = e.project.mml.compareUrl ||this.userConfig.compareUrl || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
};


buttonAction = function  (req, res, project) {
    console.log("PouetPouet");
    res.writeHead(200, {
                           
                        });
    res.write('PouetPouet');
    res.end();
};
