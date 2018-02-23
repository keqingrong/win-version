import test from 'ava';
import winVersion from '.';

test('win7', t => {
  t.deepEqual(winVersion('6.1.7601'), {
    major: 6,
    minor: 1,
    build: 7601,
    releaseId: -1,
    revision: 0,
    osBuild: 7601,
    version: 'N/A'
  });
});

test('win10', t => {
  t.deepEqual(winVersion('10.0.16299.214'), {
    major: 10,
    minor: 0,
    build: 16299,
    releaseId: 1709,
    revision: 214,
    osBuild: 16299.214,
    version: 1709
  });
});
