import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as o}from"./supabase-vDZkBp_j.js";async function v(){const{data:e}=await o.from("group_projects").select("id, name, description, status, num_participants, proposer_id, entered_at").eq("circle_id",d).order("entered_at",{ascending:!1}),t=document.getElementById("projects-tab-content");if(!e||e.length===0){t.innerHTML="<h2>Group Projects</h2><p>No group projects for this circle yet.</p>";return}t.innerHTML="<h2>Group Projects</h2>"+e.map(r=>`
    <div class="agreement-card">
      <strong>${r.name}</strong><br>
      <span>${r.description||""}</span><br>
      <span>Status: ${r.status||"—"}</span><br>
      <span>Participants: ${r.num_participants||0}</span><br>
      <span>Proposed: ${r.entered_at?new Date(r.entered_at).toLocaleDateString():""}</span>
    </div>
  `).join("")}const w=new URLSearchParams(window.location.search),d=w.get("id"),b=document.querySelectorAll(".tab-btn"),h=document.getElementById("tab-content"),y=document.getElementById("projects-tab-content");b.forEach(e=>{e.addEventListener("click",async()=>{b.forEach(r=>r.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-tab");h.style.display=t==="projects"?"none":"",y.style.display=t==="projects"?"":"none",t==="projects"&&await v()})});b[0].classList.add("active");h.style.display="";y.style.display="none";async function L(){const{data:e}=await o.auth.getUser(),t=e?.user?.id;if(!t)return window.location.href=`login.html?redirect=circle.html?id=${d}`,!1;const{data:r}=await o.from("circle_members").select("id").eq("circle_id",d).eq("user_id",t).single();if(!r)return document.body.innerHTML="<h2>Access denied: You are not a member of this circle.</h2>",!1;const f=JSON.parse(localStorage.getItem(`circleLastRead_${t}`)||"{}");return f[d]=new Date().toISOString(),localStorage.setItem(`circleLastRead_${t}`,JSON.stringify(f)),!0}function x(e){const t=document.getElementById("tab-content");e==="blog"?(t.innerHTML=`<h2>Blog</h2><div id="blog-section">Loading posts...</div><a href="create-blog-post.html?circle_id=${d}" class="menu-button">Create New Post</a>`,r(d)):e==="members"?(t.innerHTML='<h2>Members</h2><div id="members-section"></div>',f(d)):e==="chat"&&(t.innerHTML=`<h2>Circle Chat Room</h2>
            <div id="chat-messages" style="height:300px;overflow-y:auto;border:1px solid #ccc;padding:1em;background:#fff;margin-bottom:1em;"></div>
            <form id="chat-form" style="display:flex;gap:1em;align-items:center;">
              <input type="text" id="chat-input" placeholder="Type your message..." style="flex:1;font-size:1.2em;padding:12px 10px;height:48px;border-radius:8px;border:1.5px solid #4a7c59;">
              <button type="submit" style="font-size:1.2em;padding:12px 28px;background:#4a7c59;color:#fff;border:none;border-radius:8px;box-shadow:0 2px 6px #eee;cursor:pointer;font-weight:bold;">Send</button>
            </form>`,m(d));async function r(u){const a=document.getElementById("blog-section"),{data:c,error:l}=await o.from("blog_posts").select(`
            *,
            profiles (
              full_name,
              avatar_url
            )
          `).eq("circle_id",u).order("created_at",{ascending:!1});if(l){a.innerHTML="<p>Error loading blog posts.</p>",console.error("Error fetching blog posts:",l);return}if(!c||c.length===0){a.innerHTML="<p>No blog posts yet for this circle.</p>";return}let i="";for(const n of c){const s=n.profiles,g=new Date(n.created_at).toLocaleString();let p=null;if(n.image_url){const{data:_}=o.storage.from("blog-images").getPublicUrl(n.image_url);p=_.publicUrl}i+=`
            <div class="agreement-card">
              <h3>${n.title}</h3>
              <p>
                <img src="${s.avatar_url||"public/default-avatar.png"}" alt="author" style="width:30px;height:30px;border-radius:50%;vertical-align:middle;">
                <strong>${s.full_name}</strong> on ${g}
              </p>
              ${p?`<img src="${p}" alt="${n.title}" style="max-width:100%;height:auto;border-radius:8px;margin-bottom:1rem;">`:""}
              <div>${n.content}</div>
            </div>
          `}a.innerHTML=i}async function f(u){const a=document.getElementById("members-section");a.innerHTML="";const{data:c}=await o.from("circle_members").select("user_id").eq("circle_id",u),l=c?c.map(n=>n.user_id):[];let i="";if(l.length===0)i+="<p>No members yet.</p>";else{const{data:n}=await o.from("profiles").select("full_name, avatar_url").in("id",l);i+='<div class="member-list">',n.forEach(s=>{i+=`
              <div>
                <img src="${s.avatar_url||"default-avatar.png"}" alt="avatar" width="32" height="32" style="vertical-align:middle;border-radius:50%;">
                <span>${s.full_name}</span>
              </div>
            `}),i+="</div>"}a.innerHTML=i}function m(u){const a=document.getElementById("chat-messages"),c=document.getElementById("chat-form"),l=document.getElementById("chat-input");if(!a||!c||!l)return;async function i(){const{data:n}=await o.from("circle_messages").select("message, created_at, user_id").eq("circle_id",u).order("created_at",{ascending:!0});a.innerHTML="";for(const s of n||[]){const{data:g}=await o.from("profiles").select("full_name, avatar_url").eq("id",s.user_id).single();a.innerHTML+=`
              <div style="margin-bottom:1em;">
                <img src="${g?.avatar_url||"default-avatar.png"}" width="24" height="24" style="vertical-align:middle;border-radius:50%;margin-right:8px;">
                <strong>${g?.full_name||"Unknown"}:</strong>
                <span>${s.message}</span>
                <div style="color:#666;font-size:0.8em;margin-top:2px;">
                  ${new Date(s.created_at).toLocaleDateString()} at ${new Date(s.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                </div>
              </div>
            `}a.scrollTop=a.scrollHeight}c.addEventListener("submit",async n=>{n.preventDefault();const s=l.value.trim();if(!s)return;const{data:g}=await o.auth.getUser(),p=g?.user?.id;if(!p){alert("You must be signed in to send messages.");return}await o.from("circle_messages").insert([{circle_id:u,user_id:p,message:s}]),l.value="",await i()}),i(),setInterval(i,3e4)}}async function E(){const{data:e}=await o.from("circles").select("name, description").eq("id",d).single();e?(document.getElementById("circle-name").textContent=e.name,document.getElementById("circle-description").textContent=e.description||""):(document.getElementById("circle-name").textContent="Circle not found.",document.getElementById("circle-description").textContent="")}window.addEventListener("DOMContentLoaded",async()=>{let e="chat";function t(m){e=m,document.querySelectorAll(".tab-btn").forEach(a=>{a.classList.toggle("active",a.dataset.tab===m)}),x(m)}document.querySelectorAll(".tab-btn").forEach(m=>{m.addEventListener("click",()=>{t(m.dataset.tab)})}),await L()&&(await E(),t(e))});
