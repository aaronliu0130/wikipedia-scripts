"use strict";mw.loader.using(["mediawiki.util"],()=>{if(mw.config.get("wgUserName")!=="Eejit43"||mw.config.get("wgPageName")!=="User:Eejit43")return;const s="Eejit43",n="wikipedia-scripts";mw.util.addPortletLink(mw.config.get("skin")==="minerva"?"p-tb":"p-cactions","#","Sync user scripts from GitHub","sync-scripts").addEventListener("click",async h=>{h.preventDefault();const m=await fetch(`https://api.github.com/repos/${s}/${n}/commits`);if(!m.ok)return mw.notify(`Failed to fetch latest commit hash from GitHub: ${m.statusText} (${m.status})`,{type:"error",tag:"sync-scripts-notification"});const g=(await m.json())[0].sha,p=await fetch(`https://raw.githubusercontent.com/${s}/${n}/${g}/scripts.json`);if(!p.ok)return mw.notify(`Failed to fetch script data from GitHub: ${p.statusText} (${p.status})`,{type:"error",tag:"sync-scripts-notification"});const a=await p.json();mw.notify("Syncing scripts...",{autoHide:!1,tag:"sync-scripts-notification"}),await Promise.all(a.map(async t=>{const e=`User:Eejit43/scripts/${t.name}`,o=`User talk:Eejit43/scripts/${t.name}`,u=`${e}.js`,d=`${e}.css`,$=["{{User:Eejit43/script-documentation",t["use-instead"]?`| use-instead       = [[User:Eejit43/scripts/${t["use-instead"]}|${t["use-instead"]}]]`:null,t["image-size"]?`| image-size        = ${t["image-size"]}`:null,t["image-caption"]?`| image-caption     = ${t["image-caption"]}`:null,t["other-authors"]?`| other-authors     = ${t["other-authors"].map(i=>`[[User:${i}|${i}]]`).join(", ")}`:null,`| description-short = ${t["short-description"]}`,`| description       = ${t.description}`,t.usage?`| usage             = ${t.usage}`:null,`| skin-support      = {{User:Eejit43/skin-support|${Object.entries(t["skin-support"]).map(([i,y])=>`${i}=${y}`).join("|")}}}`,`| released          = {{start date and age|${t.released}}}`,`| updated           = {{start date and age|${t.updated}}}`,"}}"].filter(Boolean);let c=null;const l=await fetch(`https://raw.githubusercontent.com/${s}/${n}/${g}/dist/scripts/${t.name}.js`);if(l.ok)c=await l.text();else return mw.notify(`Failed to fetch "${t.name}.js" from GitHub: ${l.statusText} (${l.status})`,{type:"error",tag:"sync-scripts-notification"});let w=null;if(t.css){const i=await fetch(`https://raw.githubusercontent.com/${s}/${n}/${g}/dist/styles/${t.name}.css`);i.ok?w=await i.text():mw.notify(`Failed to fetch "${t.name}.css" from GitHub: ${i.statusText} (${i.status})`,{type:"error",tag:"sync-scripts-notification"})}t.personal||(await r(e,$.join(`
`),"Syncing script documentation from GitHub"),await r(o,"#REDIRECT [[User talk:Eejit43]]","Redirecting script documentation talk page to main user talk page")),c&&await r(u,`// <nowiki>
// Note: This script was compiled from TypeScript. For a more readable version, see https://github.com/${s}/${n}/blob/main/scripts/${t.name}.ts

${c}
// </nowiki>`,"Syncing script from GitHub"),t.css&&w&&await r(d,`/* <nowiki> */
/* Note: This script was compiled from modern CSS. For a more readable version, see https://github.com/${s}/${n}/blob/main/styles/${t.name}.css */

${w}
/* </nowiki> */`,"Syncing styles from GitHub")})),await r("User:Eejit43/scripts-info",[f(a.filter(t=>!t.personal&&!t.fork)),"","=== Forks ===",f(a.filter(t=>t.fork)),"","=== Personal scripts ===",f(a.filter(t=>t.personal))].join(`
`),"Syncing script list from GitHub"),mw.notify(`Synced ${a.length} scripts from GitHub!`,{type:"success",tag:"sync-scripts-notification"});function f(t){return t.map(e=>`* [[User:Eejit43/scripts/${e.name}${e.personal?".js":""}|${e.name}]] - ${e["short-description"]||e.description}${e["use-instead"]?' (<span style="color: #bd2828">deprecated</span>)':""}`).join(`
`)}async function r(t,e,o){o+=" (via [[User:Eejit43/scripts/script-updater.js|script]])",await new mw.Api().edit(t,()=>({text:e,summary:o,watchlist:"watch"})).catch(async(u,d)=>{if(u==="nocreate-missing")await new mw.Api().create(t,{summary:o,watchlist:"watch"},e).catch(($,c)=>{mw.notify(`Error creating ${t}: ${c?.error.info??"Unknown error"} (${$})`,{type:"error"})});else{mw.notify(`Error editing or creating ${t}: ${d?.error.info??"Unknown error"} (${u})`,{type:"error"});return}})}})});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc2NyaXB0cy9zY3JpcHQtdXBkYXRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgTWVkaWFXaWtpRGF0YUVycm9yIH0gZnJvbSAnLi4vZ2xvYmFsLXR5cGVzJztcblxuaW50ZXJmYWNlIFNjcmlwdCB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgICd1c2UtaW5zdGVhZCc/OiBzdHJpbmc7XG4gICAgJ2ltYWdlLXNpemUnPzogc3RyaW5nO1xuICAgICdpbWFnZS1jYXB0aW9uJz86IHN0cmluZztcbiAgICAnc2hvcnQtZGVzY3JpcHRpb24nOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICB1c2FnZT86IHN0cmluZztcbiAgICAnb3RoZXItYXV0aG9ycyc/OiBzdHJpbmdbXTtcbiAgICBmb3JrPzogdHJ1ZTtcbiAgICBwZXJzb25hbD86IHRydWU7XG4gICAgJ3NraW4tc3VwcG9ydCc6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuICAgIHJlbGVhc2VkOiBzdHJpbmc7XG4gICAgdXBkYXRlZDogc3RyaW5nO1xuICAgIGNzcz86IHRydWU7XG59XG5cbm13LmxvYWRlci51c2luZyhbJ21lZGlhd2lraS51dGlsJ10sICgpID0+IHtcbiAgICBpZiAobXcuY29uZmlnLmdldCgnd2dVc2VyTmFtZScpICE9PSAnRWVqaXQ0MycgfHwgbXcuY29uZmlnLmdldCgnd2dQYWdlTmFtZScpICE9PSAnVXNlcjpFZWppdDQzJykgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVwb093bmVyID0gJ0Vlaml0NDMnO1xuICAgIGNvbnN0IHJlcG9OYW1lID0gJ3dpa2lwZWRpYS1zY3JpcHRzJztcblxuICAgIGNvbnN0IGxpbmsgPSBtdy51dGlsLmFkZFBvcnRsZXRMaW5rKG13LmNvbmZpZy5nZXQoJ3NraW4nKSA9PT0gJ21pbmVydmEnID8gJ3AtdGInIDogJ3AtY2FjdGlvbnMnLCAnIycsICdTeW5jIHVzZXIgc2NyaXB0cyBmcm9tIEdpdEh1YicsICdzeW5jLXNjcmlwdHMnKSE7XG5cbiAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgbGF0ZXN0Q29tbWl0SGFzaFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vcmVwb3MvJHtyZXBvT3duZXJ9LyR7cmVwb05hbWV9L2NvbW1pdHNgKTtcbiAgICAgICAgaWYgKCFsYXRlc3RDb21taXRIYXNoUmVzcG9uc2Uub2spXG4gICAgICAgICAgICByZXR1cm4gbXcubm90aWZ5KGBGYWlsZWQgdG8gZmV0Y2ggbGF0ZXN0IGNvbW1pdCBoYXNoIGZyb20gR2l0SHViOiAke2xhdGVzdENvbW1pdEhhc2hSZXNwb25zZS5zdGF0dXNUZXh0fSAoJHtsYXRlc3RDb21taXRIYXNoUmVzcG9uc2Uuc3RhdHVzfSlgLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB0YWc6ICdzeW5jLXNjcmlwdHMtbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGxhdGVzdENvbW1pdEhhc2ggPSAoKGF3YWl0IGxhdGVzdENvbW1pdEhhc2hSZXNwb25zZS5qc29uKCkpIGFzIHsgc2hhOiBzdHJpbmcgfVtdKVswXS5zaGE7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0RGF0YVJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS8ke3JlcG9Pd25lcn0vJHtyZXBvTmFtZX0vJHtsYXRlc3RDb21taXRIYXNofS9zY3JpcHRzLmpzb25gKTtcbiAgICAgICAgaWYgKCFzY3JpcHREYXRhUmVzcG9uc2Uub2spXG4gICAgICAgICAgICByZXR1cm4gbXcubm90aWZ5KGBGYWlsZWQgdG8gZmV0Y2ggc2NyaXB0IGRhdGEgZnJvbSBHaXRIdWI6ICR7c2NyaXB0RGF0YVJlc3BvbnNlLnN0YXR1c1RleHR9ICgke3NjcmlwdERhdGFSZXNwb25zZS5zdGF0dXN9KWAsIHsgdHlwZTogJ2Vycm9yJywgdGFnOiAnc3luYy1zY3JpcHRzLW5vdGlmaWNhdGlvbicgfSk7XG5cbiAgICAgICAgY29uc3Qgc2NyaXB0RGF0YSA9IChhd2FpdCBzY3JpcHREYXRhUmVzcG9uc2UuanNvbigpKSBhcyBTY3JpcHRbXTtcblxuICAgICAgICBtdy5ub3RpZnkoJ1N5bmNpbmcgc2NyaXB0cy4uLicsIHsgYXV0b0hpZGU6IGZhbHNlLCB0YWc6ICdzeW5jLXNjcmlwdHMtbm90aWZpY2F0aW9uJyB9KTtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIHNjcmlwdERhdGEubWFwKGFzeW5jIChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJwYWdlTmFtZSA9IGBVc2VyOkVlaml0NDMvc2NyaXB0cy8ke3NjcmlwdC5uYW1lfWA7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VicGFnZVRhbGtOYW1lID0gYFVzZXIgdGFsazpFZWppdDQzL3NjcmlwdHMvJHtzY3JpcHQubmFtZX1gO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdE5hbWUgPSBgJHtzdWJwYWdlTmFtZX0uanNgO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0eWxlTmFtZSA9IGAke3N1YnBhZ2VOYW1lfS5jc3NgO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZnVsbFN1YnBhZ2VJbmZvID0gW1xuICAgICAgICAgICAgICAgICAgICAne3tVc2VyOkVlaml0NDMvc2NyaXB0LWRvY3VtZW50YXRpb24nLCAvL1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHRbJ3VzZS1pbnN0ZWFkJ10gPyBgfCB1c2UtaW5zdGVhZCAgICAgICA9IFtbVXNlcjpFZWppdDQzL3NjcmlwdHMvJHtzY3JpcHRbJ3VzZS1pbnN0ZWFkJ119fCR7c2NyaXB0Wyd1c2UtaW5zdGVhZCddfV1dYCA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdFsnaW1hZ2Utc2l6ZSddID8gYHwgaW1hZ2Utc2l6ZSAgICAgICAgPSAke3NjcmlwdFsnaW1hZ2Utc2l6ZSddfWAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBzY3JpcHRbJ2ltYWdlLWNhcHRpb24nXSA/IGB8IGltYWdlLWNhcHRpb24gICAgID0gJHtzY3JpcHRbJ2ltYWdlLWNhcHRpb24nXX1gIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgc2NyaXB0WydvdGhlci1hdXRob3JzJ10gPyBgfCBvdGhlci1hdXRob3JzICAgICA9ICR7c2NyaXB0WydvdGhlci1hdXRob3JzJ10ubWFwKChhdXRob3IpID0+IGBbW1VzZXI6JHthdXRob3J9fCR7YXV0aG9yfV1dYCkuam9pbignLCAnKX1gIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYHwgZGVzY3JpcHRpb24tc2hvcnQgPSAke3NjcmlwdFsnc2hvcnQtZGVzY3JpcHRpb24nXX1gLFxuICAgICAgICAgICAgICAgICAgICBgfCBkZXNjcmlwdGlvbiAgICAgICA9ICR7c2NyaXB0LmRlc2NyaXB0aW9ufWAsXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC51c2FnZSA/IGB8IHVzYWdlICAgICAgICAgICAgID0gJHtzY3JpcHQudXNhZ2V9YCA6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGB8IHNraW4tc3VwcG9ydCAgICAgID0ge3tVc2VyOkVlaml0NDMvc2tpbi1zdXBwb3J0fCR7T2JqZWN0LmVudHJpZXMoc2NyaXB0Wydza2luLXN1cHBvcnQnXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKFtza2luLCBzdGF0dXNdKSA9PiBgJHtza2lufT0ke3N0YXR1c31gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJ3wnKX19fWAsXG4gICAgICAgICAgICAgICAgICAgIGB8IHJlbGVhc2VkICAgICAgICAgID0ge3tzdGFydCBkYXRlIGFuZCBhZ2V8JHtzY3JpcHQucmVsZWFzZWR9fX1gLFxuICAgICAgICAgICAgICAgICAgICBgfCB1cGRhdGVkICAgICAgICAgICA9IHt7c3RhcnQgZGF0ZSBhbmQgYWdlfCR7c2NyaXB0LnVwZGF0ZWR9fX1gLFxuICAgICAgICAgICAgICAgICAgICAnfX0nLFxuICAgICAgICAgICAgICAgIF0uZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNjcmlwdENvbnRlbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc2NyaXB0Q29udGVudFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS8ke3JlcG9Pd25lcn0vJHtyZXBvTmFtZX0vJHtsYXRlc3RDb21taXRIYXNofS9kaXN0L3NjcmlwdHMvJHtzY3JpcHQubmFtZX0uanNgKTtcbiAgICAgICAgICAgICAgICBpZiAoc2NyaXB0Q29udGVudFJlc3BvbnNlLm9rKSBzY3JpcHRDb250ZW50ID0gYXdhaXQgc2NyaXB0Q29udGVudFJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtdy5ub3RpZnkoYEZhaWxlZCB0byBmZXRjaCBcIiR7c2NyaXB0Lm5hbWV9LmpzXCIgZnJvbSBHaXRIdWI6ICR7c2NyaXB0Q29udGVudFJlc3BvbnNlLnN0YXR1c1RleHR9ICgke3NjcmlwdENvbnRlbnRSZXNwb25zZS5zdGF0dXN9KWAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdzeW5jLXNjcmlwdHMtbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3R5bGVDb250ZW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoc2NyaXB0LmNzcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHlsZUNvbnRlbnRSZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vJHtyZXBvT3duZXJ9LyR7cmVwb05hbWV9LyR7bGF0ZXN0Q29tbWl0SGFzaH0vZGlzdC9zdHlsZXMvJHtzY3JpcHQubmFtZX0uY3NzYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlQ29udGVudFJlc3BvbnNlLm9rKSBzdHlsZUNvbnRlbnQgPSBhd2FpdCBzdHlsZUNvbnRlbnRSZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIG13Lm5vdGlmeShgRmFpbGVkIHRvIGZldGNoIFwiJHtzY3JpcHQubmFtZX0uY3NzXCIgZnJvbSBHaXRIdWI6ICR7c3R5bGVDb250ZW50UmVzcG9uc2Uuc3RhdHVzVGV4dH0gKCR7c3R5bGVDb250ZW50UmVzcG9uc2Uuc3RhdHVzfSlgLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdzeW5jLXNjcmlwdHMtbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghc2NyaXB0LnBlcnNvbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGVkaXRPckNyZWF0ZShzdWJwYWdlTmFtZSwgZnVsbFN1YnBhZ2VJbmZvLmpvaW4oJ1xcbicpLCAnU3luY2luZyBzY3JpcHQgZG9jdW1lbnRhdGlvbiBmcm9tIEdpdEh1YicpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBlZGl0T3JDcmVhdGUoc3VicGFnZVRhbGtOYW1lLCAnI1JFRElSRUNUIFtbVXNlciB0YWxrOkVlaml0NDNdXScsICdSZWRpcmVjdGluZyBzY3JpcHQgZG9jdW1lbnRhdGlvbiB0YWxrIHBhZ2UgdG8gbWFpbiB1c2VyIHRhbGsgcGFnZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzY3JpcHRDb250ZW50KVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBlZGl0T3JDcmVhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgYC8vIDxub3dpa2k+XFxuLy8gTm90ZTogVGhpcyBzY3JpcHQgd2FzIGNvbXBpbGVkIGZyb20gVHlwZVNjcmlwdC4gRm9yIGEgbW9yZSByZWFkYWJsZSB2ZXJzaW9uLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tLyR7cmVwb093bmVyfS8ke3JlcG9OYW1lfS9ibG9iL21haW4vc2NyaXB0cy8ke3NjcmlwdC5uYW1lfS50c1xcblxcbiR7c2NyaXB0Q29udGVudH1cXG4vLyA8L25vd2lraT5gLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ1N5bmNpbmcgc2NyaXB0IGZyb20gR2l0SHViJyxcbiAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGlmIChzY3JpcHQuY3NzICYmIHN0eWxlQ29udGVudClcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZWRpdE9yQ3JlYXRlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgYC8qIDxub3dpa2k+ICovXFxuLyogTm90ZTogVGhpcyBzY3JpcHQgd2FzIGNvbXBpbGVkIGZyb20gbW9kZXJuIENTUy4gRm9yIGEgbW9yZSByZWFkYWJsZSB2ZXJzaW9uLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tLyR7cmVwb093bmVyfS8ke3JlcG9OYW1lfS9ibG9iL21haW4vc3R5bGVzLyR7c2NyaXB0Lm5hbWV9LmNzcyAqL1xcblxcbiR7c3R5bGVDb250ZW50fVxcbi8qIDwvbm93aWtpPiAqL2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAnU3luY2luZyBzdHlsZXMgZnJvbSBHaXRIdWInLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgYXdhaXQgZWRpdE9yQ3JlYXRlKFxuICAgICAgICAgICAgJ1VzZXI6RWVqaXQ0My9zY3JpcHRzLWluZm8nLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIG1hcFNjcmlwdHMoc2NyaXB0RGF0YS5maWx0ZXIoKHNjcmlwdCkgPT4gIXNjcmlwdC5wZXJzb25hbCAmJiAhc2NyaXB0LmZvcmspKSwgLy9cbiAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAnPT09IEZvcmtzID09PScsXG4gICAgICAgICAgICAgICAgbWFwU2NyaXB0cyhzY3JpcHREYXRhLmZpbHRlcigoc2NyaXB0KSA9PiBzY3JpcHQuZm9yaykpLFxuICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICc9PT0gUGVyc29uYWwgc2NyaXB0cyA9PT0nLFxuICAgICAgICAgICAgICAgIG1hcFNjcmlwdHMoc2NyaXB0RGF0YS5maWx0ZXIoKHNjcmlwdCkgPT4gc2NyaXB0LnBlcnNvbmFsKSksXG4gICAgICAgICAgICBdLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgJ1N5bmNpbmcgc2NyaXB0IGxpc3QgZnJvbSBHaXRIdWInLFxuICAgICAgICApO1xuXG4gICAgICAgIG13Lm5vdGlmeShgU3luY2VkICR7c2NyaXB0RGF0YS5sZW5ndGh9IHNjcmlwdHMgZnJvbSBHaXRIdWIhYCwgeyB0eXBlOiAnc3VjY2VzcycsIHRhZzogJ3N5bmMtc2NyaXB0cy1ub3RpZmljYXRpb24nIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNYXBzIHNjcmlwdHMgdG8gYSBidWxsZXRlZCBsaXN0LlxuICAgICAgICAgKiBAcGFyYW0gc2NyaXB0cyBUaGUgc2NyaXB0cyB0byBtYXAuXG4gICAgICAgICAqIEByZXR1cm5zIFRoZSBtYXBwZWQgc2NyaXB0cy5cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1hcFNjcmlwdHMoc2NyaXB0czogU2NyaXB0W10pIHtcbiAgICAgICAgICAgIHJldHVybiBzY3JpcHRzXG4gICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHNjcmlwdCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGAqIFtbVXNlcjpFZWppdDQzL3NjcmlwdHMvJHtzY3JpcHQubmFtZX0ke3NjcmlwdC5wZXJzb25hbCA/ICcuanMnIDogJyd9fCR7c2NyaXB0Lm5hbWV9XV0gLSAke3NjcmlwdFsnc2hvcnQtZGVzY3JpcHRpb24nXSB8fCBzY3JpcHQuZGVzY3JpcHRpb259JHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHRbJ3VzZS1pbnN0ZWFkJ10gPyAnICg8c3BhbiBzdHlsZT1cImNvbG9yOiAjYmQyODI4XCI+ZGVwcmVjYXRlZDwvc3Bhbj4pJyA6ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVkaXRzIGEgcGFnZSwgb3IgY3JlYXRlcyBpdCBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICAgKiBAcGFyYW0gdGl0bGUgVGhlIHRpdGxlIG9mIHRoZSBwYWdlIHRvIGVkaXQuXG4gICAgICAgICAqIEBwYXJhbSB0ZXh0IFRoZSBwYWdlIGNvbnRlbnQgdG8gc2V0LlxuICAgICAgICAgKiBAcGFyYW0gc3VtbWFyeSBUaGUgZWRpdCBzdW1tYXJ5ICh3aWxsIGFwcGVuZCBzY3JpcHQgbm90aWNlKS5cbiAgICAgICAgICovXG4gICAgICAgIGFzeW5jIGZ1bmN0aW9uIGVkaXRPckNyZWF0ZSh0aXRsZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIHN1bW1hcnk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAgICAgc3VtbWFyeSArPSAnICh2aWEgW1tVc2VyOkVlaml0NDMvc2NyaXB0cy9zY3JpcHQtdXBkYXRlci5qc3xzY3JpcHRdXSknO1xuICAgICAgICAgICAgYXdhaXQgbmV3IG13LkFwaSgpXG4gICAgICAgICAgICAgICAgLmVkaXQodGl0bGUsICgpID0+ICh7IHRleHQsIHN1bW1hcnksIHdhdGNobGlzdDogJ3dhdGNoJyB9KSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goYXN5bmMgKGVycm9yQ29kZTogc3RyaW5nLCBlcnJvckluZm86IE1lZGlhV2lraURhdGFFcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JDb2RlID09PSAnbm9jcmVhdGUtbWlzc2luZycpXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBuZXcgbXcuQXBpKCkuY3JlYXRlKHRpdGxlLCB7IHN1bW1hcnksIHdhdGNobGlzdDogJ3dhdGNoJyB9LCB0ZXh0KS5jYXRjaCgoZXJyb3JDb2RlOiBzdHJpbmcsIGVycm9ySW5mbzogTWVkaWFXaWtpRGF0YUVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXcubm90aWZ5KGBFcnJvciBjcmVhdGluZyAke3RpdGxlfTogJHtlcnJvckluZm8/LmVycm9yLmluZm8gPz8gJ1Vua25vd24gZXJyb3InfSAoJHtlcnJvckNvZGV9KWAsIHsgdHlwZTogJ2Vycm9yJyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdy5ub3RpZnkoYEVycm9yIGVkaXRpbmcgb3IgY3JlYXRpbmcgJHt0aXRsZX06ICR7ZXJyb3JJbmZvPy5lcnJvci5pbmZvID8/ICdVbmtub3duIGVycm9yJ30gKCR7ZXJyb3JDb2RlfSlgLCB7IHR5cGU6ICdlcnJvcicgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiYUFtQkEsR0FBRyxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRyxJQUFNLENBQ3RDLEdBQUksR0FBRyxPQUFPLElBQUksWUFBWSxJQUFNLFdBQWEsR0FBRyxPQUFPLElBQUksWUFBWSxJQUFNLGVBQWdCLE9BRWpHLE1BQU1BLEVBQVksVUFDWkMsRUFBVyxvQkFFSixHQUFHLEtBQUssZUFBZSxHQUFHLE9BQU8sSUFBSSxNQUFNLElBQU0sVUFBWSxPQUFTLGFBQWMsSUFBSyxnQ0FBaUMsY0FBYyxFQUVoSixpQkFBaUIsUUFBUyxNQUFPQyxHQUFVLENBQzVDQSxFQUFNLGVBQWUsRUFFckIsTUFBTUMsRUFBMkIsTUFBTSxNQUFNLGdDQUFnQ0gsQ0FBUyxJQUFJQyxDQUFRLFVBQVUsRUFDNUcsR0FBSSxDQUFDRSxFQUF5QixHQUMxQixPQUFPLEdBQUcsT0FBTyxtREFBbURBLEVBQXlCLFVBQVUsS0FBS0EsRUFBeUIsTUFBTSxJQUFLLENBQzVJLEtBQU0sUUFDTixJQUFLLDJCQUNULENBQUMsRUFFTCxNQUFNQyxHQUFxQixNQUFNRCxFQUF5QixLQUFLLEdBQXlCLENBQUMsRUFBRSxJQUVyRkUsRUFBcUIsTUFBTSxNQUFNLHFDQUFxQ0wsQ0FBUyxJQUFJQyxDQUFRLElBQUlHLENBQWdCLGVBQWUsRUFDcEksR0FBSSxDQUFDQyxFQUFtQixHQUNwQixPQUFPLEdBQUcsT0FBTyw0Q0FBNENBLEVBQW1CLFVBQVUsS0FBS0EsRUFBbUIsTUFBTSxJQUFLLENBQUUsS0FBTSxRQUFTLElBQUssMkJBQTRCLENBQUMsRUFFcEwsTUFBTUMsRUFBYyxNQUFNRCxFQUFtQixLQUFLLEVBRWxELEdBQUcsT0FBTyxxQkFBc0IsQ0FBRSxTQUFVLEdBQU8sSUFBSywyQkFBNEIsQ0FBQyxFQUVyRixNQUFNLFFBQVEsSUFDVkMsRUFBVyxJQUFJLE1B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QU8sUUFBUSxDQUFDLENBQzdELEVBQUUsS0FBSztBQUFBLENBQUksRUFDWCxpQ0FDSixFQUVBLEdBQUcsT0FBTyxVQUFVRCxFQUFXLE1BQU0sd0JBQXlCLENBQUUsS0FBTSxVQUFXLElBQUssMkJBQTRCLENBQUMsRUFPbkgsU0FBU2UsRUFBV0MsRUFBbUIsQ0FDbkMsT0FBT0EsRUFDRixJQUNJZixHQUNHLDRCQUE0QkEsRUFBTyxJQUFJLEdBQUdBLEVBQU8sU0FBVyxNQUFRLEVBQUUsSUFBSUEsRUFBTyxJQUFJLFFBQVFBLEVBQU8sbUJBQW1CLEdBQUtBLEVBQU8sV0FBVyxHQUMxSUEsRUFBTyxhQUFhLEVBQUksb0RBQXNELEVBQ2xGLEVBQ1IsRUFDQyxLQUFLO0FBQUEsQ0FBSSxDQUNsQixDQVFBLGVBQWVhLEVBQWFHLEVBQWVDLEVBQWNDLEVBQWdDLENBQ3JGQSxHQUFXLDJEQUNYLE1BQU0sSUFBSSxHQUFHLElBQUksRUFDWixLQUFLRixFQUFPLEtBQU8sQ0FBRSxLQUFBQyxFQUFNLFFBQUFDLEVBQVMsVUFBVyxPQUFRLEVBQUUsRUFDekQsTUFBTSxNQUFPQyxFQUFtQkMsSUFBa0MsQ0FDL0QsR0FBSUQsSUFBYyxtQkFDZCxNQUFNLElBQUksR0FBRyxJQUFJLEVBQUUsT0FBT0gsRUFBTyxDQUFFLFFBQUFFLEVBQVMsVUFBVyxPQUFRLEVBQUdELENBQUksRUFBRSxNQUFNLENBQUNFLEVBQW1CQyxJQUFrQyxDQUNoSSxHQUFHLE9BQU8sa0JBQWtCSixDQUFLLEtBQUtJLEdBQVcsTUFBTSxNQUFRLGVBQWUsS0FBS0QsQ0FBUyxJQUFLLENBQUUsS0FBTSxPQUFRLENBQUMsQ0FFdEgsQ0FBQyxNQUNBLENBQ0QsR0FBRyxPQUFPLDZCQUE2QkgsQ0FBSyxLQUFLSSxHQUFXLE1BQU0sTUFBUSxlQUFlLEtBQUtELENBQVMsSUFBSyxDQUFFLEtBQU0sT0FBUSxDQUFDLEVBQzdILE1BQ0osQ0FDSixDQUFDLENBQ1QsQ0FDSixDQUFDLENBQ0wsQ0FBQyIsCiAgIm5hbWVzIjogWyJyZXBvT3duZXIiLCAicmVwb05hbWUiLCAiZXZlbnQiLCAibGF0ZXN0Q29tbWl0SGFzaFJlc3BvbnNlIiwgImxhdGVzdENvbW1pdEhhc2giLCAic2NyaXB0RGF0YVJlc3BvbnNlIiwgInNjcmlwdERhdGEiLCAic2NyaXB0IiwgInN1YnBhZ2VOYW1lIiwgInN1YnBhZ2VUYWxrTmFtZSIsICJzY3JpcHROYW1lIiwgInN0eWxlTmFtZSIsICJmdWxsU3VicGFnZUluZm8iLCAiYXV0aG9yIiwgInNraW4iLCAic3RhdHVzIiwgInNjcmlwdENvbnRlbnQiLCAic2NyaXB0Q29udGVudFJlc3BvbnNlIiwgInN0eWxlQ29udGVudCIsICJzdHlsZUNvbnRlbnRSZXNwb25zZSIsICJlZGl0T3JDcmVhdGUiLCAibWFwU2NyaXB0cyIsICJzY3JpcHRzIiwgInRpdGxlIiwgInRleHQiLCAic3VtbWFyeSIsICJlcnJvckNvZGUiLCAiZXJyb3JJbmZvIl0KfQo=
