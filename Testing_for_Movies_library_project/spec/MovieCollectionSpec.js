describe('Movie Collection',function(){

    var fakeServer;

    beforeEach(function(){
        fakeServer= sinon.fakeServer.create();
        fakeServer.respondImmediately = true;
    })

    afterEach(function(){
        fakeServer.restore();
    }),

    it ('should exist',function(){
        expect(app.Collections.Movies).toBeDefined();
    }),

    it('checking all movies names',function(){
        var movies = new app.Collections.Movies([
            FIXTURES.movies.movie1,
            FIXTURES.movies.movie2,
            FIXTURES.movies.movie1,
            FIXTURES.movies.movie3,
            FIXTURES.movies.movie4
        ])
        expect(movies.getMovieNames()).toEqual(['Rajvishnu','spider man no way home','Jaggu','Aana'])
    }),

    it('should have a remote data source',function(){
        var movies= new app.Collections.Movies();
        expect(movies.url).toBeDefined();
    }),
    xit('should populate data from back end',function(){
        var movies= new app.Collections.Movies();
        var fakeServer = sinon.fakeServer.create();
        fakeServer.respondWith('/movies', ['200',{'Content-Type': 'application/json'},
          JSON.stringify([FIXTURES.movies.movie1])
        ]);
        movies.fetch();
        fakeServer.respond();
        expect(movies.length).toBeGreaterThan(0);
        fakeServer.restore();
    }),

    it('should populate data from the back end', function() {
        var movies = new app.Collections.Movies();
        fakeServer.respondWith('/movies', FIXTURES.server.movies.ok);
        movies.fetch();
        expect(movies.length).toBeGreaterThan(0);
      });
})