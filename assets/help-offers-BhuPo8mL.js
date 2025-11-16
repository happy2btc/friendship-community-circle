import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as l}from"./supabase-vDZkBp_j.js";let a=[],f=null;function m(t){const n=t.length,e=t.filter(o=>o.urgency==="critical"||o.urgency==="high").length;document.getElementById("total-requests").textContent=n,document.getElementById("urgent-requests").textContent=e,document.getElementById("my-offers").textContent="0",document.getElementById("helped-count").textContent="0"}function d(t){const n=document.getElementById("requests-container");if(t.length===0){n.innerHTML='<div class="no-requests">No help requests found matching your filters.</div>';return}n.innerHTML='<div class="requests-grid">'+t.map(e=>`
          <div class="request-card" data-id="${e.id}">
            <div class="request-header">
              <div class="requester-info">
                <h3>${e.requester_name}</h3>
                <div class="requester-details">
                  <div class="detail-item">📧 ${e.requester_email}</div>
                  <div class="detail-item">📅 ${new Date(e.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <div class="urgency-badge urgency-${e.urgency}">${e.urgency}</div>
            </div>

            <div class="request-content">
              <div class="category-tag">${g(e.help_category)} ${e.help_category}</div>
              <div style="font-weight: bold; margin-bottom: 0.5rem;">${e.help_title}</div>

              <div class="request-text">
                ${e.help_description}
              </div>

              ${e.additional_info?`
                <div class="request-text">
                  <strong>Additional Information:</strong><br>
                  ${e.additional_info}
                </div>
              `:""}

              <div style="font-size: 0.9em; color: #666; margin-bottom: 1rem;">
                <strong>Preferred Contact:</strong> ${e.preferred_contact}
              </div>
            </div>

            <div class="request-actions">
              <button class="action-btn btn-offer-help" onclick="showOfferForm('${e.id}')">
                🤝 Offer Help
              </button>
              <button class="action-btn btn-email" onclick="window.location.href='mailto:${e.requester_email}?subject=Help Offer: ${e.help_title}'">
                📧 Email
              </button>
            </div>

            <div class="offer-form" id="offer-form-${e.id}">
              <h4>Submit Your Help Offer</h4>
              <div class="form-group">
                <label for="offer-message-${e.id}">Your Help Offer Message</label>
                <textarea id="offer-message-${e.id}" placeholder="Explain how you can help, your relevant experience, and how you'd like to proceed..."></textarea>
              </div>
              <div class="form-actions">
                <button class="action-btn btn-offer-help" onclick="submitOffer('${e.id}')">
                  🚀 Submit Offer
                </button>
                <button class="action-btn" style="background: #6c757d;" onclick="hideOfferForm('${e.id}')">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        `).join("")+"</div>"}function g(t){return{forms:"📋",applications:"📝",documentation:"📄",technical:"💻",administrative:"🏢",guidance:"🧭",translation:"🌐",other:"❓"}[t]||"❓"}function h(t){document.getElementById(`offer-form-${t}`).classList.add("show")}function u(t){document.getElementById(`offer-form-${t}`).classList.remove("show")}async function y(t){const n=document.getElementById(`offer-message-${t}`).value.trim();if(!n){alert("Please enter a message with your help offer.");return}try{const e={request_id:t,helper_email:f||"anonymous@community.org",offer_message:n,status:"pending",created_at:new Date().toISOString()},{data:o,error:r}=await l.from("help_offers").insert([e]);if(r)throw r;alert("✅ Your help offer has been submitted! The person who requested help will be notified."),u(t),document.getElementById(`offer-message-${t}`).value=""}catch(e){console.error("Error submitting help offer:",e),alert("❌ Error submitting offer: "+e.message)}}function c(){const t=document.getElementById("category-filter").value,n=document.getElementById("urgency-filter").value,e=document.getElementById("sort-filter").value;let o=a.filter(r=>{const i=!t||r.help_category===t,s=!n||r.urgency===n;return i&&s});o.sort((r,i)=>{switch(e){case"urgent":const s={critical:4,high:3,medium:2,low:1};return s[i.urgency]-s[r.urgency];case"oldest":return new Date(r.created_at)-new Date(i.created_at);case"newest":default:return new Date(i.created_at)-new Date(r.created_at)}}),d(o)}async function v(){try{const{data:t,error:n}=await l.from("help_requests").select("*").eq("status","open").order("created_at",{ascending:!1});if(n)throw n;a=t||[],m(a),d(a)}catch(t){console.error("Error loading requests:",t),document.getElementById("requests-container").innerHTML='<div class="no-requests">Error loading requests: '+t.message+"</div>"}}window.showOfferForm=h;window.hideOfferForm=u;window.submitOffer=y;async function p(){await v(),document.getElementById("category-filter").addEventListener("change",c),document.getElementById("urgency-filter").addEventListener("change",c),document.getElementById("sort-filter").addEventListener("change",c)}p();
