
// booleans and their associated filenames
const bools = {
  constBool: '~/consts.js',
  configBool: '~/config.js',
  reglistBool: '~/lists/reglist.js',
  adwareBool: '~/lists/adware.js'
};


function findMissingFiles() {
  var missingFiles = [];
  if (constBool == undefined) {
    missingFiles.push(bools.constBool);
  }
  else if (configBool == undefined) {
    missingFiles.push(bools.configBool);
  }
  else if (reglistBool == undefined) {
    missingFiles.push(bools.reglistBool);
  }
  else if (adwareBool == undefined) {
    missingFiles.push(bools.adwareBool);
  }
  else {
    return 'no files missing';
  }
  return missingFiles;
}