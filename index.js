'use strict';
const {
  execSync
} = require('child_process');
const os = require('os');
const winReleaseId = require('win-release-id');

const getWinOSRelease = () => {
  try {
    // Reference: https://en.wikipedia.org/wiki/Ver_(command)
    // "\r\nMicrosoft Windows [Version 10.0.16299.214]\r\n" => "10.0.16299.214"
    return execSync('ver', {
      encoding: 'utf-8'
    }).replace(/[^\d\.\-]/g, '');
  } catch (err) {
    return os.release();
  }
}

const getWinVersion = (release) => {
  // Windows version form: `<major version>.<minor version>.<build number>.<revision>`
  const osRelease = (release || getWinOSRelease()).split('.');
  const majorVersion = parseInt(osRelease[0], 10);
  const minorVersion = parseInt(osRelease[1], 10);
  const buildNumber = parseInt(osRelease[2], 10);
  const revision = parseInt(osRelease[3], 10) || 0;
  const osBuild = parseFloat(`${buildNumber}.${revision}`);
  const releaseId = winReleaseId(release);

  return {
    major: majorVersion,
    minor: minorVersion,
    build: buildNumber,
    releaseId: releaseId,
    revision: revision,
    osBuild: osBuild,
    version: releaseId > 0 ? releaseId : 'N/A'
  }
};

module.exports = getWinVersion;
