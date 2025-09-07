# Findings for Nathan

## 2025-09-03 — Circle of Exchange Restoration

**What we did:**
- Located `exchange.html` and `exchange.js` inside `client/member-scroll/`
- Rewrote the scroll locally to remove wallet dependency
- Added name/email field and confirmation message
- Form collects data but does not yet write to Supabase
- Awaiting approval to relink or move the scroll

**What we suspect:**
- Original scroll required wallet connection
- Backend function may be missing or disconnected
- Page is not currently linked in live navigation 

## 2025-09-04 — Join Form Metadata Revision

### What we did
- Updated `index.html` to include `name`, `phone`, and `wallet` in the sign-up logic
- Passed metadata using `options.data` in `supabase.auth.signUp()`
- Fields match the Join the Circle form inputs
- No changes pushed to GitHub—awaiting Nathan’s review

### What we suspect
- Metadata will appear in `auth.users.raw_user_meta_data` once tested
- Backend may still need a `profiles` table for structured access
- This change does not affect login flow or redirect behavior
- Form has not been tested yet—awaiting backend confirmation


## 2025-09-04 — Drafted `discussion.html` Scroll

### What we did
- Created `discussion.html` in the `client` folder
- Designed structure to display suggestions marked for discussion
- Included comment system with nested replies and agreement submission box
- Left backend logic as placeholders—awaiting schema guidance

### What we hope to confirm
- Backend tables for `comments` and `proposed_agreements` can support this flow
- Frontend can fetch and display nested threads
- Agreement text can be linked to voting scroll once submitted 


## 2025-09-04 — Drafted `agreements.html` Voting Scroll

### What we did
- Created `agreements.html` in the `client` folder
- Styled and centered the agreement block, vote buttons, and vote counts
- Added frontend logic to:
  - Fetch proposed agreement from `proposed_agreements` table
  - Cast votes (agree/disagree) to `votes` table
  - Display live vote counts and total votes cast

### What we hope to confirm
- Backend tables `proposed_agreements` and `votes` are ready to support this flow
- Vote logic can be extended to include `user_id` and `timestamp`
- Agreement text can be linked to `suggestion_id` and fetched dynamically

### Status
- Frontend is complete and ready for backend connection
- No changes pushed to GitHub—awaiting review 


## 2025-09-04 — `exchange.html` Path Needs Restoration

### What we found
- The link to “Enter the Gift Circle of Exchange” leads to a 404 at  
  `https://happy2btc.github.io/friendship-community-circle/exchange.html`
- The file `exchange.html` exists locally in the `client` folder
- It was previously nested in `client/member-scroll`, which caused the broken link

### What we need
- When ready to push, move `exchange.html` to the root of the `client` folder in GitHub
- This will restore the live path and resolve the 404
- No content changes—just relocation for visibility

### Status
- File has been moved locally but not committed or pushed
- Awaiting Nathan’s review and decision on GitHub structure