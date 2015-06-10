module.exports = {
  friendlyName: 'Open Movie Database Client',
  description: 'Get information about movies and tv shows ',
  extendedDescription: 'The OMDb API is a free web service to obtain movie information, all content and images on the site are contributed and maintained by our users.',
  moreInfoUrl: 'https://stripe.com/docs/api#list_cards',
  cacheable: true,
  sync: false,

  inputs: {
    t: {
      description: 'Movie title to search for.',
      required: true,
      example: 'Game of Thrones',
      friendlyName: 'Title'
    },
    y: {
      description: 'Year of release.',
      required: true,
      example: '2015',
      friendlyName: 'Year'
    },
    plot: {
      description: 'Return short or full plot. (full or short)',
      required: true,
      example: 'short',
      friendlyName: 'Plot'
    },
    r: {
      description: 'The data type to return. (json or xml)',
      required: true,
      example: 'json',
      friendlyName: 'Type'
    }
  },

  defaultExit: 'success',

  exits: {
    success: {
      description: 'Returns the data of the movie/tv show requested',
    },
    error: {
      description: 'Unexpected error occurred.'
    },
    notFound: 'The requested movie / tv show has not found'
  },

  fn: function(inputs, exits) {

    var request = require('superagent');

    request
    .get('http://www.omdbapi.com/')
    .query({ 't': inputs.t,
             'y': inputs.y,
             'plot':inputs.plot || "full",
             'r': inputs.r  || "json"
    })
    .set('Accept', 'application/json')
    .end(function(err, data){
        if(!err){
          return  exits.success(data.body)
        }else{
          return exits.notFound(err)
        }
    })
    .on('error', function(err){
      return exits.error(err)
    })

  }
}
