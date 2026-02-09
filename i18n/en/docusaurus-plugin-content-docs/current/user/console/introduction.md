---
title: Console Introduction
keywords: [console]
description: Introduction to the Seata Console
---
# Console Introduction

Seata provides a console deployed on the naming server, with the default startup address being [http://localhost:8081](http://localhost:8081), and it integrates an MCP server with the default connection path (/mcp). The Seata console is a visual interface that helps us monitor transaction status, analyze performance bottlenecks, and troubleshoot issues. Through this console, we can view detailed information about distributed transactions in real time, including the initiator, participants, and transaction status. Meanwhile, users can connect to the MCP server of the console via MCP Client and use its built-in transaction management, lock management, and other tools for AI-assisted management and control. 

Currently, the Seata console mainly provides the following functions:
1. Manual control of distributed transactions
2. Controlling global locks in AT mode
3. MCP tool service: This function provides a powerful toolset through the MCP protocol, mainly supporting manual control of distributed transactions and management of global locks in AT mode, facilitating AI-assisted operation and maintenance.
4. Visual Saga state machine process design engine
