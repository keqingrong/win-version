'use strict';
const {
  execSync
} = require('child_process');
const os = require('os');

const getWinOSRelease = () => {
  try {
    // Reference: https://en.wikipedia.org/wiki/Ver_(command)
    // "\r\nMicrosoft Windows [Version 10.0.16299.214]\r\n" => "10.0.16299.214"
    return execSync('ver', {
      encoding: 'utf-8'
    }).replace(/\s|\[|\]|[A-Za-z]/g, '');
  } catch (err) {
    return os.release();
  }
}

// Reference:
// https://technet.microsoft.com/en-us/windows/release-info.aspx
// http://windows.microsoft.com/en-us/windows-10/update-history-windows-10
// https://en.wikipedia.org/wiki/Windows_10
// [build number, version number]
const releaseInfo = new Map([
  [16299, 1709], // Redstone 3, Fall Creators Update
  [15254, 1709], // * Windows 10 Mobile
  [15063, 1703], // Redstone 2, Creators Update
  [14393, 1607], // Redstone 1, Anniversary Update
  [10586, 1511], // Threshold 2, November Update
  [10240, 1507] // Threshold 1
]);

const getWinVersion = (release) => {
  // Windows version form: `<major version>.<minor version>.<build number>.<revision>`
  const osRelease = (release || getWinOSRelease()).split('.');
  const majorVersion = parseInt(osRelease[0], 10);
  const minorVersion = parseInt(osRelease[1], 10);
  const buildNumber = parseInt(osRelease[2], 10);
  const revision = parseInt(osRelease[3], 10) || 0;
  const osBuild = parseFloat(`${buildNumber}.${revision}`);
  const verison = majorVersion === 10 ? releaseInfo.get(buildNumber) : 'N/A';

  return {
    major: majorVersion,
    minor: minorVersion,
    build: buildNumber,
    revision: revision,
    osBuild: osBuild,
    version: verison
  }
};

module.exports = getWinVersion;
