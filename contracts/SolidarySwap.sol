// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {ProjectsTable} from "./ProjectsTable.sol";
import {UsersTable} from "./UsersTable.sol";
contract SolidarySwap is ERC721Holder {
	address private _projects;
	address private _users;

	constructor () {
		//create ProjectsTable contract its equal to _projects
		ProjectsTable project = new ProjectsTable();
		_projects = address(project);
		//create UsersTable contract its equal to _users
		UsersTable user = new UsersTable();
		_users = address(user);
	}
	function getProjectsContractId() external view returns (address) {
        return _projects;
    }

	function getUsersContractId() external view returns (address) {
        return _users;
    }
}