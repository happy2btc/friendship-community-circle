// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AffirmationScroll
 * @dev Soulbound tokens that honor arrival, connection, and stewardship.
 * Each scroll is a ceremonial witness of care, minted with intention and rooted in presence.
 */
contract AffirmationScroll is ERC721URIStorage, Ownable {
    uint256 public nextScrollId;

    mapping(address => bool) public hasBeenWitnessed;

    constructor() ERC721("AffirmationScroll", "AFFIRM") {}

    /**
     * @dev Mint a soulbound scroll to a soul address with a metadata URI.
     * Can only be called by the contract steward (owner).
     */
    function witnessAffirmation(address soul, string memory scrollURI) external onlyOwner {
        require(!hasBeenWitnessed[soul], "This soul has already been witnessed");

        uint256 scrollId = nextScrollId;
        _safeMint(soul, scrollId);
        _setTokenURI(scrollId, scrollURI);

        hasBeenWitnessed[soul] = true;
        nextScrollId++;
    }

    /**
     * @dev Prevent transfer of scrolls. They are rooted in presence.
     */
    function _transfer(address from, address to, uint256 tokenId) internal pure override {
        revert("Affirmation Scrolls are soulbound and cannot be transferred");
    }

    /**
     * @dev Prevent approval. These scrolls are sacred and non-transferable.
     */
    function approve(address to, uint256 tokenId) public pure override {
        revert("Approval not allowed for soulbound scrolls");
    }

    function setApprovalForAll(address operator, bool approved) public pure override {
        revert("Delegation not allowed for soulbound scrolls");
    }
}
