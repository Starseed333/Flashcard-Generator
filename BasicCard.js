console.log('inside basiccard.js');

// Constructor function for creating BasicCard objects.
//Accepts two arguments with the corresponding property.
var BasicCard = function(front, back) {
 this.front = front;
 this.back = back;
};

// Export BasicCard constructor, required in app.js
module.exports = BasicCard;





