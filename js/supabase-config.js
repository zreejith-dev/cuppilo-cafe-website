// CUPPILO Supabase Configuration
const SUPABASE_URL = 'https://wnkejaidmbdcmbksefaf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indua2VqYWlkbWJkY21ia3NlZmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyOTAwNDYsImV4cCI6MjEwNDg2NjA0Nn0.9LYxHA7RYeLcYaXUq5AEYSflCfIqGHD5uY6LdvE5raY';

const HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
};

// Supabase client
const supabase = {
  from(table) {
    return {
      async select(columns = '*') {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${columns}`, { headers: HEADERS });
        return res.json();
      },
      async insert(data) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: 'POST',
          headers: { ...HEADERS, Prefer: 'return=representation' },
          body: JSON.stringify(data)
        });
        return res.json();
      },
      update(data) {
        return {
          async eq(column, value) {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${column}=eq.${value}`, {
              method: 'PATCH',
              headers: { ...HEADERS, Prefer: 'return=representation' },
              body: JSON.stringify(data)
            });
            return res.json();
          }
        };
      },
      delete() {
        return {
          async eq(column, value) {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${column}=eq.${value}`, {
              method: 'DELETE',
              headers: { ...HEADERS, Prefer: 'return=representation' }
            });
            return res.json();
          }
        };
      },
      async rpc(fn, params = {}) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
          method: 'POST',
          headers: HEADERS,
          body: JSON.stringify(params)
        });
        return res.json();
      }
    };
  }
};

// Helper functions
async function sbInsert(table, data) { return await supabase.from(table).insert(data); }
async function sbSelect(table, columns = '*') { return await supabase.from(table).select(columns); }
async function sbUpdate(table, data, column, value) { return await supabase.from(table).update(data).eq(column, value); }
async function sbDelete(table, column, value) { return await supabase.from(table).delete().eq(column, value); }

// Utility functions
function generateRefCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'CP';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

async function hashIP(ip) {
  const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getClientIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    return (await res.json()).ip;
  } catch { return 'unknown'; }
}

function generateVoucherCode() {
  return 'CUPPILO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function debounce(func, wait) {
  let timeout;
  return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); };
}

// Ballot submission
async function submitBallot(ballotData) {
  const ip = await getClientIP();
  const ipHash = await hashIP(ip);
  const refCode = generateRefCode();

  const ballot = {
    ip_hash: ipHash,
    ref_code: refCode,
    referred_by: ballotData.referredBy || null,
    menu_votes: ballotData.menuVotes,
    vibe_vote: ballotData.vibeVote,
    price_coffee: ballotData.priceCoffee,
    price_chaya: ballotData.priceChaya,
    wishlist_text: ballotData.wishlist || '',
    suggested_items: ballotData.suggestedItems || []
  };

  const result = await supabase.from('ballots').insert(ballot);
  return { ...result, refCode };
}

// Fetch helpers
async function fetchBallotTally() { return await supabase.from('ballot_tally').select('*'); }
async function fetchVibeTally() { return await supabase.from('vibe_tally').select('*'); }
async function fetchPricingStats() { return await supabase.from('pricing_stats').select('*'); }
async function fetchProfileCount() { return await supabase.from('profile_count').select('*'); }
async function fetchMenuVoteTally() { return await supabase.from('menu_vote_tally').select('*'); }
async function fetchAmbianceTally() { return await supabase.from('ambiance_tally').select('*'); }

console.log('CUPPILO Supabase config loaded');
