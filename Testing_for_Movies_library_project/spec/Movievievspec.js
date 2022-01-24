describe('A Movie view', function () {

    var addMovieView;

    beforeEach(function () {
        addMovieView = new app.Views.AddMovie();
        addMovieView.render();
        addMovieView.$el.appendTo('body');
    });

    afterEach(function () {
        addMovieView.$el.remove();
    });


    it('should have an editable field for name', function () {
        expect(addMovieView.$el).toContainElement('input.movie-name');
    });
    it('should have an editable field for rating', function () {
        expect(addMovieView.$el).toContainElement('input.rating');
    });
    it('should have an editable field for genre', function () {
        expect(addMovieView.$el).toContainElement('input.genre');
    });
    it('should have an editable field for comment', function () {
        expect(addMovieView.$el).toContainElement('input.comment');
    });


    it('should update the model when clicking save', function () {
      
        var movieName = 'Raj';
        var rating = '4.3'
        var genre = 'comedy'
        var comment = 'Good'
        addMovieView.$('.movie-name').val(movieName);
        addMovieView.$('.rating').val(rating);
        addMovieView.$('.genre').val(genre);
        addMovieView.$('.comment').val(comment);
        
        addMovieView.$('.save-movie').click();
        expect(addMovieView.model.get('name')).toEqual(movieName);
        expect(addMovieView.model.get('rating')).toEqual(rating);
        expect(addMovieView.model.get('genre')).toEqual(genre);
        expect(addMovieView.model.get('comment')).toEqual(comment);
    });
});