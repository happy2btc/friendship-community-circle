import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as i}from"./supabase-vDZkBp_j.js";let r=[];async function a(){try{const{data:t,error:e}=await i.from("suggestions").select("*").order("created_at",{ascending:!1});if(e)throw new Error(`Failed to fetch suggestions: ${e.message}`);r=t,g("all")}catch(t){document.getElementById("suggestionContainer").innerHTML=`<p>⚠️ Unable to load suggestions: ${t.message}</p>`,console.error("Error loading suggestions:",t)}}function g(t){const e=document.getElementById("suggestionContainer");e.innerHTML="";const o=r;if(o.length===0){e.innerHTML="<p>🌸 No suggestions found for this category.</p>";return}o.forEach(s=>{const n=document.createElement("div");n.className="suggestion-box",n.innerHTML=`
          <h3>${s.title}</h3>
          <p>${s.description}</p>
          <p><strong>Status:</strong> ${s.status}</p>
        `,e.appendChild(n)})}a();
