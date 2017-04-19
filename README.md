# timelion-usafacts

A function for grabbing series data from usafacts.org

### .usafacts(id)
- **id** The USAFacts.org metric ID. You can get this from the URL. For example, in `http://usafacts.org/metrics/13131`, the id would be `13131`

## Installing
As tI don't publish package for this as it is a big experiment and will probably break soon, but installing directly from Github is fairly simple:

1. cd to your `kibana/plugins` directory.
2. `wget https://github.com/rashidkpc/timelion-usafacts/archive/master.zip`
3. `unzip master.zip`
4. `rm kibana-usafacts-master/gulpfile.js` (This is a dev environment thing. Kibana won't start if you don't remove `gulpfile.js`)
4. Start kibana (and delete that master.zip if you want, or not, it won't break anything)
