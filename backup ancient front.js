/*******************************************************************************************************

var TILELAYERS = [
    ['http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 'A4'],
    ['http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 'A3'],
    ['http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', 'A2'],
    ['http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', 'A1'],
    ['http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}', 'American Letter'],

];


L.K.Map.addInitHook(function () {
    this.whenReady(function () {
        var container = L.DomUtil.create('div', 'map-compare-container'),
            title = L.DomUtil.create('h3', '', container),
            params = {
                tms: false,
                url: '',
                suggestedUrl: L.K.Config.project.compareUrl,
                active: false,
                minZoom: this.options.minZoom,
                maxZoom: this.options.maxZoom
            };
        title.innerHTML = 'Print';
        var tilelayer, otherMap,
            init = function () {
                var container = L.DomUtil.create('div', 'print', document.body);
                container.id = 'mapCompare';
                otherMap = L.map(container.id, {attributionControl: false});
                tilelayer = L.tileLayer(L.K.Config.project.compareUrl, params).addTo(otherMap);
                new L.Hash(otherMap);
            };
        var builder = new L.K.FormBuilder(params, [
           ['criteria', {handler: 'Select', helpText: 'Type of data', selectOptions: TILELAYERS }], 
           ['text', {handler: 'BlurInput', helpText: 'Et voila comment on fait'}],
           ['url', {handler: 'BlurInput', helpText: 'Et voila comment on fait'}]
                   ], {id: 'compare-form'});
                   
                   
        // TODO vertical / horizontal view
        var toggle = function () {
            if (params.active) {
                if (!otherMap) init();
                L.DomUtil.addClass(document.body, 'print-on');
                otherMap.invalidateSize();
                this.invalidateSize();
            } else {
                L.DomUtil.removeClass(document.body, 'print-on');
                this.invalidateSize();
            }
        };

    
        var setUrl = function () {
            if (!otherMap) init();
            tilelayer.setUrl(params.url ||params.suggestedUrl);
        };
        builder.on('synced', function (e) {
            if (e.field === 'active') {
                L.bind(toggle, this)();
            } else if (e.field === 'url' ||e.field === 'suggestedUrl') {
                setUrl();
            }
        }, this);
        container.appendChild(builder.build());
        this.sidebar.addTab({
            label: 'Print',
            className: 'compare',
            content: container
        });
        this.sidebar.rebuild();
        var commandCallback = function () {
            params.active = !params.active;
            L.bind(toggle, this)();
            builder.fetchAll();
        };
        this.commands.add({
            keyCode: L.K.Keys.C,
            ctrlKey: true,
            altKey: true,
            callback: commandCallback,
            context: this,
            name: 'Map compare: toggle view'
        });
        this.commands.add({
            callback: function () {this.sidebar.open('.compare');},
            context: this,
            name: 'Map compare: configure'
        });
    });
});
*********************************************************************/

