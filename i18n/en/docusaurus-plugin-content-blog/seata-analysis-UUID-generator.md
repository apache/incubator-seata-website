---
title: Analysis of Seata's Distributed UUID Generator Based on Improved Snowflake Algorithm
author: selfishlover
keywords: [Seata, snowflake, UUID]
date: 2021/05/08
---


# Seata's Distributed UUID Generator Based on Improved Snowflake Algorithm Analysis

Seata incorporates a distributed UUID generator to assist in generating global transaction IDs and branch transaction IDs. The desired characteristics for this generator include high performance, global uniqueness, and trend incrementation.

High performance is self-explanatory, and global uniqueness is crucial to prevent confusion between different global transactions or branch transactions. Additionally, trend incrementation is valuable for users employing databases as the storage tool for TC clusters, as it can reduce the frequency of data page splits, thereby minimizing database IO pressure (the `branch_table` table uses the branch transaction ID as the primary key).

In the older version of Seata (prior to 1.4), the implementation of this generator was based on the standard version of the Snowflake algorithm. The standard Snowflake algorithm has been well-documented online, so we won't delve into it here. If you're unfamiliar with it, consider referring to existing resources before continuing with this article.

Here, we discuss some drawbacks of the standard Snowflake algorithm:
1. **Clock Sensitivity:** Since ID generation is always tied to the current operating system's timestamp (leveraging the monotonicity of time), a clock rollback may result in repeated IDs. Seata's strategy to handle this is by recording the last timestamp and rejecting service if the current timestamp is less than the recorded value (indicating a clock rollback). The service waits until the timestamp catches up with the recorded value. However, this means the TC will be in an unavailable state during this period.

2. **Burst Performance Limit:** The standard Snowflake algorithm claims a high QPS, approximately 4 million/s. However, strictly speaking, this is a bit misleading. The timestamp unit of the algorithm is milliseconds, and the bit length allocated to the sequence number is 12, allowing for 4096 sequence spaces per millisecond. So, a more accurate description would be 4096/ms. The distinction between 4 million/s and 4096/ms lies in the fact that the former doesn't require every millisecond's concurrency to be below 4096. Seata also adheres to this limitation. If the sequence space for the current timestamp is exhausted, it will spin-wait for the next timestamp.

In newer versions (1.4 and beyond), the generator has undergone optimizations and improvements to address these issues effectively. The core idea of the improvement is to decouple from the operating system's timestamp, with the generator obtaining the system's current timestamp only during initialization as the initial timestamp. Subsequently, it no longer synchronizes with the system timestamp. The incrementation is solely driven by the incrementation of the sequence number. For example, when the sequence number reaches its maximum value (4095), the next request causes an overflow of the 12-bit space. The sequence number resets to zero, and the overflow carry is added to the timestamp, incrementing it by 1. Thus, the timestamp and sequence number can be considered as a single entity. In practice, we adjusted the bit allocation strategy for the 64-bit ID, swapping the positions of the timestamp and node ID for easier handling of this overflow carry:

Original Bit Allocation Strategy:
![Original Bit Allocation Strategy](/img/blog/seata/uuid/before.png)

Modified Bit Allocation Strategy (swapping timestamp and node ID):
![Modified Bit Allocation Strategy](/img/blog/seata/uuid/after.png)

This arrangement allows the timestamp and sequence number to be contiguous in memory, making it easy to use an `AtomicLong` to simultaneously store them.

```
/**
 * timestamp and sequence mix in one Long
 * highest 11 bit: not used
 * middle  41 bit: timestamp
 * lowest  12 bit: sequence
 */
private AtomicLong timestampAndSequence;
```
The highest 11 bits can be determined during initialization and remain unchanged thereafter:
```
/**
 * business meaning: machine ID (0 ~ 1023)
 * actual layout in memory:
 * highest 1 bit: 0
 * middle 10 bit: workerId
 * lowest 53 bit: all 0
 */
private long workerId;
```
Producing an ID is then straightforward：
```
public long nextId() {
   // Obtain the incremented timestamp and sequence number
   long next = timestampAndSequence.incrementAndGet();
   // Extract the lowest 53 bits
   long timestampWithSequence = next & timestampAndSequenceMask;
   // Perform a bitwise OR operation with the previously saved top 11 bits
   return workerId | timestampWithSequence;
}
```

At this point, we can observe the following:

1. The generator no longer has a burst performance limit of 4096/ms. If the sequence number space for a timestamp is exhausted, it will directly advance to the next timestamp, "borrowing" the sequence number space of the next timestamp (there is no need to worry about serious consequences of this "advance consumption," as the reasons will be explained below).

2. The generator has a weak dependency on the operating system clock. During runtime, the generator is not affected by clock backtracking (whether it is manually backtracked or due to machine clock drift) because the generator only fetches the system clock once at startup, and thereafter, they no longer stay synchronized. The only possible scenario for duplicate IDs is a significant clock backtracking during restart (either deliberate human backtracking or modification of the operating system time zone, such as changing Beijing time to London time~ Machine clock drift is typically in the millisecond range and won't have such a large impact).

3. Will continuous "advance consumption" cause the generator's timestamps to be significantly ahead of the system timestamps, resulting in ID duplicates upon restart? In theory, yes, but practically almost impossible. To achieve this effect, it would mean that the generator's QPS received must be consistently stable at over 400w/s~ To be honest, even TC can't handle such high traffic, so, the bottleneck is definitely not in the generator.

In addition, we also adjusted the strategy for generating node IDs. In the original version, when the user did not manually specify a node ID, it would take the low 10 bits of the local IPv4 address as the node ID. In practical production, it was found that there were occasional occurrences of duplicate node IDs (mostly users deploying with k8s). For example, the following IPs would result in duplicates:
- 192.168.4.10
- 192.168.8.10

Meaning, as long as the low 2 bits of the fourth byte and the third byte of the IP are the same, duplicates would occur. The new version's strategy is to prioritize taking the low 10 bits from the MAC address of the local network card. If the local machine does not have a valid network card configuration, it randomly picks one from [0, 1023] as the node ID. After this adjustment, it seems that new version users are no longer reporting the same issue (of course, it remains to be tested over time, but in any case, it won't be worse than the IP extraction strategy).

The above is a brief analysis of Seata's distributed UUID generator. If you find this generator useful, you can directly use it in your project. Its class declaration is `public`, and the full class name is:
`io.seata.common.util.IdWorker`

Of course, if you have better ideas, you are also welcome to discuss them with the Seata community.

