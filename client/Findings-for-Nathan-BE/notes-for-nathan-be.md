# Findings for Nathan-RE

## 2025-09-03 — Circle of Exchange Backend Review

### What we did
- Reviewed `exchange.html` and confirmed form collects data
- Removed wallet dependency and added name/email field
- Confirmed form does not yet submit to Supabase

### What was suspect
- Backend function to store offerings may be missing
- No Supabase table confirmed for `circle_exchange`
- Page is not currently linked in live navigation

---

## 2025-09-03 — Suggestion Form Submission Fails

### What we observed
- Form in `suggest.html` collects data and tries to POST to Supabase
- Submission fails with no clear error
- Supabase table `suggestions` may be missing or misaligned
- RLS or API key may be blocking the insert

### What we suspect
- Backend function or table needs review
- No confirmation that data reaches Supabase
- `discussion.html` will need to fetch from backend once submission works 

## 2025-09-04 — Join the Circle Data Review

### What we observed
- `auth.users` table contains core fields: email, password, timestamps
- No visible column for name, phone, or wallet
- No sign of `raw_user_meta_data` or extended profile fields

### What we suspect
- Join form may not be passing metadata during sign-up
- Supabase may not be configured to store custom fields
- A `profiles` table may be needed to hold full user data

## 2025-09-04 — Supabase Table Review

### What we observed
- Found `member_offerings` table with fields matching Circle of Exchange form
- Table is currently empty—no submissions reaching backend
- Found `mutual_aid_entries` table with fields for needs, tags, and responses
- Located table creation interface under Database Management

### What we suspect
- Frontend forms are not yet wired to Supabase insert functions
- Backend structure is present but inactive
- `suggestions` and `profiles` tables may need to be created or restored 

## 2025-09-04 — Join Form Logic Review

### What we observed
- `index.html` handles sign-up and login using Supabase auth
- Only `email` and `password` are passed during sign-up
- No metadata (name, phone, wallet) is stored
- Login redirects to `affirm.html` if successful

### What we suspect
- Additional fields are collected but not stored
- A `profiles` table may be needed to hold extended user data
- Sign-up logic may need to include `options.data` to pass metadata 