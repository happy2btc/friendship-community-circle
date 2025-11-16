import"./modulepreload-polyfill-B5Qt9EMX.js";import{s}from"./supabase-vDZkBp_j.js";async function _(){const c=new Date("2025-09-19T00:00:00Z"),{data:i,error:d}=await s.from("profiles").select("id, full_name, avatar_url, affirmation_text, affirmation_date").order("affirmation_date",{ascending:!1});if(d){document.getElementById("members-list").textContent="Error loading members.";return}console.log("[Debug] Raw profiles:",i),console.log("[Debug] Cutoff date:",c.toISOString()),(i||[]).forEach(e=>{console.log(`[Debug] Profile ${e.id}: affirmation_date =`,e.affirmation_date)});let f=(i||[]).filter(e=>e.affirmation_date&&new Date(e.affirmation_date)>=c).sort((e,a)=>new Date(a.affirmation_date)-new Date(e.affirmation_date)).slice(0,3);const r=document.getElementById("members-list");r.innerHTML="";for(let e=0;e<3;e++){const a=f[e];if(a){const{data:t}=await s.from("circle_members").select("circle_id").eq("user_id",a.id);let n=[];if(t&&t.length>0){const g=t.map(l=>l.circle_id),{data:m}=await s.from("circles").select("id, name").in("id",g);n=m?m.map(l=>l.name):[]}const o=document.createElement("div");o.className="member-card",o.innerHTML=`
            <img src="${a.avatar_url||"default-avatar.png"}" class="profile-img" alt="Profile">
            <strong>${a.full_name||"Unnamed Member"}</strong>
            <div class="date-joined">Joined: ${a.affirmation_date?new Date(a.affirmation_date).toLocaleDateString():"—"}</div>
            <div class="circles-list">Circles: ${n.length?n.join(", "):"None"}</div>
            <div class="affirmation-text">${a.affirmation_text?a.affirmation_text:""}</div>
          `,r.appendChild(o)}else{const t=document.createElement("div");t.className="member-card",t.innerHTML=`
            <img src="default-avatar.png" class="profile-img" alt="Profile">
            <strong>No member</strong>
            <div class="date-joined">—</div>
            <div class="circles-list">Circles: —</div>
          `,r.appendChild(t)}}}_();
