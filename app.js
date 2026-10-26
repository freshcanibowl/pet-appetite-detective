import {validate,summarize} from './logic.js';
const key='pet-appetite-detective-v1';
const $=id=>document.getElementById(id);
const days=[1,2,3,4,5,6,7];
const names=['Refused','A few bites','Ate some','Ate well'];
for(const d of days){const opt=document.createElement('option');opt.value=d;opt.textContent='Day '+d;$('day').append(opt)}
let entries=[];
try{const stored=JSON.parse(localStorage.getItem(key)||'[]');entries=Array.isArray(stored)?stored.filter(validate):[]}catch{}
const persist=()=>localStorage.setItem(key,JSON.stringify(entries));
const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=String(text);return node};
function render(){
 const s=summarize(entries);
 $('progress-label').textContent=`${s.observedDays} of 7 days remembered`;
 $('progress-fill').style.width=`${s.observedDays/7*100}%`;
 const pattern=el('div','pattern-wrap');const bars=el('div','bar-chart');
 for(const day of days){const e=s.entries.find(x=>x.day===day);const item=el('div','bar-item');const track=el('div','bar-track');const bar=el('div','bar'+(e?' has-value':' empty'));bar.style.height=e?`${Math.max(12,(e.appetite+1)*22)}%`:'8%';bar.title=e?`Day ${day}: ${names[e.appetite]}`:`Day ${day}: Not recorded`;track.append(bar);item.append(track,el('span','bar-label','D'+day));bars.append(item)}
 const hint=el('p','chart-hint','Food acceptance across seven days · Higher bars mean more food accepted');pattern.append(bars,hint);
 const rows=el('div','observation-list');
 for(const day of days){const e=s.entries.find(x=>x.day===day);const row=el('div','observation-row');row.append(el('span','day-pill','DAY '+day),el('span','observation-value',e?names[e.appetite]:'Not recorded'));const details=el('span','observation-extra',e?[e.stool,e.behavior].filter(Boolean).join(' · ')||'Saved':'—');row.append(details);rows.append(row)}
 pattern.append(rows);$('pattern').replaceChildren(pattern);
 const summary=el('div','summary-card');const top=el('div','summary-top');const number=el('div','summary-number',`${s.observedDays} / 7`);top.append(number,el('div','summary-text','days observed'));summary.append(top);
 const copy=el('p','summary-copy',s.observedDays?`Average food acceptance: ${s.meanAppetite} / 3. ${s.missingDays.length?`Days still to observe: ${s.missingDays.join(', ')}.`:'All seven days recorded.'} These observations describe a pattern; they do not identify a cause.`:'Your story begins with one small check-in. Save a day to see your summary grow.');summary.append(copy);$('summary').replaceChildren(summary);
}
function syncChoice(){const selected=document.querySelector('input[name="appetite-choice"]:checked');$('appetite').value=selected?.value??'3'}
document.querySelectorAll('input[name="appetite-choice"]').forEach(input=>input.addEventListener('change',syncChoice));
$('checkin').addEventListener('submit',e=>{e.preventDefault();syncChoice();const item={day:Number($('day').value),appetite:Number($('appetite').value),stool:$('stool').value.trim(),behavior:$('behavior').value.trim()};if(!validate(item)){$('status').textContent='Please check your observation.';return}entries=entries.filter(x=>x.day!==item.day).concat(item);persist();render();$('status').textContent='Day '+item.day+' saved here on your device. ✨';});
$('demo').onclick=()=>{if(entries.length&&!confirm('Replace existing observations with synthetic demo data?'))return;entries=days.map(day=>({day,appetite:[2,1,1,2,3,2,3][day-1],stool:'Synthetic: normal',behavior:'Synthetic: active'}));persist();render();$('status').textContent='Synthetic demo loaded. All sample observations are fictional.'};
$('reset').onclick=()=>{if(!confirm('Clear all observations in this browser?'))return;entries=[];persist();render();$('status').textContent='Observations cleared.'};
$('export').onclick=()=>{const s=summarize(entries);const data={schema:'pet-appetite-observation/1',disclaimer:'OBSERVATION ONLY — NOT MEDICAL ADVICE. SYNTHETIC ONLY IF DEMO DATA WAS LOADED.',generatedAt:new Date().toISOString(),entries:s.entries,summary:{observedDays:s.observedDays,missingDays:s.missingDays,meanAppetite:s.meanAppetite}};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='pet-appetite-observations.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
render();
