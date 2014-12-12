exports.Plugin = function (config) {
    config.addJS('/node_modules/kosmtik-thib/front.js');
    config.addCSS('/node_modules/kosmtik-thib/front.css');
    config.on('project:tofront', patchConfig);
};

var patchConfig = function (e) {
    e.options.compareUrl = e.project.mml.compareUrl || this.userConfig.compareUrl || 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
};
