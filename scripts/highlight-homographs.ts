(() => {
    const title = document.getElementById('firstHeading');

    if (!title) return mw.notify('Could not find title element!', { type: 'error' });

    [...title.children].forEach((element) => {
        if (!element.textContent) return;
        if (element.nodeType === Node.TEXT_NODE) title.replaceChild(document.createRange().createContextualFragment(markHomographs(element.textContent)), element);
        else if (element.classList.contains('mw-page-title-main') || element.tagName === 'I') element.innerHTML = markHomographs(element.innerHTML);
    });

    /**
     * Marks homographs in a string with a red background color
     * @param {string} string The string to mark homographs in
     * @returns {string} The string with homographs marked
     */
    function markHomographs(string: string): string {
        return string
            .split('')
            .map((char) => {
                if (
                    /* Cyrillics */
                    /[\u0400-\u04FF\u0500-\u052F\u2DE0-\u2DFF\uA640-\uA69F\u1D2B\u1D78]/.test(char) || // eslint-disable-line no-misleading-character-class
                    /* Greek */
                    /[ονɑΑΒΕΗΙΚΜΝΟΡΤΧΥΖ]/.test(char) ||
                    /* Armenian */
                    /[օոսՏԼ]/.test(char) ||
                    /* Roman Numerals */
                    /[ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫⅬⅭⅮⅯ]/i.test(char)
                )
                    return `<abbr title="This character is a homograph!" style="text-decoration: none; background-color: #ff5555">${char}</abbr>`;
                else return char;
            })
            .join('');
    }
})();
