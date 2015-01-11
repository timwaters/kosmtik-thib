L.Kosmtik.ExportPageFormatChooser = L.FormBuilder.Select.extend({

    getOptions: function () {
        return ['A4', 'A3', "letter"].map(function (item) {return [item, item];});
    }

});


L.K.Printer = L.Class.extend({

    shapeOptions: {
        dashArray: '10,10',
        color: '#444',
        fillColor: '#444',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
        stroke: false
    },

    vertexOptions: {
        icon: L.divIcon(),
        draggable: true
    },

    params: {
        showExtent: false,
        format: 'png',
        width: 500,
        height: 500,
        scale: 1,
        zoom: -1,
        pageformat: 'A4'
    },

    editableParams: {
        'xml': [],
        'mml': []
    },
    

    elementDefinitions: {
        showExtent: {handler: L.K.Switch, label: 'Show export extent on the map.'},
        width: {handler: 'IntInput', helpText: 'Width of the export, in px.'},
        height: {handler: 'IntInput', helpText: 'Height of the export, in px.'},
        scale: {handler: L.Kosmtik.ExportScaleChooser, helpText: 'Scale the rendered image.'},
        pageformat: {handler: L.Kosmtik.ExportPageFormatChooseer, helpText: 'Choose the export page format.'}
    },

    initialize: function (map, options) {
        L.setOptions(this, options);
        this.map = map;
        this.elementDefinitions.zoom = {handler: L.K.ExportZoomChooser, helpText: 'Choose the zoom to use', map: map};
        this.elementDefinitions.pageformat = {handler: L.K.ExportPageFormatChooser, helpText: 'Choose the page format to use',  callback: this.buildForm, callbackContext: this};
        this.initSidebar();
        this.initExtentLayer();
    },

    initSidebar: function () {
        var container = L.DomUtil.create('div', 'print-container'),
            title = L.DomUtil.create('h3', '', container),
            formContainer = L.DomUtil.create('div', 'parameters-chooser', container);
        title.innerHTML = 'Print';
        this.builder = new L.K.FormBuilder(this.params, []);
        formContainer.appendChild(this.builder.build());
<<<<<<< HEAD
        
=======

>>>>>>> a3f2a5582f4d999495720476e3c1cb38e8c1c06d
        var submit = L.DomUtil.create('a', 'button', container);
        submit.innerHTML = 'Print Map';
        L.DomEvent
            .on(submit, 'click', L.DomEvent.stop)
            .on(submit, 'click', function () {
                window.location.href = "./exportPdf";
            }, this);
        this.buildForm();
        this.map.sidebar.addTab({
            label: 'Print',
            content: container,
            className: 'printer'
        });
        this.map.sidebar.rebuild();
        this.map.commands.add({
            callback: this.openSidebar,
            context: this,
            name: 'Export: configure'
        });
        
        
    },

    openSidebar: function () {
        this.map.sidebar.open('.printer');
    },

    buildForm: function () {
        var elements = [/*['format', this.elementDefinitions.format],*/['page format', this.elementDefinitions.pageformat]];
        var extraElements = this.editableParams[this.params.format] || [/*'zoom', 'scale',*/ 'showExtent'];
        for (var i = 0; i < extraElements.length; i++) {
            elements.push([extraElements[i], this.elementDefinitions[extraElements[i]]]);
        }
        this.builder.setFields(elements);
        this.builder.build();
    },

    initExtentLayer: function () {
        var center = this.map.getCenter(),
            size = this.map.getSize();
        if (this.params.pageformat === 'A4')   	{this.params.width = 248;
        										this.params.height = 350.8;}
        if (this.params.pageformat === 'A3')   	{this.params.width = 20;
		this.params.height = 20;}
        this.extentLayer = L.featureGroup();
        this.shape = L.polygon([], this.shapeOptions).addTo(this.extentLayer);
        this.leftTop = L.marker(center, this.vertexOptions).addTo(this.extentLayer);
        this.leftBottom = L.marker(center, this.vertexOptions).addTo(this.extentLayer);
        this.rightBottom = L.marker(center, this.vertexOptions).addTo(this.extentLayer);
        this.rightTop = L.marker(center, this.vertexOptions).addTo(this.extentLayer);
        this.extentCaption = L.DomUtil.create('div', 'extent-caption', this.map._panes.markerPane);
        this.setExtentCaptionPosition();
        var formerLat =  0;
        var formerLng =  0;
        this.leftTop.on('drag', function (e) {
        	this.leftBottom.setLatLng([this.leftBottom._latlng.lat, e.target._latlng.lng]);
            this.rightTop.setLatLng([e.target._latlng.lat, this.rightTop._latlng.lng]);
            this.drawFromLatLngs();
        }, this);
        this.leftBottom.on('drag', function (e) {
            this.leftTop.setLatLng([this.leftTop._latlng.lat, e.target._latlng.lng]);
            this.rightBottom.setLatLng([e.target._latlng.lat, this.rightBottom._latlng.lng]);
            this.drawFromLatLngs();
        }, this);
        this.rightBottom.on('drag', function (e) {
            this.leftBottom.setLatLng([e.target._latlng.lat, this.leftBottom._latlng.lng]);
            this.rightTop.setLatLng([this.rightTop._latlng.lat, e.target._latlng.lng]);
            this.drawFromLatLngs();
        }, this);
        this.rightTop.on('drag', function (e) {
            this.rightBottom.setLatLng([this.rightBottom._latlng.lat, e.target._latlng.lng]);
            this.leftTop.setLatLng([e.target._latlng.lat, this.leftTop._latlng.lng]);
            this.drawFromLatLngs();
        }, this);
        this.builder.on('synced', function (e) {
            if (e.field === 'showExtent') this.toggleExtent();
            else if (e.field === 'zoom' ||e.field === 'scale') this.setExtentCaptionContent();
        }, this);
        this.drawFromCenter();
    },

    drawFromCenter: function () {
        var centerPoint = this.map.latLngToLayerPoint(this.map.getCenter()),
            left = centerPoint.x - this.params.width / 2,
            right = centerPoint.x + this.params.width / 2,
            top = centerPoint.y - this.params.height / 2,
            bottom = centerPoint.y + this.params.height / 2,
            leftTop = this.map.layerPointToLatLng([left, top]),
            leftBottom = this.map.layerPointToLatLng([left, bottom]),
            rightBottom = this.map.layerPointToLatLng([right, bottom]),
            rightTop = this.map.layerPointToLatLng([right, top]);
            this.drawFromLatLngs(leftTop, leftBottom, rightBottom, rightTop);
    },

    drawFromLatLngs: function (leftTop, leftBottom, rightBottom, rightTop) {
        leftTop = leftTop ||this.leftTop.getLatLng();
        leftBottom = leftBottom ||this.leftBottom.getLatLng();
        rightBottom = rightBottom ||this.rightBottom.getLatLng();
        rightTop = rightTop ||this.rightTop.getLatLng();
        this.shape.setLatLngs([
            [[90, -180], [-90, -180], [-90, 180], [90, 180]],
            [leftTop, leftBottom, rightBottom, rightTop]
        ]);
        this.leftTop.setLatLng(leftTop);
        this.leftBottom.setLatLng(leftBottom);
        this.rightBottom.setLatLng(rightBottom);
        this.rightTop.setLatLng(rightTop);
        this.setExtentCaptionPosition();
        this.setExtentCaptionContent();
    },

    showExtent: function () {
        this.extentLayer.addTo(this.map);
        if (this.getExtentSize().x) this.drawFromLatLngs();
        else this.drawFromCenter();
        this.map.on('zoomend', this.updateExtentSize, this);
        this.map.on('zoomanim', this._zoomAnimation, this);
        L.DomUtil.addClass(this.extentCaption, 'show');
    },

    hideExtent: function () {
        this.map.removeLayer(this.extentLayer);
        L.DomUtil.removeClass(this.extentCaption, 'show');
        this.map.off('zoomend', this.updateExtentSize, this);
        this.map.off('zoomanim', this._zoomAnimation, this);
    },

    toggleExtent: function () {
        if (this.params.showExtent) this.showExtent();
        else this.hideExtent();
    },

    setExtentCaptionPosition: function () {
        var position = this.map.latLngToLayerPoint(this.leftBottom.getLatLng());
        L.DomUtil.setPosition(this.extentCaption, position);
    },

    setExtentCaptionContent: function () {
        var size = this.getExtentSize();
        this.params.width = size.x;
        this.params.height = size.y;
        var params = this.computeParams();
        this.extentCaption.innerHTML = params.width + "px / " + params.height + "px";
    },

    getExtentSize: function() {
        var topLeft = this.map.latLngToLayerPoint(this.leftTop.getLatLng()),
            bottomRight = this.map.latLngToLayerPoint(this.rightBottom.getLatLng());
        return L.point(Math.abs(bottomRight.x - topLeft.x), Math.abs(bottomRight.y - topLeft.y))
    },

    updateExtentSize: function() {
        this.setExtentCaptionPosition();
        this.setExtentCaptionContent();
    },

    toBBoxString: function () {
        return [
            this.leftBottom.getLatLng().lng,
            this.leftBottom.getLatLng().lat,
            this.rightTop.getLatLng().lng,
            this.rightTop.getLatLng().lat]
    },
<<<<<<< HEAD
    
=======

>>>>>>> a3f2a5582f4d999495720476e3c1cb38e8c1c06d
    computeParams: function () {
        var params = L.extend({}, this.params),
            factor;
        params.bounds = this.toBBoxString();
        params.width = params.width * +params.scale;
        params.height = params.height * +params.scale;
        if (params.zoom != -1) {
            factor = Math.pow(2, Math.abs(params.zoom - this.map.getZoom()));
            if (params.zoom < this.map.getZoom()) factor = 1 / factor;
            params.width = params.width * factor;
            params.height = params.height * factor;
        }
        params.width = Math.round(params.width);
        params.height = Math.round(params.height);
        return params;
    },

    getQueryString: function () {
        return L.K.buildQueryString(this.computeParams());
    },

    _zoomAnimation: function (e) {
        var position = this.map._latLngToNewLayerPoint(this.leftBottom._latlng, e.zoom, e.center).round();
        L.DomUtil.setPosition(this.extentCaption, position);
    }

});

L.K.Map.addInitHook(function () {
    this.whenReady(function () {
        this.exportExtent = new L.K.Printer(this);
    });
});
