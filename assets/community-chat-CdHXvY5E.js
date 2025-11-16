import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as r}from"./supabase-vDZkBp_j.js";(async()=>{const{data:s}=await r.auth.getUser(),t=s?.user?.id;t&&localStorage.setItem(`lastReadCommunityChat_${t}`,new Date().toISOString())})();document.getElementById("chat-form").onsubmit=async s=>{s.preventDefault();const t=document.getElementById("message").value.trim(),e=document.getElementById("chat-status");if(e.textContent="",!t){e.textContent="Please enter a message.";return}const{data:o}=await r.auth.getUser(),n=o?.user?.id;if(!n){e.textContent="You must be signed in to send a message.";return}const{error:a}=await r.from("community_messages").insert([{message:t,user_id:n}]);if(a){e.textContent="Error: "+a.message;return}e.textContent="Message sent!",document.getElementById("chat-form").reset(),i()};async function i(){const{data:s}=await r.from("community_messages").select("id, user_id, message, created_at").order("created_at",{ascending:!0}),t=document.getElementById("chat-messages");t.innerHTML="";for(const e of s||[]){let o=e.user_id,n="default-avatar.png";const{data:a}=await r.from("profiles").select("full_name, avatar_url").eq("id",e.user_id).single();a&&(a.full_name&&(o=a.full_name),a.avatar_url&&(n=a.avatar_url)),t.innerHTML+=`
            <div style="margin-bottom:1em;">
              <img src="${n}" width="24" height="24" style="vertical-align:middle;border-radius:50%;margin-right:8px;">
              <strong>${o}:</strong>
              <span>${e.message}</span>
              <div style="color:#666;font-size:0.8em;margin-top:2px;">
                ${new Date(e.created_at).toLocaleDateString()} at ${new Date(e.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
              </div>
            </div>
          `}t.scrollTop=t.scrollHeight}i();
