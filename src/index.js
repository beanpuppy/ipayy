/* eslint-disable no-param-reassign */

const rUrl = chrome.runtime.getURL('build/ipa.json');

let ipa;

function handleText(textNode) {
  const words = textNode.nodeValue.trim().split(/\s+/);
  const newWords = [];

  words.forEach((word) => {
    const iword = ipa[word.toLowerCase()];

    if (iword !== undefined) {
      newWords.push(iword);
    } else {
      newWords.push(word);
    }
  });

  textNode.nodeValue = newWords.join(' ');
}

function walk(node) {
  let child;
  let next;

  const tagName = node.tagName ? node.tagName.toLowerCase() : '';

  if (tagName === 'input' || tagName === 'textarea') return;

  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;

    default:
      break;
  }
}

fetch(rUrl)
  .then((response) => response.json())
  .then((data) => {
    ipa = data;
    walk(document.body);
  });
