// CUPPILO Supabase Configuration
const SUPABASE_URL = 'https://wnkejaidmbdcmbksefaf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indua2VqYWlkbWJkY21ia3NlZmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyOTAwNDYsImV4cCI6MjEwNDg2NjA0Nn0.9LYxHA7RYeLcYaXUq5AEYSflCfIqGHD5uY6LdvE5raY';

// Supabase client (lightweight, no SDK dependency)
const supabase = {
  async from(table) {
    return {
      async select(columns = '*') {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=${columns}`, {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          }
        });
        return res.json();
      },
      async insert(data) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(data)
        });
        return res.json();
      },
      async update(data) {
        return {
          async eq(column, value) {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${column}=eq.${value}`, {
              method: 'PATCH',
              headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
              },
              body: JSON.stringify(data)
            });
            return res.json();
          }
        };
      },
      async rpc(fn, params = {}) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });
        return res.json();
      }
    };
  }
};

// Utility: Generate unique ref code
function generateRefCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'CP';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// Utility: Hash IP for rate limiting
async function hashIP(ip) {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Utility: Get client IP (for rate limiting)
async function getClientIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
}

// Utility: Generate voucher code
function generateVoucherCode() {
  return 'CUPPILO-' + Math.random().toString(36).substring(2, 8).toUpperCase();
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

// Participant registration
async function registerParticipant(ballotId, participantData) {
  const voucherCode = generateVoucherCode();

  const participant = {
    id: ballotId,
    phone_number: participantData.phone || null,
    display_name: participantData.name || null,
    dpdp_consent: participantData.consent || false,
    consent_ts: participantData.consent ? new Date().toISOString() : null,
    voucher_code: voucherCode,
    tier: participantData.tier || 'free',
    payment_id: participantData.paymentId || null
  };

  const result = await supabase.from('participants').insert(participant);
  return { ...result, voucherCode };
}

// Fetch live tally
async function fetchBallotTally() {
  return await supabase.from('ballot_tally').select('*');
}

// Fetch vibe tally
async function fetchVibeTally() {
  return await supabase.from('vibe_tally').select('*');
}

// Fetch pricing stats
async function fetchPricingStats() {
  return await supabase.from('pricing_stats').select('*');
}

// Fetch founding patrons
async function fetchFoundingPatrons() {
  return await supabase.from('founding_patrons').select('*');
}

// Save ballot locally (localStorage) for multi-step flow
function saveBallotLocal(data) {
  localStorage.setItem('cuppilo_ballot', JSON.stringify({ ...getBallotLocal(), ...data }));
}

function getBallotLocal() {
  const data = localStorage.getItem('cuppilo_ballot');
  return data ? JSON.parse(data) : {};
}

function clearBallotLocal() {
  localStorage.removeItem('cuppilo_ballot');
}

console.log('CUPPILO Supabase config loaded');
