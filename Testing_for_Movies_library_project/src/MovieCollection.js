var app= window.app || {};
app.Collections= app.Collections || {};

app.Collections.Movies= Backbone.Collection.extend({
    model:app.Models.Movie,
    url:'/movies',

    getMovieNames:function(){
        return _.uniq(this.pluck('name'));
    },
});