pragma solidity ^0.8.12;

import '../pancakeSwapInterface.sol';

contract swap {
    address internal constant pancakeSwapAddress = 0x10ED43C718714eb63d5aA57B78B54704E256024E;

    IPancakeRouter02 public pancakeRouter;
    address internal constant cakeAddress = 0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82;
    constructor(){
        pancakeRouter = IPancakeRouter02(pancakeSwapAddress);
    }

    function bnbToCake() public payable {
        uint deadline = block.timestamp + 15;
        pancakeRouter.swapExactETHForTokens(msg.value, getPath(), msg.sender, deadline);
    }

    function getEstimateBUSD(uint bnb) public view returns(uint[] memory){
        // returnancakeRouter.getAmountIn(bnb, getPath()); p
    }
    function getPath() private view returns(address[] memory) {
        address[] memory path = new address[](2);
        path[0]=pancakeRouter.WETH();
        path[1]=cakeAddress;

        return path;
    }

    receive() payable external{}
}