# WoozCode 铸造说明（代理用）

## 中文

你将通过币安智能钱包（Binance Agentic Wallet）在 BSC 上为你的用户铸造一枚 WoozCode Pass NFT。铸造完全免费：价格为 0，也不收平台佣金。

合约地址（NFT）：`0xeF307E29292663376DC3Cb668373081cCFfcFf0E`
链：BSC，chainId 56。

规则（由合约强制执行）：
- 每个钱包最多铸造 1 枚，永久有效。已铸造的钱包再次铸造会被拒绝（AlreadyMinted）。
- 钱包必须持有币安 Agent ID（SPACE ID Agent ID NFT），否则被拒绝（NotEligible）。
- 只能由钱包直接调用，合约调用会被拒绝。所以必须通过用户的智能钱包代理执行。
- 每次铸造可以填写一位邀请人地址。邀请人不能是铸造者本人，零地址不计数；没有邀请人时填写零地址。
- 铸造可能尚未开放（mintOpen）或已售罄。先检查再执行。注意：本站还有一个从未开放的第一版合约，不要使用任何其他地址。

步骤：

1. 检查状态（stats，selector `0x8bcdcbf3`，参数为用户地址填充到 32 字节）：
   - 返回值依次为：已铸造数、总供应 3232、价格（始终 0）、mintOpen、用户是否持有 Agent ID、用户是否已铸造。
   - 如果 mintOpen 为 false，告诉用户铸造还没开放，不要继续。
   - 如果用户已铸造（hasMinted = true），告诉用户每钱包只能铸造一枚，不要继续。

2. 预览铸造（mint(address)，selector `0x6a627842`，参数为邀请人地址填充到 32 字节；没有邀请人则填全零）：
   ```
   baw contract-call preview --to 0xeF307E29292663376DC3Cb668373081cCFfcFf0E --inputData 0x6a627842<邀请人地址填充> --value 0 --binanceChainId 56 --from <用户智能钱包地址> --json
   ```
   只有当 simulationCode 为 "000000000"、simulationErrorDetail 为空、且没有风险提示时才继续。

3. 执行（预览的 requestId 几秒内过期，预览后立即执行）：
   ```
   baw contract-call execute --requestId <预览返回的 requestId> --json
   ```

4. 等待回执成功后，把交易哈希和铸造到的 tokenId 告诉用户。tokenId 可以用 totalMinted（selector `0xa2309ff8`）在铸造后读取确认。作品和元数据地址：https://woozcode.fun/metadata/<tokenId>

注意：不要向合约发送任何 BNB（value 必须为 0）。不要用其他合约代为调用。

---

## English

You are minting one WoozCode Pass NFT on BSC for your user, through their Binance Agentic Wallet. Minting is completely free: the price is 0 and there is no platform fee.

NFT contract: `0xeF307E29292663376DC3Cb668373081cCFfcFf0E`
Chain: BSC, chainId 56.

Rules (enforced by the contract):
- At most one mint per wallet, ever. A wallet that already minted is rejected (AlreadyMinted).
- The wallet must hold a Binance Agent ID (the SPACE ID Agent ID NFT), otherwise it is rejected (NotEligible).
- Only direct wallet calls work; contract calls are rejected. Always execute through the user's Agentic Wallet agent.
- Each mint may name one referrer address. The referrer counts only when it is not the minter and not the zero address. Use the zero address when there is no referrer.
- Minting may not be open yet (mintOpen) or may be sold out. Check first. Note: an earlier WoozCode contract exists that never opened. Never use any other address.

Steps:

1. Check state (stats, selector `0x8bcdcbf3`, argument = the user's address padded to 32 bytes):
   - Returns, in order: minted count, max supply 3232, price (always 0), mintOpen, whether the user holds an Agent ID, whether the user already minted.
   - If mintOpen is false, tell the user minting is not open yet and stop.
   - If the user already minted (hasMinted = true), tell the user the limit is one per wallet and stop.

2. Preview the mint (mint(address), selector `0x6a627842`, argument = the referrer address padded to 32 bytes, or all zeros):
   ```
   baw contract-call preview --to 0xeF307E29292663376DC3Cb668373081cCFfcFf0E --inputData 0x6a627842<padded referrer> --value 0 --binanceChainId 56 --from <user agentic wallet> --json
   ```
   Continue only when simulationCode is "000000000", simulationErrorDetail is empty, and there are no risk entries.

3. Execute immediately (preview request IDs expire within seconds):
   ```
   baw contract-call execute --requestId <requestId from the preview> --json
   ```

4. After a successful receipt, report the transaction hash and the minted tokenId. Read totalMinted (selector `0xa2309ff8`) after the mint to confirm the tokenId. Artwork and metadata live at https://woozcode.fun/metadata/<tokenId>

Notes: never send any BNB with the call (value must be 0). Never call through another contract.
