// WOOZCODE chain reads: plain eth_call against public BSC RPCs, raced in parallel.
const NFT = "0xeF307E29292663376DC3Cb668373081cCFfcFf0E";
const RPCS = [
  "https://bsc-dataseed1.binance.org",
  "https://bsc-dataseed.binance.org",
  "https://bsc-dataseed-public.bnbchain.org",
  "https://bsc-mainnet.public.blastapi.io",
  "https://bsc-rpc.publicnode.com",
];
const SEL = {
  stats: "0x8bcdcbf3",
  totalMinted: "0xa2309ff8",
  mintOpen: "0x24bbd049",
  soldOut: "0x893da6c9",
  invitesOf: "0x930a8f65",
  mintedBy: "0x3cef28d2",
  holdsAgentId: "0x11213086",
};
const padAddr = (a) => a.toLowerCase().replace("0x", "").padStart(64, "0");

async function ethCallOnce(rpc, data) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 6000);
  try {
    const r = await fetch(rpc, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to: NFT, data }, "latest"] }),
      signal: ctl.signal,
    });
    const j = await r.json();
    if (j.result && j.result !== "0x") return j.result;
    throw new Error("empty");
  } finally {
    clearTimeout(timer);
  }
}
async function ethCall(data) {
  // Balapan semua RPC paralel: hasil tercepat yang dipakai (dulu sekuensial,
  // satu RPC lambat membuat ledger lama tampil "...").
  try {
    return await Promise.any(RPCS.map((rpc) => ethCallOnce(rpc, data)));
  } catch (e) {
    return null;
  }
}
const word = (hex, i) => BigInt("0x" + hex.slice(2 + i * 64, 2 + (i + 1) * 64));
const wordBool = (hex, i) => word(hex, i) !== 0n;

async function readStats(account) {
  const hex = await ethCall(SEL.stats + padAddr(account || "0x0000000000000000000000000000000000000000"));
  if (!hex) return null;
  return {
    minted: Number(word(hex, 0)),
    max: Number(word(hex, 1)),
    priceWei: word(hex, 2),
    open: wordBool(hex, 3),
    hasAgentId: wordBool(hex, 4),
    hasMinted: wordBool(hex, 5),
  };
}
async function readWallet(addr) {
  const [inv, minted, agent] = await Promise.all([
    ethCall(SEL.invitesOf + padAddr(addr)),
    ethCall(SEL.mintedBy + padAddr(addr)),
    ethCall(SEL.holdsAgentId + padAddr(addr)),
  ]);
  if (!inv || !minted || !agent) return null;
  return {
    invites: Number(BigInt(inv)),
    minted: Number(BigInt(minted)),
    hasAgentId: BigInt(agent) !== 0n,
  };
}
