const buttons = [
    {
      id: 'button1',
      contid: 'cont1',
      text: 'Button 1',
      position: {
        top: '100px',
        left: '515px'
      },
      content: '<h2>Popup 1 Content</h2>'
    },
    {
      id: 'button2',
      contid: 'cont2',
      text: 'Button 2',
      position: {
        top: '140px',
        left: '600px'
      },
      content: '<h2>Popup 2 Content</h2>'
    },
  
  ];
  
buttons.forEach(button => { 
    const thebutton = document.getElementById({ id });
    const container = document.getElementById({ contid });
    thebutton.addEventListener('click', () => {
        container.style.display = 'block';
    });
});




