// Browser chain reads for woozcode.fun (GitHub Pages). Read-only.
// Direct BSC RPC calls from the visitor's browser. No wallet connection.
(function () {
  'use strict';
  var NFT = '0x82fdD8BA6229f01F901862768e7722Af7f222540';
  var CLAIM = '0xd7afF72df865152544a56765874793957Db1Af57';
  var TOKEN = '0x6E347E325819475d73FD5b3a87DEC2Aaee603478';
  var ZERO = '0x0000000000000000000000000000000000000000';
  var RPCS = [
    'https://bsc-rpc.publicnode.com',
    'https://bsc-dataseed.bnbchain.org',
    'https://bsc-dataseed1.binance.org',
    'https://bsc-mainnet.public.blastapi.io'
  ];
  var SEL = {
    stats: '0x8bcdcbf3',
    totalMinted: '0xa2309ff8',
    mintOpen: '0x24bbd049',
    quotaOf: '0xef23b3a3',
    invitesOf: '0x930a8f65',
    mintedBy: '0x3cef28d2',
    holdsAgentId: '0x11213086',
    claimOpen: '0x4b8bcb58',
    totalClaimed: '0xd54ad2a1',
    claimsRemaining: '0x754c463f'
  };

  function encAddr(a) { return String(a).toLowerCase().replace(/^0x/, '').padStart(64, '0'); }
  function wordAt(hex, i) { return BigInt('0x' + hex.slice(2 + i * 64, 2 + (i + 1) * 64)); }
  function boolAt(hex, i) { return wordAt(hex, i) !== 0n; }

  function post(url, payload) {
    var ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 20000) : null;
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      if (timer) clearTimeout(timer);
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    }, function (e) {
      if (timer) clearTimeout(timer);
      throw e;
    });
  }
  function viaRpc(fn) {
    var p = Promise.reject(new Error('no rpc'));
    RPCS.forEach(function (u) { p = p.catch(function () { return fn(u); }); });
    return p;
  }
  function ethCall(to, data) {
    return viaRpc(function (u) {
      return post(u, { jsonrpc: '2.0', id: 1, method: 'eth_call', params: [{ to: to, data: data }, 'latest'] })
        .then(function (j) {
          if (j.error) throw new Error(j.error.message || 'rpc error');
          return j.result;
        });
    });
  }

  function getStats(account) {
    return ethCall(NFT, SEL.stats + encAddr(account || ZERO)).then(function (hex) {
      return {
        minted: wordAt(hex, 0),
        max: wordAt(hex, 1),
        open: boolAt(hex, 3),
        hasAgentId: boolAt(hex, 4),
        hasMinted: boolAt(hex, 5)
      };
    });
  }
  function getWallet(wallet) {
    return Promise.all([
      ethCall(NFT, SEL.quotaOf + encAddr(wallet)),
      ethCall(NFT, SEL.invitesOf + encAddr(wallet)),
      ethCall(NFT, SEL.mintedBy + encAddr(wallet)),
      ethCall(NFT, SEL.holdsAgentId + encAddr(wallet))
    ]).then(function (rs) {
      return {
        quota: wordAt(rs[0], 0),
        invites: wordAt(rs[1], 0),
        minted: wordAt(rs[2], 0),
        hasAgentId: wordAt(rs[3], 0) !== 0n
      };
    });
  }
  function getClaim() {
    return Promise.all([
      ethCall(CLAIM, SEL.claimOpen),
      ethCall(CLAIM, SEL.totalClaimed),
      ethCall(CLAIM, SEL.claimsRemaining)
    ]).then(function (rs) {
      return {
        open: wordAt(rs[0], 0) !== 0n,
        totalClaimed: wordAt(rs[1], 0),
        claimsRemaining: wordAt(rs[2], 0)
      };
    });
  }

  window.WOOZ = {
    NFT: NFT, CLAIM: CLAIM, TOKEN: TOKEN,
    getStats: getStats, getWallet: getWallet, getClaim: getClaim
  };
})();
