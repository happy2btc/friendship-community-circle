import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as h}from"./supabase-vDZkBp_j.js";const o=document.getElementById("archive-container"),m=document.getElementById("search-bar");let l=[];function g(r){if(!r||r.length===0){o.innerHTML="<p>No matching completed agreements found.</p>";return}o.innerHTML="";const e={circle_function:[],member_behavior:[],social_political:[],uncategorized:[]};r.forEach(n=>{e[n.category]?e[n.category].push(n):e.uncategorized.push(n)});const s={circle_function:"Circle Function & Operation",member_behavior:"Member & Circle Behavior",social_political:"Social or Political Issues",uncategorized:"Uncategorized"};let a=!1;for(const n in s){const d=e[n];if(d.length>0){a=!0;const c=document.createElement("div");c.className="category-section";let i=`<h2>${s[n]}</h2>
                        <table class="agreements-table">
                            <thead>
                                <tr>
                                    <th>Agreement</th>
                                    <th>Proposer</th>
                                    <th>Date</th>
                                    <th class="agree">Agree</th>
                                    <th class="disagree">Disagree</th>
                                    <th class="abstain">Abstain</th>
                                    <th>Turnout</th>
                                </tr>
                            </thead>
                            <tbody>`;d.forEach(t=>{i+=`<tr>
                            <td><strong>${t.suggestion_title||t.agreement_text}</strong></td>
                            <td>${t.proposer_name||"A Member"}</td>
                            <td>${new Date(t.created_at).toLocaleDateString()}</td>
                            <td class="agree">${t.agree_votes}</td>
                            <td class="disagree">${t.disagree_votes}</td>
                            <td class="abstain">${t.abstain_votes}</td>
                            <td>${t.voter_turnout_percentage}%</td>
                        </tr>`}),i+="</tbody></table>",c.innerHTML=i,o.appendChild(c)}}a||(o.innerHTML="<p>No matching completed agreements found for your search.</p>")}async function u(){const{data:r,error:e}=await h.rpc("get_detailed_completed_agreements");if(e){o.innerHTML=`<p style="color: red;">Error loading agreements: ${e.message}</p>`;return}l=r||[],g(l)}u();m.addEventListener("input",r=>{const e=r.target.value.toLowerCase(),s=l.filter(a=>(a.suggestion_title||a.agreement_text||"").toLowerCase().includes(e));g(s)});
