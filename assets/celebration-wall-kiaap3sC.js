import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as d}from"./supabase-vDZkBp_j.js";document.getElementById("wall-form").onsubmit=async t=>{t.preventDefault();const i=document.getElementById("headline").value.trim(),a=document.getElementById("story").value.trim(),n=document.getElementById("wall-status");if(n.textContent="",!i||!a){n.textContent="Please fill out both fields.";return}const{data:e}=await d.auth.getUser(),s=e?.user?.id;if(!s){n.textContent="You must be signed in to share a story.";return}const{error:o}=await d.from("celebrations").insert([{headline:i,story:a,user_id:s}]);if(o){n.textContent="Error: "+o.message;return}n.textContent="Story shared!",document.getElementById("wall-form").reset(),r()};async function r(){const{data:t}=await d.auth.getUser(),i=t?.user?.id,{data:a}=await d.from("celebrations").select("id, headline, story, created_at, user_id").eq("visible",!0).order("created_at",{ascending:!1}),n=document.getElementById("stories");n.innerHTML="",a?.forEach(e=>{const s=i===e.user_id,o=e.story.length>120?e.story.slice(0,120)+"...":e.story;n.innerHTML+=`
          <div class="story-card">
            <div class="headline">${e.headline}</div>
            <div>
              <span id="preview-${e.id}">${o}</span>
              ${e.story.length>120?`<span class="read-more" style="margin-left:8px;" onclick="document.getElementById('preview-${e.id}').style.display='none';document.getElementById('full-${e.id}').style.display='inline';this.style.display='none';">Read More</span>`:""}
              <span id="full-${e.id}" style="display:none;">${e.story}</span>
            </div>
            <div style="color:#888;font-size:0.9em;">${new Date(e.created_at).toLocaleString()}</div>
            ${s?`<button class="edit-btn" data-id="${e.id}" data-headline="${e.headline.replace(/"/g,"&quot;")}" data-story="${e.story.replace(/"/g,"&quot;")}">Edit</button>`:""}
            <div id="edit-form-${e.id}" style="display:none;margin-top:1em;"></div>
          </div>
        `})}r();window.editStory=function(t,i,a){const n=document.getElementById(`edit-form-${t}`);n.innerHTML=`
        <form onsubmit="return false;">
          <input type="text" id="edit-headline-${t}" value="${i}" style="width:100%;margin-bottom:0.5em;">
          <textarea id="edit-story-${t}" rows="4" style="width:100%;">${a}</textarea>
          <button type="button" class="save-edit-btn" data-id="${t}">Save</button>
          <button type="button" class="cancel-edit-btn" data-id="${t}">Cancel</button>
        </form>
      `,n.style.display="block"};window.cancelEdit=function(t){document.getElementById(`edit-form-${t}`).style.display="none"};window.saveEdit=async function(t){const i=document.getElementById(`edit-headline-${t}`).value.trim(),a=document.getElementById(`edit-story-${t}`).value.trim();if(!i||!a){alert("Please fill out both fields.");return}const{error:n}=await d.from("celebrations").update({headline:i,story:a}).eq("id",t);if(n){alert("Error: "+n.message);return}document.getElementById(`edit-form-${t}`).style.display="none",r()};document.getElementById("stories").addEventListener("click",function(t){if(t.target.classList.contains("edit-btn")){const i=t.target.getAttribute("data-id"),a=t.target.getAttribute("data-headline"),n=t.target.getAttribute("data-story");window.editStory(i,a,n)}if(t.target.classList.contains("save-edit-btn")){const i=t.target.getAttribute("data-id");window.saveEdit(i)}if(t.target.classList.contains("cancel-edit-btn")){const i=t.target.getAttribute("data-id");window.cancelEdit(i)}});
