const fs = require('fs');
/**
 * Return the hash table with string as the key, and count number as the value
 * @param {Array} stringList - The array of string.
 */
const frequencyCountHash = (stringList) => stringList.reduce(
  (accumulator, currentStringElement) => {
    if (currentStringElement in accumulator) {
      accumulator[currentStringElement]++;
    } else {
      accumulator[currentStringElement] = 1;
    }
    return accumulator;
  }, {});

/**
 * return Sorted hash table by descent order and slice the list to number n
 * @param {Object} hash - hash table.
 * @param {Number} n - length of list to keep
 */
const sliceHashByDescend = (hash, n) => Object.keys(hash).sort((a, b) => hash[b] - hash[a]).slice(0, n);


/**
 * return all unique element count from a string list
 * @param {Array} list - hash table.
 */

const getUniqElementCountFromList = list => list.filter((ip, index, self) => ip && self.indexOf(ip) === index).length;

/**
 * return all unique element count from a string list
 * @param {Array} list - hash table.
 */

const getUniqElementFromList = list => list.filter((ip, index, self) => ip && self.indexOf(ip) === index);

test('should return the unique IP addresses with 11', done => {
  fs.readFile(__dirname + '/programming-task-example-data.log', (err, data) => {
    if (err) {
      throw err;
    }
    const dataList = data.toString().split('\n');
    const ipList = dataList.map(rowData => rowData.split(' -')[0]);
    const mockUniqIPList = getUniqElementFromList(ipList);
    expect(mockUniqIPList).toHaveLength(getUniqElementCountFromList(ipList));
    done();
  });
});

test('should return the top 3 most visited URLs', done => {
  fs.readFile(__dirname + '/programming-task-example-data.log', (err, data) => {
    if (err) {
      throw err;
    }
    const dataList = data.toString().split('\n');
    const urlStringList = dataList.map(rowData => rowData.split('"')[1]);
    const urlCountHash = frequencyCountHash(urlStringList);
    const top3Urls = sliceHashByDescend(urlCountHash, 3).map(url => url.split(' ')[1]);
    const mockTop3Urls = ['/docs/manage-websites/',
      '/to-an-error',
      '/this/page/does/not/exist/'];
    expect(mockTop3Urls).toEqual(top3Urls);
    done();
  });
});

test('should return the top 3 most active IP addresses', done => {
  fs.readFile(__dirname + '/programming-task-example-data.log', (err, data) => {
    if (err) {
      throw err;
    }
    const dataList = data.toString().split('\n');
    const ipList = dataList.map(rowData => rowData.split(' -')[0]);
    const ipCountHash = frequencyCountHash(ipList);
    const top3Ips = sliceHashByDescend(ipCountHash, 3);

    const mockTop3IPs = ['168.41.191.40', '50.112.00.11', '72.44.32.10'];
    expect(mockTop3IPs).toEqual(top3Ips);
    done();
  });
});