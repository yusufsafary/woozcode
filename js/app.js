// WoozCode front page logic: chain-driven ledgers, copy prompts, wallet check.
(function () {
  'use strict';
  function $(id) { return document.getElementById(id); }
  function fmt(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  var mintPrompt = [
    'Mint 1 WoozCode Pass for me on BNB Chain using my Binance Agentic Wallet.',
    'Follow the instructions at https://woozcode.fun/wooz-skill.md exactly.',
    'If I gave you a referrer address, pass it to the mint call. Otherwise use the zero address.',
    'Show me the preview first, then execute after my confirmation.'
  ].join('\n');
  var claimPrompt = [
    'Claim $WOOZ for my WoozCode Pass NFTs on BNB Chain using my Binance Agentic Wallet.',
    'Follow the instructions at https://woozcode.fun/wooz-claim-skill.md exactly.',
    'Show me the preview first, then execute after my confirmation.'
  ].join('\n');

  function wireCopy(btnId, boxId, text) {
    var btn = $(btnId), box = $(boxId);
    if (!btn || !box) return;
    box.textContent = text;
    btn.addEventListener('click', function () {
      function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy prompt'; }, 1600); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else { done(); }
    });
  }
  wireCopy('copy-mint', 'prompt-mint', mintPrompt);
  wireCopy('copy-claim', 'prompt-claim', claimPrompt);

  function refresh() {
    if (!window.WOOZ) return;
    window.WOOZ.getStats(null).then(function (s) {
      var m = $('m-minted'); if (m) m.textContent = fmt(s.minted);
      var mx = $('m-max'); if (mx) mx.textContent = fmt(s.max);
      var left = $('m-left'); if (left) left.textContent = fmt(s.max - s.minted);
      var hs = $('h-minted'); if (hs) hs.textContent = fmt(s.minted) + ' / ' + fmt(s.max);
      var pill = $('mint-pill');
      if (pill) {
        if (s.open) { pill.textContent = 'MINT LIVE'; pill.classList.add('live'); }
        else { pill.textContent = 'OPENING SOON'; pill.classList.remove('live'); }
      }
      var st = $('mint-status'); if (st) st.textContent = s.open ? 'Live' : 'Opening soon';
    }).catch(function () {});
    window.WOOZ.getClaim().then(function (c) {
      var tc = $('c-claimed'); if (tc) tc.textContent = fmt(c.totalClaimed);
      var cr = $('c-remaining'); if (cr) cr.textContent = fmt(c.claimsRemaining);
      var pill = $('claim-pill');
      if (pill) {
        if (c.open) { pill.textContent = 'CLAIM LIVE'; pill.classList.add('live'); }
        else { pill.textContent = 'OPENING SOON'; pill.classList.remove('live'); }
      }
      var st = $('claim-status'); if (st) st.textContent = c.open ? 'Live' : 'Opening soon';
    }).catch(function () {});
  }
  refresh();
  setInterval(refresh, 30000);

  var form = $('check-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var input = $('check-addr');
      var out = $('check-out');
      var addr = (input.value || '').trim();
      out.classList.add('show');
      if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) {
        out.textContent = 'That does not look like a BSC wallet address.';
        return;
      }
      out.textContent = 'Reading the chain...';
      window.WOOZ.getWallet(addr).then(function (w) {
        out.innerHTML =
          'Agent ID: <b>' + (w.hasAgentId ? 'held' : 'not held') + '</b><br>' +
          'Passes minted: <b>' + fmt(w.minted) + '</b><br>' +
          'Mint quota: <b>' + fmt(w.quota) + '</b> (5 base, +1 per successful invite, cap 20)<br>' +
          'Successful invites: <b>' + fmt(w.invites) + '</b>';
      }).catch(function () {
        out.textContent = 'Could not read the chain right now. Try again in a moment.';
      });
    });
  }
})();
