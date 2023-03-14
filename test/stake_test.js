const{ ethers, network } =require("hardhat");
const { expect } =require("chai");

const SECONDS_IN_A_DAY = 86400;

async function moveBlocks(amount) {
  console.log("Moving blocks...");
  for (let index = 0; index < amount; index++) {
    await network.provider.send("evm_mine", []); // n/w module allows us to do some modification(mooving the blocks) on network
  }
  console.log(`Moved ${amount} blocks.`);
}

async function moveTime(amount) {
  console.log("Moving time...");
  await network.provider.send("evm_increaseTime", [amount]);
  console.log(`Moved forward in time ${amount} seconds.`);
}

describe("Staking Tests", async function () {
  let staking ;
  let RewardToken;
  let deployer;
  let stakeAmount;

  beforeEach(async function () {
    const accounts = await ethers.getSigners(); // all the accounts details in hardhat stores in this variable and ethers.getSigners() returns array of accounts object of hardhat
    deployer = accounts[0];

    const _rewardToken = await ethers.getContractFactory("RewardToken"); /*equivalent to contract
    as its make the js object of an abi
    */

    RewardToken = await _rewardToken.deploy();  /* object of deployed contract which include address
     where it is deployed  and we can interact with an abi through this
    
    */
    console.log("Before stake( accounts[0]): "+await RewardToken.balanceOf(accounts[0].address));

    const _staking = await ethers.getContractFactory("staking");
    staking = await _staking.deploy(RewardToken.address, RewardToken.address);
    stakeAmount = ethers.utils.parseEther("100000"); //  internal wei conversion facility

  });



  
// it's are the test cases
  it("should be able to stake tokens", async function () {
    await RewardToken.approve(staking.address, stakeAmount);
    await staking.stake(stakeAmount);  /* here accounts[0] is the caller of stake function and 
    SC call transferFrom so we need approval of deployer to send tokens on behalf of it */

    const deployerAddress = deployer.getAddress();
    const startingEarned = await staking.earned(deployerAddress);
    console.log("After stake (accounts[0]): "+await RewardToken.balanceOf(deployer.address));

    console.log(`Starting Earned: ${startingEarned}`);

    await moveTime(SECONDS_IN_A_DAY);
    await moveBlocks(1);

    const endingEarned = await staking.earned(deployerAddress);
    console.log(`Ending Earned: ${endingEarned}`);

    expect(startingEarned).to.be.equal(0);
    expect(endingEarned).to.be.equal(8600000); // should be 8640000 check again
  });




});
// correct calc.
//1000000000000000000000000
//900000000000000000000000