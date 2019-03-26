// SPDX-License-Identifier: Apache-2.0

const fabricProtos = require('fabric-protos');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function package(file) {
  let cdsBuffer;
  let cdsData;

  try {
    cdsBuffer = await readFile(file);
  } catch (err) {
    console.error(`Unable to read package file ${file}`);
  }

  try {
    cdsData = fabricProtos.protos.ChaincodeDeploymentSpec.decode(cdsBuffer);
  } catch (err) {
    console.error(`Unable to decode package file ${file}`);
  }

  console.log(`Path: ${cdsData.chaincode_spec.chaincode_id.path}`);
  console.log(`Name: ${cdsData.chaincode_spec.chaincode_id.name}`);
  console.log(`Version: ${cdsData.chaincode_spec.chaincode_id.version}`);

  // TODO work out how to get the name out of protobufjs!!!
  console.log(`Type: ${cdsData.chaincode_spec.type}`);

  // TODO list contents
}

module.exports = {
  package
}
