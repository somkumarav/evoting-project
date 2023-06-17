// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    uint public candidatesCount;

    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }
    
    struct Voter{
        address voterAddress;
        bool voted;
        bool isValue;
    }

    mapping(uint=> Candidate) public candidates;
    mapping(address => Voter) public voters;
    
    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
    
    
    function addCandidate(string memory _name, string memory _party) public{
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0);
    }


    function addVoter() public {
        if(!voters[msg.sender].isValue){
            voters[msg.sender] = Voter(msg.sender,  false, true);
        }
    }
    
    
    function vote(uint _candidateId) public {
        require(!voters[msg.sender].voted, "You have already voted");
        require(candidates[_candidateId].id != 0, "Candidate does not exist");
        voters[msg.sender].voted= true;
        candidates[_candidateId].voteCount++;
    }
}
