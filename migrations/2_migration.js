const loan = artifacts.require("swap");

module.exports = function (deployer) {
  deployer.deploy(loan);
};