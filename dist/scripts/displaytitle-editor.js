"use strict";
mw.loader.using(["mediawiki.util", "oojs-ui-core", "oojs-ui.styles.icons-editing-core"], () => {
  if (mw.config.get("wgNamespaceNumber") < 0)
    return;
  if (!mw.config.get("wgIsProbablyEditable"))
    return;
  mw.util.addCSS(`
#displaytitle-edit-button {
    margin-right: 0;
    margin-left: 3px;
    font-size: 15px;
}

#displaytitle-edit-box {
    display: inline-block;
    ${mw.config.get("skin") === "modern" ? "margin-top: 2px;" : ""}
    margin-bottom: 2px;
    width: 200px;
    max-width: 200px;
    font-size: 15px;
}`);
  if (mw.config.get("skin") === "modern")
    mw.util.addCSS(`
#mw_header {
    height: 2.5em;
}

#p-personal {
    top: 2.5em;
}

#mw_main {
    margin-top: 4em;
}`);
  const editButton = new OO.ui.ButtonWidget({ icon: "edit", framed: false, id: "displaytitle-edit-button" });
  editButton.on("click", async () => {
    editButton.setDisabled(true);
    if (mw.config.get("skin") === "modern")
      mw.util.addCSS(`
#mw_header {
    height: 3em;
}

#p-personal {
    top: 3em;
}

#mw_main {
    margin-top: 4.5em;
}`);
    const actualTitle = mw.config.get("wgPageName").replaceAll("_", " ");
    const editBox = new OO.ui.TextInputWidget({ placeholder: actualTitle, id: "displaytitle-edit-box" });
    editBox.on("enter", async () => {
      editBox.setDisabled(true);
      editBox.pushPending();
      await new mw.Api().edit(mw.config.get("wgPageName"), (revision) => {
        const text = revision.content.replaceAll(/{{\s*displaytitle\s*:\s*(.*?)\s*}}\n?/gi, "");
        if (!editBox.getValue() || editBox.getValue().replaceAll("_", " ") === actualTitle)
          return { text, summary: "Removing DISPLAYTITLE (via [[User:Eejit43/scripts/displaytitle-editor|script]])" };
        const isAdded = text === revision.content;
        return /{{short description/i.test(text) ? {
          text: text.replace(/{{short description(.*?)}}/i, `{{short description$1}}
{{DISPLAYTITLE:${editBox.getValue()}}}`),
          summary: `${isAdded ? "Adding DISPLAYTITLE of" : "Changing DISPLAYTITLE to"} "${editBox.getValue()}" (via [[User:Eejit43/scripts/displaytitle-editor|script]])`
        } : {
          text: `{{DISPLAYTITLE:${editBox.getValue()}}}
${text}`,
          summary: `${isAdded ? "Adding DISPLAYTITLE of" : "Changing DISPLAYTITLE to"} "${editBox.getValue()}" (via [[User:Eejit43/scripts/displaytitle-editor|script]])`
        };
      });
      mw.notify("Successfully updated DISPLAYTITLE, reloading...", { type: "success" });
      window.location.reload();
    });
    editBox.setDisabled(true);
    editBox.pushPending();
    editButton.$element[0].after(editBox.$element[0]);
    const pageContent = (await new mw.Api().get({ action: "query", formatversion: 2, prop: "revisions", rvprop: "content", rvslots: "*", titles: mw.config.get("wgPageName") })).query.pages[0].revisions[0].slots.main.content;
    const foundMagicWords = pageContent.match(/{{\s*displaytitle\s*:\s*(.*?)\s*}}/gi);
    if (foundMagicWords)
      editBox.setValue(foundMagicWords.at(-1).replace(/{{\s*displaytitle\s*:\s*(.*?)\s*}}/i, "$1"));
    editBox.setDisabled(false);
    editBox.popPending();
  });
  document.querySelector("#firstHeading")?.append(editButton.$element[0]);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc2NyaXB0cy9kaXNwbGF5dGl0bGUtZWRpdG9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBQYWdlUmV2aXNpb25zUmVzdWx0IH0gZnJvbSAnLi4vZ2xvYmFsLXR5cGVzJztcblxubXcubG9hZGVyLnVzaW5nKFsnbWVkaWF3aWtpLnV0aWwnLCAnb29qcy11aS1jb3JlJywgJ29vanMtdWkuc3R5bGVzLmljb25zLWVkaXRpbmctY29yZSddLCAoKSA9PiB7XG4gICAgaWYgKG13LmNvbmZpZy5nZXQoJ3dnTmFtZXNwYWNlTnVtYmVyJykgPCAwKSByZXR1cm47IC8vIERvbid0IHJ1biBpbiB2aXJ0dWFsIG5hbWVzcGFjZXNcbiAgICBpZiAoIW13LmNvbmZpZy5nZXQoJ3dnSXNQcm9iYWJseUVkaXRhYmxlJykpIHJldHVybjsgLy8gRG9uJ3QgcnVuIGlmIHVzZXIgY2FuJ3QgZWRpdCBwYWdlXG5cbiAgICBtdy51dGlsLmFkZENTUyhgXG4jZGlzcGxheXRpdGxlLWVkaXQtYnV0dG9uIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICBmb250LXNpemU6IDE1cHg7XG59XG5cbiNkaXNwbGF5dGl0bGUtZWRpdC1ib3gge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAke213LmNvbmZpZy5nZXQoJ3NraW4nKSA9PT0gJ21vZGVybicgPyAnbWFyZ2luLXRvcDogMnB4OycgOiAnJ31cbiAgICBtYXJnaW4tYm90dG9tOiAycHg7XG4gICAgd2lkdGg6IDIwMHB4O1xuICAgIG1heC13aWR0aDogMjAwcHg7XG4gICAgZm9udC1zaXplOiAxNXB4O1xufWApO1xuXG4gICAgaWYgKG13LmNvbmZpZy5nZXQoJ3NraW4nKSA9PT0gJ21vZGVybicpXG4gICAgICAgIG13LnV0aWwuYWRkQ1NTKGBcbiNtd19oZWFkZXIge1xuICAgIGhlaWdodDogMi41ZW07XG59XG5cbiNwLXBlcnNvbmFsIHtcbiAgICB0b3A6IDIuNWVtO1xufVxuXG4jbXdfbWFpbiB7XG4gICAgbWFyZ2luLXRvcDogNGVtO1xufWApO1xuXG4gICAgY29uc3QgZWRpdEJ1dHRvbiA9IG5ldyBPTy51aS5CdXR0b25XaWRnZXQoeyBpY29uOiAnZWRpdCcsIGZyYW1lZDogZmFsc2UsIGlkOiAnZGlzcGxheXRpdGxlLWVkaXQtYnV0dG9uJyB9KTtcbiAgICBlZGl0QnV0dG9uLm9uKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgZWRpdEJ1dHRvbi5zZXREaXNhYmxlZCh0cnVlKTtcblxuICAgICAgICBpZiAobXcuY29uZmlnLmdldCgnc2tpbicpID09PSAnbW9kZXJuJylcbiAgICAgICAgICAgIG13LnV0aWwuYWRkQ1NTKGBcbiNtd19oZWFkZXIge1xuICAgIGhlaWdodDogM2VtO1xufVxuXG4jcC1wZXJzb25hbCB7XG4gICAgdG9wOiAzZW07XG59XG5cbiNtd19tYWluIHtcbiAgICBtYXJnaW4tdG9wOiA0LjVlbTtcbn1gKTtcblxuICAgICAgICBjb25zdCBhY3R1YWxUaXRsZSA9IG13LmNvbmZpZy5nZXQoJ3dnUGFnZU5hbWUnKS5yZXBsYWNlQWxsKCdfJywgJyAnKTtcblxuICAgICAgICBjb25zdCBlZGl0Qm94ID0gbmV3IE9PLnVpLlRleHRJbnB1dFdpZGdldCh7IHBsYWNlaG9sZGVyOiBhY3R1YWxUaXRsZSwgaWQ6ICdkaXNwbGF5dGl0bGUtZWRpdC1ib3gnIH0pO1xuICAgICAgICBlZGl0Qm94Lm9uKCdlbnRlcicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGVkaXRCb3guc2V0RGlzYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICBlZGl0Qm94LnB1c2hQZW5kaW5nKCk7XG5cbiAgICAgICAgICAgIGF3YWl0IG5ldyBtdy5BcGkoKS5lZGl0KG13LmNvbmZpZy5nZXQoJ3dnUGFnZU5hbWUnKSwgKHJldmlzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9IHJldmlzaW9uLmNvbnRlbnQucmVwbGFjZUFsbCgve3tcXHMqZGlzcGxheXRpdGxlXFxzKjpcXHMqKC4qPylcXHMqfX1cXG4/L2dpLCAnJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWVkaXRCb3guZ2V0VmFsdWUoKSB8fCBlZGl0Qm94LmdldFZhbHVlKCkucmVwbGFjZUFsbCgnXycsICcgJykgPT09IGFjdHVhbFRpdGxlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyB0ZXh0LCBzdW1tYXJ5OiAnUmVtb3ZpbmcgRElTUExBWVRJVExFICh2aWEgW1tVc2VyOkVlaml0NDMvc2NyaXB0cy9kaXNwbGF5dGl0bGUtZWRpdG9yfHNjcmlwdF1dKScgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWRkZWQgPSB0ZXh0ID09PSByZXZpc2lvbi5jb250ZW50O1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIC97e3Nob3J0IGRlc2NyaXB0aW9uL2kudGVzdCh0ZXh0KVxuICAgICAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGV4dC5yZXBsYWNlKC97e3Nob3J0IGRlc2NyaXB0aW9uKC4qPyl9fS9pLCBge3tzaG9ydCBkZXNjcmlwdGlvbiQxfX1cXG57e0RJU1BMQVlUSVRMRToke2VkaXRCb3guZ2V0VmFsdWUoKX19fWApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5OiBgJHtpc0FkZGVkID8gJ0FkZGluZyBESVNQTEFZVElUTEUgb2YnIDogJ0NoYW5naW5nIERJU1BMQVlUSVRMRSB0byd9IFwiJHtlZGl0Qm94LmdldFZhbHVlKCl9XCIgKHZpYSBbW1VzZXI6RWVqaXQ0My9zY3JpcHRzL2Rpc3BsYXl0aXRsZS1lZGl0b3J8c2NyaXB0XV0pYCxcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBge3tESVNQTEFZVElUTEU6JHtlZGl0Qm94LmdldFZhbHVlKCl9fX1cXG4ke3RleHR9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeTogYCR7aXNBZGRlZCA/ICdBZGRpbmcgRElTUExBWVRJVExFIG9mJyA6ICdDaGFuZ2luZyBESVNQTEFZVElUTEUgdG8nfSBcIiR7ZWRpdEJveC5nZXRWYWx1ZSgpfVwiICh2aWEgW1tVc2VyOkVlaml0NDMvc2NyaXB0cy9kaXNwbGF5dGl0bGUtZWRpdG9yfHNjcmlwdF1dKWAsXG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtdy5ub3RpZnkoJ1N1Y2Nlc3NmdWxseSB1cGRhdGVkIERJU1BMQVlUSVRMRSwgcmVsb2FkaW5nLi4uJywgeyB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlZGl0Qm94LnNldERpc2FibGVkKHRydWUpO1xuICAgICAgICBlZGl0Qm94LnB1c2hQZW5kaW5nKCk7XG5cbiAgICAgICAgZWRpdEJ1dHRvbi4kZWxlbWVudFswXS5hZnRlcihlZGl0Qm94LiRlbGVtZW50WzBdKTtcblxuICAgICAgICBjb25zdCBwYWdlQ29udGVudCA9IChcbiAgICAgICAgICAgIChhd2FpdCBuZXcgbXcuQXBpKCkuZ2V0KHsgYWN0aW9uOiAncXVlcnknLCBmb3JtYXR2ZXJzaW9uOiAyLCBwcm9wOiAncmV2aXNpb25zJywgcnZwcm9wOiAnY29udGVudCcsIHJ2c2xvdHM6ICcqJywgdGl0bGVzOiBtdy5jb25maWcuZ2V0KCd3Z1BhZ2VOYW1lJykgfSkpIGFzIFBhZ2VSZXZpc2lvbnNSZXN1bHRcbiAgICAgICAgKS5xdWVyeS5wYWdlc1swXS5yZXZpc2lvbnNbMF0uc2xvdHMubWFpbi5jb250ZW50O1xuXG4gICAgICAgIGNvbnN0IGZvdW5kTWFnaWNXb3JkcyA9IHBhZ2VDb250ZW50Lm1hdGNoKC97e1xccypkaXNwbGF5dGl0bGVcXHMqOlxccyooLio/KVxccyp9fS9naSk7XG4gICAgICAgIGlmIChmb3VuZE1hZ2ljV29yZHMpIGVkaXRCb3guc2V0VmFsdWUoZm91bmRNYWdpY1dvcmRzLmF0KC0xKSEucmVwbGFjZSgve3tcXHMqZGlzcGxheXRpdGxlXFxzKjpcXHMqKC4qPylcXHMqfX0vaSwgJyQxJykpO1xuXG4gICAgICAgIGVkaXRCb3guc2V0RGlzYWJsZWQoZmFsc2UpO1xuICAgICAgICBlZGl0Qm94LnBvcFBlbmRpbmcoKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaXJzdEhlYWRpbmcnKT8uYXBwZW5kKGVkaXRCdXR0b24uJGVsZW1lbnRbMF0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsR0FBRyxPQUFPLE1BQU0sQ0FBQyxrQkFBa0IsZ0JBQWdCLG1DQUFtQyxHQUFHLE1BQU07QUFDM0YsTUFBSSxHQUFHLE9BQU8sSUFBSSxtQkFBbUIsSUFBSTtBQUFHO0FBQzVDLE1BQUksQ0FBQyxHQUFHLE9BQU8sSUFBSSxzQkFBc0I7QUFBRztBQUU1QyxLQUFHLEtBQUssT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVNiLEdBQUcsT0FBTyxJQUFJLE1BQU0sTUFBTSxXQUFXLHFCQUFxQixFQUFFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtoRTtBQUVFLE1BQUksR0FBRyxPQUFPLElBQUksTUFBTSxNQUFNO0FBQzFCLE9BQUcsS0FBSyxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVdyQjtBQUVFLFFBQU0sYUFBYSxJQUFJLEdBQUcsR0FBRyxhQUFhLEVBQUUsTUFBTSxRQUFRLFFBQVEsT0FBTyxJQUFJLDJCQUEyQixDQUFDO0FBQ3pHLGFBQVcsR0FBRyxTQUFTLFlBQVk7QUFDL0IsZUFBVyxZQUFZLElBQUk7QUFFM0IsUUFBSSxHQUFHLE9BQU8sSUFBSSxNQUFNLE1BQU07QUFDMUIsU0FBRyxLQUFLLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBV3pCO0FBRU0sVUFBTSxjQUFjLEdBQUcsT0FBTyxJQUFJLFlBQVksRUFBRSxXQUFXLEtBQUssR0FBRztBQUVuRSxVQUFNLFVBQVUsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsYUFBYSxhQUFhLElBQUksd0JBQXdCLENBQUM7QUFDbkcsWUFBUSxHQUFHLFNBQVMsWUFBWTtBQUM1QixjQUFRLFlBQVksSUFBSTtBQUN4QixjQUFRLFlBQVk7QUFFcEIsWUFBTSxJQUFJLEdBQUcsSUFBSSxFQUFFLEtBQUssR0FBRyxPQUFPLElBQUksWUFBWSxHQUFHLENBQUMsYUFBYTtBQUMvRCxjQUFNLE9BQU8sU0FBUyxRQUFRLFdBQVcsMkNBQTJDLEVBQUU7QUFFdEYsWUFBSSxDQUFDLFFBQVEsU0FBUyxLQUFLLFFBQVEsU0FBUyxFQUFFLFdBQVcsS0FBSyxHQUFHLE1BQU07QUFDbkUsaUJBQU8sRUFBRSxNQUFNLFNBQVMsa0ZBQWtGO0FBRTlHLGNBQU0sVUFBVSxTQUFTLFNBQVM7QUFFbEMsZUFBTyx1QkFBdUIsS0FBSyxJQUFJLElBQ2pDO0FBQUEsVUFDSSxNQUFNLEtBQUssUUFBUSwrQkFBK0I7QUFBQSxpQkFBMkMsUUFBUSxTQUFTLENBQUMsSUFBSTtBQUFBLFVBQ25ILFNBQVMsR0FBRyxVQUFVLDJCQUEyQiwwQkFBMEIsS0FBSyxRQUFRLFNBQVMsQ0FBQztBQUFBLFFBQ3RHLElBQ0E7QUFBQSxVQUNJLE1BQU0sa0JBQWtCLFFBQVEsU0FBUyxDQUFDO0FBQUEsRUFBTyxJQUFJO0FBQUEsVUFDckQsU0FBUyxHQUFHLFVBQVUsMkJBQTJCLDBCQUEwQixLQUFLLFFBQVEsU0FBUyxDQUFDO0FBQUEsUUFDdEc7QUFBQSxNQUNWLENBQUM7QUFFRCxTQUFHLE9BQU8sbURBQW1ELEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEYsYUFBTyxTQUFTLE9BQU87QUFBQSxJQUMzQixDQUFDO0FBQ0QsWUFBUSxZQUFZLElBQUk7QUFDeEIsWUFBUSxZQUFZO0FBRXBCLGVBQVcsU0FBUyxDQUFDLEVBQUUsTUFBTSxRQUFRLFNBQVMsQ0FBQyxDQUFDO0FBRWhELFVBQU0sZUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsU0FBUyxlQUFlLEdBQUcsTUFBTSxhQUFhLFFBQVEsV0FBVyxTQUFTLEtBQUssUUFBUSxHQUFHLE9BQU8sSUFBSSxZQUFZLEVBQUUsQ0FBQyxHQUN4SixNQUFNLE1BQU0sQ0FBQyxFQUFFLFVBQVUsQ0FBQyxFQUFFLE1BQU0sS0FBSztBQUV6QyxVQUFNLGtCQUFrQixZQUFZLE1BQU0sc0NBQXNDO0FBQ2hGLFFBQUk7QUFBaUIsY0FBUSxTQUFTLGdCQUFnQixHQUFHLEVBQUUsRUFBRyxRQUFRLHVDQUF1QyxJQUFJLENBQUM7QUFFbEgsWUFBUSxZQUFZLEtBQUs7QUFDekIsWUFBUSxXQUFXO0FBQUEsRUFDdkIsQ0FBQztBQUVELFdBQVMsY0FBYyxlQUFlLEdBQUcsT0FBTyxXQUFXLFNBQVMsQ0FBQyxDQUFDO0FBQzFFLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
