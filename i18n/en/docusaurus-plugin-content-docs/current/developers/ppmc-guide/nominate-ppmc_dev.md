---
title: Nominate PPMC member Guide
keywords: [Nominate, PPMC, guide]
description: Nominate PPMC member Guide
---

# Nominate PPMC member Guide

This document mainly introduces how a PPMC member nominates a new PPMC member.

## Discuss the candidate

Start a discuss the candidate via sending email to `private@seata.apache.org`:

- candidate_name: The full name of the candidate.
- candidate_github_id: The GitHub id of the candidate.

Title:

```
[Discuss] Nomination of ${candidate_name} as a PPMC member for Apache Seata (Incubating)

```

Content:

```
Hi All,

I'm reaching out to officially nominate ${candidate_name} [1] as a new
PPMC member for Apache Seata (incubating).

${candidate_contributions}


Feel free to share any thoughts or suggestions you might have!

[1]. https://github.com/${candidate_github_id}

Warm regards,

${your_name}
```

## Start vote about the candidate

Start a vote about the candidate via sending email to `private@seata.apache.org`:

- candidate_name: The full name of the candidate.
- candidate_github_id: The GitHub id of the candidate.
- discussion_thread: The discussion thread URL.
- vote_thread: The vote thread URL.

Title:

```
[VOTE] New PPMC member: ${candidate_name}
```

Content:

```
Hi All,

We've been discussing ${candidate_name} [1] becoming a new PPMC member for our community, as you might have seen in the discussion thread [2]. Now it's time to kick off the official voting process. We'd love for you to cast your vote and let us know if you support bringing ${candidate_name} on board as a new PPMC member. Your input is super
important in helping us make this decision.

Voting ends one week from today.

Please vote accordingly:

[ ] +1 approve

[ ] +0 no opinion

[ ] -1 disapprove (and the reason)

[1]. https://github.com/${candidate_github_id}
[2]. https://lists.apache.org/thread/${discussion_thread}

Warm regards,
${your_name}
```


After at least 3 `+1` binding vote and no veto, claim the vote result:

Title:

```
[RESULT] [VOTE] New PPMC member:${candidate_name}
```

Content:

```
Hi All,

The vote for ${candidate_name} to become a new PPMC member has passed, with ${N}  +1 binding votes, no +0 or -1 votes.

${N} (+1 binding)

- XXX
- YYY
- ZZZ

Vote thread: https://lists.apache.org/thread/${vote_thread}

Warm regards,
${your_name}
```

## Send invitation to the candidate

Send an invitation to the candidate and cc `private@seata.apache.org`:

Title:

```
Invitation to become Apache Seata(incubating) PPMC member: ${candidate_name}
```

Content:

```
Hi ${candidate_name},

The Seata Podling Project Management Committee (PPMC)  hereby offers
you membership in the PPMC. These privileges are  offered on the
understanding that you'll use them reasonably and with common sense.
We like to work on trust rather than unnecessary constraints.

Of course, you can decline and instead remain as a contributor,
participating as you do now.

This personal invitation is a chance for you to accept or decline in private.
Please let us know in reply to this message whether you accept or decline.

Warm regards,
${your_name}
```

## Add the candidate to the PMC list

After the candidate accepts the invitation and the iCLA is recorded, add the candidate to the PMC list by [whimsy
roster tools](https://whimsy.apache.org/roster/ppmc/seata#pmc)


## Announcement

Once the nominee accepts the invitation and the commit bit is granted, it's encouraged to send an announcement email to `dev@seata.apache.org` to welcome the new PPMC member. Here is an email template:

Title:

```
Welcome new PPMC member: ${candidate_name}
```

Content:

```
Hi Community,

On behalf of the Apache Seata(incubating) PPMC, I am pleased to announce that ${candidate_name} [1], has been voted as a new PPMC member.

Please join me to say congratulations to him !

${candidate_name}, would you please briefly introduce yourself to the community?


[1]. https://github.com/${candidate_github_id}

Warm regards,
${your name}
```
