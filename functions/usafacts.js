var alter = require('../../../src/core_plugins/timelion/server/lib/alter.js');
var Datasource = require('../../../src/core_plugins/timelion/server/lib/classes/datasource');
var moment = require('moment');
const fetch = require('node-fetch');
fetch.Promise = require('bluebird');

var _ = require('lodash');

module.exports = new Datasource('usafacts', {
  args: [
    {
      name: 'id',
      help: 'The ID of the metric you want to grab. Get this from the URL of the usafacts.org page',
      types: ['number'],
    },
    {
      name: 'label',
      types: ['string', 'null']
    }
  ],
  aliases: ['yfi'],
  help: 'Get metric data from USAFacts.org',
  fn: function randomFn(args, tlConfig) {

    // curl
    // 'http://staging-usafacts-apiv2.azurewebsites.net/api/v2/metrics?ids=12372,12557,12335,12520,12409,12446,12780,12669,12632,12706,12743,12297,12260'
    // -H 'Authorization: Basic d9448c61-936d-4717-8aa8-cba9a4903d57'

    const config = _.defaults(args.byName, {
      id: 12818
    });

    const time = {
      min:  moment.utc(tlConfig.time.from),
      max:  moment.utc(tlConfig.time.to)
    };

    const URL = 'http://staging-usafacts-apiv2.azurewebsites.net/api/v2/metrics?ids=' + config.id;

    return fetch(URL, {
      headers: {
        Authorization: 'Basic d9448c61-936d-4717-8aa8-cba9a4903d57'
      }
    }).then(function (resp) { return resp.text(); }).then(resp => JSON.parse(resp)).then(function (resp) {
      const metric = resp[0];
      const label = metric.name;
      const data = _.map(metric.data, point => {
        return [moment(point.x, 'YYYY').valueOf(), point.y];
      });

      return {
        type: 'seriesList',
        list: [{
          data:  data,
          type: 'series',
          fit: 'nearest',
          label: label
        }]
      };
    }).catch(function (e) {
      throw e;
    });
  }
});
