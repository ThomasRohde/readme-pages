---
title: "The Verification Deficit"
date: 2026-03-26
description: "Generation is getting cheaper. Verification is getting harder. Most organisations still treat this asymmetry as someone else's problem."
tags: ["verification", "governance", "trust", "ai", "enterprise-architecture"]
---

Most discussions about AI focus on what it can generate. The harder question is what it costs to verify.

That distinction matters because generation and verification have historically moved in rough proportion. When it was expensive to produce something — a research paper, a piece of software, a professional identity — the cost of checking it was manageable relative to the cost of creating it. Peer review, code review, background checks, and bug reports all worked tolerably well because the volume of things to verify stayed within human capacity.

That proportionality is breaking. Generation costs are collapsing across every domain — text, code, images, identities, academic papers. Verification costs are not collapsing. In many cases, they are rising. The result is a structural deficit: organisations are producing and consuming more unverified material than at any point in history, and the systems designed to catch errors, fraud, and falsehood were built for a world with far less throughput.

This is not a technology problem. It is a governance problem. And it is showing up simultaneously in at least three domains that enterprise practitioners should care about.

## Identity: when you cannot prove you are human

A BBC Future article this week described a journalist's failed attempt to convince a family member she was not an AI deepfake on a video call. The methods she tried — shared memories, real-time gestures, voice recognition — all fell short. Not because the technology was sophisticated, but because the burden of proof had shifted. In a world where voice cloning costs $5 and deepfake-as-a-service is commercially available, the default assumption is moving from "probably human" to "possibly not."

Gartner predicted in early 2024 that by 2026, 30% of enterprises would no longer consider standalone identity verification and authentication solutions reliable in isolation. We are now inside that window. Injection attacks on biometric systems increased 200% in 2023. Synthetic identity fraud costs businesses an estimated $20–40 billion annually. Deepfake fraud losses are projected to exceed $25 billion by 2026.

The Hacker News discussion around the BBC article surfaced a telling practitioner perspective: "The sphere of trust around each of us will shrink back to only those in our physical proximity." Others reported that companies are increasing in-person interview requirements — a regression to physical presence as a verification mechanism.

This is not a fringe concern. If your enterprise uses video calls for executive approvals, voice-based customer authentication, or remote identity verification for onboarding, the cost of checking whether the person is real is rising faster than the cost of faking it.

## Knowledge: when corrections never arrive

A second verification failure is playing out in academic publishing, and its implications extend well beyond universities.

Andrew Gelman's blog this week highlighted the case of Eccles, Ioannou, and Serafeim's 2014 paper on corporate sustainability, published in *Management Science* and cited roughly 2,000 times per year. The paper's described methodology does not match the methodology the authors actually used. The authors acknowledged this discrepancy in September 2025 — after two years of external pressure — but have refused to submit a corrigendum.

The structural problem is worse than any single paper. The journal's policy allows only authors to request corrections. The research integrity offices at the authors' three affiliated institutions — London Business School, Harvard Business School, and Oxford — have collectively declined to act, each pointing to the others or to the authors themselves. The result: a paper that influences investment practice and public policy continues to circulate with known false claims and no correction mechanism.

This is not an isolated case. Over 10,000 articles were retracted in 2023 alone. The withdrawal of 11,000 articles from Hindawi/Wiley in 2024 followed the discovery of industrialised peer-review manipulation. By 2023, over 75% of retractions were attributed to data problems.

The HN discussion identified the underlying dynamic precisely: Goodhart's Law applied to publishing. When "number of publications" becomes the metric for academic advancement, the system optimises for publication volume, not knowledge quality. The same dynamic operates in any enterprise that measures output volume without proportionate investment in verification.

For enterprise practitioners, the implication is direct. If your strategy documents, vendor evaluations, or compliance frameworks cite academic research, the question is not whether the research was published in a reputable journal. The question is whether anyone has verified that the claims in it are true — and whether a correction mechanism exists if they are not.

## Software: when the feedback loop breaks

The third domain is closer to home. Apple's approach to bug reports — demanding that developers re-verify bugs in the latest beta within two weeks or face automatic closure — is a textbook case of verification burden shifting.

Jeff Johnson documented this week how a privacy bug he reported in March 2023 (FB12088655) sat unaddressed for three years before Apple demanded he personally test it in macOS 26.4 beta 4. Apple already had his reproduction steps and example code. The bug was later confirmed to persist by Little Snitch developers. But the institutional response was not to fix it — it was to shift the verification cost to the reporter.

The HN discussion confirmed this is a recognised pattern. "That's a classic trick where the developer will push back on the bug author without actually doing anything," one commenter wrote. Another observed that teams measured on ticket closure rates have incentives inversely aligned with product quality. The result is predictable: "I've stopped submitting bug reports."

When organisations raise the cost of providing feedback, they optimise for silence. The feedback loop does not break loudly. It breaks quietly, and the organisation loses its early-warning system without noticing.

