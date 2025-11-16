import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as c}from"./supabase-vDZkBp_j.js";let o=[];function p(e){const n=e.length,t=e.filter(i=>i.status==="pending").length,s=e.filter(i=>i.status==="approved").length,a=e.filter(i=>i.status==="contacted").length;document.getElementById("total-apps").textContent=n,document.getElementById("pending-apps").textContent=t,document.getElementById("approved-apps").textContent=s,document.getElementById("contacted-apps").textContent=a}function r(e){const n=document.getElementById("applications-container");if(e.length===0){n.innerHTML='<div class="no-applications">No applications found matching your filters.</div>';return}n.innerHTML='<div class="applications-grid">'+e.map(t=>`
          <div class="application-card" data-id="${t.id}">
            <div class="application-header">
              <div class="applicant-info">
                <h3>${t.helper_name}</h3>
                <div class="applicant-details">
                  <div class="detail-item">📧 ${t.helper_email}</div>
                  ${t.helper_phone?`<div class="detail-item">📱 ${t.helper_phone}</div>`:""}
                  <div class="detail-item">📅 ${new Date(t.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <div class="status-badge status-${t.status}">${t.status}</div>
            </div>

            <div class="application-content">
              <div class="skills-section">
                <strong>Skills:</strong>
                <div class="skills-list">
                  ${t.helper_skills.split(", ").map(s=>`<span class="skill-tag">${s.trim()}</span>`).join("")}
                </div>
              </div>

              ${t.experience?`<div><strong>Experience:</strong> ${t.experience}</div>`:""}
              ${t.availability?`<div><strong>Availability:</strong> ${t.availability}</div>`:""}

              ${t.background?`
                <div class="application-text">
                  <strong>Background:</strong><br>
                  ${t.background}
                </div>
              `:""}

              ${t.motivation?`
                <div class="application-text">
                  <strong>Motivation:</strong><br>
                  ${t.motivation}
                </div>
              `:""}
            </div>

            <div class="application-actions">
              <button class="action-btn btn-email" onclick="window.location.href='mailto:${t.helper_email}?subject=Helper Application Review'">
                📧 Email
              </button>
              ${t.status==="pending"?`
                <button class="action-btn btn-approve" onclick="updateStatus('${t.id}', 'approved')">
                  ✅ Approve
                </button>
                <button class="action-btn btn-contact" onclick="updateStatus('${t.id}', 'contacted')">
                  📞 Contact
                </button>
                <button class="action-btn btn-reject" onclick="updateStatus('${t.id}', 'rejected')">
                  ❌ Reject
                </button>
              `:""}
            </div>
          </div>
        `).join("")+"</div>"}async function v(e,n){try{const{error:t}=await c.from("helper_applications").update({status:n,reviewed_at:new Date().toISOString()}).eq("id",e);if(t)throw t;await d()}catch(t){console.error("Error updating application status:",t),alert("Error updating application status: "+t.message)}}function l(){const e=document.getElementById("status-filter").value,n=document.getElementById("skill-filter").value,t=document.getElementById("sort-filter").value;let s=o.filter(a=>{const i=!e||a.status===e,u=!n||a.helper_skills.toLowerCase().includes(n.toLowerCase());return i&&u});s.sort((a,i)=>{switch(t){case"oldest":return new Date(a.created_at)-new Date(i.created_at);case"name":return a.helper_name.localeCompare(i.helper_name);case"newest":default:return new Date(i.created_at)-new Date(a.created_at)}}),r(s)}async function d(){try{const{data:e,error:n}=await c.from("helper_applications").select("*").order("created_at",{ascending:!1});if(n)throw n;o=e||[],p(o),r(o)}catch(e){console.error("Error loading applications:",e),document.getElementById("applications-container").innerHTML='<div class="no-applications">Error loading applications: '+e.message+"</div>"}}window.updateStatus=v;async function m(){await d(),document.getElementById("status-filter").addEventListener("change",l),document.getElementById("skill-filter").addEventListener("change",l),document.getElementById("sort-filter").addEventListener("change",l)}m();
