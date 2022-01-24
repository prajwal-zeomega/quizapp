var FIXTURES = window.FIXTURES || {};

FIXTURES.server = {
    'movies':{
        'ok':[
            '200',
            {'content-type':'application/json'},
            JSON.stringify([FIXTURES.movies.movie1])
        ]
    }
}