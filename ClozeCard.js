console.log('inside clozecard.js');



// Constructor function for creating CasicCard objects.
//Accepts two arguments.
var ClozeCard = function(text, cloze) {

  // This is a scope-safe constructor it checks if the objects is a new instances, i.e., includes new operator.
  //Use the instanceof 
  if (this instanceof ClozeCard) {
    this.text = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, '_____');
     
  
  } else {
    return new ClozeCard(text, cloze);
  }
};

// Export ClozeCard constructor, required in app.js
module.exports = ClozeCard;
