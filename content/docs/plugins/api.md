---
title: Plugins - API Reference
description: API Reference
---

# API Reference

## InputData (Dict[str, Any])
Dictionary mapping input ID to the data propagated to it via its connection.

## OutputData (Dict[str, Any])
Dictionary mapping output ID to the data calculated by the associated node.

## Node
| Attribute | Description                                   | type                   |
| --------- | --------------------------------------------- | ---------------------- |
| id        | Node ID                                       | int                    |
| name      | Node name                                     | str                    |
| inputs    | Dictionary mapping input ID to input info     | Dict[str, InputsInfo]  |
| outputs   | Dictionary mapping output ID to output info   | Dict[str, OutputsInfo] |
| data      | Dictionary mapping control ID to control data | Dict[str, Any]         |

## InputsInfo
| Attribute   | Description                                  | type                      |
| ----------- | -------------------------------------------- | ------------------------- |
| connections | List of all connection going into this input | list[InputConnectionInfo] |

## OutputsInfo
| Attribute   | Description                                        | type                       |
| ----------- | -------------------------------------------------- | -------------------------- |
| connections | List of all connection going away from this output | list[OutputConnectionInfo] |

## InputConnectionInfo
| Attribute | Description                | type |
| --------- | -------------------------- | ---- |
| node      | ID of the origin node      | int  |
| output    | ID of the connected output | str  |

## OutputConnectionInfo
| Attribute | Description               | type |
| --------- | ------------------------- | ---- |
| node      | ID of the connected node  | int  |
| input     | ID of the connected input | str  |