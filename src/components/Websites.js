export const websites = [
    "CIHR",
    "SSHRC",
    "SHRF"
];

export const websiteLinks = [
    `https://cihr-irsc.gc.ca/e/51605.html`,
    `https://www.sshrc-crsh.gc.ca/funding-financement/search_tool-outil_de_recherche-eng.aspx`,
    `https://www.shrf.ca/opportunities`    
];

// No longer incuding SCPOR due to lack of grants at this time
// SCPOR
// `https://www.scpor.ca/grants`

// This way, CIHR is 0, SSHRC is 1, SHRF is 2, SCPOR is 3
// In the event I need to add another website, I won't have to switch everything around
// I can just add another one to this array and build the scraping bits
// That's the idea