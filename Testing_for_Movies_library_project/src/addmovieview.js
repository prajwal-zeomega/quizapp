var app = window.app || {};

app.Views = app.Views || {};


app.Views.AddMovie = Backbone.View.extend({

    template: Handlebars.compile($('#add-movie-tmpl').html()),
    events: {
        'click .save-movie': 'saveMovie'
    },

    initialize: function () {

        if (!this.model) {
            this.model = new app.Models.Movie();
        }
    },


    render: function () {
        var data = this.model.toJSON();
        this.$el.html(this.template(data));
        return this;
    },

    saveMovie: function () {
        this.model.set('name', this.$('.movie-name').val());
        this.model.set('rating', this.$('.rating').val());
        this.model.set('genre', this.$('.genre').val());
        this.model.set('comment', this.$('.comment').val());
    }

});