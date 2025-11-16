import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as r}from"./supabase-vDZkBp_j.js";const re=document.getElementById("show-form-btn"),f=document.getElementById("project-form"),ne=document.getElementById("cancel-form-btn"),B=document.getElementById("form-error"),A=document.getElementById("form-success"),W=document.getElementById("circle"),O=document.getElementById("circle-filter"),N=document.getElementById("projects-tbody");let D=[],V={},R="";async function ae(){const{data:u}=await r.from("circles").select("id, name");D=u||[],W.innerHTML=D.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");let y='<option value="">All Circles</option>';y+=D.map(p=>`<option value="${p.id}">${p.name}</option>`).join(""),O.innerHTML=y}async function ie(){const{data:u}=await r.from("profiles").select("id, full_name");V={},(u||[]).forEach(p=>{V[p.id]=p.full_name});const y=document.getElementById("proposer-name");y.innerHTML=(u||[]).map(p=>`<option value="${p.id}">${p.full_name}</option>`).join("")}async function C(){let u=r.from("group_projects").select("*").order("entered_at",{ascending:!1});R&&(u=u.eq("circle_id",R));const{data:y}=await u;N.innerHTML="";const p=document.getElementById("projects-cards");p.innerHTML="";const{data:S}=await r.auth.getUser(),E=S?.user?.id;for(const o of y||[]){let Y=function(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"):""},T=function(e){w.length&&(_=(e%w.length+w.length)%w.length,Z.innerHTML=`<img src="${w[_]}" style="max-width:80vw;max-height:70vh;margin:8px;border-radius:10px;box-shadow:0 2px 12px #222;" />`)};const q=D.find(e=>e.id===o.circle_id)?.name||"Unknown",j=V[o.proposer_id]||"Unknown",h=o.entered_at?new Date(o.entered_at).toLocaleDateString():"";let b=!1;if(E){console.log("Checking participation for user:",E,"project:",o.id);const{data:e,error:n}=await r.from("group_project_participants").select("*").eq("project_id",o.id).eq("user_id",E).single();console.log("Participation check result:",e),console.log("Participation check error:",n),b=!!e}let x="",v=[];try{const{data:e,error:n}=await r.storage.from("project-images").list(`${o.id}/`);!n&&e&&e.length>0&&(v=e.filter(t=>t.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)).map(t=>{const{data:d}=r.storage.from("project-images").getPublicUrl(`${o.id}/${t.name}`);return d.publicUrl}))}catch{}v.length>0&&(x=`
            <div class="project-thumbnails" style="display:flex;gap:6px;flex-wrap:wrap;cursor:pointer;" data-images='${JSON.stringify(v)}'>
              ${v.map(e=>`<img src="${e}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;box-shadow:0 1px 4px #ccc;" loading="lazy" />`).join("")}
            </div>
          `);const L=b?"✅ Joined":"Join",M=b?"joined-btn":"join-btn";N.innerHTML+=`
          <tr>
            <td>${q}</td>
            <td>${o.name}</td>
            <td>${o.description||""}
              <div style="margin-top:10px;">
                <button class="${M}" data-project="${o.id}" ${b?"disabled":""} style="background:#1976d2;color:#fff;border:none;border-radius:5px;padding:4px 10px;cursor:pointer;margin-right:8px;">${L}</button>
                <button class="update-btn" data-project="${o.id}" style="background:#ffc107;color:#333;border:none;border-radius:5px;padding:4px 10px;cursor:pointer;">Update</button>
                <button class="view-participants-btn" data-project="${o.id}" style="background:#6b4f1d;color:#fff;border:none;border-radius:5px;padding:4px 10px;cursor:pointer;margin-left:8px;">👥 View Members</button>
              </div>
            </td>
            <td>
              <div class="comments-section" data-project="${o.id}" style="background:#f4f8fb;padding:8px 10px;border-radius:6px;">
                <div class="comments-list" id="comments-list-${o.id}"></div>
                <form class="comment-form" data-project="${o.id}" style="margin-top:8px;display:flex;gap:6px;align-items:center;">
                  <input type="text" class="comment-input" placeholder="Add a comment..." style="flex:1;padding:4px 8px;border-radius:4px;border:1px solid #ccc;" required />
                  <input type="text" class="display-name-input" placeholder="Display name (optional)" style="width:180px;padding:4px 8px;border-radius:4px;border:1px solid #ccc;" />
                  <button type="submit" style="background:#2e8b57;color:#fff;border:none;border-radius:4px;padding:4px 12px;">Post</button>
                </form>
              </div>
            </td>
            <td>${j}</td>
            <td>${h}</td>
            <td>${o.num_participants||0}</td>
            <td><span class="status ${o.status}">${o.status}</span></td>
            <td>${x}</td>
          </tr>
        `;const H=b?"✅ Member":"Join Project",P=b?"joined-btn":"join-btn",X=`
          <div class="project-card">
            <h3>${o.name}</h3>
            <div class="project-meta">
              <span>Circle: ${q}</span>
              <span>By: ${j}</span>
              <span>Date: ${h}</span>
              <span>Participants: ${o.num_participants||0}</span>
              <span class="status ${o.status}">${o.status}</span>
            </div>
            <div class="project-description">${o.description||""}</div>
            <div class="project-actions">
              <button class="${P}" data-project="${o.id}" ${b?"disabled":""}>${H}</button>
              <button class="update-btn" data-project="${o.id}">Update</button>
              <button class="view-participants-btn" data-project="${o.id}">👥 Members</button>
            </div>
            <div class="comments-section" data-project="${o.id}" style="margin-top:1rem;background:#f4f8fb;padding:8px 10px;border-radius:6px;">
              <div class="comments-list" id="comments-list-mobile-${o.id}"></div>
              <form class="comment-form" data-project="${o.id}" style="margin-top:8px;display:flex;flex-direction:column;gap:6px;">
                <input type="text" class="comment-input" placeholder="Add a comment..." required style="padding:6px 8px;border-radius:4px;border:1px solid #ccc;" />
                <input type="text" class="display-name-input" placeholder="Display name (optional)" style="padding:6px 8px;border-radius:4px;border:1px solid #ccc;" />
                <button type="submit" style="background:#2e8b57;color:#fff;border:none;border-radius:4px;padding:6px 12px;">Post Comment</button>
              </form>
            </div>
            ${x?`<div style="margin-top:1rem;">${x}</div>`:""}
          </div>
        `;p.innerHTML+=X,document.body.insertAdjacentHTML("beforeend",`
    <div id="gallery-modal" style="display:none;position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);align-items:center;justify-content:center;">
      <div id="gallery-content" style="position:relative;max-width:90vw;max-height:90vh;">
        <span id="gallery-close" style="position:absolute;top:-32px;right:0;font-size:2em;color:#fff;cursor:pointer;">&times;</span>
        <button id="gallery-prev" style="position:absolute;left:-60px;top:50%;transform:translateY(-50%);background:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:2em;cursor:pointer;box-shadow:0 2px 8px #222;">&#8592;</button>
        <button id="gallery-next" style="position:absolute;right:-60px;top:50%;transform:translateY(-50%);background:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:2em;cursor:pointer;box-shadow:0 2px 8px #222;">&#8594;</button>
        <div id="gallery-images" style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:center;"></div>
      </div>
    </div>
  `),setTimeout(()=>{document.querySelectorAll(".comment-form").forEach(e=>{e.addEventListener("submit",async n=>{n.preventDefault();const t=e.getAttribute("data-project"),d=e.querySelector(".comment-input"),l=e.querySelector(".display-name-input"),m=d.value.trim(),a=l&&l.value.trim()||null;if(!m)return;const{data:c}=await r.auth.getUser();let i="Member",s=null;if(c&&c.user){s=c.user.id;const{data:k}=await r.from("profiles").select("full_name,is_admin").eq("id",s).single();k&&k.full_name&&(i=k.full_name)}else a&&(i=a);console.log("Inserting comment:",{project_id:t,comment:m,author_name:i,user_id:s,display_name:a});const{data:g,error:$}=await r.from("group_project_comments").insert([{project_id:t,comment:m,author_name:i,user_id:s,display_name:a,approved:!1}]);if(console.log("Comment insert result:",{insertResult:g,insertError:$}),$){console.error("Failed to insert comment:",$),alert("Failed to post comment: "+$.message);return}d.value="",l&&(l.value=""),U(t)})}),document.querySelectorAll(".join-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-project"),{data:t}=await r.auth.getUser();if(console.log("Current user data:",t),!t||!t.user){alert("Please log in to join projects.");return}const d=t.user.id;console.log("User ID:",d);try{const{data:l}=await r.from("group_project_participants").select("*").eq("project_id",n).eq("user_id",d).single();if(l){alert("You are already a participant in this project!");return}console.log("Inserting participant record for project:",n,"user:",d);const{error:m,data:a}=await r.from("group_project_participants").insert([{project_id:n,user_id:d,joined_at:new Date().toISOString()}]);if(console.log("Insert result:",a),console.log("Insert error:",m),m){console.error("Error joining project:",m),alert("Failed to join project. Please try again.");return}const{data:c}=await r.from("group_projects").select("num_participants").eq("id",n).single();if(c){const{error:i}=await r.from("group_projects").update({num_participants:(c.num_participants||0)+1,updated_at:new Date().toISOString()}).eq("id",n);i&&console.warn("Could not update participant count:",i)}alert(`Successfully joined the project! 🎉

As a member you can:
• Participate in project discussions
• Contribute to project updates
• Connect with other members
• Access project resources
• Help drive the project forward!

Debug: Joined as user ${d}`),await C()}catch(l){console.error("Error joining project:",l),alert("An error occurred. Please try again.")}})}),document.querySelectorAll(".view-participants-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-project"),{data:t}=await r.auth.getUser();if(!t?.user){alert("Please log in to view project members.");return}try{const{data:d}=await r.from("group_projects").select("*").eq("id",n).single();if(!d){alert("Project not found.");return}console.log("Fetching participants for project:",n);const{data:l,error:m}=await r.from("group_project_participants").select("user_id, joined_at").eq("project_id",n).order("joined_at",{ascending:!0});console.log("Raw participants data:",l),console.log("Participants error:",m);let a=[];if(l&&!m)for(const i of l){const{data:s,error:g}=await r.from("profiles").select("full_name").eq("id",i.user_id).single();a.push({user_id:i.user_id,joined_at:i.joined_at,profiles:s||{full_name:"Anonymous Member"}})}console.log("Final participants data:",a);const c=`
            <div id="participants-modal" style="position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;">
              <div style="background:#fff;padding:2rem;border-radius:10px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;">
                <h3 style="margin-top:0;color:#2e8b57;">${d.name} - Members</h3>
                <p style="color:#666;margin-bottom:1rem;">${a?.length||0} participant(s)</p>

                ${a&&a.length>0?`
                  <div style="margin-bottom:1rem;">
                    ${a.map(i=>`
                      <div style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem;border-bottom:1px solid #eee;">
                        <span style="font-weight:bold;color:#2e8b57;">${i.profiles?.full_name||"Anonymous Member"}</span>
                        <span style="font-size:0.9em;color:#666;">Joined ${new Date(i.joined_at).toLocaleDateString()}</span>
                      </div>
                    `).join("")}
                  </div>
                `:`
                  <p style="color:#666;text-align:center;padding:2rem;">No participants yet. Be the first to join!</p>
                `}

                <div style="text-align:right;">
                  <button id="close-participants-modal" style="background:#6b4f1d;color:#fff;border:none;border-radius:5px;padding:8px 16px;cursor:pointer;">Close</button>
                </div>
              </div>
            </div>
          `;document.body.insertAdjacentHTML("beforeend",c),document.getElementById("close-participants-modal").addEventListener("click",()=>{document.getElementById("participants-modal").remove()}),document.getElementById("participants-modal").addEventListener("click",i=>{i.target.id==="participants-modal"&&document.getElementById("participants-modal").remove()})}catch(d){console.error("Error loading participants:",d),alert("Failed to load participants. Please try again.")}})}),document.querySelectorAll(".update-btn").forEach(e=>{e.addEventListener("click",async()=>{const n=e.getAttribute("data-project");try{const{data:t}=await r.from("group_projects").select("*").eq("id",n).single();if(!t){alert("Project not found.");return}const{data:d}=await r.from("circles").select("id, name"),{data:l}=await r.from("profiles").select("id, full_name"),m=`
            <div id="update-modal" style="position:fixed;z-index:1000;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;">
              <div style="background:#fff;padding:2rem;border-radius:10px;max-width:600px;width:90%;max-height:90vh;overflow-y:auto;">
                <h3 style="margin-top:0;color:#2e8b57;">Update Project: ${t.name}</h3>

                <form id="update-project-form">
                  <div style="margin-bottom:1rem;">
                    <label for="update-circle" style="display:block;margin-bottom:0.5rem;color:#2e8b57;font-weight:bold;">Circle</label>
                    <select id="update-circle" name="circle" required style="width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;">
                      ${d?.map(a=>`<option value="${a.id}" ${a.id===t.circle_id?"selected":""}>${a.name}</option>`).join("")||""}
                    </select>
                  </div>

                  <div style="margin-bottom:1rem;">
                    <label for="update-proposer" style="display:block;margin-bottom:0.5rem;color:#2e8b57;font-weight:bold;">Proposer Name</label>
                    <select id="update-proposer" name="proposer" required style="width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;">
                      ${l?.map(a=>`<option value="${a.id}" ${a.id===t.proposer_id?"selected":""}>${a.full_name}</option>`).join("")||""}
                    </select>
                  </div>

                  <div style="margin-bottom:1rem;">
                    <label for="update-name" style="display:block;margin-bottom:0.5rem;color:#2e8b57;font-weight:bold;">Project Name</label>
                    <input type="text" id="update-name" name="name" value="${t.name||""}" required style="width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;" />
                  </div>

                  <div style="margin-bottom:1rem;">
                    <label for="update-description" style="display:block;margin-bottom:0.5rem;color:#2e8b57;font-weight:bold;">Description</label>
                    <textarea id="update-description" name="description" rows="4" required style="width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;">${t.description||""}</textarea>
                  </div>

                  <div style="margin-bottom:1rem;">
                    <label for="update-num-participants" style="display:block;margin-bottom:0.5rem;color:#2e8b57;font-weight:bold;">Number of Participants</label>
                    <input type="number" id="update-num-participants" name="num-participants" min="1" value="${t.num_participants||1}" required style="width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;" />
                  </div>

                  <div style="margin-bottom:1.5rem;">
                    <label for="update-status" style="display:block;margin-bottom:0.5rem;color:#2e8b57;font-weight:bold;">Status</label>
                    <select id="update-status" name="status" required style="width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;">
                      <option value="pending" ${t.status==="pending"?"selected":""}>Pending</option>
                      <option value="started" ${t.status==="started"?"selected":""}>Started</option>
                      <option value="in process" ${t.status==="in process"?"selected":""}>In Process</option>
                      <option value="completed" ${t.status==="completed"?"selected":""}>Completed</option>
                    </select>
                  </div>

                  <div style="text-align:right;gap:10px;display:flex;justify-content:flex-end;">
                    <button type="button" id="cancel-update-btn" style="background:#ccc;color:#333;border:none;border-radius:6px;padding:10px 20px;cursor:pointer;">Cancel</button>
                    <button type="submit" style="background:#2e8b57;color:#fff;border:none;border-radius:6px;padding:10px 20px;cursor:pointer;">Update Project</button>
                  </div>
                </form>
              </div>
            </div>
          `;document.body.insertAdjacentHTML("beforeend",m),document.getElementById("update-project-form").addEventListener("submit",async a=>{a.preventDefault();const c=new FormData(a.target),i={circle_id:c.get("circle"),proposer_id:c.get("proposer"),name:c.get("name").trim(),description:c.get("description").trim(),num_participants:parseInt(c.get("num-participants"),10)||1,status:c.get("status"),updated_at:new Date().toISOString()};try{console.log("Updating project:",n,"with data:",i);const{data:s,error:g}=await r.from("group_projects").update(i).eq("id",n);if(console.log("Update result:",{updateResult:s,updateError:g}),g){console.error("Error updating project:",g),alert("Failed to update project: "+g.message);return}alert("Project updated successfully! 🎉"),document.getElementById("update-modal").remove(),await C()}catch(s){console.error("Exception during project update:",s),alert("An error occurred: "+s.message)}}),document.getElementById("cancel-update-btn").addEventListener("click",()=>{document.getElementById("update-modal").remove()}),document.getElementById("update-modal").addEventListener("click",a=>{a.target.id==="update-modal"&&document.getElementById("update-modal").remove()})}catch(t){console.error("Error loading project for update:",t),alert("Failed to load project data. Please try again.")}})}),document.querySelectorAll(".comments-section").forEach(e=>{const n=e.getAttribute("data-project");console.log("Found comments section for project:",n),U(n)})},0);async function U(e){console.log("Loading comments for project:",e);const{data:n}=await r.auth.getUser();let t=!1;if(n&&n.user){const i=n.user.id,{data:s}=await r.from("profiles").select("is_admin").eq("id",i).single();s&&s.is_admin&&(t=!0)}console.log("User is admin:",t);let d=r.from("group_project_comments").select("*").eq("project_id",e).order("created_at",{ascending:!0});t||(d=d.eq("approved",!0));const{data:l,error:m}=await d;console.log("Comments query result:",{comments:l,error:m,count:l?l.length:0});const a=document.getElementById("comments-list-"+e),c=document.getElementById("comments-list-mobile-"+e);console.log("Comment list elements:",{desktopList:a,mobileList:c}),[a,c].forEach(i=>{if(!i){console.log("List element not found");return}i.innerHTML="",(l||[]).forEach(s=>{const g=s.author_name||s.display_name||"Member",$=s.approved?"":'<span style="color:#856404;margin-left:6px;font-size:0.9em">(pending)</span>',k=t&&!s.approved?` <button data-comment="${s.id}" data-project="${e}" class="approve-comment-btn" style="margin-left:8px;padding:2px 6px;border-radius:4px;background:#28a745;color:#fff;border:none;cursor:pointer;">Approve</button>`:"",F=document.createElement("div");F.style.marginBottom="6px",F.innerHTML=`<span style="color:#1976d2;font-weight:bold;">${Y(g)}:</span> ${Y(s.comment)} ${$} ${k}`,i.appendChild(F)}),console.log("Added",(l||[]).length,"comments to list")}),document.querySelectorAll(".approve-comment-btn").forEach(i=>{i.addEventListener("click",async s=>{const g=i.getAttribute("data-comment");await r.from("group_project_comments").update({approved:!0}).eq("id",g),U(i.getAttribute("data-project"))})})}const I=document.getElementById("gallery-modal"),Z=document.getElementById("gallery-images"),ee=document.getElementById("gallery-close"),te=document.getElementById("gallery-prev"),oe=document.getElementById("gallery-next");let w=[],_=0;N.addEventListener("click",function(e){const n=e.target.closest(".project-thumbnails");n&&(w=JSON.parse(n.getAttribute("data-images")),_=0,T(_),I.style.display="flex")}),ee.onclick=()=>{I.style.display="none"},I.onclick=e=>{e.target===I&&(I.style.display="none")},te.onclick=e=>{e.stopPropagation(),T(_-1)},oe.onclick=e=>{e.stopPropagation(),T(_+1)}}}re.addEventListener("click",()=>{f.style.display="block",B.textContent="",A.textContent=""});ne.addEventListener("click",()=>{f.reset(),f.style.display="none",B.textContent="",A.textContent=""});const z=document.getElementById("toggle-view-btn"),G=document.getElementById("projects-table"),K=document.getElementById("projects-cards");let J=!0;z.addEventListener("click",()=>{J=!J,J?(G.style.display="none",K.style.display="flex",z.textContent="📋 Table View"):(G.style.display="table",K.style.display="none",z.textContent="📄 Card View")});f.addEventListener("submit",async u=>{u.preventDefault(),B.textContent="",A.textContent="";const y=W.value,p=document.getElementById("proposer-name").value,S=f.name.value.trim(),E=f.description.value.trim(),o=parseInt(f["num-participants"].value,10)||1,q=f.status.value,{data:j,error:h}=await r.from("group_projects").insert([{circle_id:y,proposer_id:p,name:S,description:E,num_participants:o,status:q}]).select();if(h||!j||!j[0]||!j[0].id){B.textContent=h&&h.message||"Could not create project.";return}const b=j[0].id,x=document.getElementById("project-images");if(x.files.length>0)for(let v=0;v<x.files.length;v++){const L=x.files[v],M=L.name.split(".").pop(),H=`${b}/${Date.now()}_${Math.random().toString(36).substr(2,6)}.${M}`,{error:P}=await r.storage.from("project-images").upload(H,L);if(P){B.textContent="Image upload failed: "+P.message;return}}A.textContent="Project submitted!",f.reset(),f.style.display="none",await C()});await ae();await ie();await C();const{data:se}=await r.auth.getUser(),Q=document.getElementById("auth-status");se?.user?Q.style.display="none":Q.style.display="block";O.addEventListener("change",async u=>{R=O.value,await C()});
