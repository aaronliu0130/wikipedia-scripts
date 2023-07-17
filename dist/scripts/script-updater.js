"use strict";
mw.loader.using(["mediawiki.util"], () => {
  if (mw.config.get("wgUserName") !== "Eejit43" || mw.config.get("wgPageName") !== "User:Eejit43")
    return;
  const repoOwner = "Eejit43";
  const repoName = "wikipedia-scripts";
  const link = mw.util.addPortletLink(mw.config.get("skin") === "minerva" ? "p-tb" : "p-cactions", "#", "Sync user scripts from GitHub", "sync-scripts");
  link.addEventListener("click", async (event) => {
    event.preventDefault();
    const latestCommitHash = (await (await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`)).json())[0].sha;
    const scriptData = await (await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/${latestCommitHash}/scripts.json`)).json();
    mw.notify("Syncing scripts...", { autoHide: false, tag: "sync-scripts-notification" });
    await Promise.all(
      scriptData.map(async (script) => {
        const subpageName = `User:Eejit43/scripts/${script.name}`;
        const subpageTalkName = `User talk:Eejit43/scripts/${script.name}`;
        const scriptName = `${subpageName}.js`;
        const styleName = `${subpageName}.css`;
        const fullSubpageInfo = [
          "{{User:Eejit43/script-documentation",
          //
          script["use-instead"] ? `| use-instead       = [[User:Eejit43/scripts/${script["use-instead"]}|${script["use-instead"]}]]` : null,
          script["image-size"] ? `| image-size        = ${script["image-size"]}` : null,
          script["image-caption"] ? `| image-caption     = ${script["image-caption"]}` : null,
          script["other-authors"] ? `| other-authors     = ${script["other-authors"].map((author) => `[[User:${author}|${author}]]`).join(", ")}` : null,
          `| description-short = ${script["short-description"]}`,
          `| description       = ${script.description}`,
          `| skin-support      = {{User:Eejit43/skin-support|${Object.entries(script["skin-support"]).map(([skin, status]) => `${skin}=${status}`).join("|")}}}`,
          `| released          = {{start date and age|${script.released}}}`,
          `| updated           = {{start date and age|${script.updated}}}`,
          "}}"
        ].filter(Boolean);
        const scriptContent = await (await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/${latestCommitHash}/dist/scripts/${script.name}.js`)).text().catch((error) => {
          console.error(error);
          return null;
        });
        const styleContent = script.css ? await (await fetch(`https://raw.githubusercontent.com/${repoOwner}/${repoName}/${latestCommitHash}/dist/styles/${script.name}.css`)).text().catch((error) => {
          console.error(error);
          return null;
        }) : null;
        if (!scriptContent || script.css && !styleContent)
          return mw.notify(`Error syncing "${script.name}" from GitHub, skipping...`, { type: "error" });
        if (!script.personal) {
          await editOrCreate(subpageName, fullSubpageInfo.join("\n"), "Syncing script documentation from GitHub");
          await editOrCreate(subpageTalkName, "#REDIRECT [[User talk:Eejit43]]", "Redirecting script documentation talk page to main user talk page");
        }
        await editOrCreate(scriptName, `// <nowiki>
// Note: This script was compiled from TypeScript. For a more readable version, see https://github.com/${repoOwner}/${repoName}/blob/main/scripts/${script.name}.ts

${scriptContent}
// </nowiki>`, "Syncing script from GitHub");
        if (script.css && styleContent)
          await editOrCreate(styleName, `/* <nowiki> */
/* Note: This script was compiled from modern CSS. For a more readable version, see https://github.com/${repoOwner}/${repoName}/blob/main/styles/${script.name}.css */

${styleContent}
/* </nowiki> */`, "Syncing styles from GitHub");
      })
    );
    await editOrCreate(
      "User:Eejit43/scripts-info",
      [
        mapScripts(scriptData.filter((script) => !script.personal && !script.fork)),
        //
        "",
        "=== Personal-use scripts ===",
        mapScripts(scriptData.filter((script) => script.personal)),
        "",
        "=== Forks ===",
        mapScripts(scriptData.filter((script) => script.fork))
      ].join("\n"),
      "Syncing script list from GitHub"
    );
    mw.notify(`Synced ${scriptData.length} scripts from GitHub!`, { type: "success", tag: "sync-scripts-notification" });
    function mapScripts(scripts) {
      return scripts.map((script) => `* [[User:Eejit43/scripts/${script.name}${script.personal ? ".js" : ""}|${script.name}]] - ${script["short-description"] || script.description}${script["use-instead"] ? ' (<span style="color: #bd2828">deprecated</span>)' : ""}`).join("\n");
    }
    async function editOrCreate(title, text, summary) {
      summary += " (via [[User:Eejit43/scripts/script-updater.js|script]])";
      await new mw.Api().edit(title, () => ({ text, summary, watchlist: "watch" })).catch(async (errorCode, { error }) => {
        if (errorCode === "nocreate-missing")
          await new mw.Api().create(title, { summary, watchlist: "watch" }, text).catch((errorCode2, { error: error2 }) => {
            mw.notify(`Error creating ${title}: ${error2.info} (${errorCode2})`, { type: "error" });
            return;
          });
        else {
          mw.notify(`Error editing or creating ${title}: ${error.info} (${errorCode})`, { type: "error" });
          return;
        }
      });
    }
  });
});
