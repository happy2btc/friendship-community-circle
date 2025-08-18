// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SmilieCoin is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    mapping(address => bool) public hasMinted;

    constructor() ERC721("SmilieCoin", "SMILE") {}

    function mintSmilie(address recipient, string memory tokenURI) external onlyOwner {
        require(!hasMinted[recipient], "Recipient already has a Smilie Coin");

        uint256 tokenId = nextTokenId;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);

        hasMinted[recipient] = true;
        nextTokenId++;
    }

    function _transfer(address from, address to, uint256 tokenId) internal pure override {
        revert("Smilie Coins are soulbound and cannot be transferred");
    }

    function approve(address to, uint256 tokenId) public pure override {
        revert("Approval not allowed for soulbound tokens");
    }

    function setApprovalForAll(address operator, bool approved) public pure override {
        revert("Approval for all not allowed for soulbound tokens");
    }
}
