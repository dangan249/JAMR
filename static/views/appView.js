define([
  "views/geoView",
  "views/genreView",
  "views/mapView",
  "views/instrumentView"
], function(GeoView, GenreView, MapView, InstrumentView){
  return Backbone.View.extend({
    tagName: "div",

    initialize: function () {
      console.log("appView initialized");
      this.geo = "";
      var self = this;

      if (navigator.geolocation) {
        var pos = navigator.geolocation.getCurrentPosition(function(position) {
          self.geo = position;
        });
        console.log(pos);
      } else {
        console.log('cannot get location');
      }
      this.subView = new GeoView();
      this.render();
    },

    events: {
      "geo" : "gotoGeo",
      "instr": "instr",
    },

    render: function() {
      this.$el.html(this.subView.$el);
    },
    map: function(instrument, genre) {
      console.log(instrument + genre);
      var mapView = new MapView();
      console.log(this.geo);
      mapView.createUser(this.geo, instrument, genre);
      mapView.render();
      this.$el.html(mapView.$el);      
    },
    instr: function(){
      this.subView = new InstrumentView();
      this.render();
    },
    genre: function(instrument) {
      this.subView = new GenreView();
      this.subView.setInstrument(instrument);
      this.render();
    }
  });
});


