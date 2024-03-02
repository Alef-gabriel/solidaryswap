// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";

contract ProjectTable is ERC721Holder {
    // Store relevant table info
    uint256 private _project_tableId;
    string private constant _TABLE_PREFIX = "table_attributes"; // Custom table prefix
    //auto_increment
    //Houdini graphql
    constructor() payable {
        _createTable();
    }

    function _createTable() private {
        _project_tableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
               "id int primary key,"
                "title text,"
                "description text,"
                "data text,"
                "location text,"
                "user_tableId text",
               _TABLE_PREFIX
            )
        );
    }

    function insertIntoTable(string memory query) external {
        TablelandDeployments.get().mutate(
            address(this), // Table owner, i.e., this contract
            _project_tableId,
            SQLHelpers.toInsert(
                _TABLE_PREFIX,
                _project_tableId,
                "id,title,description,data,location,user_tableId",
                query
            )
        );
    }

    // Update only the row that the caller inserted
    function updateTable(uint256 id, string memory query) external {
        // Set the values to update
        string memory filters = string.concat(
            "id=",
            Strings.toString(id)
        );
        // Mutate a row at `id` with a new `val`
        TablelandDeployments.get().mutate(
            address(this),
            _project_tableId,
            SQLHelpers.toUpdate(_TABLE_PREFIX, _project_tableId, query, filters)
        );
    }

    function deleteFromTable(uint256 id) external {
        // Specify filters for which row to delete
        string memory filters = string.concat(
            "id=",
            Strings.toString(id)
        );
        // Mutate a row at `id`
        TablelandDeployments.get().mutate(
            address(this),
            _project_tableId,
            SQLHelpers.toDelete(_TABLE_PREFIX, _project_tableId, filters)
        );
    }

    // Set the ACL controller to enable row-level writes with dynamic policies
    function setAccessControl(address controller) external {
        TablelandDeployments.get().setController(
            address(this), // Table owner, i.e., this contract
            _project_tableId,
            controller // Set the controller address—a separate controller contract
        );
    }

    function getTableId() external view returns (uint256) {
        return _project_tableId;
    }

    function getTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_TABLE_PREFIX, _project_tableId);
    }
}
