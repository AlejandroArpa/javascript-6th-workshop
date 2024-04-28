export default function createComponent (title, description, code, buttonId){
    const keywords = ['var', 'function', 'if', 'let', 'console', 'const', 'return', 'try', 'catch'];
    const reservedWords = ['true', 'false', 'null'];
    function highlightCode(code) {
        code = code.replace(/(".*?"|'.*?')/g, `<span class="string">$1</span>`);
        code = code.replace(/(\/\/.*$)/gm, `<span class="comment">$1</span>`);
        keywords.forEach(keyword => {
            code = code.replace(new RegExp(`\\b${keyword}\\b`, 'g'), `<span class="keyword">${keyword}</span>`);
        });
        reservedWords.forEach(word => {
            code = code.replace(new RegExp(`\\b${word}\\b`, 'g'), `<span class="reserved">${word}</span>`);
        });
        
        return code;
    }
    const componentHTML = `
    <section class="sectExc d-flex fdir-col w90 gap1REM jcont-center aitem-center">
        <header>
            <h3>${title}</h3>
            <h5>${description}</h5>
        </header>
        <pre><code>${highlightCode(code)}</code></pre>
        <button id="${buttonId}">Try it!</button>
    </section>
`;
return componentHTML;
}