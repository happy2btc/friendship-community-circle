import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as m}from"./supabase-vDZkBp_j.js";let a=[];const o=[];function c(n){const e=document.getElementById("helpers-grid"),s=document.getElementById("no-helpers");if(n.length===0){e.innerHTML="",s.style.display="block";return}s.style.display="none",e.innerHTML=n.map(i=>`
        <div class="helper-card" data-category="${i.specialty.toLowerCase().replace(/\s+/g,"-")}">
          <div class="helper-header">
            <div class="helper-avatar">${i.name.split(" ").map(t=>t[0]).join("")}</div>
            <div class="helper-info">
              <h3>${i.name}</h3>
              <div class="helper-specialty">${i.specialty}</div>
            </div>
          </div>

          <div class="helper-stats">
            <div class="stat-item">⭐ ${i.experience}</div>
            <div class="stat-item">🤝 ${i.help_count} helped</div>
            <div class="stat-item">🕒 ${i.availability}</div>
          </div>

          <div class="helper-description">${i.description}</div>

          <div class="helper-skills">
            ${i.skills.map(t=>`<span class="skill-tag">${t}</span>`).join("")}
          </div>

          <a href="mailto:${i.email}?subject=Help Request - ${i.specialty}"
             class="contact-btn">
            📧 Contact ${i.name.split(" ")[0]}
          </a>
        </div>
      `).join("")}function l(){const n=document.getElementById("category-filter").value.toLowerCase(),e=document.getElementById("search-filter").value.toLowerCase(),s=document.getElementById("sort-filter").value;let i=a.filter(t=>{const r=!n||t.specialty.toLowerCase().includes(n.replace("-"," "))||n==="general"&&t.specialty==="General Support",d=!e||t.name.toLowerCase().includes(e)||t.skills.some(p=>p.toLowerCase().includes(e))||t.specialty.toLowerCase().includes(e);return r&&d});i.sort((t,r)=>{switch(s){case"experience":return parseInt(r.experience)-parseInt(t.experience);case"recent":return r.help_count-t.help_count;case"name":default:return t.name.localeCompare(r.name)}}),c(i)}function u(){const e=new URLSearchParams(window.location.search).get("category");if(e){const s=document.getElementById("category-filter");s.value=e;const i=document.querySelector(".filters"),t=document.createElement("p");t.style.color="#2e8b57",t.style.fontSize="0.9em",t.style.marginTop="0.5rem",t.style.textAlign="center",t.innerHTML="💡 Filter pre-selected from Help Categories page",i.appendChild(t)}}async function y(){try{const{data:n,error:e}=await m.from("helper_applications").select("*").eq("status","approved").order("created_at",{ascending:!1});e?(console.error("Error loading helpers:",e),a=o):a=n.map(s=>({id:s.id,name:s.helper_name,specialty:g(s.helper_skills),experience:s.experience?"Experienced":"New Helper",help_count:0,availability:s.availability||"Flexible",description:s.motivation||"Dedicated community helper ready to assist.",skills:s.helper_skills.split(",").map(i=>i.trim()),email:s.helper_email,phone:s.helper_phone})),c(a),u(),document.getElementById("category-filter").addEventListener("change",l),document.getElementById("search-filter").addEventListener("input",l),document.getElementById("sort-filter").addEventListener("change",l)}catch(n){console.error("Error initializing helper directory:",n),a=o,c(a)}}function g(n){const e=n.toLowerCase();return e.includes("form")||e.includes("filing")?"Form Completion & Filing":e.includes("application")||e.includes("registration")?"Applications & Registrations":e.includes("document")?"Document Preparation":e.includes("technical")||e.includes("computer")?"Technical Support":e.includes("administrative")?"Administrative Processes":e.includes("guidance")||e.includes("advice")?"Guidance & Advice":e.includes("translation")||e.includes("language")?"Translation Services":"General Support"}y();
