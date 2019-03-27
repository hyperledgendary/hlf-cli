// SPDX-License-Identifier: Apache-2.0

const fabricProtos = require('fabric-protos');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function package(file, extract, extractFile) {
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

  if (extract || extractFile) {
    const codePackageBuffer = cdsData.code_package.toBuffer();

    if (extract) {
      process.stdout.write(codePackageBuffer);
    }

    if (extractFile && extractFile.length > 0) {
      try {
        await writeFile(extractFile, codePackageBuffer);
      } catch (err) {
        console.error(`Unable to write code package file ${extractFile}`);
      }
    }
  } else {
    console.log(`Path: ${cdsData.chaincode_spec.chaincode_id.path}`);
    console.log(`Name: ${cdsData.chaincode_spec.chaincode_id.name}`);
    console.log(`Version: ${cdsData.chaincode_spec.chaincode_id.version}`);

    // TODO work out how to get the name of an enum out of protobufjs!!!
    console.log(`Type: ${cdsData.chaincode_spec.type}`);
  }
}

module.exports = {
  package
}
