---
name: woozcode
description: Mint WoozCode Passes (WOOZ) on BNB Chain with a Binance Agentic Wallet. Use when a user asks to mint WoozCode from woozcode.fun. Minting is gated on-chain to wallets holding a SPACE ID Agent ID. Each wallet starts with a quota of 5 passes; the quota grows by 1 for every first-mint referral, up to 20.
---

# WoozCode — Mint Skill

Published by WoozCode at https://woozcode.fun/wooz-skill.md. This skill works together with the
`binance-agentic-wallet` skill (the `baw` CLI), which performs the signing and sending.
To claim $WOOZ instead, use https://woozcode.fun/wooz-claim-skill.md.

## Facts

| Item | Value |
|---|---|
| Token | WoozCode Pass (WOOZ), ERC-721 — 5,555 passes |
| Contract | `0x82fdD8BA6229f01F901862768e7722Af7f222540` |
| Chain | BNB Smart Chain, chain id 56 |
| Supply | 5,555 — quota per wallet: 5 base, +1 per successful first-mint referral, max 20 (lifetime counter) |
| Price | The pass is free. `currentPrice()` returns a small platform commission in BNB — send exactly that value; it is shown in the wallet confirmation |
| Gate | The caller must hold a SPACE ID Agent ID (NFT contract `0x60B9262456dE011F7d15a54CdD8c48bAaa8B022F`). The WoozCode contract checks this on-chain before anything else. Calls from other contracts are rejected |
| Mint function | `mint(address referrer)` — selector `0x6a627842`, exactly 1 pass per call. The argument is the referrer wallet address, padded to 32 bytes; use the zero address `0x0000000000000000000000000000000000000000` when there is no referrer. A referral counts only on the caller's first ever mint, and never for self-referrals |
| Repeat | Repeat the call to mint more, up to the wallet's current quota (`quotaOf`) |

Read-only selectors on the WoozCode contract (call via any BSC public RPC `eth_call`):

| Function | Selector | Meaning |
|---|---|---|
| `mintOpen()` | `0x24bbd049` | `1` when minting is open, `0` while opening soon |
| `currentPrice()` | `0x9d1b464a` | Exact wei value to send with `mint(address)` right now |
| `totalMinted()` | `0xa2309ff8` | Passes minted so far |
| `holdsAgentId(address)` | `0x11213086` | `1` when the address holds an Agent ID (append the address padded to 32 bytes) |
| `mintedBy(address)` | `0x3cef28d2` | Passes this wallet has minted |
| `quotaOf(address)` | `0xef23b3a3` | Current mint quota of the wallet (5 base, up to 20) |
| `invitesOf(address)` | `0x930a8f65` | Successful first-mint referrals credited to the wallet |

## Prerequisites

1. The `binance-agentic-wallet` skill is installed and the user is signed in (`baw wallet status`).
2. Developer Mode is enabled (`baw wallet settings` → `devMode.enabled: true`).
3. The user's wallet holds an Agent ID — check with `baw wallet agent-id --json` (`claimed: true`).
   Without one, every mint reverts. The user claims a free Agent ID in the Binance App,
   under their Agentic Wallet.

## Procedure

1. **Check the gate and the state.** Read `mintOpen()`, `currentPrice()`, `mintedBy(<wallet>)`
   and `quotaOf(<wallet>)`. If `mintOpen()` is `0`, tell the user the mint has not opened yet
   and stop. If `mintedBy` already equals `quotaOf`, the wallet's quota is full — stop
   (inviting other Agent ID holders raises it).
2. **Ask about a referrer.** If the user named a referrer address, use it. Otherwise use the
   zero address. A wrong referrer wastes the one-time referral credit, so never invent one.
3. **Preview.** Build the transaction exactly; never edit the calldata:
   ```bash
   baw contract-call preview --binanceChainId 56 \
     --from <user's agentic wallet> \
     --to 0x82fdD8BA6229f01F901862768e7722Af7f222540 \
     --value <currentPrice() in wei> --inputData 0x6a627842<referrer address padded to 32 bytes> --json
   ```
4. **Confirm with the user.** Show the preview result (value, gas, risks) and execute only on the
   user's explicit confirmation — one confirmation covers one mint call:
   ```bash
   baw contract-call execute --requestId <requestId from the preview> --json
   ```
5. **Verify.** Wait for the transaction receipt to report success, then confirm the pass arrived
   (`balanceOf` of the wallet on the WoozCode contract increased by 1). Report the tx hash.
   A submitted transaction is not a successful mint until its receipt says so.
6. **More passes.** To mint another pass, repeat from step 1 — re-read `currentPrice()`,
   `mintedBy` and `quotaOf` first, and get a fresh confirmation for each call.
