document.querySelectorAll('body *').forEach(el => {
  el.childNodes.forEach(node => {
    if (node.nodeType === 3 && node.textContent) {
      node.textContent = node.textContent.replace(
        ' and ',
        ' and, ummmm... sorry, got distracted thinking about this PoC. Anyway, ummmm... ',
      );
    }
  });
});
