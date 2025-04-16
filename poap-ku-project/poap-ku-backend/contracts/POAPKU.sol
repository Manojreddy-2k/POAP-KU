// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract POAPKU is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) private _hasMinted;

    constructor() ERC721("POAP-KU", "PKU") Ownable(msg.sender) {}

    function mint(address to, string memory tokenURI) public onlyOwner {
        _mintInternal(to, tokenURI);
    }

    function publicMint(string memory tokenURI) public {
        _mintInternal(msg.sender, tokenURI);
    }

    function _mintInternal(address to, string memory tokenURI) internal {
        require(!_hasMinted[to], "Already minted");
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _hasMinted[to] = true;
    }

    function _update(address to, uint256 tokenId, address auth)
        internal override returns (address) {
        require(to == address(0) || auth == address(0), "Soulbound");
        return super._update(to, tokenId, auth);
    }
}