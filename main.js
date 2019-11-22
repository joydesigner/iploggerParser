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
 * main logic to read the log file content, and show the results
 */

fs.readFile(__dirname + '/programming-task-example-data.log', (err, data) => {
  if (err) {
    throw err;
  }
  const dataList = data.toString().split('\n');
  const ipList = dataList.map(rowData => rowData.split(' -')[0]);
  const urlStringList = dataList.map(rowData => rowData.split('"')[1]);

  // unique ip address
  console.log('The number of unique IP addresses is', getUniqElementCountFromList(ipList));

  // top 3 urls
  const urlCountHash = frequencyCountHash(urlStringList);
  const top3Urls = sliceHashByDescend(urlCountHash, 3).map(url => url.split(' ')[1]);
  console.log('The top 3 most visited URLs are', top3Urls);

  // top 3 IPs
  const ipCountHash = frequencyCountHash(ipList);
  const top3Ips = sliceHashByDescend(ipCountHash, 3);
  console.log('The top 3 most active IP addresses are', top3Ips);
});




