define([
  "text!templates/map.html",
  "assets/js/leaflet.js",
  "lib/sockets.js",
  "models/user.js",
  "models/createUser.js",
  "collections/users.js"
], function(template, leaflet, Sockets, User, CreateUser, UsersCollection){
  return Backbone.View.extend({
    tagName: "div",
    template: Handlebars.compile(template),
    usersCollection: [],

    initialize: function() {
      debugger
    },

    events: {

    },


    setPosition: function(position) {
      return position;
    },

    setMap: function(position) {
      console.log(position);
    },

    setGeo: function(geo) {
      this.geo = geo;
    },
    createUser: function(geo, instrument, genre) {
      var jsonUsers = JSON.parse(users);
      var meIcon = L.icon({
            iconUrl: 'assets/img/icon512/me.png',

            iconSize:     [38, 95], // size of the icon
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      for(var i = 0; i < jsonUsers.length; i++){
        var marker = L.marker([jsonUsers[i].pos.lon, jsonUsers[i].pos.lat]);
        marker.addTo(window.map);
        console.log(jsonUsers[i]);
        this.usersCollection.push({
          inst: jsonUsers[i].inst
        });
      }
      this.geo = geo;
      console.log(instrument + genre);
      console.log(geo);
      var user = new User({
        inst: instrument,
        genr: genre,
        pos: {
          lat: geo.coords.latitude.toString(),
          lon: geo.coords.longitude.toString()
        },
        uid: new Date().getTime().toString()
      });
      var createUser = new CreateUser({
        model: user
      });
      sendMessage(createUser);
      this.render();
    },

    render: function() {
      this.$el.html( this.template({geo: this.geo, users: this.usersCollection}) );

      this.delegateEvents();
      return this;
    },
  });
});
