var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Marketplace = artifacts.require("./Marketplace.sol");
// var OnlineMarketplace = artifacts.require("./OnlineMarketplace.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Marketplace);
  deployer.deploy(Marketplace);
};
