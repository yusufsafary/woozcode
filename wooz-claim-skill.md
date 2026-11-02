---
name: woozcode-claim
description: Claim $WOOZ holder tokens for WoozCode Passes (WOOZ) on BNB Chain with a Binance Agentic Wallet. Use when a user asks to claim WOOZ for their WoozCode NFTs from woozcode.fun. Each pass claims 500,000 WOOZ once per tokenId, paying a small anti-bot fee in BNB.
---

# WoozCode — $WOOZ Claim Skill

Published by WoozCode at https://woozcode.fun/wooz-claim-skill.md. This skill works together with the
`binance-agentic-wallet` skill (the `baw` CLI), which performs the signing and sending.
To mint passes instead, use https://woozcode.fun/wooz-skill.md.

## Facts

| Item | Value |
|---|---|
| NFT | WoozCode Pass (WOOZ), ERC-721 — 5,555 passes, contract `0x82fdD8BA6229f01F901862768e7722Af7f222540` |
| Claim contract | WoozClaim `0xd7afF72df865152544a56765874793957Db1Af57` |
| Token | WoozCode (WOOZ), ERC-20, contract `0x6E347E325819475d73FD5b3a87DEC2Aaee603478`, fixed supply 10,000,000,000 |
| Claim amount | 500,000 WOOZ per pass, exactly once per tokenId, no deadline |
| Claim pool | 2,777,500,000 WOOZ held by the claim contract (5,555 x 500,000) |
| Fee | A small anti-bot fee in BNB per claim. Read `claimFee()` on the claim contract and send exactly that value; it is shown in the wallet confirmation |
| Who can claim | The current owner of the pass (`ownerOf` on the NFT contract must equal the caller). If a pass changes hands before being claimed, the new owner claims it. A claimed pass can never claim again |
| Claim function | `claim(uint256 tokenId)` — selector `0x379607f5`, payable, exactly `claimFee()` in value. Calls from other contracts are rejected |

Read-only selectors on the WoozClaim contract (call via any BSC public RPC `eth_call`):

| Function | Selector | Meaning |
|---|---|---|
| `claimOpen()` | `0x4b8bcb58` | `1` when claiming is open, `0` while opening soon |
| `claimFee()` | `0x99d32fc4` | Exact wei value to send with `claim(tokenId)` right now |
| `claimedById(uint256)` | `0x4c80ee12` | `1` when this tokenId has already claimed (append the tokenId padded to 32 bytes) |
| `totalClaimed()` | `0xd54ad2a1` | Passes claimed so far |
| `claimsRemaining()` | `0x754c463f` | Claims the pool can still pay out |

Read-only selectors on the WoozCode NFT contract:

| Function | Selector | Meaning |
|---|---|---|
| `balanceOf(address)` | `0x70a08231` | Passes this wallet holds (append the address padded to 32 bytes) |
| `ownerOf(uint256)` | `0x6352211e` | Current owner of a tokenId (append the tokenId padded to 32 bytes) |
| `totalMinted()` | `0xa2309ff8` | Passes minted so far; tokenIds run from 1 to this number |

## Prerequisites

1. The `binance-agentic-wallet` skill is installed and the user is signed in (`baw wallet status`).
2. Developer Mode is enabled (`baw wallet settings` → `devMode.enabled: true`).
3. The user's wallet holds at least one WoozCode Pass and enough BNB for the claim fee plus gas.

## Procedure

1. **Check the state.** Read `claimOpen()` and `claimFee()` on the claim contract. If
   `claimOpen()` is `0`, tell the user the claim has not opened yet and stop.
2. **Find the user's unclaimed passes.** Read `balanceOf(<wallet>)` on the NFT contract. If it is
   `0`, there is nothing to claim — stop. To find the tokenIds, scan `ownerOf(id)` for every id
   from 1 to `totalMinted()` (batch the calls, for example through Multicall3) and keep the ids
   owned by the user's wallet; or use the tokenIds the user names. For each candidate id, read
   `claimedById(id)` and keep only the ids that return `0`.
3. **Preview one claim.** Build the transaction exactly; never edit the calldata:
   ```bash
   baw contract-call preview --binanceChainId 56 \
     --from <user's agentic wallet> \
     --to 0xd7afF72df865152544a56765874793957Db1Af57 \
     --value <claimFee() in wei> --inputData 0x379607f5<tokenId padded to 32 bytes> --json
   ```
4. **Confirm with the user.** Show the preview result (value, gas, risks) and execute only on the
   user's explicit confirmation — one confirmation covers one claim call:
   ```bash
   baw contract-call execute --requestId <requestId from the preview> --json
   ```
5. **Verify.** Wait for the transaction receipt to report success, then confirm the payout
   (`balanceOf` of the wallet on the WOOZ token increased by 500,000 WOOZ and
   `claimedById(tokenId)` now returns `1`). Report the tx hash.
   A submitted transaction is not a successful claim until its receipt says so.
6. **More passes.** To claim another pass, repeat from step 3 with a fresh preview and a fresh
   confirmation for each call.