This pattern is not limited to Apple. Any enterprise with an internal platform, a vendor dependency, or a shared services model should ask: what does it cost someone to report that something is wrong? If the answer is "more effort than it is worth," the verification loop is already broken.

## The asymmetry that matters

These three cases — identity, knowledge, software quality — appear unrelated. They are not. They share a common structure:

- **Generation is cheap.** Creating a deepfake, publishing a paper, or shipping a software release is cheaper and faster than ever.
- **Verification is expensive.** Proving a person is real, a claim is true, or a bug exists requires sustained human effort that does not scale at the same rate.
- **The burden shifts to the wrong party.** The person trying to prove authenticity, flag an error, or report a defect bears the cost, while the generator faces no proportionate accountability.
- **Institutions have not adapted.** Journals expect authors to self-correct. Enterprises rely on standalone biometric checks. Platforms close feedback channels when the volume becomes inconvenient.

This is the verification deficit: the growing gap between what organisations produce and what they can credibly verify. It is not caused by AI, though AI accelerates it. It is caused by the assumption — embedded in most governance frameworks — that verification is a low-cost, downstream activity.

That assumption was never fully true. It is now measurably false.

## Where this framing can mislead

Three counterpoints deserve acknowledgement.

**Trust problems predate AI.** Scam emails, academic fraud, and bug report dismissal have existed for decades. The difference is scale. AI lowers the per-unit cost of generation so dramatically that existing verification systems are overwhelmed — not because they were never stressed, but because the ratio of generated-to-verified material has shifted by orders of magnitude.

**Technology will adapt.** Cryptographic signing, zero-trust architectures, device-based verification, and provenance tracking are real responses to the identity problem. Content authenticity initiatives (C2PA) are beginning to address media verification. These are genuine progress. But they address the technical layer. The governance layer — who bears the verification cost, who is accountable when verification fails, and what happens when the correction mechanism does not exist — remains largely unaddressed.

**Not every verification failure matters equally.** A deepfaked customer service call has different consequences than a deepfaked executive authorisation. A retracted paper in materials science has different impact than a retracted paper that shaped ESG investment policy. Organisations should triage verification investment by consequence, not by volume.

## What to do next

The verification deficit is a governance design problem. Here is where enterprise practitioners can start:

- **Audit your verification assumptions.** Identify where your organisation assumes that identity, claims, or quality signals are trustworthy by default. Ask what would change if those assumptions were wrong. Start with executive approvals, vendor evaluations, and customer-facing authentication.
- **Price verification explicitly.** Treat verification as a line item, not an externality. If your compliance team reviews AI-generated content manually, measure that cost. If your platform team closes bug reports to hit ticket metrics, measure the cost of the bugs that persist.
- **Assign verification ownership.** The pattern across all three domains is the same: nobody owns the verification function. Journals defer to authors. Apple defers to reporters. Enterprises defer to "the process." Designate who is accountable for verification quality in each critical workflow.
- **Design for correction, not just prevention.** Most governance frameworks focus on preventing errors at the point of entry. Few design for what happens when an error is discovered downstream. If your correction mechanism requires the person who made the error to initiate the fix, it will not work.
- **Invest in feedback loop health.** Measure the cost of reporting a problem in your organisation. If it takes more effort to file a bug, flag a data quality issue, or challenge a vendor claim than it does to work around it, your verification system is already broken. The signal is silence.

## Sources

- [Gartner: 30% of enterprises will consider IDV solutions unreliable by 2026](https://www.gartner.com/en/newsroom/press-releases/2024-02-01-gartner-predicts-30-percent-of-enterprises-will-consider-identity-verification-and-authentication-solutions-unreliable-in-isolation-due-to-deepfakes-by-2026)
- [BBC Future: I tried to prove I'm not AI (2026)](https://www.bbc.com/future/article/20260324-i-tried-to-prove-im-not-an-ai-deepfake)
- [Cal Paterson: "Disregard That" Attacks (2026)](https://calpaterson.com/disregard.html)
- [Andrew Gelman: False claims in a widely-cited paper (2026)](https://statmodeling.stat.columbia.edu/2026/03/24/false-claims-in-a-published-no-corrections-no-consequences-welcome-to-the-business-school/)
- [Jeff Johnson: Apple bug report closures (2026)](https://lapcatsoftware.com/articles/2026/3/11.html)
- [Deepfake-as-a-Service threat landscape (Cyble, 2026)](https://cyble.com/knowledge-hub/deepfake-as-a-service-exploded-in-2025/)
- [Independent Institute: The retraction crisis (2026)](https://www.independent.org/article/2026/01/19/retraction-crisis/)
- [Entrust: Identity security trends 2026](https://www.entrust.com/blog/2026/03/Identity-security-in-2026-five-trends-every-leader-must-act-on)
