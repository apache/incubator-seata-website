---
title: Nominate Committer Guide
keywords: [Nominate, Committer, guide]
description: Nominate Committer Guide
---

# Nominate Committer Guide

This document mainly introduces how a PPMC member nominates a new committer.

## Discuss the candidate

Start a discuss the candidate via sending email to: <private@seata.apache.org>:

- candidate_name: The full name of the candidate.
- candidate_github_id: The GitHub id of the candidate.

Title:

```
[Discuss] Nomination of ${candidate_name} as a Committer for Apache Seata (Incubating)

```

Content:

```
Hi All,

I'm reaching out to officially nominate ${candidate_name} [1] as a new
committer for Apache Seata (incubating).

${candidate_contributions}


Feel free to share any thoughts or suggestions you might have!

[1]. https://github.com/${candidate_github_id}

Warm regards,

${your_name}
```

## Start vote about the candidate

Start a vote about the candidate via sending email to: <private@seata.apache.org>:

- candidate_name: The full name of the candidate.
- candidate_github_id: The GitHub id of the candidate.
- discussion_thread: The discussion thread URL.
- vote_thread: The vote thread URL.

Title:

```
[VOTE] New committer: ${candidate_name}
```

Content:

```
Hi All,

We've been discussing ${candidate_name} [1] becoming a new committer for our community, as you might have seen in the discussion thread [2]. Now it's time to kick off the official voting process. We'd love for you to cast your vote and let us know if you support bringing ${candidate_name} on board as a new committer. Your input is super important in helping us make this decision.

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
[RESULT] [VOTE] New committer:${candidate_name}
```

Content:

```
Hi All,

The vote for Yongjun Hong to become a new committer has passed, with ${N}  +1
binding votes, no +0 or -1 votes.

${N} (+1 binding)

- XXX
- YYY
- ZZZ

Vote thread: https://lists.apache.org/thread/${vote_thread}

Warm regards,
${your_name}
```

## Send invitation to the candidate

Send an invitation to the candidate and cc <private@seata.apache.org>:

Title:

```
Invitation to become Apache Seata(incubating) committer: ${candidate_name}
```

Content:

```
Hi ${candidate_name},

The Apache Seata Podling Project Management Committee (PPMC) hereby offers
you committer privileges to the project
[as well as membership in the PMC]. These privileges are offered on
the understanding that you'll use them
reasonably and with common sense. We like to work on trust rather than
unnecessary constraints.

Being a committer enables you to more easily make changes without
needing to go through the patch
submission process. [Being a PMC member enables you to guide the
direction of the project.]

Being a committer does not require you to participate any more than
you already do. It does
tend to make one even more committed.  You will probably find that you
spend more time here.

Of course, you can decline and instead remain as a contributor,
participating as you do now.

This personal invitation is a chance for you to accept or decline in private.
Please let us know in reply to this message whether you accept or decline.

If you accept, you will need an Apache account (id) with privileges.
Please follow these instructions.

A. If you already have an ICLA on file:

    1. If you already have an Apache account, let us know your id and
we will grant you privileges on the project repositories.

    2. If you have previously sent an ICLA, let us know the email
address and public name used on the ICLA and your preferred Apache id,
and
we will request your account.

    3. If the email address on the previously submitted ICLA is no
longer valid, let us know the email address and public name used on
the new ICLA,
and your preferred Apache id. Continue to step B below and file your new ICLA.

Look to see if your preferred ID is already taken at
https://people.apache.org/committer-index.html

B. If there is not already an ICLA on file, you need to submit an ICLA:

    1. Details of the ICLA and the forms are found through this link:
https://www.apache.org/licenses/#clas

    2. Instructions for its completion and return to the Secretary of
the ASF are found at
    https://www.apache.org/licenses/contributor-agreements.html#submitting

    Do not copy the project or any other individual on your message to
Secretary, as the form contains Personally Identifiable Information
    that should be kept private.

    3. When you complete the ICLA form, be sure to include in the form
the Apache Seata project and choose a
    unique Apache ID. Look to see if your preferred ID is already
taken at https://people.apache.org/committer-index.html
    This will allow the Secretary to notify the PMC when your ICLA has
been recorded.

When recording of your ICLA is noted, you will receive a follow-up
message with the next steps for  establishing you as a committer.

Warm regards,
${your_name}
```

## Add the candidate to the committer list

After the candidate accepts the invitation and the iCLA is recorded, add the candidate to the committer list by
[whimsy roster tools](https://whimsy.apache.org/roster/ppmc/seata#committers)


## Announcement

Once the nominee accepts the invitation and the commit bit is granted, it's encouraged to send an announcement email
to dev@seata.apache.org to welcome the new committers. Here is an email template:

Title:

```
Welcome new committer: ${candidate_name}
```

Content:

```
Hi Community,

On behalf of the Apache Seata(incubating) PPMC, I am pleased to announce that ${candidate_name} [1], has been voted as a new committer.

Please join me to say congratulations to him !

${candidate_name}, would you please briefly introduce yourself to the community?


[1]. https://github.com/${candidate_github_id}

Warm regards,
${your name}
```
