import"./modulepreload-polyfill-B5Qt9EMX.js";import{s as r}from"./supabase-vDZkBp_j.js";async function z(){const{data:{user:h}}=await r.auth.getUser();if(!h){document.getElementById("receipts-list").innerHTML="<p>Please log in to view support receipts.</p>";return}const{data:o,error:c}=await r.from("support_received").select("id, recipient_id, support_sought, dollars_received, received_at, created_at").order("received_at",{ascending:!1});if(c){console.error("Error loading support received:",c),document.getElementById("receipts-list").innerHTML="<p>Error loading data.</p>";return}const p=o&&o.length?[...new Set(o.map(e=>e.recipient_id))]:[];let a={};if(p.length>0){const{data:e}=await r.from("profiles").select("id, full_name").in("id",p);e?.forEach(n=>{a[n.id]=n.full_name})}a.community="The Friendship Community Circle";const f=document.getElementById("receipts-list");if(!o||o.length===0)f.innerHTML=`<div class="receipt-item">
                        <div class="receipt-header">Support Title - Recipient</div>
                        <div class="receipt-details">
                            <div class="dollars">$0.00</div>
                            <div class="date">No support received yet</div>
                        </div>
                    </div>`;else{const e={};o.forEach(t=>{e[t.support_sought]||(e[t.support_sought]=[]),e[t.support_sought].push(t)});const n=Object.keys(e),y=await Promise.all(n.map(async t=>{const m=e[t],v=m.reduce((i,s)=>i+parseFloat(s.dollars_received||0),0),{data:d}=await r.from("support_requests").select("funding_goal").eq("mission_title",t).not("funding_goal","is",null),l=d&&d.length?d.reduce((i,s)=>i+parseFloat(s.funding_goal||0),0):0,u=l>0?Math.min(100,Math.round(v/l*100)):0,g=100,b=Math.round(u/100*g),x=`
                        <div style="margin:20px 0 10px 0;text-align:center;display:flex;justify-content:center;align-items:flex-end;">
                            <div style="display:flex;flex-direction:column;justify-content:space-between;height:120px;margin-right:8px;">
                                <span style="font-size:0.95em;color:#6b4f1d;">100%</span>
                                <span style="font-size:0.95em;color:#6b4f1d;">80%</span>
                                <span style="font-size:0.95em;color:#6b4f1d;">60%</span>
                                <span style="font-size:0.95em;color:#6b4f1d;">40%</span>
                                <span style="font-size:0.95em;color:#6b4f1d;">20%</span>
                                <span style="font-size:0.95em;color:#6b4f1d;">0%</span>
                            </div>
                            <div style="display:inline-block;position:relative;height:120px;width:32px;">
                                <div style="position:absolute;bottom:0;left:0;width:32px;height:${g}px;background:#eee;border-radius:16px;overflow:hidden;">
                                    <div style="position:absolute;bottom:0;left:0;width:32px;height:${b}px;background:#d32f2f;border-radius:16px 16px 0 0;transition:height 0.5s;"></div>
                                </div>
                                <span style="position:absolute;top:4px;left:50%;transform:translateX(-50%);font-size:1em;color:#d32f2f;font-weight:bold;">${u}%</span>
                            </div>
                            <div style="margin-left:12px;align-self:center;">
                                <div style="font-weight:bold;color:#6b4f1d;margin-bottom:4px;">${t} Progress</div>
                                <div style="margin-top:8px;font-size:1em;color:#d32f2f;font-weight:bold;">$${v.toLocaleString()} of $${l.toLocaleString()} goal received</div>
                            </div>
                        </div>
                    `,_=m.map(i=>{const s=a[i.recipient_id]||"Unknown",w=new Date(i.received_at).toLocaleDateString(),$=new Date(i.received_at).toLocaleTimeString();return`
                            <div class="receipt-item">
                                <div class="receipt-header">${t} - ${s}</div>
                                <div class="receipt-details">
                                    <div class="dollars">$${parseFloat(i.dollars_received).toFixed(2)}</div>
                                    <div class="date">Received on ${w} at ${$}</div>
                                </div>
                            </div>
                        `}).join("");return`<div style="border:2px solid #e6f7f2;border-radius:14px;padding:18px;margin-bottom:28px;background:#fafbfa;">
                        ${x}
                        ${_}
                    </div>`}));f.innerHTML=y.join("")}}z();
