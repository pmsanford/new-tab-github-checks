function replaceText (node) {
  if (node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLAnchorElement && node.className.split(' ').filter(x => x == 'status-actions').length > 0) {
    node.target = "_blank";
  }
  for (let i = 0; i < node.childNodes.length; i++) {
    replaceText(node.childNodes[i]);
  }    
}

replaceText(document.body);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        replaceText(newNode);
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
