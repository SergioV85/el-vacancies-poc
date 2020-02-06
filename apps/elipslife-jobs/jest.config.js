module.exports = {
  name: 'elipslife-jobs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/elipslife-jobs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
